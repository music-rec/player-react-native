import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class Show extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '')
    }
  }

  // this.props.navigation.getParam('url')

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Show coming soon!"
          onPress={() => this.props.navigation.navigate('Schedule')}
        />
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
