import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const Circles = () => {
  // Create animated values for each circle
  const animatedValues = useRef(
    Array.from({ length: 7 }, () => new Animated.Value(1)) // Set initial scale to 1
  ).current;

  useEffect(() => {
    // Create pulsating animations for all circles
    const animations = animatedValues.map((animatedValue) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1.9, // Scale up
            duration: 2000,
            useNativeDriver: true, // Ensure native driver for performance
          }),
          Animated.timing(animatedValue, {
            toValue: 1, // Scale down
            duration: 4000,
            useNativeDriver: true, // Ensure native driver for performance
          }),
        ])
      )
    );

    // Start all animations together
    animations.forEach((animation) => animation.start());
  }, [animatedValues]);

  // Generate animated styles for each circle
  const animatedStyles = animatedValues.map((animatedValue, index) => ({
    transform: [
      {
        scale: animatedValue, // Apply scale transformation for pulsating effect
      },
    ],
  }));

  return (
    <View style={styles.container}>
      {animatedStyles.map((style, index) => (
        <Animated.View
          key={index}
          style={[styles[`circle${index + 1}`], style]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    opacity: 1,
  },
  circle1: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    position: "absolute",
    backgroundColor: "#F5AD3E",
    bottom: 550,
    left: -23,
  },
  circle2: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    position: "absolute",
    backgroundColor: "#E34056",
    bottom: 145,
    left: 40,
  },
  circle3: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    position: "absolute",
    backgroundColor: "#6C7AF1",
    bottom: 95,
    left: 115,
  },
  circle4: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    position: "absolute",
    backgroundColor: "#E34056",
    bottom: 500,
    left: 250,
  },
  circle5: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    position: "absolute",
    backgroundColor: "#6C7AF1",
    bottom: 600,
    left: 350,
  },
  circle6: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    position: "absolute",
    backgroundColor: "#F5AD3E",
    bottom: 160,
    left: 180,
  },
  circle7: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    position: "absolute",
    backgroundColor: "#F5AD3E",
    bottom: 165,
    left: 390,
  },
});

export default Circles;
