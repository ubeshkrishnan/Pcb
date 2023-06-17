import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Records from './RecordScreen';
import Regular from './Regular/RegularScreen';
import Actionable from './Actionable/ActionableScreen';
import SpotSampling from './SpotSample/SpotSamplingScreen';
import Basicinfo from './BasicInformationScreen';
import ReviewData from "./ReviewData";
import LogOut from "./LogOut";
const Drawer = () => {
  return (
    <View style={styles.container}>
      <Records />
      <Regular />
      <Actionable />
      <SpotSampling />
      <Basicinfo />
      <ReviewData />
      <LogOut />
    </View>

  )
}


export default Drawer