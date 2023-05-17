import { View, Text,StatusBar ,StyleSheet } from 'react-native'
import React from 'react'
import Records from './RecordScreen';
import Regular from  './RegularScreen';
import Actionable from './ActionableScreen';
import  SpotSampling from './SpotSamplingScreen'
import Basicinfo from './BasicInformationScreen'
const Drawer = () => {
  return (
    <View style={styles.container}>
  <Records/>
  <Regular/>
  <Actionable/>
  <SpotSampling/>
  <Basicinfo/>
    </View>
  )
}


export default Drawer