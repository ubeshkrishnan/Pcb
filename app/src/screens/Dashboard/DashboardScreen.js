import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import HeaderSession from '../HeaderSession';
import MenuBar from "../Menu"
const DashboardScreen = () => { 
  return (
    <View style={styles.container}>
    
    <HeaderSession/>
    <MenuBar/>
      <Text style={styles.heading}>Dashboard Screen</Text>
      <View style={styles.dataContainer}>
        <View style={styles.dataList}>
          <Text>Data List 1</Text>
        </View>
        <View style={styles.dataList}>
          <Text>Data List 2</Text>
        </View>
        <View style={styles.dataList}>
          <Text>Data List 3</Text>
        </View>
        <View style={styles.dataList}>
          <Text>Data List 4</Text>
        </View>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83C8E4',
  },
});

export default DashboardScreen; // Updated export name
