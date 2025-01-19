import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Button } from "react-native";

const MoodScreen = ({navigation}) => {
  const emoji = ["😭", "😠", "😐", "🙂", "😃"];
  const [selectedMood, setSelectedMood] = useState("");

  const onPress = (value) => {
    console.log(value);
    setSelectedMood(value);
  };

  const renderEmojis = () => {};

  useEffect(() => {
    renderEmojis();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.instructions}>
        <Button title="Select your mood." />
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
        <Button
          title="Next"
          onPress={() => {
            if (selectedMood.length != 0) {
              navigation.navigate("Time");
            } else {
              Alert.alert("Please select a mood.");
            }
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

  instructions: {
    flex: 4,
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

export default MoodScreen;
