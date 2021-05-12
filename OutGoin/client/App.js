import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainAppScreen } from './MainAppScreen';
import { ProfileScreen } from './ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProfile } from './UserProfile';
import { light } from './styles';
import { Login } from './Login';
import { Register } from './Register';
import { EditProfile } from './EditProfile';

const Stack = createStackNavigator();


export default function App() {
  
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{ headerTintColor:light, headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerTintColor:light, headerShown: false}}
          />
          <Stack.Screen
            name="TabView"
            component={MainAppScreen}
            options={{ title: 'OutGoin\'', headerTintColor:light}}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ headerTintColor:light}}
          />
          <Stack.Screen 
            name="User Profile" 
            component={UserProfile}
            options={{ headerTintColor:light}}
          />
          <Stack.Screen 
            name="Edit Profile" 
            component={EditProfile}
            options={{ headerTintColor:light}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

