import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const VideoDetails = ({ route, navigation }) => {

    const { name, imageURL, description, videoURL } = route.params
    const imageUrl = "https:" + imageURL
    return (
        <View style={{ flex: 1 }}>
            <Header
                isHome={false}
                Title={'Video Details'}
                onPressBack={() => navigation.goBack()}
            />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View>
                    <Image
                        src={imageUrl}
                        style={{ height: 350, width: '100%' }}
                    />
                    <View style={{ margin: 16 }}>
                        <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', marginBottom: 8 }}>
                            {name}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 400, color: 'black', marginBottom: 8 }}>
                            {description}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ paddingHorizontal: 30, paddingVertical: 15, backgroundColor: '#34bbba', bottom: 0, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.navigate('VideoPlayer', { videoURL: videoURL })}
                >
                    <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                        WATCH NOW
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VideoDetails