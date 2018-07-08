import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Favorites extends React.Component {
  static navigationOptions = {
    title: 'Favorites'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>List of favorites coming soon!</Text>
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
