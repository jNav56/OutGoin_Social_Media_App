import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { IconButton, Button, TextInput } from "react-native-paper";
import { useStyles } from "./styles";
import { light } from "./styles";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { WhereScreen } from "./WhereScreen";
import SegmentedControlTab from "react-native-segmented-control-tab";

const formStyles = StyleSheet.create({
  form: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    height: 350, //"50%",
    width: 300, //"85%",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#00296b",
  },
  title: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  text_input: {
    width: 250,
    height: 50,
    margin: 10,
    borderWidth: 1,
  },
  text_date_time: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00296b",
  },
  text_date_only: {
    left: 5,
    width: 135,
    marginTop: 20,
    fontSize: 20,
  },
  date_time: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: 250,
  },
});

const EventInitialDetails = () => {
  const [plan_name, setPlan_name] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [date, setDate] = React.useState(undefined); // This becomes a Date object
  const [open, setOpen] = React.useState(false);

  const [time, setTime] = React.useState(undefined);
  const [visible, setVisible] = React.useState(false);

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

  function MakeButton(props) {
    return (
      <IconButton
        icon={props.icon}
        color="#00296b"
        size={35}
        onPress={props.press}
      />
    );
  }

  return (
    <View style={formStyles.form}>
      <Text style={[useStyles.titleText, formStyles.title]}>Plan Details</Text>
      <View>
        <TextInput
          label="Event Name"
          value={plan_name}
          onChangeText={(plan_name) => setPlan_name(plan_name)}
          style={formStyles.text_input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={(description) => setDescription(description)}
          style={formStyles.text_input}
        />
      </View>
      <View style={formStyles.date_time}>
        <Text style={formStyles.text_date_time}>Date:</Text>
        <Text style={formStyles.text_date_only}>
          {typeof date !== "undefined" ? (
            date.getMonth() +
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
        <Text style={formStyles.text_date_time}>Time:</Text>
        <Text style={formStyles.text_date_only}>
          {typeof time !== "undefined" ? (
            (time.hours > 12 ? time.hours - 12 : time.hours) +
            " : " +
            time.minutes +
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
          locale={"en"} // optional, default is automically detected by your system
        />
      </View>
    </View>
  );
};

export { EventInitialDetails };
