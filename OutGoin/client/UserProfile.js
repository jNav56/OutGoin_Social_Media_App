import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Card, Divider, Button } from 'react-native-paper';
import { light } from './styles';
import { EventList } from './EventList';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { fetchUserEventList, getUser, addFriend, removeFriend } from './Services';
import { useStyles } from './styles';

const UserProfile = ({ navigation, route }) => {
  const person = route.params.person;
  const onFriendReqChange = route.params.onFriendReqChange;
  const {
    username,
    id,
    image: undefined,
    fullName,
    initials,
    friend
  } = person;

  //TODO replace hardcoded values
  const friendCount = 5;
  const eventsCount = 3;

  const [allEventsList, setAllEventsList] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [listUpdated, setListUpdated] = useState(false);

  const [dateToday, setDateToday] = useState('');
  const [timeNow, setTimeNow] = useState('');
  const image = undefined;  //TODO: add actual images

  // TODO this is a quick fix cause it won't update through navigation
  const [friendStatus, setFriendStatus] = useState(friend);

  const updateTheList = () => {
    setListUpdated(c => !c);
  }

  useEffect(() => {
    setLoading(true);
    fetchUserEventList(id)
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
  const values = ['Upcoming', 'Past'];

  const showFutureEvents = () => {
    setListOfEvents(allEventsList.filter(event => {
      if(event.date > dateToday) {
        return true;
      }
      if(event.date === dateToday) {
        return event.time >= timeNow;
      }
      return false;
    }));
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
    }));
  };

  useEffect(() => {
    if (index === 0) {
      // future events only
      showFutureEvents();
    } else {
      // past events only
      showPastEvents();
    }
  }, [index, allEventsList]);

  async function addUnaddFriend() {
    if(friendStatus) {
      // remove as friend
      removeFriend(id).then(setFriendStatus(false));
      onFriendReqChange();
    } else {
      // add user as friend
      addFriend(id).then(setFriendStatus(true));
      onFriendReqChange();
    };
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'flex-start', marginTop: 10, flex: 1}}>
      <Card style={{minWidth:'100%', height: '14%'}} >
        <Card.Title title={fullName} subtitle={'@' + username} left={() => {
            return (image === undefined ? 
              <Avatar.Text size={40} label={initials} backgroundColor={light}/>
              :
              <Avatar.Image size={24} source={image} />
            )}} 
            right={() => {
              return <Button mode="outlined" color={light} onPress={() => addUnaddFriend()} style={{justifyContent: 'flex-end', marginRight:'5%'}}>
                {friendStatus ? "Remove Friend" : "Add Friend"}
                </Button>}}
          />
        <Divider />
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{paddingTop: '4%'}}>{friendCount + ' Friends'}</Text>
          </View>
          <Divider style={{ width: 1, height: '100%', color: "gray"}} />
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{paddingTop: '4%'}}>{eventsCount + ' Events Planned'}</Text>
          </View>
        </View>
      </Card>
      <View style={{minWidth:'85%', paddingBottom:'2%', paddingTop:'2%'}}>
         {friendStatus 
         ? 
         <>
          <SegmentedControlTab
              values={values}
              selectedIndex={index}
              onTabPress={(index) => setIndex(index)}
              activeTabStyle={{ backgroundColor: light, borderColor: light }}
              tabStyle={{ borderColor: light }}
              tabTextStyle={{ color: light }}
            />
            <EventList list={listOfEvents} updateTheList={updateTheList} loading={loading}/>
          </>
         : 
         <View style={{ alignItems:'center', alignContent:'center'}}>
            <Divider style={{ height:'20%', backgroundColor:'#ffffff1f' }} />
            <Text style={useStyles.titleText}>Cannot View Events</Text>
            <Divider style={{ height:'2%', backgroundColor:'#ffffff1f' }} />
            <Text style={useStyles.headerText}>You have to be friends to view their events</Text>
          </View>
         }
      </View>
  </View>
  );
}

  export { UserProfile };