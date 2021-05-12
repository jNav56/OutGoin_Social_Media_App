import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      console.log("This will run for 5 seconds");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logos/logo1.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00296b",
  },
});

export default SplashScreen;
