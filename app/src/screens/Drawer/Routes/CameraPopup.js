import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const Camera = () => {
  const [cameraPhoto, setCameraPhoto] = useState('');
  const navigation = useNavigation();

  const handleReviewData = () => {
    navigation.navigate('ReviewData');
  };

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
        launchCamera(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
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
  };

  const showAppSettings = () => {
    // Logic to navigate to app settings
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <Image style={styles.imageStyles} source={{ uri: cameraPhoto }} />
      <Button title="Capture" onPress={handleReviewData}>
        Capture
      </Button>

      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
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
});

export default Camera;
