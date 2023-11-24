import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../../assets/splash-logo.png'

const Splash = ({ navigation }) => {
    const handle = async () => {
        const mToken = await AsyncStorage.getItem('toke')
        const mLegacyToken = await AsyncStorage.getItem('legacyToken')
        !mToken && !mLegacyToken ?
            navigation.navigate('Login')
            : navigation.navigate('Home')
    }
    useEffect(() => {
        setTimeout(async () => {
            handle()
        }, 3000)
    })
    return (
        <View style={{ backgroundColor: '#fff6f2', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={Logo}
                style={{ height: 400, width: 400 }}
            />
        </View>
    )
}

export default Splash