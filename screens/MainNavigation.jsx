import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import TabNavigator from "./TabNavigator";

const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default MainNavigation;
