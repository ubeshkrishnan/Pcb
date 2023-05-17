import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isReadyRef, navigationRef } from '../helpers';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderSession from '../screens/HeaderSession';
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import Routes from '../screens/Drawer/Routes'
import Drawer from '../screens/Drawer';
import DashboardGraph from '../screens/Dashboard/DashboardGraph';

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
        <Stack.Screen name="Drawer" component={Drawer} />
        <Stack.Screen name="HeaderSession" component={HeaderSession} />
        <Stack.Screen name="Routes" component={Routes} />
        <Stack.Screen name="DashboardGraph" component={DashboardGraph} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            header: () => <HeaderSession />, // Render HeaderSession component as the header
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            header: () => <HeaderSession />, // Render HeaderSession component as the header
            title: "Dashboard",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
