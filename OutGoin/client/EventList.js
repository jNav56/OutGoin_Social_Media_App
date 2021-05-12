import React from 'react';
import { Divider, ProgressBar } from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import { EventCard } from './EventCard';
import { useStyles } from './styles';


const EventList = (props) => {
    const list = props.list; 
    const loading = props.loading;
    const updateTheList = props.updateTheList;
  return (
    <ScrollView contentContainerStyle={useStyles.listStyle}>
        <Divider style={{ height:'1%', backgroundColor:'#ffffff1f' }} />
        {loading 
        ? 
            <ProgressBar/>
        : 
        <>
            {list.length > 0 ?
                <>
                {list.map(event => {
                    return (
                    <View key={list.indexOf(event)}>
                        <EventCard event={event} updateTheList={updateTheList}/>
                        <Divider style={{ height:'1%', backgroundColor:'#ffffff1f' }} />
                    </View>
                )})}
                </>
                :
                <>
                    <Divider style={{ height:'2%', backgroundColor:'#ffffff1f' }} />
                    <Text style={useStyles.titleText}>No Events</Text>
                    <Divider style={{ height:'2%', backgroundColor:'#ffffff1f' }} />
                    <Text style={useStyles.headerText}>Check Back Later</Text>
                </>
            }
        </>
        }
    </ScrollView>
)};

export {EventList};
