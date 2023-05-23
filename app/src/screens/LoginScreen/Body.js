import React, { useRef, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, Animated, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleNavigateToDashboard = () => {
    navigation.navigate('Dashboard'); // Navigate to the Dashboard screen
  };
  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#D0E3F1', height: '100%' }}>
      <Header />
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image
          source={require('../../assets/tlogo.png')}
          style={{
            width: 120,
            height: 120,
            marginBottom: 20,
            marginTop: 20,
            opacity: logoOpacity,
            transform: [{ scale: logoOpacity }],
          }}
          resizeMode="contain"
        />
      </SafeAreaView>

      <View style={styles.formContainer}>
        <Text style={styles.loginContainer}>Log In</Text>
           <Text style={styles.loginDetails}>Enter Your Details To Login</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
           
          </View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="@gmail.com"
            value={email}
            onChangeText={setEmail}
            
          />

 <View style={styles.passwordContainer}>
  <Text style={styles.label}>Password</Text>
  <View style={styles.passwordInputContainer}>
    <TextInput
      style={styles.input}
      secureTextEntry={!showPassword}
      placeholder="********"
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity
      style={styles.visibilityIcon}
      onPress={togglePasswordVisibility}
    >
      <MaterialIcons
        name={showPassword ? 'visibility' : 'visibility-off'}
        size={24}
        color={showPassword ? 'gray' : 'lightgray'}
      />
    </TouchableOpacity>
  </View>
</View>



    <TouchableOpacity style={styles.loginButton} onPress={handleNavigateToDashboard}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  </View>
</View>
<Footer />
</ScrollView>
);
}

const styles = StyleSheet.create({
formContainer: {
  flex: 1,
  height: 440,
  paddingHorizontal: 5,
  paddingTop: 40,
  marginTop: 20,
  backgroundColor: 'white',
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
},
inputContainer: {
  marginVertical: 10,
  alignItems: 'center',
},
label: {
  color: 'gray',
  paddingRight: 224,
  marginBottom: 5,
  marginTop: 10,
},
input: {
  padding: 10,
  backgroundColor: '#F4F4F4',
  color: 'black',
  width: '80%',
  borderRadius: 5,
  marginBottom: 10,
},
passwordContainer: {
  color:'black',
  alignItems: 'center',
},
passwordInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  color:'black',
},
loginButton: {
  backgroundColor: '#6495EB',
  borderRadius: 20,
  width: '50%',
  marginTop: 30,
},
buttonText: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
  paddingVertical: 10,
},
loginContainer: {
  fontSize: 30,
  color: 'black',
  paddingLeft: 40,
  fontWeight: '500',
},
loginDetails: {
  color: '#CCCCCC',
  paddingLeft: 40,
  marginTop: 10,
  fontSize: 17,
  fontWeight: '350',
},
visibilityIcon: {
  position: 'absolute',
  right: 10,
  top: '50%',
  transform: [{ translateY: -12 }],
  // backgroundColor:'grey',
  color:'black',
},
});
