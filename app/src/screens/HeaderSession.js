import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const HeaderSession = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.logo}
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
          <Text style={styles.title}>E1023</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'cyan',
    height: 90,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
