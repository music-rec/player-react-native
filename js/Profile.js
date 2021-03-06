import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '')
    }
  }

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.fetchDJ()
  }

  fetchDJ() {
    fetch(
      'https://app.wcbn.org' + this.props.navigation.getParam('url') + '.json'
    )
      .then(response => response.json())
      .then(response => this.setState(response))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image
            style={{ width: 66, height: 66 }}
            source={{ uri: this.state.image_url }}
          />
        </View>
        <View style={styles.about}>
          <Text>{this.state.about || 'This DJ does not have a bio'}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#7f8c8d'
  },
  about: {
    padding: 20
  }
})
