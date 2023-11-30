import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ navigation }) => {

    const tryD = async () => {

        const mToken = await AsyncStorage.getItem('token')
        const mLegacyToken = await AsyncStorage.getItem('legacyToken')
        console.log(mToken, 'tokennnnn')
        console.log(mLegacyToken, 'legacyTokennnnn')
    }

    const logout = async () => {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("legacyToken")
        navigation.navigate('Login')
    }

    useEffect(() => {
        tryD() 
    })
    return (
        <View style={{ flex: 1 }}>
            <Header
                Title={'Home'}
                isHome={true}
                onPressLogout={logout}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.navigate('WellnessTV')}
                >
                    <Ionicon name='tv' size={50} color="black" />
                    <Text style={{ fontSize: 24, fontWeight: 500, color: 'black', marginHorizontal: 8 }}>
                        Wellness TV
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                    onPress={() => navigation.navigate('ActivityFeed')}
                >
                    <Ionicon name='newspaper' size={50} color="black" />
                    <Text style={{ fontSize: 24, fontWeight: 500, color: 'black', marginHorizontal: 8 }}>
                        Activity Feed
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home