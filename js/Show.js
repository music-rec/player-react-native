import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'

export default class Show extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '')
    }
  }

  constructor() {
    super()

    this.state = {
      description: '',
      djs: [],
      episodes: []
    }
  }

  componentDidMount() {
    this.fetchShow()
  }

  fetchShow() {
    const options = { month: 'long', day: 'numeric', year: 'numeric' } //weekday: 'long', ,

    fetch(
      'https://app.wcbn.org' + this.props.navigation.getParam('url') + '.json'
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          description: response.description,
          djs: response.djs,
          episodes: response.episodes.reduceRight((acc, e) => {
            let today = new Date()
            let episodeDate = new Date(e.beginning)
            if (episodeDate < today) {
              e.beginning = episodeDate.toLocaleDateString('en-US', options)
              acc.push(e)
            }
            return acc
          }, [])
        })
      )
  }

  renderDescription() {
    if (this.state.description.length) {
      return (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{this.state.description}</Text>
        </View>
      )
    }
  }

  renderDjButtons() {
    const djButtons = this.state.djs.map(dj => (
      <TouchableOpacity
        key={dj.url}
        style={styles.dj}
        onPress={() =>
          this.props.navigation.navigate('Profile', {
            url: dj.url,
            title: dj.name
          })
        }
      >
        <Text style={styles.djText}>{dj.name}</Text>
      </TouchableOpacity>
    ))

    return <View style={styles.djs}>{djButtons}</View>
  }

  renderEpisode({ item, index }) {
    //TODO refactor this
    return item.songs.length ? (
      <TouchableOpacity>
        <View style={styles.episode}>
          <Text style={styles.episodeText}>{item.beginning}</Text>
          <Text style={styles.episodeText}>{item.songs.length} Songs</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <View style={styles.episode}>
        <Text style={styles.episodeText}>{item.beginning}</Text>
        <Text style={styles.episodeText}>{item.songs.length} Songs</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDescription()}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Hosts</Text>
        </View>
        {this.renderDjButtons()}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Recent Episodes</Text>
        </View>

        <FlatList
          data={this.state.episodes}
          renderItem={this.renderEpisode}
          keyExtractor={item => item.beginning}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'whitesmoke'
  },
  description: {
    marginBottom: 15
  },
  descriptionText: {
    fontStyle: 'italic'
  },
  sectionTitle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  sectionTitleText: {
    fontSize: 23
  },
  djs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    marginBottom: 10
  },
  dj: {
    backgroundColor: 'lightgray',
    height: 44, // padding * 2 + djText lineHeight
    padding: 12,
    margin: 3
  },
  djText: {
    lineHeight: 20,
    fontSize: 16
  },
  episode: {
    height: 22,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  episodeText: {
    lineHeight: 22
  }
})
