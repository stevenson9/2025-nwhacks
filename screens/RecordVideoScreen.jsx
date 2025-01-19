import React from "react";
import { useState, useRef } from "react";
import { View, Text, Image, Alert, StyleSheet, Button } from "react-native";

import * as ImagePicker from "expo-image-picker";

const RecordVideoScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState("");

  const showMessage = () => {
    Alert.alert("Upload image", "Choose a option", [
      {
        text: "Camera",
        onPress: () => openCamera(),
      },
      {
        text: "Gallery",
        onPress: () => openLibrary(),
      },
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
      }
    ]);
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      // can be changed to VideosOnly
      mediaTypes: ImagePicker.MediaTypeOptions.ImagesOnly,
      width: 300,
      height: 400,
      cropping: true,
    });

    if (result.cancelled) {
      console.log("User cancelled image picker");
    } else {
      setImageUri(result.assets[0].uri);
      console.log("Image URI:", result.assets[0].uri);
    }
  };

  const openLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // can be changed to "videos" as well
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      console.log("User cancelled image picker");
    } else {
      setImageUri(result.assets[0].uri);
      console.log("Image URI:", result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => {
          navigation.navigate("RecordVideo");
        }}
      >
        Record your surroundings.
      </Text>
      <View>

        <Button title="Pick an image" onPress={showMessage} />
        {imageUri && (
          <View>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
          <Button title="Remove image" onPress={() => {
            setImageUri("");
          }}/>
          </View>
        )}
        <Button
          title="Next"
          onPress={() => {
            if (imageUri) {
              navigation.navigate("Mood");
            } else {
              Alert.alert("Please upload an image.");
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F0FB",
    height: "75%",
  },

  button: {
    color: "black",
    backgroundColor: "#8075FF",
  },
});

export default RecordVideoScreen;
