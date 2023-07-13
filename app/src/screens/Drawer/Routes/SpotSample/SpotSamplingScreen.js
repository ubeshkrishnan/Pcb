import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Url } from '../../../../../Global_Variable/api_link';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../../../context/DataContext';

const SpotSamplingScreen = () => {
  const { appData, setAppData } = useContext(DataContext);
  const initialState = {
    serial_no: '',
    point_of_collection: null,
    collection_time: appData.currentTime,
    latitude: appData.latitude,
    longitude: appData.longitude,
  };
  const [pointOfCollectionOptions, setPointOfCollectionOptions] = useState([]);
  const [inputValues, setInputValues] = useState(initialState);

  const handleInputChange = (title, value) => {
    setInputValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const [dropdownData, setDropdownData] = useState([]);
  const navigation = useNavigation();

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
        // Handle the response data here
      })
      .catch((error) => {
        console.error(error);
        showAlert('Error', 'An error occurred while saving the data.');
      });
  };

  const handleCancel = () => {
    setInputValues(initialState);
    navigation.goBack();
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handleImageClick = () => {
    setAppData({ ...appData, lastScreen: 'ModalRegularChild' });
    navigation.navigate('CameraPopup', { data: { parentLastScreen: 'modalRegularChild' } });
  };

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.captureButtonBg} onPress={() => handleImageClick()}>
          <MaterialIcons style={styles.captureButton} name="photo-camera" size={32} color="black" />
        </TouchableOpacity>
        <Text style={{ color: '#888' }}>Capture Picture</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Serial No</Text>
        <TextInput
          style={styles.input}
          placeholder="Serial No"
          placeholderTextColor="#CCCCCC"
          value={inputValues.serial_no}
          onChangeText={(value) => handleInputChange('serial_no', value)}
        />

        <Text style={styles.label}>Point Of Collection</Text>
        <View style={styles.picker}>
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

        </View>

        <Text style={styles.label}>Collection Time Stamp</Text>
        <TextInput
          style={styles.input}
          placeholder="Collection Time Stamp"
          placeholderTextColor="#CCCCCC"
          value={inputValues.collection_time}
          onChangeText={(text) => handleInputChange('collection_time', text)}
        />

        <Text style={styles.label}>Latitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          placeholderTextColor="#CCCCCC"
          value={inputValues.latitude.toString()}
          onChangeText={(text) => handleInputChange('latitude', text)}
        />

        <Text style={styles.label}>Longitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          placeholderTextColor="#CCCCCC"
          value={inputValues.longitude.toString()}
          onChangeText={(text) => handleInputChange('longitude', text)}
        />

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <View style={styles.buttonSpacer} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SpotSamplingScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 200,
    height: 40,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    color: 'black',

  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    // color: 'black',
    color: '#888',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttonSpacer: {
    width: 20,
    marginTop: 10,
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 200,
    height: 40,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    color: 'red',
  },
  dropdownContainer: {
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 200,
    height: 40,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
  },
  dropdownButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
  },
  dropdownButtonText: {
    color: 'black',
    fontSize: 16,
  },
  dropdown: {
    width: 200,
    maxHeight: 200,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  dropdownRow: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownRowText: {
    fontSize: 16,
    color: 'black',
  },
  // camera
  captureButtonBg: {
    backgroundColor: 'grey',
    height: 100,
    width: 200,
    marginTop: 10,
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
    // marginBottom: 8,
  },
});
