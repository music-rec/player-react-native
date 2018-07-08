import React from 'react'
import { StyleSheet, Text, View, Button, SectionList } from 'react-native'
import { Constants } from 'expo'

const WEEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const TODAY = new Date().getDay()

const ITEM_HEIGHT = 50

class ScheduleList extends React.Component {
  constructor() {
    super()

    this.state = {
      sections: []
    }
  }

  renderItem = ({ item, index, section }) => (
    <View style={styles.item}>
      <Text key={index}>{item.name}</Text>
    </View>
  )

  renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.header}>
      <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    </View>
  )

  componentDidMount() {
    this.fetchSchedule()
  }

  fetchSchedule() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(response => response['shows'])
      .then(response => {
        let fetched = []
        WEEEKDAYS.forEach((day, i) => {
          fetched.push({
            title: day,
            data: response[i + 1]
          })
        })
        this.setState({
          sections: fetched
        })
      })
      .then(() => {
        this.sectionListRef.scrollToLocation({
          sectionIndex: TODAY,
          itemIndex: 0,
          viewPosition: 0
        })
      })
      .then(response => console.log('fetched schedule'))
  }

  getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  })

  render() {
    return (
      <SectionList
        style={styles.sectionList}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={this.state.sections}
        keyExtractor={(item, index) => item + index}
        ref={ref => (this.sectionListRef = ref)}
        getItemLayout={this.getItemLayout}
      />
    )
  }
}

export default class Schedule extends React.Component {
  static navigationOptions = {
    title: 'Schedule'
  }
  render() {
    return (
      <View style={styles.container}>
        <ScheduleList url="https://app.wcbn.org/semesters/9.json/" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    backgroundColor: 'whitesmoke'
  },
  sectionList: {
    flex: 1,
    padding: 10
  },
  header: {
    height: ITEM_HEIGHT,
    backgroundColor: 'whitesmoke'
  },
  item: {
    height: ITEM_HEIGHT
  }
})
