import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { Player, Recorder, MediaStates } from 'react-native-audio-toolkit'
import Settings from './Settings'

async function play(remoteURL) {
  player = new Player(remoteURL, {
    continuesToPlayInBackground: true
  })

  // setTimeout(function() {
  //   // player.play();
  //   console.log(player.duration)
  // }, 25000)

  return new Promise((resolve, reject) => {
    player.play(() => {
      console.log(player.duration)
      // now duration is available, so I resolve promise
      resolve(player)
    })
  })
}

export default class Stream extends React.Component {
  static navigationOptions = {
    title: 'Stream'
  }

  constructor() {
    super()
    this.state = {
      disabled: false
    }
  }

  async _onPress() {
    // const player = await play('http://floyd.wcbn.org:8000/wcbn-mid.mp3')
    const player = await play('./temp.mp3')

    // const player = new Player('./temp.mp3', {
    //   autoDestroy: false
    // }).prepare(err => {
    //   if (err) {
    //     console.log('error at play():')
    //     console.log(err)
    //   } else {
    //     console.log('Here prepare success!!!')
    //     this.player.playPause((err, playing) => {
    //       if (err) {
    //         console.log('failed to load the sound', error)
    //         return
    //       }
    //       console.log('Here PLAY!!! success!!!')
    //     })
    //   }
    // })
  }

  componentDidMount() {
    Settings.getStreamSetting().then(resp => console.log(resp))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the stream page!</Text>
        <TouchableHighlight
          disabled={this.state.disabled}
          onPress={async () => this._onPress()}
        >
          <Text>Press me!</Text>
        </TouchableHighlight>
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
