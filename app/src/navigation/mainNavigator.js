import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { isReadyRef, navigationRef } from '../helpers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderSession from '../screens/HeaderSession';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import RegularScreen from '../screens/Drawer/Routes/RegularScreen';
import RegularScreenChild from '../screens/Drawer/Routes/RegularScreenChild';
import ActionableScreen from '../screens/Drawer/Routes/ActionableScreen';
import ActionableScreenChild from '../screens/Drawer/Routes/ActionableScreenChild';
import SpotSampling from '../screens/Drawer/Routes/SpotSamplingScreen';
import RecordsScreen from '../screens/Drawer/Routes/RecordScreen';
import Routes from '../screens/Drawer/Routes';
import DashboardGraph from '../screens/Dashboard/DashboardGraph';
import BasicInfo from '../screens/Drawer/Routes/BasicInformationScreen';
import ReviewData from '../screens/Drawer/Routes/ReviewData';
import LogOut from '../screens/Drawer/Routes/LogOut';
import CameraPopup from '../screens/Drawer/Routes/CameraPopup';
import NoInternet from '../screens/NoInternet';
import { NetworkProvider } from 'react-native-offline';
import NetInfo from "@react-native-community/netinfo";
import FingerPrint from '../screens/FingerPrint/FingerPrint';
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
        <Drawer.Screen name="Review Data" component={ReviewData} />
        <Drawer.Screen name="Actionable ScreenChild" component={ActionableScreenChild} />

        {/* <Drawer.Screen name="RegularField" component={RegularField} /> */}
        <Drawer.Screen name="LogOut" component={LogOut} />
        <Drawer.Screen name="." component={CameraPopup} />
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
          <Stack.Screen name="CameraPopup" component={CameraPopup} />
          <Stack.Screen name="RegularScreenChild" component={RegularScreenChild} />
          <Stack.Screen
            name="Dashboard"
            component={DrawerNavigator} // Render DrawerNavigator component instead of DashboardScreen
            options={{
              header: () => <HeaderSession />,
              title: 'Dashboard',
            }}
          />
        
          <Stack.Screen name="FingerPrint" component={FingerPrint} />
        </Stack.Navigator>
      </NavigationContainer>
  
  );
};

export default MainNavigator;

// No Internet
// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import NetInfo from "@react-native-community/netinfo";

// // Other screen imports
// import HeaderSession from '../screens/HeaderSession';
// import LoginScreen from '../screens/LoginScreen';
// import DashboardScreen from '../screens/Dashboard/DashboardScreen';
// import RegularScreen from '../screens/Drawer/Routes/RegularScreen';
// import RegularScreenChild from '../screens/Drawer/Routes/RegularScreenChild';
// import ActionableScreen from '../screens/Drawer/Routes/ActionableScreen';
// import SpotSampling from '../screens/Drawer/Routes/SpotSamplingScreen';
// import RecordsScreen from '../screens/Drawer/Routes/RecordScreen';
// import Routes from '../screens/Drawer/Routes';
// import DashboardGraph from '../screens/Dashboard/DashboardGraph';
// import BasicInfo from '../screens/Drawer/Routes/BasicInformationScreen';
// import ReviewData from '../screens/Drawer/Routes/ReviewData';
// import LogOut from '../screens/Drawer/Routes/LogOut';
// import CameraPopup from '../screens/Drawer/Routes/CameraPopup';
// import NoInternet from '../screens/NoInternet';

// const MainNavigator = () => {
//   const [isOnline, setIsOnline] = useState(false);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsOnline(state.isConnected);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const Stack = createNativeStackNavigator();
//   const Drawer = createDrawerNavigator();

//   const DrawerNavigator = () => {
//     return (
//       <Drawer.Navigator>
//         <Drawer.Screen name="MAIN-MENU" component={DashboardScreen} />
//         <Drawer.Screen name="Regular" component={RegularScreen} />
//         <Drawer.Screen name="Actionable" component={ActionableScreen} />
//         <Drawer.Screen name="SpotSampling" component={SpotSampling} />
//         <Drawer.Screen name="Basic Information" component={BasicInfo} />
//         <Drawer.Screen name="Records" component={RecordsScreen} />
//         <Drawer.Screen name="ReviewData" component={ReviewData} />
//         <Drawer.Screen name="LogOut" component={LogOut} />
//         <Drawer.Screen name="CameraPopup" component={CameraPopup} />
//       </Drawer.Navigator>
//     );
//   };

//   return (
//     <NavigationContainer>
//       {isOnline ? (
//         <Stack.Navigator
//           initialRouteName="LoginScreen"
//           screenOptions={{
//             headerStyle: { backgroundColor: '#FFF', height: 150 },
//             headerTintColor: 'black',
//             headerTitleStyle: { fontWeight: 'bold' },
//             gestureEnabled: false,
//           }}
//         >
//           <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Routes" component={Routes} />
//           <Stack.Screen name="DashboardGraph" component={DashboardGraph} />
//           <Stack.Screen name="CameraPopup" component={CameraPopup} />
//           <Stack.Screen name="RegularScreenChild" component={RegularScreenChild} />
//           <Stack.Screen
//             name="Dashboard"
//             component={DrawerNavigator}
//             options={{
//               header: () => <HeaderSession />,
//               title: 'Dashboard',
//             }}
//           />
//         </Stack.Navigator>
//         ) : (
//         <Stack.Navigator>
//           <Stack.Screen
//             name="NoInternet"
//             component={NoInternet}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// };

// export default MainNavigator;

