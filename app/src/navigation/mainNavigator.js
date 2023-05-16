import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isReadyRef, navigationRef } from '../helpers';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef} onReady={() => isReadyRef.current = true}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: { backgroundColor: "#FFF", height: 150 },
          headerTintColor: "black",
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: false,
          gestureEnabled: false,
        }}>
         <Stack.Screen name="LoginScreen" component={LoginScreen}/>
 </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
