import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Footer = () => {
  return (
    <Text style={styles.footer}>
     Developed & Maintained by
eNova solutions
    </Text>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    color:'black',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:50,
    paddingTop:10,

  },
  text: {
    fontSize: 16,
    color:'#D3D3D3',
  },
});

export default Footer;
