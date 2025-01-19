<<<<<<< HEAD
import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import MakePlaylistScreen from "./screens/MakePlaylistScreen";
import RecordVideoScreen from "./screens/RecordVideoScreen";
import MoodScreen from "./screens/MoodScreen";

const Stack = createStackNavigator();
=======
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainNavigation from "./screens/MainNavigation";
import LoginScreen from "./screens/LoginScreen";
import SongListScreen from "./screens/SongListScreen";
>>>>>>> eb0a8c16786ba45489b5f5552ff1ffd08e97419e

export default function App() {
  return (
    /* <StatusBar style="auto" /> */
<<<<<<< HEAD
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          <Stack.Screen name="MakePlaylist" component={MakePlaylistScreen} />
          <Stack.Screen name="RecordVideo" component={RecordVideoScreen} />
          <Stack.Screen name="Mood" component={MoodScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F0FB",
    color: "#8075FF",
  },
});
=======
    // <MainNavigation />
    // <LoginScreen />
    <SongListScreen />
  );
}
>>>>>>> eb0a8c16786ba45489b5f5552ff1ffd08e97419e
