import React from 'react';
import { Text, View } from 'react-native';
import { Login } from './Login';
import { useStyles } from './styles';
import { NavTabs } from './Navigation';



function MainAppScreen() {
  
  return (
      <>
        <View style={useStyles.appViewContainer}>
          {/* <Text style={useStyles.titleText}>OutGoin'</Text> */}
          {/* <Login loginText={"login"} /> */}
        </View>
        <NavTabs/>
      </>
  );
}

export { MainAppScreen };

