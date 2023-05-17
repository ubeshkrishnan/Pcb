import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';

const ActionableScreen = () => { 
  return (
    <View style={styles.container}>
    <Text>Actionable</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default ActionableScreen; // Updated export name
