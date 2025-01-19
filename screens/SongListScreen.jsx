import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import testSongs from "../SongListTest";
import micImage from "../assets/mic.png";

const SongListScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Song List!</Text>
      </View>
      <Image src={micImage} />
      {testSongs.items.map((song, index) => {
        return (
          <View key={index} style={styles.song}>
            <Text>{song.artists[0].name}</Text>
            <Text>{song.name}</Text>
            <Text>{song.preview_url}</Text>
            <Text>{song.duration_ms}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 70,
  },
  song: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 50,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SongListScreen;
