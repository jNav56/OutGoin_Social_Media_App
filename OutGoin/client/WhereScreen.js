import React, { Component, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { IconButton, Button, TextInput } from "react-native-paper";
import { useStyles } from "./styles";
import MapView, { Marker } from "react-native-maps";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    // height: "55%", // just take this off so height changes on its own
    width: Dimensions.get("window").width,
    paddingLeft: 25,
    zIndex: 2,
  },
  map: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    width: 310,
    height: 200,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#00296b",
    marginTop: 60,
    zIndex: 1,
  },
  text_input: {
    width: 300,
    height: 45,
    margin: 10,
    borderWidth: 1,
  },
  keyboardContainer: {
    flex: 1,
    zIndex: 1,
    // backgroundColor: "black",
    // borderWidth: 3,
  },
});

class WhereScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 29.76598,
        longitude: -95.36688,
        latitudeDelta: 0.05,
        longitudeDelta: 0.1,
      },
      how_text_ph: "How are we getting there? ex. Uber, carpool, walking, etc.",
      how_text: "",
      notes_ph: "Notes -Meet at back door, Meet at booth, Meet outside",
      notes: "",
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onHowTextChange = this.onHowTextChange.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onHowTextChange(text) {
    this.setState({ how_text: text });
  }

  onNotesChange(text) {
    this.setState({ notes: text });
  }

  render() {
    return (
      <View style={useStyles.container}>
        <View style={styles.searchBar}>
          <GooglePlacesAutocomplete
            placeholder="Type your location here"
            minLength={2}
            autoFocus={false}
            returnKeyType={"search"}
            listViewDisplayed="auto"
            fetchDetails={true}
            query={{
              key: "AIzaSyDgtC_bQuAvb8LR9fngXU0UTJbpGDikY_Y",
              language: "en",
            }}
            styles={{
              textInputContainer: {
                width: "90%",
              },
              description: {
                fontWeight: "bold",
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            onPress={(data, details = null) => {
              console.log("Latitude:", details.geometry.location.lat);
              console.log("Longtitude:", details.geometry.location.lng);
              this.onRegionChange({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.1,
              });
            }}
          />
        </View>
        <MapView
          style={styles.map}
          region={this.state.region}
          // onRegionChange={this.onRegionChange}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
            title="wass up"
          />
        </MapView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={80}
          style={{ flex: 1, zIndex: 1 }}
        >
          <View style={{ backgroundColor: "#f2f2f2", height: 400 }}>
            <TextInput
              label={this.state.how_text_ph}
              value={this.state.how_text}
              onChangeText={(text) => this.onHowTextChange(text)}
              style={styles.text_input}
            />
            <TextInput
              label={this.state.notes_ph}
              value={this.state.notes}
              onChangeText={(text) => this.onNotesChange(text)}
              style={styles.text_input}
            />
          </View>
          <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export { WhereScreen };
