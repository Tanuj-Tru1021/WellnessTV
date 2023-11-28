import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import Video from 'react-native-video'
import Header from '../components/Header'

const VideoPlayer = ({ route, navigation }) => {

    const { videoURL } = route.params
    const [pause, setPause] = useState(true)
    const videoRef = useRef(null)
    const videoPlay = () => {
        if (videoRef.current) {
            videoRef.current.presentFullscreenPlayer()
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Header
                isHome={false}
                onPressBack={() => navigation.goBack()}
                onPressHome={() => navigation.navigate('Home')}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <Video
                    ref={videoRef}
                    paused={pause}
                    source={{ uri: videoURL }}
                    onLoad={() => {
                        videoPlay()
                        setPause(false)
                    }}
                    style={{ width: '100%', height: 300 }}
                />
            </View>
        </View>
    )
}

export default VideoPlayer