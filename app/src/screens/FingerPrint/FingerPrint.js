// import React, { useState } from 'react';
// import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
// import FingerprintScanner from 'react-native-fingerprint-scanner';

// const Fingerprint = () => {
//   const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);

//   const handleFingerprintAuth = () => {
//     FingerprintScanner.authenticate({
//       title: 'Fingerprint Authentication',
//       cancelButtonText: 'Cancel',
//     })
//       .then(() => {
//         // Authentication successful, proceed with login logic
//         Alert.alert('Success', 'Fingerprint Authentication Successful');
//       })
//       .catch((error) => {
//         // Authentication failed or canceled
//         console.log(error);
//         Alert.alert('Error', 'Fingerprint Authentication Failed');
//       });
//   };

//   const checkFingerprintCompatibility = () => {
//     FingerprintScanner.isSensorAvailable()
//       .then((biometryType) => {
//         if (biometryType === 'TouchID' || biometryType === 'FaceID') {
//           setIsFingerprintEnabled(true);
//         } else {
//           setIsFingerprintEnabled(false);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         setIsFingerprintEnabled(false);
//       });
//   };

//   React.useEffect(() => {
//     checkFingerprintCompatibility();

//     return () => {
//       // Cleanup any fingerprint scanner listeners
//       FingerprintScanner.release();
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {isFingerprintEnabled ? (
//         <TouchableWithoutFeedback onPress={handleFingerprintAuth}>
//           <View style={{ padding: 20, backgroundColor: 'blue' }}>
//             <Text style={{ color: 'white' }}>Tap to Authenticate with Fingerprint</Text>
//           </View>
//         </TouchableWithoutFeedback>
//       ) : (
//         <Text style={{color:'black'}}>Fingerprint authentication is not available on this device.</Text>
//       )}
//     </View>
//   );
// };

// export default Fingerprint;
 

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const Fingerprint = () => {
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const [storedFingerprints, setStoredFingerprints] = useState(null);

  useEffect(() => {
    checkFingerprintAvailability();
    loadFingerprints();
    return () => {
      FingerprintScanner.release();
    };
  }, []);

  const checkFingerprintAvailability = async () => {
    try {
      const isAvailable = await FingerprintScanner.isSensorAvailable();
      setIsFingerprintEnabled(isAvailable);
    } catch (error) {
      console.log('Fingerprint availability check error:', error);
    }
  };

  const loadFingerprints = () => {
    // Load the stored fingerprints from wherever you are storing them
    // For simplicity, we'll initialize with a predefined set of fingerprints
    const fingerprints = ['fingerprint1', 'fingerprint2', 'fingerprint3'];
    setStoredFingerprints(fingerprints);
  };

  const handleFingerprintAuth = async () => {
    try {
      if (storedFingerprints && storedFingerprints.length > 0) {
        await FingerprintScanner.authenticate({
          title: 'Login with Fingerprint',
          message: 'Scan your fingerprint to login',
          fallbackEnabled: true,
          fingerprints: storedFingerprints,
        });
        console.log('Fingerprint authentication successful');
      } else {
        console.log('No stored fingerprints found');
      }
    } catch (error) {
      console.log('Fingerprint authentication failed:', error);
    }
  };

  const registerFingerprint = async () => {
    try {
      const fingerprints = await FingerprintScanner.authenticate({
        title: 'Register Fingerprint',
        message: 'Scan your fingerprint to register',
        fallbackEnabled: true,
      });
      setStoredFingerprints(fingerprints);
      console.log('Fingerprint registration successful');
    } catch (error) {
      console.log('Fingerprint registration failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Screen</Text>
      {!isFingerprintEnabled ? (
        <Text>Fingerprint sensor not available</Text>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleFingerprintAuth}>
            <Text style={styles.buttonText}>Login with Fingerprint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={registerFingerprint}>
            <Text style={styles.buttonText}>Register Fingerprint</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Fingerprint;
