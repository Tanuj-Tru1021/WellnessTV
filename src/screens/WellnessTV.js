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

    const CollectionsURL_endPoint = 'wellness-tv/collections'
    const CategoryURL_endPoint = 'wellness-tv/categories'
    const method = "GET"
    const body = {}
    const token = await AsyncStorage.getItem('token')
    const legacyToken = await AsyncStorage.getItem('legacyToken')
    const headers = {
      'x-access-token': token,
      'Authorization': `Bearer ${legacyToken}`,
      ...headers
    }
    await makeRequest({
      endPoint: CollectionsURL_endPoint,
      method: method,
      body: body,
      headers: headers,
      onSuccess: (data) => {
        setItem(data)
      },
      onError: (err) => {
        console.log("data -", err)
      }
    })
    await makeRequest({
      endPoint: CategoryURL_endPoint,
      method: method,
      body: body,
      headers: headers,
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
      <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 8, backgroundColor: 'white' }}>
        <FlatList
          data={category.items}
          showsVerticalScrollIndicator={false}
          key={'_'}
          keyExtractor={item => '_' + item.sys.id}
          numColumns={2}
          ListHeaderComponent={(
            <View style={{ marginHorizontal: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 500, color: 'black', marginTop: 8, marginBottom: 4 }}>
                Browse By Category
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 400, color: 'black' }}>
                Explore all the wellness sessions on The Wellness Corner
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <View style={{ margin: 8 }}>
                <CategoryCards
                  onPressImage={() => navigation.navigate('VideoList', { name: item.fields.name })}
                  src={item.fields.image.fields.file.url}
                />
              </View>
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
                  <Text style={{ fontSize: 16, fontWeight: 500, color: 'black', marginTop: 8, marginBottom: 4 }}>
                    Explore Collections
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 400, color: 'black' }}>
                    Explore all collections of workouts & meditations curated by our community of health experts
                  </Text>
                </View>
              )}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginVertical: 8 }}>
                    <CollectionsCard
                      onPressImage={() => navigation.navigate('CollectionsDetails', { collections: item.fields })}
                      src={item.fields.image.fields.file.url}
                    />
                  </View>
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