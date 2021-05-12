import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { light, dark } from './styles';
import { FeedScreen } from './FeedScreen';
import { ProfileScreen } from './ProfileScreen';
import { AddEventScreen } from './AddEventScreen';
import { SearchScreen } from './SearchScreen';
import { SettingsScreen } from './SettingsScreen';

const Tab = createMaterialBottomTabNavigator();

const NavTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      backgroundColor="white"
      activeColor="white"
      inactiveColor='#ecb880' // {darkBlue}
      barStyle={{ backgroundColor: light }}
    >
      <Tab.Screen 
          name="Feed" 
          component={FeedScreen} 
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Add Event" 
        component={AddEventScreen} 
        options={{
          tabBarLabel: 'Add Event',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="table-large-plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { NavTabs };