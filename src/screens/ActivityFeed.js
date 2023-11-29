import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import Videos from '../constants/videos.json'
import Header from '../components/Header'
import Ionicon from 'react-native-vector-icons/Ionicons'
import ActivityVideos from '../components/ActivityVideos'
import {
    OffsetYProvider,
    IndexProvider,
    InCenterConsumer
} from "@n1ru4l/react-in-center-of-screen";

const { height: windowHeight } = Dimensions.get("window");

const boxHeight = 0.68*windowHeight;

const ActivityFeed = ({ navigation }) => {

    return (
        <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 10, backgroundColor: 'white' }}>
            <Header
                isHome={false}
                Title={'Feed'}
                onPressBack={() => navigation.goBack()}
                onPressHome={() => navigation.navigate('Home')}
            />
            <OffsetYProvider
                columnsPerRow={1}
                listItemHeight={boxHeight}
                centerYStart={(windowHeight * 1) / 3}
                centerYEnd={(windowHeight * 2) / 3}
            >
                {({ setOffsetY }) => (
                    <FlatList
                        data={Videos}
                        onScroll={ev => {
                            setOffsetY(ev.nativeEvent.contentOffset.y);
                        }}
                        keyExtractor={item => item.id}
                        renderItem={({ index, item }) => (
                            <IndexProvider index={index}>
                                {() => (
                                    <View style={{ height: boxHeight }}>
                                        <InCenterConsumer>
                                            {({ isInCenter }) =>
                                                isInCenter ?
                                                    <ActivityVideos
                                                        Title={item.title}
                                                        description={item.description}
                                                        Date={item.uploadTime}
                                                        url={item.videoUrl}
                                                        imageUrl={item.thumbnailUrl}
                                                        views={item.views}
                                                        subscribers={item.subscriber}
                                                        playVideo={false}
                                                    />
                                                    :
                                                    <ActivityVideos
                                                        Title={item.title}
                                                        description={item.description}
                                                        Date={item.uploadTime}
                                                        url={item.videoUrl}
                                                        imageUrl={item.thumbnailUrl}
                                                        views={item.views}
                                                        subscribers={item.subscriber}
                                                        playVideo={true}
                                                    />
                                            }
                                        </InCenterConsumer>
                                    </View>
                                )}
                            </IndexProvider>
                        )}
                    />
                )}
            </OffsetYProvider>
            {/* <FlatList
                data={Videos}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <ActivityVideos
                        Title={item.title}
                        description={item.description}
                        Date={item.uploadTime}
                        url={item.videoUrl}
                        imageUrl={item.thumbnailUrl}
                        views={item.views}
                        subscribers={item.subscriber}
                        />
                        )
                }}
            /> */}
        </View>
    )
}

export default ActivityFeed