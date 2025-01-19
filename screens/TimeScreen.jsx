import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import Circles from "../components/Circles";

const TimeScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }

    getCurrentLocation();
  }, []);
  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log("Latitude: ", latitude);
    console.log("Longitude: ", longitude);
  }

  return (
    <View style={styles.background}>
      <Circles />
      <View style={styles.container}>
        <View style={styles.timeInstructions}>
          <Text style={styles.title}>Time</Text>
          <Text style={styles.description}>The current time is:</Text>
          <View style={styles.time}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={true}
              onChange={onChange}
              style={styles.dateTimePicker}
            />
          </View>
        </View>

        <View style={styles.weatherInstructions}>
          <Text style={styles.title}>Weather</Text>
          <Text style={styles.description}>The current weather is:</Text>
          <View style={styles.time}>
            <Text>
              {longitude}
              {latitude}
            </Text>
          </View>
        </View>
        <View style={styles.next}>
          <Text
            style={styles.button}
            onPress={() => {
              navigation.navigate("SongList");
            }}
          >
            Continue
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#121212",
    opacity: 0.95,
  },

  container: {
    flex: 1,
    position: "absolute",
    bottom: "20%",
    left: "10%",
    opacity: 0.95,
  },

  title: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
  },

  description: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
  },

  timeInstructions: {
    marginTop: 25,
  },

  weatherInstructions: {
    marginTop: 25,
  },

  time: {
    alignItems: "center",
    color: "white",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "grey", // Neutral background for contrast
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },

  next: {
    marginTop: 25,
    color: "white",
  },

  button: {
    color: "black",
    fontWeight: 6,
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "white",
    backgroundColor: "white",
    height: 30,
    width: 320,
  },
  dateTimePicker: {
    borderRadius: 8,
    fontSize: 48,
    position: "relative",
  },
});

export default TimeScreen;
