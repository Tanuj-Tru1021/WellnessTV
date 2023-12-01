import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CollectionsCard = ({ src, onPressImage }) => {

    let imageURL = 'https:' + src
    return (
        <TouchableOpacity
            style={{ backgroundColor: 'white', margin: 8 }}
            onPress={onPressImage}
        >
            <Image
                src={imageURL}
                style={{ height: 375, width: "100%", borderRadius: 15 }}
            />
        </TouchableOpacity>
    )
}

export default CollectionsCard