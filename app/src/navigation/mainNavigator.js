import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isReadyRef, navigationRef } from '../helpers';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderSession from '../screens/HeaderSession';
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import MenuBar from '../screens/Menu';

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
        }}
      >

      <Stack.Screen name="Header" component={HeaderSession} />
      <Stack.Screen name="Menu" component={MenuBar} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
         name="Dashboard" 
         component={DashboardScreen} 
          options={{
            title:"Dashboard",
          }}
         /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
