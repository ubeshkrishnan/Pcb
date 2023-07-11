import React, { useEffect, useState, lazy, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isReadyRef, navigationRef } from '../helpers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
const HeaderSession = React.lazy(() => import('../screens/HeaderSession'));
import FirstView from '../screens/LoginScreen/FirstView';
import LoginScreen from '../screens/LoginScreen';
const DashboardScreen = React.lazy(() => import('../screens/Dashboard/DashboardScreen'));
const RegularScreen = React.lazy(() => import('../screens/Drawer/Routes/Regular/RegularScreen'));
const RegularScreenChild = React.lazy(() =>
  import('../screens/Drawer/Routes/Regular/RegularScreenChild')
);
const ActionableScreen = React.lazy(() =>
  import('../screens/Drawer/Routes/Actionable/ActionableScreen')
);
const ActionableScreenChild = React.lazy(() =>
  import('../screens/Drawer/Routes/Actionable/ActionableScreenChild')
);
const SpotSamplingScreen = React.lazy(() => import('../screens/Drawer/Routes/SpotSample/SpotSamplingScreen'));
const RecordsScreen = React.lazy(() => import('../screens/Drawer/Routes/RecordScreen'));
const Routes = React.lazy(() => import('../screens/Drawer/Routes'));
const DashboardGraph = React.lazy(() => import('../screens/Dashboard/DashboardGraph'));
const BasicInfo = React.lazy(() => import('../screens/Drawer/Routes/BasicInformationScreen'));
const ReviewData = React.lazy(() => import('../screens/Drawer/Routes/ReviewData'));
const LogOut = React.lazy(() => import('../screens/Drawer/Routes/LogOut'));
const CameraPopup = lazy(() => import('../screens/Drawer/Routes/CameraPopup'));
import NoInternet from '../screens/NoInternet';
import { NetworkProvider } from 'react-native-offline';
import NetInfo from '@react-native-community/netinfo';
const ModalRegularChild = lazy(() =>
  import('../screens/Drawer/Routes/Regular/modalRegularChild')
);
// import FingerPrint from '../screens/FingerPrint/FingerPrint';

const MainNavigator = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showFirstView, setShowFirstView] = useState(true); // Add state for showing FirstView

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
        <Drawer.Screen name="Spot Sampling" component={SpotSamplingScreen} />
        <Drawer.Screen name="Basic Information" component={BasicInfo} />
        <Drawer.Screen name="Records" component={RecordsScreen} />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
  };

  useEffect(() => {
    // Hide FirstView after 3 seconds
    const timer = setTimeout(() => {
      setShowFirstView(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavigationContainer ref={navigationRef} onReady={() => (isReadyRef.current = true)}>
        {showFirstView ? (
          <Stack.Navigator
            initialRouteName="FirstView"
            screenOptions={{
              headerStyle: { backgroundColor: '#FFF', height: 150 },
              headerTintColor: 'black',
              headerTitleStyle: { fontWeight: 'bold' },
              gestureEnabled: false,
            }}
          >
            <Stack.Screen
              name="FirstView"
              component={FirstView}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <NetworkProvider>
            <Stack.Navigator
              initialRouteName="LoginScreen"
              screenOptions={{
                headerStyle: { backgroundColor: '#FFF', height: 150 },
                headerTintColor: 'black',
                headerTitleStyle: { fontWeight: 'bold' },
                gestureEnabled: false,
              }}
            >
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Routes" component={Routes} />
              <Stack.Screen name="DashboardGraph" component={DashboardGraph} />
              <Stack.Screen name="CameraPopup" component={CameraPopup} />
              <Stack.Screen name="RegularScreenChild" component={RegularScreenChild} />
              <Stack.Screen name="ActionableScreenChild" component={ActionableScreenChild} />
              <Stack.Screen name="ReviewData" component={ReviewData} />
              <Stack.Screen name="SpotSamplingScreen"
                component={SpotSamplingScreen}

              />
              <Stack.Screen name="ModalRegularChild" component={ModalRegularChild} />
              <Stack.Screen name="Logout" component={LogOut} options={{ headerShown: false }} />
              <Stack.Screen
                name="Dashboard"
                component={DrawerNavigator}
                options={{
                  header: () => <HeaderSession />,
                  title: 'Dashboard',
                }}
              />
              {/* <Stack.Screen name="FingerPrint" component={FingerPrint} /> */}
            </Stack.Navigator>
            {isOnline ? null : <NoInternet />}
          </NetworkProvider>
        )}
      </NavigationContainer>
    </Suspense>

  );
};

export default MainNavigator;

