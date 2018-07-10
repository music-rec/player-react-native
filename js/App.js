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

const ScheduleStack = createStackNavigator({
  Schedule: { screen: Schedule },
  Show: { screen: Show },
  Profile: { screen: Profile }
})

export default createBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    Stream: Stream,
    Favorites: Favorites,
    Settings: Settings
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Schedule') {
          iconName = `ios-calendar${focused ? '' : '-outline'}`
        } else if (routeName === 'Stream') {
          iconName = `ios-musical-notes${focused ? '' : '-outline'}`
        } else if (routeName === 'Favorites') {
          iconName = `ios-heart${focused ? '' : '-outline'}`
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    initialRouteName: 'Schedule'
  }
)
