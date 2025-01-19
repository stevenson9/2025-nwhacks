import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const FriendsScreen = () => {
  const [isMatched, setIsMatched] = useState(false);

  return (
    <View style={styles.container}>
      {isMatched ? (
        <Text>Yay Matched</Text>
      ) : (
        <Text>Upload files to find the best match!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FriendsScreen;
