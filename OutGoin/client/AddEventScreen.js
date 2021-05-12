import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  LogBox,
  Alert
} from "react-native";
import { IconButton, Button, TextInput } from "react-native-paper";
import { useStyles, dark, light } from "./styles";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { WhereScreen } from "./WhereScreen";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { EventInitialDetails } from "./EventInitialDetails";

import MapView, { Marker } from "react-native-maps";

import { createEvent } from "./Services";

function log_info(
  plan_name,
  description_text,
  date,
  time,
  location_name,
  address,
  location_how,
  location_notes
) {
  console.log("\n");
  console.log("Name        of event: ", plan_name);
  console.log("Description of event: ", description_text);
  console.log(
    date !== undefined
      ? ("Date        of event: ",
        date.getMonth() +
          1 +
          " / " +
          date.getDate() +
          " / " +
          date.getFullYear())
      : "Date is undefined"
  );
  console.log(
    date !== undefined
      ? ("Time        of event: ",
        (time.hours > 12 ? time.hours - 12 : time.hours) +
          " : " +
          time.minutes +
          " " +
          (time.hours > 12 ? "PM" : "AM"))
      : "Time is undefined"
  );
  console.log("Name     of location: ", location_name);
  console.log("Address  of location: ", address);
  console.log("How      of location: ", location_how);
  console.log("Notes    of location: ", location_notes);
  console.log();
}

const styles = StyleSheet.create({
  scrollView: {
  },
  insideScroll: {
    justifyContent: "center",
  },
  form: {
    borderWidth: 2,
    borderColor: dark,
    borderRadius: 20,
    margin: 25,
    padding: 10,
    width: "85%",
  },
  title: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  text_input: {
    // height: 45,
    margin: 10,
    borderWidth: 1,
  },
  date_time: {
    flex: 1,
    flexDirection: "row",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_date_time: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: dark,
  },
  text_date_only: {
    width: "55%",
    fontSize: 20,
    // borderWidth: 1,
  },
  searchBar: {
    width: "85%",
    zIndex: 2,
  },
  map: {
    width: "85%",
    height: 300,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: dark,
    marginTop: 15,
    zIndex: 1,
  },
  submit_button: {
    margin: 20,
    borderWidth: 2,
    borderColor: dark,
  },
});

const AddEventScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const values = ["Initial", "Where"];

  const [plan_name, setPlan_name] = React.useState("");
  const [description_text, setDescription_text] = React.useState("");

  const [date, setDate] = React.useState(undefined); // This becomes a Date object
  const [open, setOpen] = React.useState(false);

  const [time, setTime] = React.useState(undefined);
  const [visible, setVisible] = React.useState(false);

  const [enableshift, setEnableshift] = React.useState(false);

  const [region, setRegion] = React.useState({
    latitude: 29.76598,
    longitude: -95.36688,
    latitudeDelta: 0.05,
    longitudeDelta: 0.1,
  });

  const [location_name, setLocation_name] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [location_how, setLocation_how] = React.useState("");
  const [location_notes, setLocation_notes] = React.useState("");

  const onDismissDate = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmDate = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const onDismissTime = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirmTime = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setTime({ hours, minutes });
    },
    [setVisible, setTime]
  );

  LogBox.ignoreLogs([
    "VirtualizedLists should never be nested", // TODO: Remove when fixed
  ]);

  function MakeButton(props) {
    return (
      <IconButton
        icon={props.icon}
        color={dark}
        size={35}
        onPress={props.press}
      />
    );
  }

  const alertUser = () =>
  Alert.alert(
    "Event submitted!",
    "",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

  async function createEventFunc() {
    var tz = date.getTimezoneOffset() / 60 + 1;
    var time_js =
      (time.hours < 10 ? "0" + time.hours : time.hours) +
      ":" +
      (time.minutes < 10 ? "0" + time.minutes : time.minutes) +
      ":00-" +
      (tz < 10 ? "0" + tz + "00" : tz + "00");

    var date_js =
      date.getFullYear() +
      (date.getMonth() < 10
        ? "-0" + date.getMonth()
        : "-" + date.getMonth()) +
      (date.getDate() < 10
        ? "-0" + date.getDate()
        : "-" + date.getDate());

    await createEvent({
      name: plan_name,
      description: description_text,
      time: time_js,
      date: date_js,
      location: location_name,
    }).then(() => {
      alertUser();
      navigation.navigate('Feed');
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      enabled={enableshift}
      keyboardVerticalOffset={30}
      style={{ flex: 1, zIndex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[useStyles.listStyle, styles.scrollView]}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
      >
        {/* This is for the form holding info for the event name, description, date, and time */}
        <View style={styles.form}>
          <Text style={[useStyles.titleText, styles.title]}>Plan Details</Text>
          <TextInput
            label="Event Name"
            value={plan_name}
            onFocus={() => setEnableshift(false)}
            onChangeText={(plan_name) => setPlan_name(plan_name)}
            style={[styles.text_input, { height: 45 }]}
          />
          <TextInput
            label="Description"
            value={description_text}
            onFocus={() => setEnableshift(false)}
            onChangeText={(description_text) =>
              setDescription_text(description_text)
            }
            // mulitline={true}
            style={[styles.text_input, { height: 90 }]}
          />

          {/* This section is in regards to picking the date */}
          <View style={styles.date_time}>
            <Text style={styles.text_date_time}>Date:</Text>
            <Text style={styles.text_date_only}>
              {typeof date !== "undefined" ? (
                date.getMonth() +
                1 +
                " / " +
                date.getDate() +
                " / " +
                date.getFullYear()
              ) : (
                <Text style={{ textAlign: "center" }}>-</Text>
              )}
            </Text>
            <MakeButton icon={"calendar"} press={() => setOpen(true)} />
            <DatePickerModal
              mode="single"
              visible={open}
              onDismiss={onDismissDate}
              date={date}
              onConfirm={onConfirmDate}
            />
          </View>

          {/* This section is in regards to picking the time */}
          <View style={styles.date_time}>
            <Text style={styles.text_date_time}>Time:</Text>
            <Text style={styles.text_date_only}>
              {typeof time !== "undefined" ? (
                (time.hours > 12 ? time.hours - 12 : time.hours) +
                " : " +
                (time.minutes < 10 ? "0" + time.minutes : time.minutes) +
                " " +
                (time.hours > 12 ? "PM" : "AM")
              ) : (
                <Text style={{ textAlign: "center" }}>-</Text>
              )}
            </Text>
            <MakeButton icon={"clock"} press={() => setVisible(true)} />
            <TimePickerModal
              visible={visible}
              onDismiss={onDismissTime}
              onConfirm={onConfirmTime}
              hours={12}
              minutes={0}
              label="Select time"
              cancelLabel="Cancel"
              confirmLabel="Ok"
              animationType="none"
              locale={"en"} // default
            />
          </View>
        </View>

        <Text style={[useStyles.titleText, styles.title]}>Location</Text>

        {/* This section is in regard to the search bar for the location */}
        <View style={styles.searchBar}>
          <GooglePlacesAutocomplete
            placeholder="Type your location here"
            minLength={2}
            autoFocus={false}
            textInputProps={{
              onFocus: () => setEnableshift(false),
            }}
            returnKeyType={"search"}
            listViewDisplayed="auto"
            fetchDetails={true}
            query={{
              key: "AIzaSyDgtC_bQuAvb8LR9fngXU0UTJbpGDikY_Y",
              language: "en",
            }}
            styles={{
              textInputContainer: {
                width: "100%",
              },
              description: {
                fontWeight: "bold",
              },
              predefinedPlacesDescription: {
                color: dark,
              },
            }}
            onPress={(data, details = null) => {
              setLocation_name(details.name);
              setAddress(details.formatted_address);
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.1,
              });
            }}
          />
        </View>

        {/* Map that will reflect the change from the location search bar */}
        <MapView style={styles.map} region={region} showsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="wass up"
          />
        </MapView>

        {/* Other information regarding location */}
        <TextInput
          label="How are we getting there? ex. Uber, carpool, walking, etc."
          value={location_how}
          onFocus={() => setEnableshift(true)}
          onChangeText={(text) => setLocation_how(text)}
          style={{ width: 300, height: 45, margin: 10, borderWidth: 1 }}
        />
        <TextInput
          label="Notes - Meet at back door, Meet at booth, Meet outside"
          value={location_notes}
          onFocus={() => setEnableshift(true)}
          onChangeText={(text) => setLocation_notes(text)}
          // multiline={true}
          style={{ width: 300, height: 90, margin: 10, borderWidth: 1 }}
        />

        {/* Button to hit when all required info is put in by user */}
        <Button
          mode="outlined"
          color={light}
          onPress={async () => createEventFunc()}
          style={styles.submit_button}
        >
          Submit Event!
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { AddEventScreen };
