import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Button, Modal, Dimensions } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { DataContext } from '../../../context/DataContext';



const CameraPopup = ({ route, navigation, isVisible, onClose }) => {
  const [location, setLocation] = useState(null);
  const [viewLocation, setViewLocation] = useState([]);
  const [capturedImages, setCapturedImages] = useState([]); // New state variable to store captured images
  const { appData, setAppData } = useContext(DataContext);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const updatedDate = new Date();
              const formattedDate = `${updatedDate.getFullYear()}-${String(
                updatedDate.getMonth() + 1
              ).padStart(2, '0')}-${String(updatedDate.getDate()).padStart(2, '0')}`;
              const formattedTime = `${String(updatedDate.getHours()).padStart(
                2,
                '0'
              )}:${String(updatedDate.getMinutes()).padStart(2, '0')}:${String(
                updatedDate.getSeconds()
              ).padStart(2, '0')}`;

              const currentTime = `${formattedDate} ${formattedTime}`;
              setAppData({
                ...appData,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                currentTime: currentTime,
              });

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

  const handleCameraCapture = (response) => {
    if (response.didCancel) {
      console.log('User cancelled camera picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      // Create a timestamp for the image
      const timestamp = new Date().toLocaleString();
      const imagesTaken = { uri: imageUri, timestamp };
      // Add the captured image to the array
      setCapturedImages(prevImages => [...prevImages, { uri: imageUri, timestamp }]);
      console.log("URLL:", imageUri);
      if (capturedImages.length < 3) {
        // Continue capturing images until we have three
        openCamera();
      } else {
        // Navigate back to the CAMERA page after capturing three images
        navigation.goBack();
      }
      // Set the capturedImages in the context
      setAppData(prevData => ({
        ...prevData,
        capturedImages: [...prevData.capturedImages, imagesTaken]
      }));
    }
  };

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          saveToPhotos: true,
          mediaType: 'photo',
          cameraType: 'back', // Set cameraType to 'back' for rear-facing camera
        };

        launchCamera(options, handleCameraCapture);
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Camera permission denied');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Camera permission denied - do not ask again');
        showAppSettings();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const showAppSettings = () => {
    // Logic to navigate to app settings
  };

  const handleReviewData = () => {
    navigation.navigate(appData.lastScreen, { data: route?.params?.data });
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={[styles.imagecontainer, { height: Dimensions.get('window').height * 0.3 }]}>
        <TouchableOpacity style={styles.button} onPress={openCamera} disabled={capturedImages.length === 3}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>

        {/* Show captured images */}
        <View style={styles.imageGrid}>
          {capturedImages.map((image, index) => (
            <Image key={index} style={styles.imageStyles} source={{ uri: image.uri }} />
          ))}
        </View>

        <Button
          title={`Capture (${capturedImages.length} / 3)`}
          onPress={handleReviewData}
          disabled={capturedImages.length !== 3}
        >
          Capture
        </Button>

        <Button title="Back" onPress={() => handleReviewData()} />

        {appData && (
          <View style={styles.locationContainer}>
            <Text style={styles.geolocation}>Latitude: {appData.latitude}</Text>
            <Text style={styles.geolocation}>Longitude: {appData.longitude}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.2, // Adjust the value here
  },
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
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageStyles: {
    width: 100,
    height: 100,
    margin: 5,
  },
  geolocation: {
    color: 'red',
    marginBottom: 10,
  },
  locationContainer: {
    marginTop: 10,
  },
});

export default CameraPopup;

