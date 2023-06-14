import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Url } from '../../../../Global_Variable/api_link';
import SelectDropdown from 'react-native-select-dropdown';

const ModalRegularChild = ({ visible, item, setcards }) => {
  const [inputValues, setInputValues] = useState({
    serial_no: '',
    point_of_collection: null,
    collection_time: '',
    latitude: '',
    longitude: '',
  });

  const [pointOfCollectionOptions, setPointOfCollectionOptions] = useState([]);

  const navigation = useNavigation();

  const handleInputChange = (title, value) => {
    setInputValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

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

  const handleSave = () => {
    const postData = {
      serial_no:inputValues.serial_no,
      poc_val: inputValues.point_of_collection ? inputValues.point_of_collection.poc_id : null,
      collection_time_val: inputValues.collection_time,
      latitude_val: inputValues.latitude,
      longitude_val: inputValues.longitude,
    };
console.log(postData,'post data')
    fetch(Url + '/modalregular', {
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPointOfCollectionOptions = async () => {
    try {
      const response = await fetch(Url + '/pointofcollectionoptions');
      const data = await response.json();
      setPointOfCollectionOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPointOfCollectionOptions();
  }, []);
  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.inputField}
            value={inputValues.serial_no}
            onChangeText={(value) => handleInputChange('serial_no', value)}
            placeholder="Serial No"
            placeholderTextColor="black"
          />
          <SelectDropdown
            data={pointOfCollectionOptions}
            onSelect={(selectedItem) => handleInputChange('point_of_collection', selectedItem)}
            defaultButtonText="Select Point of Collection"
            buttonTextAfterSelection={(selectedItem) => selectedItem.poc_type}
            rowTextForSelection={(item, index) => {
              return item.poc_type

            }}
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
            value={inputValues.latitude}
            onChangeText={(value) => handleInputChange('latitude', value)}
            placeholder="Latitude"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.longitude}
            onChangeText={(value) => handleInputChange('longitude', value)}
            placeholder="Longitude"
            placeholderTextColor="black" />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonLabelSave}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonLabelCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalRegularChild;


const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  inputField: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 200,
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 7,
    width: 55,
    height: 20,
  },
  dropdownIcon: {
    color: 'black',
    fontSize: 20,
  },
  buttonLabelSave: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    marginTop: 10,
    width: 54,
    height: 20,
  },
  buttonLabelCancel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Dropdowns
  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'grey',
  },
  dropdownOptionLabel: {
    fontSize: 16,

  },
  dropdownContainer: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 200,
    height: 50,

  },
  dropdownValue: {
    color: 'gray',

  },
  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'grey',
  },
  dropdownOptionLabel: {
    fontSize: 16,
  },
};


