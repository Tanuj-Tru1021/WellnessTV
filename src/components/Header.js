import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const Header = ({ Title, isHome, onPressBack, onPressHome, onPressLogout }) => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8, alignItems: 'center' }}>
            {isHome ?
                <Ionicon name="home" size={30} color='black' /> :
                <TouchableOpacity onPress={onPressBack}>
                    <Ionicon name="arrow-back-outline" size={30} color='black' />
                </TouchableOpacity>
            }
            <Text style={{ fontSize: 24, fontWeight: 500, color: 'black' }}>
                {Title}
            </Text>
            {
                isHome ?
                    <TouchableOpacity onPress={onPressLogout}>
                        <Ionicon name="log-out" size={30} color='black' />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={onPressHome}>
                        <Ionicon name="home" size={30} color='black' />
                    </TouchableOpacity>
            }
        </View>
    )
}

export default Header