import React, { } from 'react'
import { Text } from 'react-native'
import { ENVIRONMENT } from './Environment'

export const RenderError = ({ message }) => {
    return (
        <Text style={{ marginTop: 10, color: 'red', fontSize: 10, minHeight: 15 }}>{message}</Text>
    )
}

export const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

export const BASE_URL = ENVIRONMENT === 'PRODUCTION' ? 'https://api.thewellnesscorner.com/' : 'https://devapi.thewellnesscorner.com/'