import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "react-native";
import spotify from "../assets/spotify-logow.png";
import wave2 from "../assets/layered-waves-haikei (2).png"; // Import the SVG file as a component

const LoginScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const clientId = "0c3635b2193e492ba217883f9aa361f0";
  const clientSecret = "abb18a45ed354acea5cc897fa8ddb504";

  // This will create the correct redirect URI for Expo Go
  const redirectUri = makeRedirectUri({
    scheme: "exp",
    path: "callback",
  });

  //console.log('Redirect URI:', redirectUri); // Log to see the exact uri to register to spotify portal

  _storeData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      // Error saving data
      console.error("Error saving data", error);
    }
  };

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.log(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const fetchAccessToken = async (code) => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "exp://128.189.26.228:8081/--/callback",
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
          },
        }
      );

      let data = response.data;
      console.log(data);
      fetchUserData(data.access_token);
    } catch (err) {
      console.error("Error requesting token:", err);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.data;
      let tempUser = {
        accessToken: token,
        display_name: data.display_name,
        id: data.id,
        pic: data.images[0].url, //0 300x300, 1 64x64
      };
      setUser(tempUser);
      //setDisplayName(tempUser.display_name)
      //alert('Logged in: ', data.display_name)
      //console.log(tempUser)
      _storeData("user", tempUser);
      _retrieveData("user");
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.log(user);
    }
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: [
        "user-read-email",
        "user-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-library-read",
      ],
      usePKCE: false,
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      //console.log(response.params);
      //console.log(response)

      const newToken = response.params.code;
      console.log("Auth code:", newToken);

      //console.log('Auth code:', newToken);
      // setToken("test")
      //setToken(newToken);
      //console.log('Token:', token)
      fetchAccessToken(newToken);

      navigation.navigate("MakePlaylist");
      // Here you would typically send this code to your backend
      // to exchange it for an access token
    }
  }, [response]);

  return (
    // <View style={styles.container}>
    //   <Button
    //     disabled={!request}
    //     title="Login with Spotify"
    //     onPress={() => {
    //       promptAsync();
    //     }}
    //   />
    //   <Text>{displayName}</Text>
    // </View>

    <View
      style={{
        backgroundColor: "#212121",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Moodify</Text>
      </View>
      <View style={{ flex: 0, flexDirection: "row" }}>
        <Text style={styles.text} onPress={() => promptAsync()}>
          Log into Spotify
        </Text>
        <Image source={spotify} style={[styles.image]} />
      </View>
      <Image source={wave2} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 0,
    paddingRight: 5,
  },
  image: {
    height: 20,
    width: 20,
  },
  title: {
    color: "white",
    fontSize: 70,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 160,
  },
  wave: {
    position: "absolute",
    top: 0,
  },
});

export default LoginScreen;
