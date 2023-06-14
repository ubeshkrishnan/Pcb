import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Url } from '../../../../Global_Variable/api_link';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../../store/Reviewstore';

const ReviewData = ({ route, navigation }) => {

  const store = useSelector(store => store.counter)
  const dispatch =useDispatch();
  // console.log(store.location, "reviewdata check")
  
  const [selectedSampleType, setSelectedSampleType] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState('');
  const [users, setUsers] = useState([]);
  const { data } = route.params;
  const [dropdownData, setDropdownData] = useState([]);
  const [datas, setData] = useState({

    sample_type: '',
    longitude: '',
    latitude: '',
    turbidity: '',
    serial_no: '',
    point_of_collection: '',
    collection_time: '',
    container: '',
    sampled_by: '',
    color: '',
    treatment_type: '',
  });
  const handleImageClick = () => {
    navigation.navigate('CameraPopup');
    console.log('CameraPopup');
  };

  const handleSave = () => {
    // Perform save logic here
    console.log('Save button clicked');
    console.log('Data:', data);
  };

  const fetchDropdownData = () => {
    fetch(Url + 'reviewdataview')
      .then(response => response.json())
      .then(data => setDropdownData(data))
      .catch(error => console.log('Error fetching dropdown data:', error));
  };
  useEffect(() => {
    fetchDropdownData();

  }, []);
  useEffect(() => {
    setData({ ...datas, longitude: store.location.longitude, latitude: store.location.latitude })
    return()=>{
      // console.log("lat long")
      setData({ ...datas, longitude:'', latitude: ''})
      dispatch(updateLocation({
        latitude:'',
        longitude: '',
      }));
    }
  }, [store.location])

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
              <TextInput style={styles.input} value={data?.sampleType} onChangeText={(text) => setData({ ...data, sampleType: text })} />
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
              <Text style={styles.label}>Collection Time </Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>container</Text>
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
              <Text style={styles.label}>Latitude</Text>
              <TextInput style={styles.input} value={datas?.latitude?.toString()} onChangeText={(text) => setData({ ...data, latitude: text })} />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Turbidity</Text>
              <TextInput style={styles.input} value={datas?.turbidity} onChangeText={(text) => setData({ ...data, turbidity: text })} />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Longitude</Text>
              <TextInput style={styles.input} value={datas?.longitude?.toString()} onChangeText={(text) => setData({ ...data, longitude: text })} />
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
          <Button title="Save" onPress={handleSave} color="green" />
          <Button title="Cancel" onPress={() => navigation.goBack()} color="red" />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black'
  },
  inputColumn: {
    flex: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: 'black'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',

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
    color: 'black',
  },
  buttonRow: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
  },
  draft: {
    Color: 'black'
  },
  captureButtonBg: {
    backgroundColor: 'grey',
    height: 100,
    width: 200,
  },

  captureButton: {
    backgroundColor: 'grey',
    borderRadius: 25,
    color: 'blue',

  },
  picker: {
    borderColor: 'black',
    backgroundColor: 'grey',
    height: 10,
  },
});
export default ReviewData;
