import React, {useEffect, useState ,useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch} from 'react-redux';
import {updateLocation} from '../../../store/Reviewstore';
import { DataContext } from '../../../context/DataContext';

const CameraPopup = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [cameraPhoto, setCameraPhoto] = useState('');
  const [location, setLocation] = useState(null);
  const [viewLocation, setViewLocation] = useState([]);
  const [imagesTaken, setImagesTaken] = useState(0); // New state variable to count images taken
  const [imageTimestamp, setImageTimestamp] = useState(null); // New state variable to store image timestamp
  const { appData, setAppData}=useContext(DataContext);

  const handleReviewData = () => {
    navigation.navigate('ReviewData',{data:route?.param?.data})
    };

  const openCamera = async () => {
    try {
      if (imagesTaken === 3) {
        // Navigate back if three images are already taken
        navigation.goBack();
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
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
              const imageUri = response.assets[0].uri;
              setCameraPhoto(imageUri);
              setImagesTaken(prevImagesTaken => prevImagesTaken + 1); // Increment the counter

              // Log the data
              console.log('Captured Image Data:');
              console.log('Timestamp:', new Date()); // Use new Date() directly
              console.log('Image URI:', imageUri);
              console.log('Location:', location);
            }
          });
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Camera permission denied');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('Camera permission denied - do not ask again');
          showAppSettings();
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
              setAppData({...appData,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                currentTime: currentTime,
                  })
              // dispatch(
              //   updateLocation({
              //     latitude: position.coords.latitude,
              //     longitude: position.coords.longitude,
              //     currentTime: currentTime,
              //   })
              // );
              // setLocation({
              //   latitude: position.coords.latitude,
              //   longitude: position.coords.longitude,
              // });
             // setViewLocation([{ ...location }]);
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

  const showAppSettings = () => {
    // Logic to navigate to app settings
  };

  return (
    <View style={styles.imagecontainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={openCamera}
        disabled={imagesTaken === 3}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      {cameraPhoto ? (
        <Image style={styles.imageStyles} source={{uri: cameraPhoto}} />
      ) : null}
      <Button
        title={`Capture (${imagesTaken} / 3)`} // Show the image count
        onPress={()=>handleReviewData()}
        disabled={!cameraPhoto || !location || imagesTaken !== 3} // Disable the button until three images are captured
      >
        Capture
      </Button>
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate(appData.lastScreen,{data:route?.param?.data});
        }}
      />
      {appData && (
        <View style={styles.locationContainer}>
          <Text style={styles.geolocation}>Latitude: {appData.latitude}</Text>
          <Text style={styles.geolocation}>
            Longitude: {appData.longitude}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
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
  },
  captureButton: {
    backgroundColor: 'grey',
    borderRadius: 25,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
});

export default CameraPopup;
