import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Button } from "react-native";
import Circles from "../components/Circles";

const MoodScreen = ({ navigation }) => {
  const emoji = ["😣", "😕", "😐", "🙂", "😃"];
  const [selectedMood, setSelectedMood] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onPress = (value) => {
    console.log(value);
    setSelectedMood(value);
  };

  const renderEmojis = () => {};

  useEffect(() => {
    renderEmojis();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.instructions}>
          <Text style={styles.title}>Select your mood.</Text>
          <View style={styles.select}>
            {emoji.map((value) => (
              <Text
                key={value}
                title={value}
                onPress={() => onPress(value)}
                style={selectedMood === value ? styles.selected : styles.button}
              >
                {value}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.next}>
          <Text
            onPress={() => {
              if (selectedMood.length != 0) {
                navigation.navigate("Time");
              } else {
                Alert.alert("Please select a mood.");
              }
            }}
            style={styles.continue}
          >
            Continue
          </Text>
        </View>
      </View>
      <Circles />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    opacity: 0.95,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#121212",
    marginTop: "60%",
    opacity: 0.95,
  },

  instructions: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 40,
    width: "90%",
    marginTop: 40,
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    border: "1px solid black",
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
    backgroundColor: "#6C7AF1",
    borderRadius: 30,
  },

  continue: {
    color: "black",
    fontWeight: 6,
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    borderWidth: 5,
    borderRadius: 20,
    height: 30,
    width: 250,
    position: "absolute",
    bottom: 0,
    borderColor: "white",
    backgroundColor: "white",
  },
});

export default MoodScreen;
