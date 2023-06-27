import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isReadyRef, navigationRef } from '../helpers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderSession from '../screens/HeaderSession';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import RegularScreen from '../screens/Drawer/Routes/Regular/RegularScreen';
import RegularScreenChild from '../screens/Drawer/Routes/Regular/RegularScreenChild';
import ActionableScreen from '../screens/Drawer/Routes/Actionable/ActionableScreen';
import ActionableScreenChild from '../screens/Drawer/Routes/Actionable/ActionableScreenChild';
import SpotSampling from '../screens/Drawer/Routes/SpotSample/SpotSamplingScreen';
import RecordsScreen from '../screens/Drawer/Routes/RecordScreen';
import Routes from '../screens/Drawer/Routes';
import DashboardGraph from '../screens/Dashboard/DashboardGraph';
import BasicInfo from '../screens/Drawer/Routes/BasicInformationScreen';
import ReviewData from '../screens/Drawer/Routes/ReviewData';
import LogOut from '../screens/Drawer/Routes/LogOut';
import CameraPopup from '../screens/Drawer/Routes/CameraPopup';
import NoInternet from '../screens/NoInternet';
import { NetworkProvider } from 'react-native-offline';
import NetInfo from '@react-native-community/netinfo';
// import FingerPrint from '../screens/FingerPrint/FingerPrint';

const MainNavigator = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="MAIN-MENU" component={DashboardScreen} />
        <Drawer.Screen name="Regular Sampling" component={RegularScreen} />
        <Drawer.Screen name="Actionable Sampling" component={ActionableScreen} />
        <Drawer.Screen name="Spot Sampling" component={SpotSampling} />
        <Drawer.Screen name="Basic Information" component={BasicInfo} />
        <Drawer.Screen name="Records" component={RecordsScreen} />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
  };

  return (
    <NetworkProvider>
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
          <Stack.Screen name="CameraPopup" component={CameraPopup} />
          <Stack.Screen name="RegularScreenChild" component={RegularScreenChild} />
          <Stack.Screen name="ActionableScreenChild" component={ActionableScreenChild} />
          <Stack.Screen name="Review Data" component={ReviewData} />
          <Stack.Screen name="Logout" component={LogOut} options={{ headerShown: false }} />
          <Stack.Screen
            name="Dashboard"
            component={DrawerNavigator} // Render DrawerNavigator component instead of DashboardScreen
            options={{
              header: () => <HeaderSession />,
              title: 'Dashboard',
            }}
          />
          {/* <Stack.Screen name="FingerPrint" component={FingerPrint} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      {isOnline ? null : <NoInternet />}
    </NetworkProvider>
  );
};

export default MainNavigator;