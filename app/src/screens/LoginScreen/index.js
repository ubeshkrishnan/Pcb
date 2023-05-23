import { View, Text,StatusBar ,StyleSheet } from 'react-native'
import React from 'react'
// import Header from './Header';
import Body from './Body';
// import Footer from './Footer';

const LoginScreen = () => {
  return (
    <View>
      {/* <Header /> */}
      <Body />
      {/* <Footer /> */}
      <StatusBar style="auto" />
    </View>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#83C8E4',
//   },
// });

export default LoginScreen