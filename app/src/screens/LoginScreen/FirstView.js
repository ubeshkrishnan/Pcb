import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default function FirstView() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Image
        source={require('../../assets/fbg.jpg')}
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerText}>Tamil Nadu Pollution Control Board</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 1500,
    height: 10000,
    marginBottom: 20,
    marginTop: 20,
  },
  centerTextContainer: {
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  centerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight:50,
color:'black'},
});
