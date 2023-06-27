import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Url } from '../../../Global_Variable/api_link';
import Header from './Header';

const LoginScreen = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [empId, setEmail] = useState('EN2022');
  const [password, setPassword] = useState('lims@123');
  const [showPassword, setShowPassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const validatePassword = () => {
    setCheckValidPassword(password.length < 6);
  };

  const submit = async () => {
    const isValidPassword = password.length >= 6;

    if (!isValidPassword) {
      setCheckValidPassword(true);
      setError('Please enter a valid password (minimum 6 characters)');
    } else {
      setError('');

      try {
        const response = await axios.post(Url + '/auth', { empId, password });

        if (response.data.success) {
          AsyncStorage.setItem('login', JSON.stringify(empId));
          handleNavigateToDashboard();
        } else {
          setError('Invalid email or password');
        }
      } catch (error) {
        setError('An error occurred during login FRONT');
      }
    }
  };

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
          <View style={styles.inputIconContainer}></View>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={[styles.input, styles.inputError]}
            placeholder="username"
            placeholderTextColor="#CCCCCC"
            value={empId}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[styles.input, checkValidPassword && styles.inputError]}
                secureTextEntry={!showPassword}
                placeholder="********"
                placeholderTextColor="#CCCCCC"
                value={password}
                onChangeText={setPassword}
                onBlur={validatePassword}
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
            {checkValidPassword && (
              <Text style={styles.errorText}>
                Enter a valid password (minimum 6 characters)
              </Text>
            )}
          </View>

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={submit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Footer /> */}
    </ScrollView>
  );
};

export default LoginScreen;
         




const styles = StyleSheet.create({
  errorText:{
    color:'red',
  },
  formContainer: {
    flex: 1,
    height: 550,
    paddingHorizontal: 5,
    paddingTop: 50,
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
    fontWeight: '600',
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

// Finger print

// import React, { useRef, useEffect, useState } from 'react';
// import { Alert } from 'react-native';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   Animated,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Header from './Header';
// import Footer from './Footer';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const LoginScreen = () => {
//   const logoOpacity = useRef(new Animated.Value(0)).current;
//   const navigation = useNavigation();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [checkValidEmail, setCheckValidEmail] = useState(false);
//   const [checkValidPassword, setCheckValidPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal
//   const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleNavigateToFingerPrint  = () => {
//     navigation.navigate('Dashboard'); // Navigate to the Home screen
//   };

//   useEffect(() => {
//     Animated.timing(logoOpacity, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const validateEmail = () => {
//     setCheckValidEmail(!emailRegex.test(email));
//   };

//   const validatePassword = () => {
//     setCheckValidPassword(password.length < 6);
//   };
//   const submit = () => {
//     const isValidEmail = emailRegex.test(email);
//     const isValidPassword = password.length >= 6; // Assuming a minimum password length of 6 characters
  
//     if (!isValidEmail) {
//       setCheckValidEmail(true);
//       setError('Please enter a valid email');
//     } else if (!isValidPassword) {
//       setCheckValidPassword(true);
//       setError('Please enter a valid password (minimum 6 characters)');
//     } else {
//       // Both email and password are valid, perform login action
//       setError('');
//       handleNavigateToFingerPrint();
  
//       // Show alert popup
//       Alert.alert('Success', 'Login successful!', [
//         {
//           text: 'OK',
//           onPress: () => {
//             // Handle OK button press if needed
//           }
//         }
//       ]);
  
//       // Show success popup
//       setShowSuccessModal(true);
  
//       // Hide success popup after 2 seconds
//       setTimeout(() => {
//         setShowSuccessModal(true);
//       }, 2000);
//     }
//   };
  

//   return (
//     <ScrollView style={{ backgroundColor: '#D0E3F1', height: '100%' }}>
//       <Header />
//       <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
//         <Animated.Image
//           source={require('../../assets/tlogo.png')}
//           style={{
//             width: 120,
//             height: 120,
//             marginBottom: 20,
//             marginTop: 20,
//             opacity: logoOpacity,
//             transform: [{ scale: logoOpacity }],
//           }}
//           resizeMode="contain"
//         />
//       </SafeAreaView>

//       <View style={styles.formContainer}>
//         <Text style={styles.loginContainer}>Log In</Text>
//         <Text style={styles.loginDetails}>Enter Your Details To Login</Text>
//         <View style={styles.inputContainer}>
//           <View style={styles.inputIconContainer}></View>

//           <Text style={styles.label}>Email</Text>

//           <TextInput
//             style={[
//               styles.input,
//               checkValidEmail && styles.inputError,
//             ]}
//             placeholder="@gmail.com"
//             placeholderTextColor="#CCCCCC"
//             value={email}
//             onChangeText={setEmail}
//             onBlur={validateEmail}
//           />

//           {checkValidEmail && (
//             <Text style={styles.errorText}>Please enter a valid email</Text>
//           )}
//           <View style={styles.passwordContainer}>
//             <Text style={styles.label}>Password</Text>
//             <View style={styles.passwordInputContainer}>
//               <TextInput
//                 style={[
//                   styles.input,
//                   checkValidPassword && styles.inputError,
//                 ]}
//                 secureTextEntry={!showPassword}
//                 placeholder="********"
//                 placeholderTextColor="#CCCCCC"
//                 value={password}
//                 onChangeText={setPassword}
//                 onBlur={validatePassword}
//               />
//               <TouchableOpacity
//                 style={styles.visibilityIcon}
//                 onPress={togglePasswordVisibility}
//               >
//                 <MaterialIcons
//                   name={showPassword ? 'visibility' : 'visibility-off'}
//                   size={24}
//                   color={showPassword ? 'gray' : 'lightgray'}
//                 />
//               </TouchableOpacity>
//             </View>
//             {checkValidPassword && (
//               <Text style={styles.errorText}>
//                 Enter a valid password (minimum 6 characters)
//               </Text>
//             )}
//           </View>

//           <TouchableOpacity
//             style={styles.fingerprintButton}
//             onPress={submit}
//           >
//             <MaterialIcons
//               name="fingerprint"
//               size={60}
//               color="black"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <Footer />
//     </ScrollView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   errorText: {
//     color: 'red',
//   },
//   formContainer: {
//     flex: 1,
//     height: 440,
//     paddingHorizontal: 5,
//     paddingTop: 40,
//     marginTop: 20,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//   },
//   inputContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   label: {
//     color: 'gray',
//     paddingRight: 224,
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   input: {
//     padding: 10,
//     backgroundColor: '#F4F4F4',
//     color: 'black',
//     width: '80%',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   passwordContainer: {
//     color: 'black',
//     alignItems: 'center',
//   },
//   passwordInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     color: 'black',
//   },
//   fingerprintButton: {
//     marginTop: 30,

//   },
//   loginContainer: {
//     fontSize: 30,
//     color: 'black',
//     paddingLeft: 40,
//     fontWeight: '600',
//   },
//   loginDetails: {
//     color: '#CCCCCC',
//     paddingLeft: 40,
//     marginTop: 10,
//     fontSize: 17,
//     fontWeight: '350',
//   },
//   visibilityIcon: {
//     position: 'absolute',
//     right: 10,
//     top: '50%',
//     transform: [{ translateY: -12 }],
//   },
// });

