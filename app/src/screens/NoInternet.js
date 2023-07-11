import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const NoInternet = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', alignItems: 'center' }}>
      <Text style={styles.noInternet}>
        {isOnline ? 'You\'re online' : 'No internet connection...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noInternet: {
    fontSize: 17,
    backgroundColor: 'white',
    color: 'black',
    paddingBottom:8,
  },
});

export default NoInternet;
