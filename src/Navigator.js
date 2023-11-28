import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './screens/Login'
import Splash from './screens/Splash'
import Home from './screens/Home'
import Details from './screens/Details'
import VideoList from './screens/VideoList'
import VideoDetails from './screens/VideoDetails'
import VideoPlayer from './screens/VideoPlayer'

const Stack = createStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#34bbba' />
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='VideoList' component={VideoList} />
        <Stack.Screen name='VideoDetails' component={VideoDetails} />
        <Stack.Screen name='VideoPlayer' component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator