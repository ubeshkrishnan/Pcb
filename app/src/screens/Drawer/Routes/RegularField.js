import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';

const RegularField = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [regularFieldValue, setRegularFieldValue] = useState('');

  const toggleModal = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleRegularFieldValueChange = (value) => {
    setRegularFieldValue(value);
  };

  const handleAddRegularField = () => {
    // Do something with the regularFieldValue, such as saving it or using it in the parent component
    console.log('Regular Field Value:', regularFieldValue);
    toggleModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={{ color: 'blue' }}>Add</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} onRequestClose={toggleModal}>
        <View>
          <Text style={{ color: 'red' }}>Add Regular Field</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'red', paddingHorizontal: 10 }}
            placeholder="Regular Field Value"
            value={regularFieldValue}
            onChangeText={handleRegularFieldValueChange}
          />
          <TouchableOpacity onPress={handleAddRegularField}>
            <Text>Add Field</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{ color: 'blue' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default RegularField;
