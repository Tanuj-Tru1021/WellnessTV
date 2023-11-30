import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Video from 'react-native-video'
import Header from '../components/Header'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import Orientation from 'react-native-orientation-locker'

const VideoPlayer = ({ route, navigation }) => {

    const { videoURL } = route.params
    const [clicked, setClicked] = useState(false)
    const [pause, setPause] = useState(false)
    const [progress, setProgress] = useState(null)
    const [fullscreen, setFullscreen] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const videoRef = useRef(null)
    const format = seconds => {
        let mins = parseInt(seconds / 60).toString().padStart(2, '0')
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }

    return (
        <View style={{ flex: 1 }}>
            {fullscreen === false ? <Header
                isHome={false}
                onPressBack={() => navigation.goBack()}
            /> : ""}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <TouchableOpacity
                    style={{ width: '100%', height: fullscreen ? "100%" : 300 }}
                    onPress={() => setClicked(true)}
                    activeOpacity={1}
                >
                    <Video
                        ref={videoRef}
                        paused={pause}
                        muted={isMuted}
                        source={{ uri: videoURL }}
                        onProgress={(x) => setProgress(x)}
                        style={{ width: '100%', height: fullscreen ? '100%' : 300 }}
                    />
                    {
                        clicked && <TouchableOpacity
                            style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => setClicked(false)}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    videoRef.current.seek(parseInt(progress.currentTime - 10))
                                }}>
                                    <Ionicon name="play-back-outline" size={50} color={'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginHorizontal: 40 }}
                                    onPress={() => {
                                        setPause(!pause)
                                    }}
                                >
                                    <Ionicon name={pause ? "play-circle-outline" : "pause-circle-outline"} size={50} color={'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    videoRef.current.seek(parseInt(progress.currentTime + 10))
                                }}>
                                    <Ionicon name="play-forward-outline" size={50} color={'white'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, paddingHorizontal: 15, alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>
                                    {format(progress.currentTime)}
                                </Text>
                                <Slider
                                    style={{ width: '70%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={progress.seekableDuration}
                                    minimumTrackTintColor='#fff'
                                    maximumTrackTintColor='#fff'
                                    onValueChange={(x) => {
                                        videoRef.current.seek(x)
                                    }}
                                />
                                <Text style={{ color: 'white' }}>
                                    {format(progress.seekableDuration)}
                                </Text>
                            </View>
                            <View style={{
                                width: '100%', position: 'absolute', top: fullscreen ? 10 : 30, paddingHorizontal: 20
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={() => {
                                        if (fullscreen) {
                                            Orientation.lockToPortrait()
                                        } else {
                                            Orientation.lockToLandscape()
                                        }
                                        setFullscreen(!fullscreen)
                                    }}>
                                        <Ionicon name={fullscreen ? "contract" : "expand"} size={40} color='white' />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setIsMuted(!isMuted)
                                    }}>
                                        {
                                            isMuted ? <Ionicon name="volume-mute-outline" size={40} color="white" /> :
                                                <Ionicon name="volume-medium-outline" size={40} color="white" />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VideoPlayer