import React from 'react';
import { encode } from 'base-64'
import * as SecureStore from 'expo-secure-store';


const username = "bobsmith";
const password = "outgoin123";


async function hardcodeUser () {
  user = {
    "username": "bobsmith",
    "firstname": "Bob",
    "lastname": "Smith",
    "id": 1,
    "password": "outgoin123"
  }
  await saveUser(user);
}

async function saveUser (user) {
  await SecureStore.setItemAsync('user', JSON.stringify(user));
}

async function logoutUser () {
  await SecureStore.deleteItemAsync('user')
}

async function getUser () {
  let result = await SecureStore.getItemAsync('user');
  result = JSON.parse(result);
  return result
}

async function getCredentials () {
  let user = await getUser();
  return {username: user['username'], password: user['password']};
}

async function fetchEventFeed () {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/eventfeed/", {
    "method": "GET",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const events = await response.json();
  return events;
}

async function fetchFriendList () {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/friends/", {
    "method": "GET",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const friends = await response.json();
  return friends;
}

async function fetchUserEventList (userId) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/users/" + userId + "/events/", {
    "method": "GET",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const events = await response.json();
  return events;
}

async function fetchUserDetails (userId) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/users/" + userId + "/", {
    "method": "GET",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const user = await response.json();
  return user;
}

async function attendEvent (eventId) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/events/" + eventId + "/attend/", {
    "method": "POST",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const event = await response.json();
  return event;
}

async function unattendEvent (eventId) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/events/" + eventId + "/unattend/", {
    "method": "POST",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const event = await response.json();
  return event;
}

async function searchUsers (query) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/search-users/?query=" + query + "/", {
    "method": "GET",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const users = await response.json();
  return users;
}

async function addFriend (id) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/users/" + id + "/friend/", {
    "method": "POST",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const friends = await response.json();
  return friends;
}

async function removeFriend (id) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/users/" + id + "/unfriend/", {
    "method": "POST",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  const friends = await response.json();
  return friends;
}

async function createEvent (event) {
  console.log(event);
  event['time'] = "04:00:00-0600";
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/events/", {
    "method": "POST",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(event)
  });
  const event_result = await response.json();
  console.log(event_result);
  return event_result;
}

async function authenticate (credentials) {
  const response = await fetch("https://outgoin.graysonpike.com/authenticate/", {
    "method": "GET",
    "headers": {
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    }
  });
  console.log(response.status)
  let user = await response.json();
  user['password'] = credentials['password'];
  await saveUser(user);
  console.log("Saved User: ");
  console.log(await getUser());
  if (response.status == 200) {
    return true;
  }
  return false;
}

async function register (user) {
  const response = await fetch("https://outgoin.graysonpike.com/register/", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify(user)
  });
  let userResult = await response.json();
  userResult['password'] = user[['password']]
  await saveUser(userResult);
  return userResult;
}

// Accepts {firstname: "x", lastname: "y"}
// Changing username is not supported
async function editProfile (profile) {
  const credentials = await getCredentials();
  const response = await fetch("https://outgoin.graysonpike.com/edit-profile/", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic " + encode(credentials.username + ':' + credentials.password),
    },
    "body": JSON.stringify(profile)
  });
  // console.log(response);
  let profileResult = await response.json();
  return profileResult;
}


export { fetchEventFeed, fetchFriendList, fetchUserEventList, fetchUserDetails, attendEvent, unattendEvent, getUser, saveUser, searchUsers, addFriend, removeFriend, createEvent, authenticate, logoutUser, register, editProfile};
