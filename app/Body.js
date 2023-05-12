import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';

const Body = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
    
      <Image
        source={require('./tlogo.png')}
        style={styles.image}
      />
 <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>GET OTP</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10, // adjust this value to move the image upward
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text:{
fontSize:25,
color:'blue',
fontWeight:'bold',
  },
});

export default Body;
