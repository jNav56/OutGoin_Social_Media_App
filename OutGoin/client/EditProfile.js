import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Avatar, Card, Divider, IconButton, Button, TextInput } from 'react-native-paper';
import { useStyles, light } from './styles';
import { EventList } from './EventList';
import SegmentedControlTab from "react-native-segmented-control-tab";
import {getUser, editProfile} from './Services'

const styles = StyleSheet.create({
    form: {
        display: "flex",
        margin: 35,
      },
    field: {
        height: 45,
        marginBottom: 10,
    }
  });


const EditProfile = ({ navigation, route }) => {
// const EditProfile = () => {
    const [user, setUser] = React.useState({});
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const userUpdated = route.params.userUpdated;

    async function saveUserAsync(firstname, lastname) {
        console.log('firstname from save func', firstname);
        const newUser  = {'firstname' : firstname, 'lastname' : lastname};
        await editProfile(newUser).then(setUser(newUser));
        userUpdated();
      }

    useEffect(() => {
        getUser()
            .then(user => {
                setUser(user);
                setFirstname(user['firstname']);
                setLastname(user['lastname']);
            })
      },[]);

    return (
            <View style={styles.form}>
                <TextInput
                    label="Firstname"
                    value={firstname}
                    onChangeText={(firstname) => setFirstname(firstname)}
                    style={[useStyles.text_input, styles.field]}
                /> 
                <TextInput
                    label="Lastname"
                    value={lastname}
                    onChangeText={(lastname) => setLastname(lastname)}
                    style={[useStyles.text_input, styles.field]}
                /> 
                <Button mode="outlined" 
                    color={light}
                    onPress={() => saveUserAsync(firstname, lastname)}>
                    Save
                </Button>
            </View> 
    );
  }

  export { EditProfile };

