import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'

const STREAMS = [
  'http://floyd.wcbn.org:8000/wcbn-lo.mp3',
  'http://floyd.wcbn.org:8000/wcbn-mid.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hi.mp3'
]

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  }

  constructor() {
    super()
    this.state = {
      selectedStreamIndex: null // fetch ASAP in async componentDidMount ¯\_(ツ)_/¯
    }
  }

  async componentDidMount() {
    const result = await AsyncStorage.getItem('STREAM_URL')
    this.setState({ selectedStreamIndex: STREAMS.indexOf(result) })
  }

  setStreamSetting = index => {
    AsyncStorage.setItem('STREAM_URL', STREAMS[index])
    this.setState({ selectedStreamIndex: index })
    // AsyncStorage.getItem('STREAM_URL').then(resp => console.log(resp))
  }

  static async getStreamSetting() {
    const result = await AsyncStorage.getItem('STREAM_URL')
    return result || 'http://floyd.wcbn.org:8000/wcbn-mid.mp3'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Stream Quality</Text>
        <SegmentedControlTab
          values={['Low', 'Med', 'High']}
          selectedIndex={this.state.selectedStreamIndex}
          onTabPress={this.setStreamSetting}
        />
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
