import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HeaderSession = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>TamilNadu Pollution Control Board</Text>
      <Text style={styles.tamil}>தமிழ்நாடு மாசு கட்டுப்பாட்டு வாரியம்</Text>
 </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    height: 85,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  tamil:{
    color:'black'
  }
});

export default HeaderSession;
