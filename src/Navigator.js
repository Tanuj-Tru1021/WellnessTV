import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './screens/Login'
import Splash from './screens/Splash'
import WellnessTV from './screens/WellnessTV'
import CollectionsDetails from './screens/CollectionsDetails'
import VideoList from './screens/VideoList'
import VideoDetails from './screens/VideoDetails'
import VideoPlayer from './screens/VideoPlayer'
import Home from './screens/Home'
import ActivityFeed from './screens/ActivityFeed'

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
        <Stack.Screen name='WellnessTV' component={WellnessTV} />
        <Stack.Screen name='CollectionsDetails' component={CollectionsDetails} />
        <Stack.Screen name='VideoList' component={VideoList} />
        <Stack.Screen name='VideoDetails' component={VideoDetails} />
        <Stack.Screen name='VideoPlayer' component={VideoPlayer} />
        <Stack.Screen name="ActivityFeed" component={ActivityFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator