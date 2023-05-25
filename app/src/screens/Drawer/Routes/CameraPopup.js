import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const CameraPopup = () => {
  const [cameraPhoto, setCameraPhoto] = useState('');
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
const [viewLocation, setViewLocation] = useState([]);

const handleReviewData = () => {
  navigation.navigate('ReviewData', { viewLocation });
};
  useEffect(() => {
    // Get the user's current geolocation
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              setViewLocation([
                {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              ]);
            },
            error => {
              console.log('Error getting geolocation:', error);
            }
          );
          
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  // const handleReviewData = () => {
  //   navigation.navigate('ReviewData');
  // };

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          saveToPhotos: true,
          mediaType: 'photo',
          cameraType: 'back', // Set cameraType to 'back' for rear-facing camera
        };
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled camera picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets.length > 0) {
            setCameraPhoto(response.assets[0].uri);
          }
        });
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Camera permission denied');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Camera permission denied - do not ask again');
        showAppSettings();
      }
    } catch (err) {
      console.warn(err);
    }
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log('Error getting geolocation:', error);
      }
    );
    setLocationVisible(true);
  };

  const showAppSettings = () => {
    // Logic to navigate to app settings
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      {cameraPhoto ? (
        <Image style={styles.imageStyles} source={{ uri: cameraPhoto }} />
      ) : null}
      <Button
  title="Capture"
  onPress={handleReviewData}
  disabled={!cameraPhoto || !location}
>
  Capture
</Button>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {location && (
        <View style={styles.locationContainer}>
  <Text style={styles.geolocation}>
    Latitude: {location.latitude.toFixed(6)}
  </Text>
  <Text style={styles.geolocation}>
    Longitude: {location.longitude.toFixed(6)}
  </Text>
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageStyles: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  geolocation: {
    color: 'red',
    marginBottom: 10,
  },
  showGeolocation: {
    display: 'flex',
  },
  locationContainer: {
    marginTop: 10,
  },
  showGeolocation: {
    marginTop: 10,
  }
});


export default CameraPopup;
