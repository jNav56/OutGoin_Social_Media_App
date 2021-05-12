import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useStyles } from './styles';
import { light } from './styles';
import { EventList } from './EventList';
import { fetchEventFeed, getUser } from './Services';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { dummyUser } from './data';

const FeedScreen = () => {
  const [currentUser, setCurrentUser] = useState(dummyUser);

  const [allEventsList, setAllEventsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dateToday, setDateToday] = useState('');
  const [timeNow, setTimeNow] = useState('');

  const [listUpdated, setListUpdated] = useState(false);

  const updateTheList = () => {
    setListUpdated(c => !c);
  }

  useEffect(() => {
    getUser().then(user => setCurrentUser(user));
  }, []); 

  useEffect(() => {
    setLoading(true);
    fetchEventFeed()
      .then(list => {
        setAllEventsList(list);
        setLoading(false);
      }).catch(() => {
        console.error("Error when fetching list of events.");
        setLoading(false);
    });
  }, [listUpdated]);

  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return year + '-' + month + '-' + day;
  }

  useEffect(() => {
    var date = getFormattedDate(new Date()); //Current Date
    setDateToday(date);
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    setTimeNow(
      hours + ':' + min + ':' + sec
    );
  }, []);

  const [listOfEvents, setListOfEvents] = useState([]);

  const [index, setIndex] = useState(0);
  const values = ['Future Events', 'Going', 'Past Events'];

  function sortList(eventA, eventB) {
    if(eventA.date > eventB.date) {
      return 1;
    }
    if(eventA.date === eventB.date) {
      return eventA.time >= eventB.time ? 1 : -1;
    }
    return -1;
  }

  const showFutureEvents = () => {
    setListOfEvents(allEventsList.filter(event => {
      if(event.date > dateToday) {
        return true;
      }
      if(event.date === dateToday) {
        return event.time >= timeNow;
      }
      return false;
    }).sort((a, b) => sortList(a, b)));
  };

  const showGoingEvents = () => {
    setListOfEvents(allEventsList.filter(event => {
      const attending = (event.attendees.filter(at => at.username === currentUser.username)).length > 0;

      if(event.date > dateToday) {
        return attending;
      }
      if(event.date === dateToday) {
        return (event.time >= timeNow) && attending;
      }
      return false;
    }).sort((a, b) => sortList(a, b)));
  };

  const showPastEvents = () => {
    setListOfEvents(allEventsList.filter(event => {
      if(event.date < dateToday) {
        return true;
      }
      if(event.date === dateToday) {
        return event.time < timeNow;
      }
      return false;
    }).sort((a, b) => sortList(a, b)));
  };

  useEffect(() => {
    if(index === 0) {
      // future events only
      showFutureEvents();
    } else if(index === 1) {
      // going events only
      showGoingEvents();
    } else {
      // past events only
      showPastEvents();
    }
  }, [allEventsList, index]);

  return (
    <View style={useStyles.container}>
      <View style={{minWidth:'85%', paddingBottom:'2%'}}>
        <SegmentedControlTab
            values={values}
            selectedIndex={index}
            onTabPress={(index) => setIndex(index)}
            activeTabStyle={{ backgroundColor: light, borderColor: light }}
            tabStyle={{ borderColor: light }}
            tabTextStyle={{ color: light }}
          />
      </View>
      <EventList list={listOfEvents} updateTheList={updateTheList} loading={loading}/>
    </View>
  );
}

  export { FeedScreen };