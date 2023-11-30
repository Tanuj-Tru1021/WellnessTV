import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useRequest from '../hooks/useRequest'
import VideoPlayer from '../../assets/video-player.png'
import { reg, RenderError } from '../constants/Util'

const Login = ({ navigation }) => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState({})
  const [data, setData] = useState([])
  const [token, setToken] = useState("")
  const [legacyToken, setLegacyToken] = useState("")
  const [hidePassword, setHidePassword] = useState(true)

  const manageVisibility = () => {
    setHidePassword(!hidePassword)
  }

  const setter = (a) => {
    setData(a)
  }
  const { makeRequest } = useRequest()

  const getData = async () => {

    const URL_endPoint = 'auth/login'
    const method = 'POST'
    const body = {
      "email": credentials.email,
      "password": credentials.password
    }
    const headers = {}

    await makeRequest(URL_endPoint, method, body, headers, setter)
    setToken(data && data.token)
    setLegacyToken(data && data.legacyToken)
    await AsyncStorage.setItem("token", token)
    await AsyncStorage.setItem("legacyToken", legacyToken)
  }

  const verify = async () => {

    try {
      const mToken = await AsyncStorage.getItem("token")
      const mLegacyToken = await AsyncStorage.getItem("legacyToken")
      console.log(mToken, "tokennnnn1111111")
      console.log(mLegacyToken, "legacyyyyyyy22222222222")

      if (mToken && mLegacyToken) {
        const validEmail = reg.test(credentials.email)
        const validPass = credentials.password.length > 5
        if(validEmail && validPass) {
          setCredentials({
            email: '',
            password: ''
          })
          navigation.navigate('Home')
        } else if (!validPass) {
          alert("Minimum password length should be 5")
        } else if (credentials.email.length === 0) {
          alert("Email address cannot be empty")
        } else {
          alert("Invalid email address")
        }
      } else {
        alert('TRY AGAIN! Token not yet fetched.')
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const disabled = (credentials.email.length === 0 && credentials.password.length === 0)
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
          style={{ paddingVertical: 6, paddingLeft: 16, marginBottom: 4, backgroundColor: 'white', borderRadius: 8 }}
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
            style={{ paddingVertical: 6, paddingHorizontal: 16, marginBottom: 4, backgroundColor: 'white', borderRadius: 8, width: '100%', position: 'relative' }}
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

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ backgroundColor: disabled ? 'grey' : 'blue', paddingVertical: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 37, marginBottom: 30, marginTop: 16, width: 300 }}
            disabled={disabled}
            onPress={async () => {
              await getData()
              await verify()
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login