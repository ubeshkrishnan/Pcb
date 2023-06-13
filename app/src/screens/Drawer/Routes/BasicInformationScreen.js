import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/profile.png')}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>123-456-7890</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>123 Main St, City, State</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Bio:</Text>
          <Text style={styles.value}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed consectetur neque.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  body: {},
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#888',
  },
  value: {
    color: '#555',
  },
});

export default UserProfile;
