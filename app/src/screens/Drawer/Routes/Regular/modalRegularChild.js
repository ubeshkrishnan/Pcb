import React, { useState, useEffect, useContext } from 'react';
import { Animated, Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';

import { DataContext } from '../../../../context/DataContext';
import { Url } from '../../../../../Global_Variable/api_link';

const ModalRegularChild = ({ visible, item, setcards }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity of 0
  const { appData, setAppData } = useContext(DataContext);
  const navigation = useNavigation();
 // State for point of collection options
 const [pointOfCollectionOptions, setPointOfCollectionOptions] = useState([]);
 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust the duration as per your preference
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const initialState = {
    serial_no: '',
    point_of_collection: null,
    collection_time: appData.currentTime,
    latitude: appData.latitude,
    longitude: appData.longitude,
  };

  const [inputValues, setInputValues] = useState(initialState);

  const handleInputChange = (title, value) => {
    setInputValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleCancel = () => {
    setInputValues(initialState);
    navigation.goBack();
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handleSave = () => {
    const postData = {
      serial_no: inputValues.serial_no,
      created_by: 1,
      poc_val: inputValues.point_of_collection ? inputValues.point_of_collection.poc_id : null,
      collection_time_val: inputValues.collection_time,
      latitude_val: inputValues.latitude,
      longitude_val: inputValues.longitude,
    };

    console.log(postData, 'post data');

    fetch(Url + '/modalregular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = Array.isArray(item) ? [...item, inputValues] : [inputValues];
        setcards(updatedItems);
        showAlert('Success', 'Saved successfully.');
      })
      .catch((error) => {
        console.error(error);
        showAlert('Error', 'An error occurred while saving the data.');
      });
  };

  const handleImageClick = () => {
    setAppData({ ...appData, lastScreen: 'ModalRegularChild' });
    navigation.navigate('CameraPopup', { data: { parentLastScreen: 'modalRegularChild' } });
  };
  useEffect(() => {
    async function fetchPointOfCollectionOptions() {
      try {
        const response = await fetch(Url + '/pointofcollectionoptions');
        const data = await response.json();
        setPointOfCollectionOptions(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPointOfCollectionOptions();
  }, []);

  useEffect(() => setInputValues({ ...inputValues, latitude: appData?.latitude, longitude: appData?.longitude, collection_time: appData?.currentTime }), [appData]);

  return (
    <Modal visible={visible} animationType="none">
      <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.captureButtonBg} onPress={handleImageClick}>
            <MaterialIcons style={styles.captureButton} name="photo-camera" size={32} color="black" />
          </TouchableOpacity>
          <Text style={styles.captureButtonText}>Capture Picture</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.inputField}
              value={inputValues.serial_no}
              onChangeText={(value) => handleInputChange('serial_no', value)}
              placeholder="Serial No"
              placeholderTextColor="black"
              defaultValue={item?.serial_no}
            />

            <SelectDropdown
              data={pointOfCollectionOptions}
              onSelect={(selectedItem) => handleInputChange('point_of_collection', selectedItem)}
              defaultButtonText="Select Point of Collection"
              buttonTextAfterSelection={(selectedItem) => selectedItem.poc_type}
              rowTextForSelection={(item) => item.poc_type}
              buttonStyle={styles.dropdownButton}
              buttonTextStyle={styles.dropdownButtonText}
              renderDropdownIcon={() => <Text style={styles.dropdownIcon}>▼</Text>}
              dropdownStyle={styles.dropdown}
              dropdownTextStyle={styles.dropdownText}
            />

            <TextInput
              style={styles.inputField}
              value={inputValues.collection_time}
              onChangeText={(value) => handleInputChange('collection_time', value)}
              placeholder="Collection Time Stamp"
              placeholderTextColor="black"
            />

            <TextInput
              style={styles.inputField}
              value={inputValues.latitude.toString()}
              onChangeText={(value) => handleInputChange('latitude', value)}
              placeholder="Latitude"
              placeholderTextColor="black"
            />

            <TextInput
              style={styles.inputField}
              value={inputValues.longitude.toString()}
              onChangeText={(value) => handleInputChange('longitude', value)}
              placeholder="Longitude"
              placeholderTextColor="black"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonLabel}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonLabel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButtonBg: {
    backgroundColor: 'grey',
    height: 100,
    width: 200,
    marginTop: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    borderRadius: 25,
    color: 'black',
    textAlign: 'center',
    paddingTop: 30,
  },
  captureButtonText: {
    color: '#888',
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  inputField: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#EEEEEE',
  },
  dropdownButton: {
    borderWidth: 1,
borderColor: 'black',
borderRadius: 5,
padding: 10,
marginBottom: 20,
backgroundColor: 'white',
},
dropdownButtonText: {
fontSize: 16,
color: 'black',
textAlign: 'center',
},
dropdownIcon: {
color: 'black',
fontSize: 18,
textAlign: 'center',
},
dropdown: {
borderWidth: 1,
borderColor: 'black',
borderRadius: 5,
backgroundColor: 'white',
textAlign: 'center',
},
dropdownText: {
color: 'black',
textAlign: 'center',
paddingVertical: 8,
},
buttonContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginTop: 20,
},
saveButton: {
backgroundColor: 'green',
borderRadius: 10,
paddingHorizontal: 20,
paddingVertical: 10,
width: '48%',
},
cancelButton: {
backgroundColor: 'red',
borderRadius: 10,
paddingHorizontal: 20,
paddingVertical: 10,
width: '48%',
},
buttonLabel: {
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
},
});

export default ModalRegularChild;
