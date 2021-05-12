import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { Text, View } from 'react-native';
import { useStyles } from './styles';
import { light } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { attendEvent, unattendEvent, getUser } from './Services';
import { dummyUser } from './data';


const EventCard = (props) => {
  const [currentUser, setCurrentUser] = useState(dummyUser);

  const updateTheList = props.updateTheList;
  const {
    id,
    name,
    location,
    description,
    time, //optional
    date, //optional
    owner,
    //other:
    attendees,
    // eventInvitedGuests
  } = props.event;

  const {
    firstname,
    lastname,
    username,
  } = owner;

  const image = owner.image ? owner.image : undefined;

  const fullName = firstname + " " + lastname;
  const initials = firstname.substring(0,1).toUpperCase() + lastname.substring(0,1).toUpperCase();

  const [attendingEvent, setAttendingEvent] = useState(attendees.filter(at => at.username === currentUser.username).length > 0);

  useEffect(() => {
    getUser().then(user => setCurrentUser(user));
  }, []);  

  useEffect(() => {
    setAttendingEvent(attendees.filter(at => at.username === currentUser.username).length > 0);
  }, [attendees, currentUser]);

  async function joinEvent() {
    if(attendingEvent) {
      await unattendEvent(id).then(setAttendingEvent(attendees.filter(at => at.username === currentUser.username).length > 0));
    } else {
      await attendEvent(id).then(setAttendingEvent(attendees.filter(at => at.username === currentUser.username).length > 0));
    }
    updateTheList();
  };

  function changeDateFormat(inputDate){  
    // expects yyyy-mm-dd
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return undefined;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 

    return month + '/' + day + '/' + year;
  }

  function changeTimeFormat(inputTime) {
    //expects hh:mm:ss
    var splitDate = inputTime.split(':');
    if(splitDate.count == 0){
        return undefined;
    }

    var hour = parseInt(splitDate[0]);
    var minutes = parseInt(splitDate[1]);
    var ampm = hour >= 12 ? 'pm' : 'am';
    var h = hour % 12;
    h = h ? h : 12;
    var m = minutes < 10 ? '0'+minutes : minutes;
    var strTime = h + ':' + m + ' ' + ampm;
    return strTime
  }

  return (
  <Card style={useStyles.cardStyle} >
    <Card.Title title={fullName} left={() => {
        return (image === undefined ? 
          <Avatar.Text size={40} label={initials} backgroundColor={light}/>
          :
          <Avatar.Image size={24} source={image} />
        )}} 
    />
    <Card.Content>
      <Title>{name}</Title>
      <View style={{ flexDirection:'row', paddingTop:'2%' }}>
          <MaterialCommunityIcons name="calendar" color={light} size={26} style={{ paddingRight:'2%' }}/>
          <Paragraph>
            {changeDateFormat(date) || "Date TBD"} at {changeTimeFormat(time) || "Time TBD"}
          </Paragraph>
      </View>
      <View style={{ flexDirection:'row' }}>
        <MaterialCommunityIcons name="map-marker" color={light} size={26} style={{ paddingRight:'2%' }}/>
        <Paragraph>
          {location}
        </Paragraph>
      </View>
      <View style={{ flexDirection:'row' }}>
        <MaterialCommunityIcons name="card-text" color={light} size={26} style={{ paddingRight:'2%' }} />
        <Paragraph style={{ marginRight:'4%' }}>
          {description}
        </Paragraph>
      </View>
    </Card.Content>
    <Card.Actions>
      <Button mode="text" onPress={() => joinEvent()}>
        <Text style={{ color:light }}>
          {!attendingEvent ?  "Join" : "Attending"}
        </Text>
      </Button>
    </Card.Actions>
  </Card>
)};

export {EventCard};