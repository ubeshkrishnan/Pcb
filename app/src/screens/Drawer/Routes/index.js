import { View, Text,StatusBar ,StyleSheet } from 'react-native'
import React from 'react'
import Records from './RecordScreen';
import Regular from  './RegularScreen';
import Actionable from './ActionableScreen';
import  SpotSampling from './SpotSamplingScreen';
import Basicinfo from './BasicInformationScreen';
import ReviewData from "./ReviewData";
import Logout from "./LogOut";
import RegularField from "./RegularField"
const Drawer = () => {
  return (
    <View style={styles.container}>
  <Records/>
  <Regular/>
  <Actionable/>
  <SpotSampling/>
  <Basicinfo/>
  <ReviewData/>
  <Logout/>
  <RegularField/>
    </View>
    
  )
}


export default Drawer