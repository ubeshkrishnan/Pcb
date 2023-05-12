import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>TamilNadu Pollution Control Board</Text>
      <Text >தமிழ்நாடு மாசு கட்டுப்பாட்டு வாரியம்</Text>
 
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: 80,
    paddingTop: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Header;
