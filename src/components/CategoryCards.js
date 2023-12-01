import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCards = ({ src, onPressImage }) => {

    let imageURL = 'https:' + src
    return (
        <TouchableOpacity
            style={{ backgroundColor: 'white', margin: 8 }}
            onPress={onPressImage}
        >
            <Image
                src={imageURL}
                style={{ height: 190, borderRadius: 15 }}
            />
        </TouchableOpacity>
    )
}

export default CategoryCards