import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Url } from '../../../../Global_Variable/api_link';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../../store/Reviewstore';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';

const ReviewData = ({ route, navigation }) => {
  const store = useSelector((store) => store.counter);
  const dispatch = useDispatch();

  const [selectedSampleType, setSelectedSampleType] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState('');
  const [selectedTreatmentType, setSelectedTreatmentType] = useState(null);
  const [users, setUsers] = useState([]);
  const { data } = route.params;
  const [dropdownPoc, setDropdownPoc] = useState([]);
  const [dropdownTreatment, setDropdownTreatment] = useState([]);
  const [dropdownContainer, setDropdownContainer] = useState([]);

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
    console.log('Save button clicked');
    console.log('Data:', data);

    const payload = {
      schedule_type: data.schedule_type,
      longitude: data.longitude,
      latitude: data.latitude,
      turbidity: data.turbidity,
      serial_no: data.serial_no,
      point_of_collection: data.point_of_collection,
      collection_time: data.collection_time,
      container: selectedContainerType,
      sampled_by: data.sampled_by,
      color: data.color,
      treatment_type: selectedTreatmentType,
    };

    fetch(Url + 'reviewdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Response:', result);
      })
      .catch((error) => {
        console.log('Error inserting data:', error);
      });
  };

  const fetchReviewPocData = async () => {
    try {
      const res = await axios.get(Url + '/reviewpoc');
      // console.log(res.data);
      setDropdownPoc(res.data);
    } catch (error) {
      console.error('Error fetching point of collection options', error);
    }
  };
  const fetchReviewContainerData = async () => {
    try {
      const res = await axios.get(Url + '/reviewcontainer');
      // console.log(res.data);
      setDropdownContainer(res.data);
    } catch (error) {
      console.error('Error fetching point of collection options', error);
    }
  };

  const fetchReviewTreatmentData = async () => {
    try {
      const res = await axios.get(Url + '/reviewtreatment');
      // console.log(res.data);
      setDropdownTreatment(res.data);
    } catch (error) {
      console.error('Error fetching review treatment data', error);
    }
  };

  useEffect(() => {
    fetchReviewPocData();
    fetchReviewTreatmentData();
    fetchReviewContainerData();
  }, []);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      longitude: store.location.longitude,
      latitude: store.location.latitude,
    }));
  }, [store.location]); // Add store.location as a dependency


  useEffect(() => {
    return () => {
      setData({
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

      dispatch(
        updateLocation({
          latitude: '',
          longitude: '',
        })
      );
    };
  }, []);

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
              <Text style={styles.label}>Schedule Type</Text>
              <TextInput style={styles.input} value={data?.schedule_type} onChangeText={(text) => setData({ ...data, sampleType: text })} />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Sample Type</Text>
              <SelectDropdown
                data={dropdownPoc.map((item) => item.poc_type)}
                defaultValue={selectedSampleType}
                onSelect={(selectedItem) => setSelectedSampleType(selectedItem)}
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                buttonTextStyle={styles.dropdownButtonText}
                renderDropdownIcon={() => <Text style={styles.dropdownIcon}>▼</Text>}
                dropdownStyle={styles.dropdownContainer}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
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
              <SelectDropdown
                data={dropdownContainer.map((item) => item. container_type)}
                defaultValue={selectedContainerType}
                onSelect={(selectedItem) => setSelectedContainerType(selectedItem)}
                buttonStyle={styles.dropdownButton}
                renderDropdownIcon={() => <Text style={styles.dropdownIcon}>▼</Text>}
                buttonTextStyle={styles.dropdownButtonText}
                dropdownStyle={styles.dropdownContainer}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
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
              <SelectDropdown
                data={dropdownTreatment.map((item) => item.treatment_type)}
                defaultValue={selectedTreatmentType}

                onSelect={(selectedItem) => setSelectedTreatmentType(selectedItem)}

                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) => selectedItem}

                buttonTextStyle={styles.dropdownButtonText}
                renderDropdownIcon={() => <Text style={styles.dropdownIcon}>▼</Text>}
                dropdownStyle={styles.dropdownContainer}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Button title="Draft" onPress={() => console.log('Drafts')} color="black" />
          <Button title="Submit" onPress={handleSave} color="green" />
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
    color: 'black',
  },
  inputColumn: {
    flex: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
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
    color: 'black',
  },
  captureButtonBg: {
    backgroundColor: 'grey',
    height: 100,
    width: 200,
    marginTop: 30,
    borderRadius: 20,
  },
  captureButton: {
    borderRadius: 25,
    color: 'black',
    textAlign: 'center',
    paddingTop: 30,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  picker: {
    borderColor: 'black',
    backgroundColor: 'grey',
    height: 10,
  },
  dropdownIcon: {
    color: 'black',
  },
});

export default ReviewData;