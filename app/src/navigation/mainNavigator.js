import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isReadyRef, navigationRef } from '../helpers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderSession from '../screens/HeaderSession';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import RegularScreen from '../screens/Drawer/Routes/RegularScreen';
import ActionableScreen from '../screens/Drawer/Routes/ActionableScreen';
import SpotSampling from '../screens/Drawer/Routes/SpotSamplingScreen';
import RecordsScreen from '../screens/Drawer/Routes/RecordScreen';
import Routes from '../screens/Drawer/Routes';
import DashboardGraph from '../screens/Dashboard/DashboardGraph';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BasicInfo from '../screens/Drawer/Routes/BasicInformationScreen';
import ReviewData from "../screens/Drawer/Routes/ReviewData";
import LogOut from "../screens/Drawer/Routes/LogOut"
// import RegularField from "../screens/Drawer/Routes/RegularField"
const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="MAIN-MENU" component={DashboardScreen} />
        <Drawer.Screen name="Regular" component={RegularScreen} />
        <Drawer.Screen name="Actionable" component={ActionableScreen} />
        <Drawer.Screen name="SpotSampling" component={SpotSampling} />
        <Drawer.Screen name="Basic Information" component={BasicInfo} />
        <Drawer.Screen name="Records" component={RecordsScreen} />
        <Drawer.Screen name="ReviewData" component={ReviewData} />
        {/* <Drawer.Screen name="RegularField" component={RegularField} /> */}
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={() => (isReadyRef.current = true)}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: { backgroundColor: '#FFF', height: 150 },
          headerTintColor: 'black',
          headerTitleStyle: { fontWeight: 'bold' },
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Routes" component={Routes} />
        <Stack.Screen name="DashboardGraph" component={DashboardGraph} />
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigator} // Render DrawerNavigator component instead of DashboardScreen
          options={{
            header: () => <HeaderSession />,
            title: 'Dashboard',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
