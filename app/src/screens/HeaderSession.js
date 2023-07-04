import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderSession = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState(null);
  const [employeeIds, setEmployeeIds] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const data = AsyncStorage.getItem("login").then((value) => {
        setUserData(value.toString().replace(/"/g, ''));
        if (value) {
          // console.log('Data fetched from AsyncStorage:', value);
          // Extract the employee_id from the data
          // Map the employee_id if it is an array
          if (Array.isArray(value)) {
            setEmployeeIds(value);
          }
        }
      })
    };
    fetchData();

    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Render the employee_ids
  const renderEmployeeIds = () => {
    return employeeIds.map((id) => (
      <Text key={id} style={styles.employee_id}>
        {id}
      </Text>
    ));
  };
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
        <Text style={styles.title}>{userData}</Text>
        {/* <Text style={styles.subtitle}>Employee IDs:</Text> */}
        <View style={styles.employeeIdsContainer}>{renderEmployeeIds()}</View>
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
    justifyContent: 'center',
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
    justifyContent: 'center',
    textAlign: 'center', // Add this line to center the text horizontally
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
