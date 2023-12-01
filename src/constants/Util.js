import React, { } from 'react'
import { Text } from 'react-native'

export const RenderError = ({ message }) => {
    return (
        <Text style={{ marginTop: 10, color: 'red', fontSize: 10, minHeight: 15 }}>{message}</Text>
    )
}

export const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

export const BASE_URL = 'https://api.thewellnesscorner.com/'