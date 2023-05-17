import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const HeaderSession = () => {
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>TamilNadu Pollution Control Board</Text>
        <Text style={styles.tamil}>தமிழ்நாடு மாசு கட்டுப்பாட்டு வாரியம்</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/profile.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'cyan',
    height: 80,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingLeft:40,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
  tamil: {
    color: 'black',
  },
  profileContainer: {
    marginRight: 7,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius:50,

  },
});

export default HeaderSession;
