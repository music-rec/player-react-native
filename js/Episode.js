import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Song from './components/Song'

// since the only way to get to this screen is from a Show,
// all of the data is passed in as navigation props, saving us an expensive fetch()

export default class Episode extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '')
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>All Songs</Text>
      </View>
    )
  }

  renderSong({ item }) {
    return <Song data={item} />
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.banner}
          onPress={() =>
            this.props.navigation.navigate('Profile', {
              url: this.props.navigation.getParam('dj_url', ''),
              title: this.props.navigation.getParam('dj', '')
            })
          }
        >
          <Text>Host: {this.props.navigation.getParam('dj', '')} →</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.navigation.getParam('songs', '')}
          renderItem={this.renderSong.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderHeader}
        />
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
  bannerIcon: {
    paddingLeft: 20,
    marginTop: 20
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
  }
})
