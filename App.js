/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  Text
} from 'react-native';

// import WeekView, {createFixedWeekDate} from 'react-native-week-view';
import WeekView from './components/WeekView';
import {createFixedWeekDate} from './components/WeekView/utils'

const generateDates = (hours, minutes) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  if (minutes != null) {
    date.setMinutes(minutes);
  }
  return date;
};

const sampleEvents = [
  {
    id: 1,
    description: 'Event 1',
    startDate: generateDates(0),
    endDate: generateDates(2),
    color: 'blue',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: generateDates(1),
    endDate: generateDates(4),
    color: 'red',
  },
  {
    id: 3,
    description: 'Event 3',
    startDate: generateDates(-5),
    endDate: generateDates(-3),
    color: 'green',
  },
];

const sampleFixedEvents = [
  {
    id: 1,
    description: 'Event 1',
    startDate: createFixedWeekDate('Monday', 12),
    endDate: createFixedWeekDate(1, 14),
    color: 'blue',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: createFixedWeekDate('wed', 16),
    endDate: createFixedWeekDate(3, 17, 30),
    color: 'red',
  },
];

// For debugging purposes
const showFixedComponent = false;

const MyRefreshComponent = ({style}) => (
  // Just an example
  <ActivityIndicator style={style} color="red" size="large" />
);

const CustomText = () =>{
  <Text>Hello</Text>
}

class App extends React.Component {
  state = {
    events: showFixedComponent ? sampleFixedEvents : sampleEvents,
    selectedDate: new Date(),
  };

  onEventPress = ({id, color, startDate, endDate}) => {
    Alert.alert(
      `event ${color} - ${id}`,
      `start: ${startDate}\nend: ${endDate}`,
    );
  };

  onGridClick = (event, startHour, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // zero-based
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

     Alert.alert(` Working ${year}-${month}-${day} `)
    //onPress={() => navigation.navigate('Room')}
    ;
  };

  onDragEvent = (event, newStartDate, newEndDate) => {
    // Here you should update the event in your DB with the new date and hour
    this.setState({
      events: [
        ...this.state.events.filter(e => e.id !== event.id),
        {
          ...event,
          startDate: newStartDate,
          endDate: newEndDate,
        },
      ],
    });
  };

  render() {
    const {events, selectedDate} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <WeekView
            ref={r => {
              this.componentRef = r;
            }}
            events={events}
            selectedDate={selectedDate}
            numberOfDays={5}
            onEventPress={this.onEventPress}
            onGridClick={this.onGridClick}
            headerStyle={styles.header}
            headerTextStyle={styles.headerText}
            eventContainerStyle={styles.eventContainer}
            gridColumnStyle={styles.gridColumn}
            gridRowStyle={styles.gridRow}
            formatDateHeader={showFixedComponent ? 'ddd' : 'ddd DD'}
            hourTextStyle={styles.hourText}
            hoursInDisplay={60} // Hours will show in time bar
            timeStep={360} // Time difference in minuite
            startHour={0} // Start hour will be
            fixedHorizontally={showFixedComponent}
            showTitle={!showFixedComponent}
            showNowLine
            onDragEvent={this.onDragEvent}
            isRefreshing={false}
            RefreshComponent={MyRefreshComponent}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  headerText: {
    color: '#000',
  },
  hourText: {
    color: '#000',
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: 'black',
  },
  gridRow: {
    borderTopWidth: 1,
    borderColor: '#E9EDF0',
  },
  gridColumn: {
    borderLeftWidth: 1,
    borderColor: '#E9EDF0',
  },
});

export default App;