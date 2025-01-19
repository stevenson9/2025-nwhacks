import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Circles from "../components/Circles";

const MakePlaylistScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);
  
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text
          style={styles.title}
          onPress={() => {
            navigation.navigate("RecordVideo");
          }}
        >
          Create a playlist.
        </Text>
      </View>
      <Circles />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#121212",
    opacity: 0.95,
  },

  container: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    opacity: 0.95,
  },

  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MakePlaylistScreen;
