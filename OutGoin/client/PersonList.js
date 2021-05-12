import React, { useEffect, useState } from 'react';
import { Divider } from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import { PersonCard } from './PersonCard';
import { useStyles } from './styles';
import { searchUsers, getUser } from './Services';
import { dummyUser } from './data';


const PersonList = (props) => {
    const query = props.query;
    const navigation = props.navigation;
    const [list, setList] = useState([]);
    const [updatedListOfPeople, setUpdatedListOfPeople] = useState(false);

    const [currentUser, setCurrentUser] = useState(dummyUser);


    const updatePeopleList = () => {
        setUpdatedListOfPeople(c => !c);
    }

    useEffect(() => {
        getUser().then(user => setCurrentUser(user));
    }, []);

    useEffect(() => {
        if(query.length === 0) {
            setList([]);
        }
        else {
            searchUsers(query).then(resp => {
                //showing all but current logged in user
                setList(resp.filter(user => user.username !== currentUser.username));
            });
        };
    }, [query, updatedListOfPeople, currentUser]);
    
  return (
    <ScrollView contentContainerStyle={useStyles.listStyle}>
        <Divider style={{ height:'2%', backgroundColor:'#ffffff1f' }} />
        {list.length > 0 ?
            <>
            {list.map(person => {
                return (
                <View key={list.indexOf(person)}>
                    <PersonCard person={person} navigation={navigation} updatePeopleList={updatePeopleList}/>
                    <Divider style={{ height:'1%', backgroundColor:'#ffffff1f' }} />
                </View>
            )})}
            </>
            :
            <>
                <Divider style={{ height:'30%', backgroundColor:'#ffffff1f' }} />
                <Text style={useStyles.titleText}>Find Your Friend Here</Text>
                <Divider style={{ height:'2%', backgroundColor:'#ffffff1f' }} />
                <Text style={useStyles.headerText}>Look Up Username / Name</Text>
            </>
        }
    </ScrollView>
)};

export {PersonList};
