import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import HeaderSession from '../HeaderSession';
// import Drawer from '../Drawer';
import DashboardGraph from "../Dashboard/DashboardGraph"

const DashboardScreen = () => { 
  return (
    <View style={styles.container}>
    {/* <HeaderSession/> */}
    {/* <Drawer/> */}
    <DashboardGraph/>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default DashboardScreen; // Updated export name
