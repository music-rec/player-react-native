import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'
import Settings from './Settings'
// import TrackPlayer from 'react-native-track-player'

export default class Stream extends React.Component {
  static navigationOptions = {
    title: 'Stream'
  }

  constructor() {
    super()
    this.state = {
      stream: 'http://floyd.wcbn.org:8000/wcbn-mid.mp3'
    }
  }

  // async componentDidMount() {
  //   const result = await AsyncStorage.getItem('STREAM_URL')
  //   this.setState({ stream: result })
  //   console.log(result)
  //
  //   // Creates the player
  //   TrackPlayer.setupPlayer().then(async () => {
  //     // Adds a track to the queue
  //     await TrackPlayer.add({
  //       id: 'trackId',
  //       url: 'http://floyd.wcbn.org:8000/wcbn-mid.mp3',
  //       title: 'Track Title',
  //       artist: 'Track Artist'
  //     })
  //
  //     // Starts playing it
  //     TrackPlayer.play()
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the stream page!</Text>
        <TouchableHighlight onPress={this.componentDidMount}>
          <Text>Press me!</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 20,
    backgroundColor: 'whitesmoke'
  }
})
