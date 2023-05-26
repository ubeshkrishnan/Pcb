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

  useEffect(() => {
    checkFingerprintAvailability();
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

  const handleFingerprintAuth = () => {
    FingerprintScanner.authenticate({ title: 'Login with Fingerprint' })
      .then(() => {
        // Fingerprint authentication successful
        console.log('Fingerprint authentication successful');
      })
      .catch((error) => {
        // Fingerprint authentication failed
        console.log('Fingerprint authentication failed:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Screen</Text>
      {isFingerprintEnabled && (
        <TouchableOpacity style={styles.button} onPress={handleFingerprintAuth}>
          <Text style={styles.buttonText}>Login with Fingerprint</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Fingerprint;

