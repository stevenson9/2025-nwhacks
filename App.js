import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainNavigation from "./screens/MainNavigation";
import LoginScreen from "./screens/LoginScreen";
import SongListScreen from "./screens/SongListScreen";

export default function App() {
  return (
    /* <StatusBar style="auto" /> */
    // <MainNavigation />
    // <LoginScreen />
    <SongListScreen />
  );
}
