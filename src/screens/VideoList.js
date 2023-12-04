import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useRequest from '../hooks/useRequest'

const VideoList = ({ route, navigation }) => {

    const [category, setCategory] = useState([])
    const { name } = route.params
    const { makeRequest } = useRequest()

    const fetchData = async () => {
    
        await makeRequest({
            endPoint: `wellness-tv/categories/${name.replace(/\s+/g, '-').toLowerCase()}`,
            method: 'GET',
            body: {},
            onSuccess: (data) => {
                setCategory(data)
            },
            onError: (err) => {
                console.log("Error occurred: ", err)
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header
                isHome={false}
                Title={name}
                onPressBack={() => navigation.goBack()}
            />
            <View style={{ backgroundColor: 'white' }}>
                <FlatList
                    data={category}
                    keyExtractor={item => item.sys.id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 60, paddingTop: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                margin: 8, borderWidth: 1,
                                borderRadius: 4, borderColor: 'grey'
                            }}
                            onPress={() => navigation.navigate('VideoDetails', {
                                name: item.fields.title,
                                imageURL: item.fields.image.fields.file.url,
                                description: item.fields.description,
                                videoURL: item.fields.url
                            })}
                        >
                            <Image
                                src={"https:" + item.fields.image.fields.file.url}
                                style={{ aspectRatio: 16 / 9 }}
                            />
                            <Text style={{
                                margin: 8, fontSize: 20,
                                fontWeight: 500, color: 'black'
                            }}>
                                {item.fields.title}
                            </Text>
                            <Text style={{
                                marginHorizontal: 8, marginBottom: 8,
                                fontSize: 14, fontWeight: 400, color: 'black'
                            }}>
                                {item.fields.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={(
                        <View style={{ marginTop: 20 }}>
                            <ActivityIndicator size={'large'} color={'black'} />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default VideoList