import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useRequest from '../hooks/useRequest'
import AsyncStorage from '@react-native-async-storage/async-storage'

const VideoList = ({ route, navigation }) => {

    const [category, setCategory] = useState([])
    const { name } = route.params
    const { makeRequest } = useRequest()
    const setterCategory = (a) => {
        setCategory(a)
    }

    const fetchData = async () => {
        const URL_endPoint = `wellness-tv/categories/${name.replace(/\s+/g, '-').toLowerCase()}`
        const method = "GET"
        const body = {}
        const token = await AsyncStorage.getItem('token')
        const legacyToken = await AsyncStorage.getItem('legacyToken')
        const headers = {
            'x-access-token': token,
            'Authorization': `Bearer ${legacyToken}`,
            ...headers
        }
        await makeRequest(URL_endPoint, method, body, headers, setterCategory)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={{ paddingTop: 16, backgroundColor:'white' }}>
            <Header
                isHome={false}
                Title={'VideoList Page'}
                onPressBack={() => navigation.goBack()}
                onPressHome={() => navigation.navigate('WellnessTV')}
            />
            <FlatList
                data={category}
                keyExtractor={item => item.sys.id}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 50 }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{ margin: 8, borderWidth: 1, borderRadius: 4, borderColor:'grey' }}
                            onPress={() => navigation.navigate('VideoDetails', {
                                name: item.fields.title,
                                imageURL: item.fields.image.fields.file.url,
                                description: item.fields.description,
                                videoURL: item.fields.url
                            })}
                        >
                            <Image
                                src={"https:" + item.fields.image.fields.file.url}
                                style={{ height: 300, width: '100%' }}
                            />
                            <Text style={{ margin: 8, fontSize: 20, fontWeight: 500, color: 'black' }}>
                                {item.fields.title}
                            </Text>
                            <Text style={{ marginHorizontal: 8, marginBottom: 16, fontSize: 14, fontWeight: 400, color: 'black' }}>
                                {item.fields.description}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                ListEmptyComponent={(
                    <View style={{marginTop: 20}}>
                        <ActivityIndicator size={'large'} color={'black'} />
                    </View>
                )}
            />
        </View>
    )
}

export default VideoList