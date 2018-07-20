import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SectionList
} from 'react-native'
import { Constants } from 'expo'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

const WEEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const weekdayIndex = new Date().getDay()
const TODAY = weekdayIndex == 0 ? 6 : weekdayIndex - 1

const ITEM_HEIGHT = 50
const HEADER_HEIGHT = 22

//pure component for better performance(?)
class ScheduleList extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      sections: []
    }
  }

  renderItem = ({ item, index, section }) => (
    <TouchableOpacity
      key={index}
      style={styles.item}
      onPress={() =>
        this.props.navigation.navigate('Show', {
          url: item.url,
          title: item.name
        })
      }
    >
      <View>
        <Text>{item.name}</Text>
        <Text style={{ fontStyle: 'italic' }}>{item.with}</Text>
      </View>
    </TouchableOpacity>
  )

  renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.header}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'whitesmoke',
          lineHeight: HEADER_HEIGHT
        }}
      >
        {title}
      </Text>
    </View>
  )

  componentDidMount() {
    this.fetchSchedule()
  }

  fetchSchedule() {
    fetch(this.props.url, {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
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
          animated: true,
          sectionIndex: TODAY,
          itemIndex: 0,
          viewPosition: 0
        })
      })
  }

  getItemLayout = sectionListGetItemLayout({
    getItemHeight: (rowData, sectionIndex, rowIndex) => ITEM_HEIGHT,
    getSectionHeaderHeight: () => HEADER_HEIGHT
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
    title: 'WCBN Schedule'
  }
  render() {
    return (
      <View style={styles.container}>
        <ScheduleList
          url="https://app.wcbn.org/semesters"
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke' //#e67e22
  },
  sectionList: {
    flex: 1
  },
  header: {
    height: HEADER_HEIGHT,
    paddingLeft: 10,
    backgroundColor: 'black'
  },
  item: {
    height: ITEM_HEIGHT,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
