/*
 * @flow
 */

import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Song from './components/Song'

//right now I'm using the Song class as a type
// import type { Song } from './models'

export default class Episode extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '')
    }
  }

  renderSong({ item }: { item: Song }) {
    return <Song data={item} />
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.navigation.getParam('songs', '')}
          renderItem={this.renderSong.bind(this)}
          keyExtractor={item => item.at}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  song: {
    color: 'black'
  }
})
