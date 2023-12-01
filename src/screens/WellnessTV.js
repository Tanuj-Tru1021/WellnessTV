import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import useRequest from '../hooks/useRequest'
import Header from '../components/Header'
import CategoryCards from '../components/CategoryCards'
import CollectionsCard from '../components/CollectionsCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WellnessTV = ({ navigation }) => {

  const [category, setCategory] = useState([])
  const [item, setItem] = useState([])
  const { makeRequest } = useRequest()

  const fetchAPI = async () => {

    const token = await AsyncStorage.getItem('token')
    const legacyToken = await AsyncStorage.getItem('legacyToken')

    await makeRequest({
      endPoint: 'wellness-tv/collections',
      method: 'GET',
      body: {},
      headers: {
        'x-access-token': token,
        'Authorization': `Bearer ${legacyToken}`
      },
      onSuccess: (data) => {
        setItem(data)
      },
      onError: (err) => {
        console.log("data -", err)
      }
    })
    await makeRequest({
      endPoint: 'wellness-tv/categories',
      method: 'GET',
      body: {},
      headers: {
        'x-access-token': token,
        'Authorization': `Bearer ${legacyToken}`
      },
      onSuccess: (data) => {
        setCategory(data)
      },
      onError: (err) => {
        console.log("data -", err)
      }
    })
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('legacyToken')
    navigation.navigate('Login')
  }

  useEffect(() => {
    fetchAPI()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header
        isHome={false}
        Title={'Wellness TV'}
        onPressLogout={logout}
        onPressBack={() => navigation.goBack()}
      />
      <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 4, backgroundColor: 'white' }}>
        <FlatList
          data={category.items}
          showsVerticalScrollIndicator={false}
          key={'_'}
          keyExtractor={item => '_' + item.sys.id}
          numColumns={2}
          ListHeaderComponent={(
            <View style={{ marginHorizontal: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', marginTop: 8 }}>
                Browse By Category
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 400, color: 'black', marginTop: 4 }}>
                Explore all the wellness sessions on The Wellness Corner
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <CategoryCards
                onPressImage={() => navigation.navigate('VideoList', { name: item.fields.name })}
                src={item.fields.image.fields.file.url}
              />
            )
          }}
          ListEmptyComponent={(
            <View style={{ marginTop: 16, padding: 8 }}>
              <ActivityIndicator size={'large'} color={'black'} />
            </View>
          )}
          ListFooterComponent={(
            <FlatList
              data={item}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.sys.id}
              ListHeaderComponent={(
                <View style={{ margin: 8 }}>
                  <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', marginTop: 8, marginBottom: 4 }}>
                    Explore Collections
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 400, color: 'black' }}>
                    Explore all collections of workouts & meditations curated by our community of health experts
                  </Text>
                </View>
              )}
              renderItem={({ item }) => {
                return (
                  <CollectionsCard
                    onPressImage={() => navigation.navigate('CollectionsDetails', { collections: item.fields })}
                    src={item.fields.image.fields.file.url}
                  />
                )
              }}
              ListEmptyComponent={(
                <View style={{ padding: 8, marginTop: 16 }}>
                  <ActivityIndicator size={'large'} color={'black'} />
                </View>
              )}
            />
          )}
        />
      </View>
    </View>
  )
}

export default WellnessTV