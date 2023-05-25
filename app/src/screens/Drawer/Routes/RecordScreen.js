import { Text, View, Button } from 'react-native';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Records() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('NoInternet');
  };

  return (
    <View>
      <Text>Records</Text>
      <Button title="Go to NoInternet" onPress={handleButtonPress} />
    </View>
  );
}
