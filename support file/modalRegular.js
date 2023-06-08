import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ModalRegular = ({ visible, item, setcards }) => {
  const [inputValues, setInputValues] = useState({
    serialno: '',
    companyname: '',
    taluk: '',
    village: '',
    sample: '',
    category: '',
    scheduletype: '',
    sampletype: '',
  });

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
      ...inputValues
    };

    fetch(Url+'/modalregular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
        // Update the state or perform any other necessary actions
        item.push(inputValues);
        setcards(item);
        console.log(item.length, 'asdad');
        console.log(inputValues, 'daaata');
      })
      .catch(error => {
        console.error(error);
        // Handle the error
      });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.inputField}
            value={inputValues.serialno}
            onChangeText={value => handleInputChange('serialno', value)}
            placeholder="Serial No"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.companyname}
            onChangeText={value => handleInputChange('companyname', value)}
            placeholder="Company name"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.taluk}
            onChangeText={value => handleInputChange('taluk', value)}
            placeholder="Region/Taluk"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.village}
            onChangeText={value => handleInputChange('village', value)}
            placeholder="Village"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.sample}
            onChangeText={value => handleInputChange('sample', value)}
            placeholder="No.of.Samples"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.category}
            onChangeText={value => handleInputChange('category', value)}
            placeholder="Category"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.scheduletype}
            onChangeText={value => handleInputChange('scheduletype', value)}
            placeholder="Schedule Type"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.inputField}
            value={inputValues.sampletype}
            onChangeText={value => handleInputChange('sampletype', value)}
            placeholder="Sample Type"
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

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
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
};

export default ModalRegular;
