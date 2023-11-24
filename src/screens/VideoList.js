import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useRequest from '../hooks/useRequest'

const VideoList = ({ route, navigation }) => {

    const [category, setCategory] = useState([])
    const { name } = route.params
    const { makeRequest } = useRequest()
    const setterCategory = (a) => {
        setCategory(a)
    }

    const fetchData = async () => {
        const URL = `https://devapi.thewellnesscorner.com/wellness-tv/categories/${name.toLowerCase()}`
        const method = "GET"
        const body = {}
        await makeRequest(URL, method, body, setterCategory)
    }

    useEffect(() => {
        fetchData()
        // console.log(category, "fetched")
    }, [])

    return (
        <View style={{ paddingTop: 16 }}>
            <Header
                isHome={false}
                Title={'VideoList Page'}
                onPressBack={() => navigation.goBack()}
                onPressHome={() => navigation.navigate('Home')}
            />
            <FlatList
              data={category}
              keyExtractor={item => item.sys.id}
              style={{ marginBottom: 50}}
              renderItem={({ item }) => {
                return(
                    <TouchableOpacity 
                    style={{ margin: 8, borderWidth: 2, borderRadius: 4 }}
                    onPress={() => navigation.navigate('VideoDetails', {
                        name: item.fields.title,
                        imageURL: item.fields.image.fields.file.url,
                        description: item.fields.description
                    })}
                    >
                        <Image 
                          src={"https:"+item.fields.image.fields.file.url}
                          style={{height: 300, width: '100%'}}
                        />
                        <Text style={{ margin: 8, fontSize: 20, fontWeight: 500, color:'black' }}>
                            {item.fields.title}
                        </Text>
                        <Text style={{ marginHorizontal: 8, marginBottom: 16, fontSize: 14, fontWeight: 400, color:'black'}}>
                            {item.fields.description}
                        </Text>
                    </TouchableOpacity>
                )
              }}
            />
        </View>
    )
}

export default VideoList