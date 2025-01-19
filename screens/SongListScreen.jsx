import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Image as ExpoImage } from "expo-image"; // Make sure you use ExpoImage for expo-image
import {
  Animated, // Import Animated library
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import testSongs from "../SongListTest";
import s from "../GlobalStyle";
import Icon from "react-native-vector-icons/MaterialIcons"; // Use Material Icons from react-native-vector-icons

const SongListScreen = ({ navigation }) => {
  const fetchUserLikedSongs = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      // no !== null
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        let data = response.data;
        //console.log("Total liked songs: " + data.total)

        let songs = [];

        for (let i = 0; i < data.items.length; i++) {
          let song = data.items[i].track;
          songs.push({
            id: song.id,
            img: song.album.images[1].url,
            name: song.name,
            url: song.external_urls.spotify,
          });
        }
        //console.log(songs) // log all pulled songs

        let next = data.next;
        let counter = 1;
        while (next !== null) {
          try {
            const response = await axios.get(next, {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            });

            let data = response.data;
            for (let i = 0; i < data.items.length; i++) {
              let song = data.items[i].track;
              songs.push({
                id: song.id,
                img: song.album.images[1].url,
                name: song.name,
                url: song.external_urls.spotify,
                uri: song.uri,
              });
            }
            console.log("Iteration", ++counter); // count iterations for testing
            next = data.next;
          } catch (err) {}
        }

        // save liked songs into storage
        try {
          await AsyncStorage.setItem("songs", JSON.stringify(songs));
          console.log("Songs saved into storage!");
        } catch (error) {
          // Error saving data
          console.error("Error saving data", error);
        }
      } catch (err) {
        console.error("request error", err);
      }
    } catch (err) {
      console.error("storage error", err);
    }
  };

  //conr
  const [isEndReached, setIsEndReached] = useState(false); // State to track if the end of the list is reached

  const scrollY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef(null);

  const initialOffset = 30; // For example, scroll down by 30px initially

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: initialOffset, animated: false });
    }
  }, []);

  // Interpolate scrollY value to change the background color of the button
  const buttonBackgroundColor = () => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value < 300) {
        Alert.alert("Scroll Y exceeded 300!", `ScrollY Value: ${value}`);
      }
    });

    console.log(listenerId);

    return scrollY.interpolate({
      inputRange: [0, 300], // Change this range based on your layout
      outputRange: ["#212121", "#F09CD4"], // Starting and ending background colors
      extrapolate: "clamp", // Ensures the color doesn’t exceed the range
    });
  };

  const scaleAnimation = (index) => {
    const inputRange = [(index - 1) * 100, index * 100, (index + 1) * 100];
    const outputRange = [0.8, 0.9, 0.8]; // Adjusting to get rolling effect
    return scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp",
    });
  };

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 1.5, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    // <View style={styles.container}>
    //   <Text
    //     style={styles.title}
    //     onPress={() => {
    //       fetchUserLikedSongs();
    //       /*navigation.navigate("Login");*/
    //     }}
    //   >
    //     Back to login, temp songlist screen.
    //   </Text>
    //   <View>
    //     <Button title="Next" onPress={() => {}} />
    //   </View>
    // </View>
    <View style={{ height: "100%", backgroundColor: "#212121" }}>
      <View style={[styles.titleContainer]}>
        {/* <Text style={[styles.titleFirst, s.font]}>The</Text> */}
        <Text style={[styles.title, s.font]}>Song List</Text>
      </View>
      <View style={{ marginTop: -80 }}>
        <Animated.ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.container}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          style={styles.animatedScrollBar}
        >
          <View style={styles.songsContainer}>
            {testSongs.items.map((song, index) => {
              const fadeAnim = useRef(new Animated.Value(0)).current;

              useEffect(() => {
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 500,
                  delay: index * 300,
                  useNativeDriver: true,
                }).start();
              }, [fadeAnim]);

              const scale = scaleAnimation(index);

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.song,
                    {
                      opacity: fadeAnim,
                      transform: [{ scale }],
                    },
                  ]}
                >
                  <View style={styles.trackContainer}>
                    <View style={styles.trackNameImage}>
                      <ExpoImage
                        source={song.track.album.images[0].url}
                        style={styles.songImageStyle}
                      />
                      <View>
                        <Text style={styles.songText}>
                          {song.track.name.length > 12
                            ? song.track.name.slice(0, 12) + "..."
                            : song.track.name}
                        </Text>
                        <Text style={styles.songTextArtist}>
                          {song.track.artists.map((artist) => artist.name)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        /* Handle play logic or link here */
                      }}
                    >
                      <Icon name="play-circle-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </Animated.ScrollView>
      </View>

      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.backgroundButton}
      >
        <Animated.View
          style={[
            styles.button,
            { transform: [{ scale }] }, // Apply the interpolated color to the button
          ]}
        >
          <Text style={styles.buttonText}>Check out Playlist</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Optionally, you can log to see the end reached status */}
      {console.log(isEndReached)}
    </View>
  );
};

const styles = StyleSheet.create({
  song: {
    paddingLeft: 10,
    paddingRight: 20,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: "DMSans-Regular", // Ensure this font is loaded properly
    fontWeight: "700",
    color: "white",
    paddingBottom: 30,
    marginTop: 10,
  },
  titleFirst: {
    fontSize: 30,
    fontFamily: "DMSans-Regular", // Ensure this font is loaded properly
    fontWeight: "700",
    color: "white",
    marginLeft: 126,
  },
  titleContainer: {
    paddingTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trackContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items in the row
  },
  songsContainer: {
    marginTop: 30,
  },
  songText: {
    fontWeight: "600",
    fontSize: 30,
    color: "white",
  },
  songTextArtist: {
    color: "white",
  },
  songImageStyle: {
    width: 50,
    borderRadius: 8, // Optional: Apply rounded corners
    marginRight: 10, // Optional: Add margin for spacing
  },
  trackNameImage: {
    flex: 1,
    flexDirection: "row",
  },
  animatedScrollBar: {
    marginTop: 50,
    height: "70%",
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    backgroundColor: "#212121",
    paddingBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});

export default SongListScreen;
