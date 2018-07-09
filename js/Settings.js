import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  }

  static async getStreamSetting() {
    const result = await AsyncStorage.getItem('STREAM_URL')
    return result || 'http://floyd.wcbn.org:8000/wcbn-mid.mp3'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings comng soon!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'whitesmoke',
    height: 300
  }
})
