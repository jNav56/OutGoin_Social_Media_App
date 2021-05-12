import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Card, Divider, IconButton, Button } from 'react-native-paper';
import { useStyles } from './styles';
import { light } from './styles';
import { EventList } from './EventList';
import SegmentedControlTab from "react-native-segmented-control-tab";
import {fetchUserEventList, getUser} from './Services'


const ProfileScreen = (props) => {
  const navigation = props.navigation;
  const [user, setUser] = useState({});
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [initials, setInitials] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [updateInfo, setUpdateInfo] = useState(false); 
  const userUpdated = () => {
    setUpdateInfo(c => !c)
  }

  async function fetchData () {
    await getUser().then((user) => {
      user => setUser(user);
      setFirstname(user["firstname"]);
      setLastname(user["lastname"]);
      setUsername(user["username"]);
      setInitials(user["firstname"].substring(0,1).toUpperCase() + user["lastname"].substring(0,1).toUpperCase());
      setFriendsCount(user.friendsCount);
      setEventsCount(user.eventsCount);
      console.log(user)
      console.log("Fetching event list of user id " + user.id);
      setLoading(true);
    
      fetchUserEventList(user.id)
        .then(list => {
          setAllEventsList(list);
          setLoading(false);
        }).catch(() => {
          setLoading(false);
      });
    }); 
  }

  useEffect(() => {
    fetchData();
  }, [updateInfo]);

    const [allEventsList, setAllEventsList] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [listUpdated, setListUpdated] = useState(false);

    const [dateToday, setDateToday] = useState('');
    const [timeNow, setTimeNow] = useState('');
    const image = undefined;  //TODO: add actual images
    const updateTheList = () => {
      setListUpdated(c => !c);
    }

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



    const redirectToEditProfile = () => {
      navigation.navigate('Edit Profile', {userUpdated : () => userUpdated()});
      // navigation.navigate('Edit Profile');
  } 

    return (
      <View style={useStyles.container}>
        <Card style={useStyles.profileCard} >
        <Card.Title title={firstname + " " + lastname} subtitle={'@' + username} left={() => {
            return (image === undefined ? 
              <Avatar.Text size={40} label={initials} backgroundColor={light}/>
              :
              <Avatar.Image size={24} source={image} />
            )}} 
            right={() => {
              return <IconButton icon="bell" onPress={() => console.log('settings Pressed')} style={{marginBottom:'40%'}}></IconButton>}}
        />
        <Button mode="outlined" color={light} onPress={() => redirectToEditProfile()} style={{marginHorizontal:'20%', marginBottom:'4%', justifyContent: 'flex-end'}} >Edit Profile</Button>
        <Divider />
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{paddingTop: '4%'}}>{friendsCount + ' Friends'}</Text>
          </View>
          <Divider style={{ width: 1, height: '100%', color: "gray"}} />
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{paddingTop: '4%'}}>{eventsCount + ' Events Planned'}</Text>
          </View>
        </View>
      </Card>
         <View style={{minWidth:'85%', paddingBottom:'2%', paddingTop:'2%'}}>
           <SegmentedControlTab
              values={values}
              selectedIndex={index}
              onTabPress={(index) => setIndex(index)}
              activeTabStyle={{ backgroundColor: light, borderColor: light }}
              tabStyle={{ borderColor: light }}
              tabTextStyle={{ color: light }}
            />
        </View>
      <EventList  list={listOfEvents} updateTheList={updateTheList} loading={loading}/>
    </View>
    );
  }

  export { ProfileScreen };