import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Footer = () => {
  return (
    <View>
     

      <Text style={styles.footer}>
      <Image
        style={styles.profileImage}
        source={require('../../assets/enova.png')}
      />
        Developed & Maintained by eNova solutions
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#CCCCCC',
    color: 'black',
    height: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingLeft: 50,
    paddingTop: 10,
    flexDirection: 'row',
  },
  profileImage: {
    width: 20, // Set the desired width (e.g., 14)
    height: 20, // Set the desired height (e.g., 14)
    resizeMode: 'contain', // Adjust the resizeMode as needed
    marginRight: 20, // Add margin to create space between the image and text
  },
});


export default Footer;
