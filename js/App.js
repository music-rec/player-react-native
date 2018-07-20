//@flow

import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Schedule from './Schedule'
import Stream from './Stream'
import Favorites from './Favorites'
import Settings from './Settings'
import Show from './Show'
import Profile from './Profile'
import Episode from './Episode'
import Playlist from './Playlist'

const ScheduleStack = createStackNavigator({
  Schedule: Schedule,
  Show: Show,
  Profile: Profile,
  Episode: Episode
})

const PlaylistStack = createStackNavigator({
  Playlist: Playlist,
  Profile: Profile
})

export default createBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    Playlist: PlaylistStack,
    Stream: Stream,
    Favorites: Favorites,
    Settings: Settings
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName = ''
        if (routeName === 'Schedule') {
          iconName = 'calendar'
        } else if (routeName === 'Playlist') {
          iconName = 'musical-notes'
        } else if (routeName === 'Stream') {
          iconName = 'radio'
        } else if (routeName === 'Favorites') {
          iconName = 'heart'
        } else if (routeName === 'Settings') {
          iconName = 'settings'
        }
        iconName = `ios-${iconName}${focused ? '' : '-outline'}`

        return <Ionicons name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    initialRouteName: 'Playlist'
  }
)
