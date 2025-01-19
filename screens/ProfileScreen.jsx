import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import s from "../globalStyles";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = axios.get("firebaseURL");
      setUserData(response.data);
      console.log("ha");
    } catch {
      console.log("error fetching");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>Leon</Text>
        <Text style={styles.picture}>Picture</Text>
      </View>
      <Text style={styles.score}>Youre score is: [score]</Text>
      <Text style={styles.matches}>matches</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "inter",
    padding: 50,
    paddingTop: 100,
  },
  nameContainer: {
    flex: 0,
    flexDirection: "row",
    // backgroundColor: "blue",
    margin: 0,
    paddingBottom: 50,
  },
  name: {
    fontSize: 40,
  },
});

export default ProfileScreen;
