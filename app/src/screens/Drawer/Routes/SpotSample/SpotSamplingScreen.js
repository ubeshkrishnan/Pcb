import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Url } from '../../../../../Global_Variable/api_link';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SpotSampling = () => {
  const [serial_no, setSerial_No] = useState(1566);
  const [point_of_collection, setPointOfCollection] = useState(null);
  const [collection_time, setCollectionTime] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const navigation = useNavigation();

  const fetchPointOfCollectionOptions = async () => {
    try {
      const response = await axios.get(Url + '/spotpointofcollection');
      setDropdownData(response.data);
    } catch (error) {
      console.error('Error fetching point of collection options', error);
    }
  };

  useEffect(() => {
    fetchPointOfCollectionOptions();
  }, []);

  const handleSave = () => {
    const data = {
      poc_val: point_of_collection ? point_of_collection.poc_id : null,
      collection_time_val: collection_time,
      latitude_val: latitude,
      longitude_val: longitude,
      serial_no: serial_no,
      created_by: 1,
    };

    console.log(data, 'post data');

    axios
      .post(Url + '/spotpostpoc', data)
      .then(response => {
        console.log('POST request successful', response.data);
        showAlert('Success', 'Saved successfully.');
      })
      .catch(error => {
        console.error('Error making POST request' + error);
        showAlert('Error', 'An error occurred while saving the data.');
      });
  };


  const handleCancel = () => {
    setSerial_No(1525);
    setPointOfCollection();
    setCollectionTime('');
    setLatitude('');
    setLongitude('');

    navigation.goBack();
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const incrementSerialNo = () => {
    setSerial_No(prevCounter => prevCounter + 1);
  };

  return (
    <Modal animationType="slide">
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.captureButtonBg} onPress={() => handleImageClick()}>
          <MaterialIcons style={styles.captureButton} name="photo-camera" size={32} color="black" />
        </TouchableOpacity>
        <Text style={{ color: '#888' }}>Capture Picture</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
          <Text style={styles.label}>Serial No</Text>
          <TextInput
            style={styles.input}
            placeholder="Serial No"
            placeholderTextColor="#CCCCCC"
            value={serial_no.toString()}
            onChangeText={() => { }}
            editable={false}
          />

          <Text style={styles.label}>Point Of Collection</Text>
          <View style={styles.picker}>
            <SelectDropdown
              data={dropdownData.map(item => item.poc_type)}
              defaultButtonText="Select Point of Collection"
              onSelect={(selectedItem, index) => setPointOfCollection(dropdownData[index])}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
              buttonStyle={styles.dropdownButton}
              buttonTextStyle={styles.dropdownButtonText}
              dropdownStyle={styles.dropdown}
              rowStyle={styles.dropdownRow}
              rowTextStyle={styles.dropdownRowText}
            />
          </View>


          <Text style={styles.label}>Collection Time Stamp</Text>
          <TextInput
            style={styles.input}
            placeholder="Collection Time Stamp"
            placeholderTextColor="#CCCCCC"
            value={collection_time}
            onChangeText={text => setCollectionTime(text)}
          />

          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            placeholderTextColor="#CCCCCC"
            value={latitude}
            onChangeText={text => setLatitude(text)}
          />

          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            placeholderTextColor="#CCCCCC"
            value={longitude}
            onChangeText={text => setLongitude(text)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <View style={styles.buttonSpacer} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default SpotSampling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 70,
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
