import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { useStyles, light } from './styles';
import { searchUsers, logoutUser } from './Services';

const SettingsStyles = StyleSheet.create({
  title: {
    paddingBottom: 40,
    paddingTop: 40
  },
  settingRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20
  },
  rowText: {
    flex: 2,
    paddingLeft: 40
  },
  rowSwitch: {
    flex: 1,
  },
  submitButton: {
    paddingTop: 40
  }
});

async function testApi () {
  console.log("Testing API...");
  console.log(await searchUsers("bob"));
}



const SettingsScreen = (props) => {

  const navigation = props.navigation;

  async function logout () {
    console.log("Logging out...");
    await logoutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  const [friendRequest, setFriendRequest] = React.useState(false);
  const [joinedYourEvent, setJoinedYourEvent] = React.useState(false);
  const [friendCreatedEvent, setFriendCreatedEvent] = React.useState(false);
  const [eventChanged, setEventChanged] = React.useState(false);

  return (
    <View style={useStyles.container}>
      <Text style={[useStyles.titleText, SettingsStyles.title]}>Notification Settings</Text>
      <View style={SettingsStyles.settingRow}>
        <Text style={[useStyles.headerText, SettingsStyles.rowText]}>Friend Request</Text>
        <Switch
          value={friendRequest}
          onValueChange={() => { setFriendRequest(!friendRequest); console.log(friendRequest); }}
          style={SettingsStyles.rowSwitch}
          color={light}
        />
      </View>
      <View style={SettingsStyles.settingRow}>
        <Text style={[useStyles.headerText, SettingsStyles.rowText]}>Joined Your Event</Text>
        <Switch
          value={joinedYourEvent}
          onValueChange={() => { setJoinedYourEvent(!joinedYourEvent); }}
          style={SettingsStyles.rowSwitch}
          color={light}
        />
      </View>
      <View style={SettingsStyles.settingRow}>
        <Text style={[useStyles.headerText, SettingsStyles.rowText]}>Friend Created Event</Text>
        <Switch
          value={friendCreatedEvent}
          onValueChange={() => { setFriendCreatedEvent(!friendCreatedEvent); }}
          style={SettingsStyles.rowSwitch}
          color={light}
        />
      </View>
      <View style={SettingsStyles.settingRow}>
        <Text style={[useStyles.headerText, SettingsStyles.rowText]}>Event Changed</Text>
        <Switch
          value={eventChanged}
          onValueChange={() => { setEventChanged(!eventChanged); }}
          style={SettingsStyles.rowSwitch}
          color={light}
        />
      </View>
      <View style={SettingsStyles.submitButton}>
        <Button style={useStyles.buttonStyle} mode="contained" onPress={() => testApi() } >Save Changes</Button>
      </View>
      <View style={SettingsStyles.submitButton}>
        <Button style={useStyles.buttonStyle} mode="contained" onPress={() => logout() } >Log Out</Button>
      </View>
    </View>
  );
  }

  export { SettingsScreen };