import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'

import Song from './components/Song'

export default class Playlist extends React.Component {
  static navigationOptions = {
    title: 'Playlist'
  }

  constructor() {
    super()

    this.state = {
      on_air: {
        name: '',
        dj: '',
        dj_url: '',
        beginning: '',
        ending: '',
        times: '',
        show_notes: null,
        songs: [],
        semester_id: -1
      },
      upcoming_episodes: []
    }
  }

  componentDidMount() {
    this.fetchPlaylist()
  }

  fetchPlaylist() {
    fetch('https://app.wcbn.org/playlist.json')
      .then(response => response.json())
      .then(response =>
        this.setState({
          on_air: response.on_air
        })
      )
      .then(() => {
        this.state.on_air.songs.forEach(song => {
          let day = new Date(song.at)
          song.at = day.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        })
      })
      .then(console.log(this.state))
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Songs</Text>
      </View>
    )
  }

  renderSong({ item }) {
    return <Song data={item} />
  }

  renderSongs() {
    if (this.state.on_air.songs.length) {
      return (
        <FlatList
          data={this.state.on_air.songs}
          renderItem={this.renderSong.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderHeader}
        />
      )
    } else {
      return (
        <View style={styles.textBox}>
          <Text>No recent songs to display</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.banner}
          onPress={() =>
            this.props.navigation.navigate('Profile', {
              url: this.state.on_air.dj_url,
              title: this.state.on_air.name
            })
          }
        >
          <Text>On the air: {this.state.on_air.dj} →</Text>
        </TouchableOpacity>
        {this.renderSongs()}
      </View>
    )
  }
}

const HEADER_HEIGHT = 22
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  banner: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  header: {
    height: HEADER_HEIGHT,
    paddingLeft: 10,
    backgroundColor: 'black'
  },
  headerText: {
    fontWeight: 'bold',
    color: 'whitesmoke',
    lineHeight: HEADER_HEIGHT
  },
  song: {
    color: 'black',
    height: 50,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textBox: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
