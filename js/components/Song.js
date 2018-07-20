import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

export default class Song extends React.PureComponent {
  renderLabel() {
    if (this.props.data.label && this.props.data.year) {
      return (
        <Text style={styles.label}>
          {this.props.data.label} ({this.props.data.year})
        </Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{this.props.data.at}</Text>
        <Text style={styles.name}>
          {this.props.data.artist}: “{this.props.data.name}”
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    height: 50,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  time: {
    fontSize: 10
  },
  name: {
    color: 'black'
  },
  label: {
    fontStyle: 'italic',
    fontSize: 13
  }
})
