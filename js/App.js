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

const ScheduleStack = createStackNavigator({
  Schedule: Schedule,
  Show: Show,
  Profile: Profile,
  Episode: Episode
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
          iconName = 'calendar'
        } else if (routeName === 'Stream') {
          iconName = 'musical-notes'
        } else if (routeName === 'Favorites') {
          iconName = 'heart'
        } else if (routeName === 'Settings') {
          iconName = 'settings'
        }
        iconName = `ios-${iconName}${focused ? '' : '-outline'}`

        //this does this same thing but i can't decide what i like more
        // switch (routeName) {
        //   case 'Schedule':
        //     iconName = 'calendar'
        //     break
        //   case 'Stream':
        //     iconName = 'musical-notes'
        //     break
        //   case 'Favorites':
        //     iconName = 'heart'
        //     break
        //   case 'Settings':
        //     iconName = 'settings'
        //     break
        //   default:
        //     console.log('Icon not found')
        // }
        //
        // iconName = `ios-${iconName}${focused ? '' : '-outline'}`

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
