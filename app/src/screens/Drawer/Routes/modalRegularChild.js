import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Url } from '../../../../Global_Variable/api_link';

const ModalRegularChild = ({ visible, item, setcards }) => {
  const [inputValues, setInputValues] = useState({
    serialno: '',
    pointofcollection: '',
    collectiontime: '',
    latitude: '',
    longitude: '',
  });

  const [pointOfCollectionOptions, setPointOfCollectionOptions] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigation = useNavigation();

  const handleInputChange = (title, value) => {
    setInputValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleCancel = () => {
    setInputValues({});
    navigation.goBack();
  };

  const handleSave = () => {
    const postData = {
      ...inputValues,
    };

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
        // console.log(item.length, 'asdad');
        // console.log(inputValues, 'daaata');
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
            value={inputValues.serialno}
            onChangeText={(value) => handleInputChange('serialno', value)}
            placeholder="Serial No"
            placeholderTextColor="black"
          />

          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text style={styles.dropdownLabel}>Point Of Collection</Text>
            <Text style={styles.dropdownValue}>{inputValues.pointofcollection}</Text>
          </TouchableOpacity>
          {/* Render the dropdown options */}
          {dropdownOpen && (
            <View style={styles.dropdownOptionsContainer}>
            {pointOfCollectionOptions.map((option) => (
  <TouchableOpacity
    key={option.poc_id}
    style={styles.dropdownOption}
    onPress={() => handleInputChange('pointofcollection', option.poc_type)}
  >
    <Text style={styles.dropdownOptionLabel}>{option.poc_type}</Text>
  </TouchableOpacity>
))}

            </View>
          )}

          <TextInput
            style={styles.inputField}
            value={inputValues.collectiontime}
            onChangeText={(value) => handleInputChange('collectiontime', value)}
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
            placeholderTextColor="black"
          />

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


