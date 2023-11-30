import { View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import Videos from '../constants/videos.json'
import Header from '../components/Header'
import ActivityVideos from '../components/ActivityVideos'
import {
    OffsetYProvider,
    IndexProvider,
    InCenterConsumer
} from "@n1ru4l/react-in-center-of-screen";

const { height: windowHeight } = Dimensions.get("window");
const boxHeight = 2.8 * windowHeight / 5;

const ActivityFeed = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <Header
                isHome={false}
                Title={'Feed'}
                onPressBack={() => navigation.goBack()}
            />
            <View style={{ paddingHorizontal: 8, backgroundColor: 'white', marginBottom: 75 }}>
                <OffsetYProvider
                    columnsPerRow={1}
                    listItemHeight={boxHeight}
                    centerYStart={(windowHeight * 1) / 3}
                    centerYEnd={(windowHeight * 2) / 3}
                >
                    {({ setOffsetY }) => (
                        <FlatList
                            data={Videos}
                            showsVerticalScrollIndicator={false}
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
            </View>
        </View>
    )
}

export default ActivityFeed