import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useRequest from '../hooks/useRequest'
import VideoPlayer from '../../assets/video-player.png'
import { reg, RenderError } from '../constants/Util'

const Login = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', })
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  const { makeRequest } = useRequest()

  const manageVisibility = () => {
    setHidePassword(!hidePassword)
  }

  const disabled = (credentials.email.length === 0 && credentials.password.length === 0)

  const validate = () => {
    if (!credentials.email) {
      alert("Enter Email")
    } else if (!reg.test(credentials.email)) {
      alert("Enter Valid Email")
    } else if (!credentials.password) {
      alert("Enter Password")
    } else if (credentials.password.length < 5) {
      alert("Enter Valid Password")
    } else {
      sendData()
    }
  }

  const sendData = async () => {
    setLoading(true)
    const URL_endPoint = 'auth/login'
    const method = 'POST'
    const body = {
      "email": credentials.email,
      "password": credentials.password
    }

    await makeRequest({
      endPoint: URL_endPoint,
      method: method,
      body: body,
      onSuccess: (data) => {
        AsyncStorage.setItem("token", data.token)
        AsyncStorage.setItem("legacyToken", data.legacyToken)
        AsyncStorage.setItem("member", data.member)
        setLoading(false)
        setCredentials({
          email: '',
          password: ''
        })
        navigation.navigate('Home')
      },
      onError: (err) => {
        console.log("data -", err)
        setLoading(false)
      }
    })
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      style={{ flex: 1, backgroundColor: '#0798b3' }}
    >
      <Image
        source={VideoPlayer}
        style={{ height: 250, width: '100%', }}
      />
      <View style={{ marginHorizontal: 30, paddingHorizontal: 16, }}>
        <Text style={{ fontSize: 24, fontWeight: 500, color: 'white', marginBottom: 20, textAlign: 'center', }}>
          Login to your account
        </Text>
        <Text style={{ fontSize: 20, color: 'white', marginBottom: 8 }}>
          Email
        </Text>
        <TextInput
          autoCapitalize='none'
          placeholder='Enter your email address'
          placeholderTextColor={'grey'}
          keyboardType='email-address'
          onChangeText={(text) => {
            setCredentials({ ...credentials, "email": text.trim() })
            setError(prev => ({ ...prev, email: (!text) }))
          }}
          value={credentials.email}
          style={{ paddingVertical: 6, paddingLeft: 16, backgroundColor: 'white', borderRadius: 8 }}
        />

        {error.email && <RenderError message='Enter Email' />}
        {(credentials.email && !reg.test(credentials.email)) && <RenderError message='Enter Valid Email' />}

        <Text style={{ fontSize: 20, color: 'white', marginBottom: 8 }}>
          Password
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            autoCapitalize='none'
            placeholder='Enter your password'
            placeholderTextColor={'grey'}
            secureTextEntry={hidePassword}
            onChangeText={(text) => {
              setCredentials({ ...credentials, "password": text.trim() })
              setError(prev => ({ ...prev, password: (!text) }))
            }}
            value={credentials.password}
            style={{ paddingVertical: 6, paddingLeft: 16, paddingRight: 50, backgroundColor: 'white', borderRadius: 8, width: '100%' }}
          />
          <TouchableOpacity onPress={() => manageVisibility()}>
            <Image
              source={hidePassword ? require('../../assets/eye-closed.png') : require('../../assets/eye-open.png')}
              style={{ width: 27, height: 24, position: 'absolute', tintColor: '#C4C4C4', justifyContent: 'center', top: 8, right: 12 }}
            />
          </TouchableOpacity>
        </View>

        {error.password && <RenderError message='Enter Password' />}
        {(credentials.password && credentials.password.length < 5) && <RenderError message='Password should be minimum 5 characters' />}

        <TouchableOpacity
          style={{ backgroundColor: disabled ? 'grey' : 'blue', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 16 }}
          disabled={disabled}
          onPress={() => validate()}
        >
          {loading ? <ActivityIndicator color={'white'} /> : <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
            Login
          </Text>}
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default Login