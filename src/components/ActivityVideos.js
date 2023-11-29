import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import Video from 'react-native-video'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'

const ActivityVideos = ({ Title, Date, url, imageUrl, description, views, subscribers, playVideo, width, height }) => {

    const videoRef = useRef(null)
    const [clicked, setClicked] = useState(false)
    const [pause, setPause] = useState(false)
    const [progress, setProgress] = useState(null)
    const videoPlay = () => {
        if (videoRef.current) {
            videoRef.current.presentFullscreenPlayer()
        }
    }
    const format = seconds => {
        let mins = parseInt(seconds / 60).toString().padStart(2, '0')
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 16, marginTop: 10, width: width, height: height, borderRadius: 8, borderWidth: 2, borderColor:'grey', paddingTop: 8 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    src={imageUrl}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                        {Title}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: 400, color: 'grey' }}>
                        {Date}
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 500, color: 'black' }}>
                    {description}
                </Text>
            </View>
            <TouchableOpacity
                style={{ width: '100%', height: 275 }}
                onPress={() => setClicked(true)}
                activeOpacity={1}
            >
                <Video
                    ref={videoRef}
                    paused={playVideo}
                    source={{ uri: url }}
                    onProgress={(x) => {setProgress(x)}}
                    onLoad={() => {
                        videoPlay()
                    }}
                    style={{ width: '100%', height: 275 }}
                />
                {
                    clicked &&
                    <TouchableOpacity
                        style={{ width: '100%', height: 275, position: 'absolute', backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => setClicked(false)}
                    >
                        {
                            console.log(progress.currentTime)
                        }
                        <TouchableOpacity
                            style={{ marginHorizontal: 40 }}
                            onPress={() => {
                                setPause(!pause)
                            }}
                        >
                            <Ionicon name={pause ? "play-circle-outline" : "pause-circle-outline"} size={50} color={'white'} />
                        </TouchableOpacity>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 40, paddingHorizontal: 15, alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>
                                {format(progress.currentTime)}
                            </Text>
                            <Slider
                                style={{ width: '80%', height: 40 }}
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
                    </TouchableOpacity>
                }
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14, fontWeight: 400, color: 'black' }}>
                        Views:
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: 400, color: 'grey', marginLeft: 2 }}>
                        {views}
                    </Text>
                </View>
                <Text style={{fontSize: 14, fontWeight: 400, color:'grey'}}>
                    {subscribers}
                </Text>
            </View>
        </View>
    )
}

export default ActivityVideos