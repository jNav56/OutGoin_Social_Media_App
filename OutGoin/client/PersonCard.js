import React from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import { Text } from 'react-native';
import { useStyles } from './styles';
import { light } from './styles';

const PersonCard = (props) => {
  const navigation = props.navigation;
  const {
    firstname,
    lastname,
    username,
    id,
    friend
  } = props.person;
  const updatePeopleList = props.updatePeopleList;

  const UserName = '@' + username;
  const image = props.person.image ? props.person.image : undefined;
  const fullName = firstname + " " + lastname;
  const initials = firstname.substring(0,1).toUpperCase() + lastname.substring(0,1).toUpperCase();

  const person = {
    firstname,
    lastname,
    username,
    image: undefined,
    fullName,
    initials,
    id,
    friend
  };

  const redirectToProfile = () => {
      navigation.navigate('User Profile', { person: person, onFriendReqChange: () => updatePeopleList() })
  }

  return (
  <Card style={useStyles.cardStyle} >
    <Card.Title title={fullName} subtitle={UserName} left={() => {
        return (image === undefined ? 
          <Avatar.Text size={40} label={initials} backgroundColor={light}/>
          :
          <Avatar.Image size={24} source={image} />
        )}} 
    />
    <Card.Actions>
      <Button mode="text" onPress={() => redirectToProfile()}>
        <Text style={{ color:light }}>See Profile</Text>
      </Button>
    </Card.Actions>
  </Card>
)};

export {PersonCard};