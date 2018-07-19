/*
 * @flow
 */

import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import type { SongT } from '../models'

type Props = {
  data: SongT
}

export default class Song extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{this.props.data.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  name: {
    color: 'black'
  }
})
