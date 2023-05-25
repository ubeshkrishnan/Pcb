import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const ReviewData = () => {
  const [selectedSampleType, setSelectedSampleType] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState('');
  const navigation = useNavigation();

  const handleImageClick = () => {
    // Navigate to the CameraPopup component or perform any other action
    // For simplicity, let's assume you're using React Navigation and want to navigate to CameraPopup
    // this.props.navigation.navigate('CameraPopup');
    navigation.navigate('CameraPopup');
    console.log('CameraPopup');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.captureButtonBg} onPress={handleImageClick}>
            <MaterialIcons style={styles.captureButton} name="photo-camera" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Sample Type</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Sample Type</Text>
              <Picker
                selectedValue={selectedSampleType}
                onValueChange={(itemValue) => setSelectedSampleType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Option 1" value="option1" />
                <Picker.Item label="Option 2" value="option2" />
                <Picker.Item label="Option 3" value="option3" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Serial No</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Point of collection</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Collection Time</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Container</Text>
              <Picker
                selectedValue={selectedContainerType}
                onValueChange={(itemValue) => setSelectedContainerType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Option 1" value="option1" />
                <Picker.Item label="Option 2" value="option2" />
                <Picker.Item label="Option 3" value="option3" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Sampled by</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Color</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Latitute</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Turbidity</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Longitude</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Treatment Type</Text>
              <Picker
                selectedValue={selectedSampleType}
                onValueChange={(itemValue) => setSelectedSampleType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Option 1" value="option1" />
                <Picker.Item label="Option 2" value="option2" />
                <Picker.Item label="Option 3" value="option3" />
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Button title="Drafts" onPress={() => console.log('Drafts')} color="black" />
          <Button title="Save" onPress={() => console.log('Save')} color="green" />
          <Button title="Cancel" onPress={() =>{navigation.goBack()}} color="red" />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color:'black'
  },
  inputColumn: {
    flex: 1,

    marginBottom:20,
  },
  label: {
    fontSize: 16,
    color:'black'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color:'black',
    // height:20,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 220,
    height: 120,
  },
  inputContainer: {
    width: '80%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    // flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    color:'black',
  },
  buttonRow: {
    marginBottom:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
  },
  draft:{
    Color:'black'
  },
  captureButtonBg:{
backgroundColor:'grey',
height:100,
width:200,
  },
  
  captureButton:{
    backgroundColor: 'grey',
    borderRadius: 25,
    color:'blue',
  
  },
  picker: {
    borderColor: 'black',
    backgroundColor: 'black',
  },
});
export default ReviewData;