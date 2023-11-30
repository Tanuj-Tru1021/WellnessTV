import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const Header = ({ Title, isHome, onPressBack, onPressLogout }) => {

    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#34bbba', padding: 16 }}>
            {
                isHome ?
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Ionicon name="home" size={30} color="white" />
                        <Text style={{ fontSize: 24, fontWeight: 500, color: 'white' }}>
                            {Title}
                        </Text>
                        <TouchableOpacity onPress={onPressLogout}>
                            <Ionicon name="log-out" size={30} color='white' />
                        </TouchableOpacity>
                    </View> :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={onPressBack}>
                            <Ionicon name="arrow-back-outline" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, fontWeight: 500, color: 'white', marginLeft: 15 }}>
                            {Title}
                        </Text>
                    </View>
            }
        </View>
    )
}

export default Header