import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Url } from '../../../../../Global_Variable/api_link';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ModalActionable = ({ visible, item, setcards }) => {
  // State for input values
  const [inputValues, setInputValues] = useState({
    serial_no: '',
    point_of_collection: null,
    collection_time: '',
    latitude: '',
    longitude: '',
  });

  // State for point of collection options
  const [pointOfCollectionOptions, setPointOfCollectionOptions] = useState([]);

  // Navigation hook
  const navigation = useNavigation();

  // Handle input change
  const handleInputChange = (title, value) => {
    setInputValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  // Handle cancel button press
  const handleCancel = () => {
    setInputValues({
      serial_no: '',
      point_of_collection: null,
      collection_time: '',
      latitude: '',
      longitude: '',
    });
    navigation.goBack();
  };
  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };
  // Handle save button press
  const handleSave = () => {
    // Prepare data for POST request
    const postData = {
      serial_no: inputValues.serial_no,
      created_by: 1,
      poc_val: inputValues.point_of_collection ? inputValues.point_of_collection.poc_id : null,
      collection_time_val: inputValues.collection_time,
      latitude_val: inputValues.latitude,
      longitude_val: inputValues.longitude,
    };

    console.log(postData, 'post data');

    // Send POST request
    fetch(Url + '/modalactionable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        item.push(inputValues);
        setcards(item);
        showAlert('Success', 'Saved successfully.');
      })
      .catch((error) => {
        console.error(error);
        showAlert('Error', 'An error occurred while saving the data.');
      });
  };
  // camera
  const handleImageClick = () => {
    
    navigation.navigate('CameraPopup');
    console.log('CameraPopup');
  };

  // Fetch point of collection options
  const fetchPointOfCollectionOptions = async () => {
    try {
      const response = await fetch(Url + '/pointofcollectionoptions');
      const data = await response.json();
      setPointOfCollectionOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch options on component mount
  useEffect(() => {
    fetchPointOfCollectionOptions();
  }, []);

  // Get the screen dimensions
  const { width, height } = Dimensions.get('window');
  // Render the modal component
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.captureButtonBg} onPress={handleImageClick}>
          <MaterialIcons style={styles.captureButton} name="photo-camera" size={32} color="black" />
        </TouchableOpacity>
        <Text style={{ color: '#888' }}>Capture Picture</Text>
      </View>
      <ScrollView>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.inputField}
            value={inputValues.ref_id_no}
            onChangeText={(value) => handleInputChange('serial_no', value)}
            placeholder="Serial No"
            placeholderTextColor="black"
            editable={false}
          />
          <SelectDropdown
            data={pointOfCollectionOptions}
            onSelect={(selectedItem) => handleInputChange('point_of_collection', selectedItem)}
            defaultButtonText="Select Point of Collection"
            buttonTextAfterSelection={(selectedItem) =>
              selectedItem.poc_type}
            rowTextForSelection={(item, index) => item.poc_type}
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
            editable={false}
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.latitude}
            onChangeText={(value) => handleInputChange('latitude', value)}
            placeholder="Latitude"
            placeholderTextColor="black"
            editable={false}
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.longitude}
            onChangeText={(value) => handleInputChange('longitude', value)}
            placeholder="Longitude"
            placeholderTextColor="black"
            editable={false}
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
    </Modal>
  );
};
export default ModalActionable;


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
  },
  inputField: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 30,
    width: '80%',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#EEEEEE'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    width: '60%',
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginLeft: 10,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 220,
    height: 50,
    backgroundColor: 'white',
    width: '80%',
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
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 220,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  dropdownText: {
    // fontSize: 16,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 8,
  },
  // camera
  captureButtonBg: {
    backgroundColor: 'grey',
    height: 100,
    width: 200,
    marginTop: 30,
    borderRadius: 20,
  },
  captureButton: {
    // backgroundColor: 'grey',
    borderRadius: 25,
    color: 'black',
    textAlign: "center",
    paddingTop: 30,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
});



