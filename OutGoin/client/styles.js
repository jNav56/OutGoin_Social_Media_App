import { StyleSheet } from 'react-native';

export const dark = '#ab6b44'; // '#00296B';
export const medium = '#fff3e6'; // '#003f88';
export const light = '#cc6425'; // '#00509D';

export const useStyles = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonStyle: {
            backgroundColor: light,
            color: 'white',
        },
        appViewContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: 60,
            marginLeft: 10,
        },
        container: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 10,
            marginLeft: 5,
            flex: 1
        },
        titleText: {
            color: dark,
            fontFamily: 'Cochin',
            fontSize: 30,
            fontWeight: 'bold',
        },
        headerText: {
            color: 'black',
            fontFamily: 'Cochin',
            fontSize: 20,
            fontWeight: 'normal'
        },
        bodyText: {
            color: 'black'
        },
        detailText: {
            color: 'black'
        },
        searchBar: {
            color: dark,
        },
        toggleStyle: {
            width:'30%',
            borderColor: dark
        },
        toggleGroupStyle: {
            minWidth:'150px'
        },
        cardStyle: {
            minWidth:'85%',
            maxWidth:'85%',
            borderColor: light,
        },
        listStyle: {
            alignItems:'center', 
            alignContent:'center', 
            minWidth:'98%',
            paddingBottom:'10%' 
        },
        profileCard: {
            minWidth:'100%',
            height: '23%', 
            borderColor: light,
        },
});
