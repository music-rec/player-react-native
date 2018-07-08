import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Show extends React.Component {
  static navigationOptions = {
    title: 'Show'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Show coming soon!</Text>
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
