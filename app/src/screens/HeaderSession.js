import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderSession = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem('login');
      const data = JSON.parse(storedData);
      setUserData(data);
    };

    fetchData();

    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Animated.Image
          style={[styles.logo, { opacity: logoOpacity }]}
          source={require('../assets/tlogo.png')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>TamilNadu Pollution Control Board</Text>
          <Text style={styles.tamil}>தமிழ்நாடு மாசு கட்டுப்பாட்டு வாரியம்</Text>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/profile.png')}
        />
        <Text style={styles.title}>{userData?.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'cyan',
    height: 95,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomLeftRadius:30,
    // borderBottomRightRadius:30,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue',
  },
  tamil: {
    color: 'black',
    fontSize: 13,
  },
  profileContainer: {
    marginRight: 7,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 50,
  },
});

export default HeaderSession;
