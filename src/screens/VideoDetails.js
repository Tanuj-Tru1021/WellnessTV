import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import Header from '../components/Header'
import Video from 'react-native-video'

const VideoDetails = ({ route, navigation }) => {

    const videoRef = useRef(null)
    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.presentFullscreenPlayer()
        }
    }
    const { name, imageURL, description, videoURL } = route.params
    const imageUrl = "https:" + imageURL
    console.log(videoURL)
    return (
        <View style={{ paddingTop: 16, flex: 1, backgroundColor: 'white' }}>
            <Header
                isHome={false}
                Title={'Video Details'}
                onPressBack={() => navigation.goBack()}
                onPressHome={() => navigation.navigate('WellnessTV')}
            />
            {/* <View style={{ flex: 1, justifyContent: 'space-between' }}> */}
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
                onPress={() => navigation.navigate('VideoPlayer', { videoURL: videoURL})}
            >
                <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                    WATCH NOW
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default VideoDetails