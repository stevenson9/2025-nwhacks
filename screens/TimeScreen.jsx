import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { set } from "firebase/database";

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
    <View style={styles.container}>
      <View style={styles.timeInstructions}>
        <Text style={styles.title}>Time</Text>
        <Text style={styles.description}>The current time is</Text>
        <View style={styles.time}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            onChange={onChange}
          />
        </View>
      </View>

      <View style={styles.weatherInstructions}>
        <Text style={styles.title}>Weather</Text>
        <Text style={styles.description}>The current weather is</Text>
        <View style={styles.time}>
          <Text>
            {longitude}
            {latitude}
          </Text>
        </View>
      </View>
      <View style={styles.next}>
        <Button
          title="Next"
          onPress={() => {
            navigation.navigate("SongList");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#F8F0FB",
  },

  title: {
    fontSize: 40,
    color: "#211A1D",
    fontWeight: "bold",
  },

  description: {
    marginTop: 10,
    fontSize: 20,
    color: "#211A1D",
  },

  timeInstructions: {
    flex: 3,
    marginTop: 75,
    marginLeft: 50,
  },

  weatherInstructions: {
    flex: 4,
    marginTop: 25,
    marginLeft: 50,
  },

  time: {
    width: 300, // Adjust width as per your needs
    height: 50, // Adjust height as per your needs
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },

  next: {
    flex: 1,
    alignItems: "center",
  },

  button: {
    color: "black",
    fontSize: 40,
  },

  selected: {
    fontSize: 40,
    borderWidth: 4,
    borderColor: "#211A1D",
    borderRadius: 50,
  },
});

export default TimeScreen;
