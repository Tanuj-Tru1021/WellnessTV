import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCards = ({ src, onPressImage }) => {

    let imageURL = 'https:' + src
    return (
        <TouchableOpacity
            style={{ flex: 1, margin: 8 }}
            onPress={onPressImage}
        >
            <Image
                src={imageURL}
                style={{ aspectRatio: 7 / 6, borderRadius: 15 }}
            />
        </TouchableOpacity>
    )
}

export default CategoryCards