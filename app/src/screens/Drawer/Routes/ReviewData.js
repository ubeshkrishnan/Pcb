import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Url } from '../../../../Global_Variable/api_link';
import { useDispatch, useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import {resetLocation} from '../../../store/Reviewstore';
import { DataContext } from '../../../context/DataContext';

const ReviewData = ({ route, navigation }) => {
  const store = useSelector(store => store.counter);
  const { appData, setAppData}=useContext(DataContext);
  const dispatch = useDispatch();

  const [selectedSampleType, setSelectedSampleType] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState('');
  const [selectedTreatmentType, setSelectedTreatmentType] = useState('');
  const [selectedPocType, setselectedPocType] = useState('');
  const [selectedTurbidityType, setselectedTurbidityType] = useState('');
  const [selectedColorType, setselectedColorType] = useState('');

  const [users, setUsers] = useState([]);
  const { data } = route?.params;
  const [dropdownSample, setDropdownSample] = useState([]);
  const [dropdownColor, setDropdownColor] = useState([]);
  const [dropdownTurbitidy, setDropdownTurbidity] = useState([]);
  const [dropdownPoc, setDropdownPoc] = useState([]);
  const [dropdownTreatment, setDropdownTreatment] = useState([]);
  const [dropdownContainer, setDropdownContainer] = useState([]);

  const initialData={
      schedule_type: data?.schedule_type,
      longitude: appData?.longitude,
      latitude: appData?.latitude,
      turbidity: '',
      serial_no:  data?.serial_no,
      point_of_collection: '',
      collection_time: '',
      container: '',
      employee_id:  data?.employee_id,
      color: '',
      treatment_type: '',
    }
  
  const [datas, setData] = useState(initialData);

  useEffect(() => {
    data && setData({
      ...data,
      longitude: store.location.longitude,
      latitude: store.location.latitude,
      collection_time: store.location.currentTime,
    });
  }, [store]);

  const handleImageClick = () => {
    setAppData({...appData,lastScreen:'ReviewData'})
    navigation.navigate('CameraPopup',{data:route?.params?.data});
  };

  useEffect(() => {

    if (route.params.sampleId)
      fetchData();
  }, [route.params]);

 const handleSave = () => {
    const payload = {
      schedule_type: datas.schedule_type,
      sample_type:selectedSampleType,
      longitude: datas.longitude,
      latitude: datas.latitude,
      turbidity: selectedTurbidityType,
      serial_no: datas.serial_no,
      point_of_collection: selectedPocType,
      collection_time: datas.collection_time,
      container: selectedContainerType,
      sampled_by: datas.employee_id,
      color: selectedColorType,
      treatment_type: selectedTreatmentType,
    };
    fetch(Url + '/reviewdata/' + route.params.sampleId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Response:', result);
        // Show success alert
        Alert.alert('Success', 'Data saved successfully');
      })
      .catch((error) => {
        console.log('Error updating data:', error);
        // Show error alert
        Alert.alert('Error', 'Failed to update data');
      });
    
  }
  // const validateForm = () => {
  //   for (const key in datas) {
  //     if (datas[key] === '') {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const fetchReviewPocData = async () => {
    try {
      const res = await axios.get(Url + '/reviewpoc');
      setDropdownPoc(res.data);
    } catch (error) {
      console.error('Error fetching point of collection options', error);
    }
  };

  const fetchReviewContainerData = async () => {
    try {
      const res = await axios.get(Url + '/reviewcontainer');
      setDropdownContainer(res.data);
    } catch (error) {
      console.error('Error fetching point of collection options', error);
    }
  };

  const fetchReviewTreatmentData = async () => {
    try {
      const res = await axios.get(Url + '/reviewtreatment');
      setDropdownTreatment(res.data);
    } catch (error) {
      console.error('Error fetching review treatment data', error);
    }
  };
  const fetchReviewSampleTypeData = async () => {
    try {
      const res = await axios.get(Url + '/reviewsampletype');
        setDropdownSample(res.data);
    } catch (error) {
      console.error('Error fetching review treatment data', error);

    }
  };
  const fetchReviewColorData = async () => {
    try {
      const res = await axios.get(Url + '/reviewcolor');
      setDropdownColor(res.data);
    } catch (error) {
      console.error('Error fetching review treatment data', error);
    }
  };

  const fetchReviewTurbidityData = async () => {
    try {
      const res = await axios.get(Url + '/reviewturbidity');
      setDropdownTurbidity(res.data);
    } catch (error) {
      console.error('Error fetching review treatment data', error);
    }
  };
  useEffect(() => {
    fetchReviewPocData();
    fetchReviewTreatmentData();
    fetchReviewContainerData();
    fetchReviewSampleTypeData();
    fetchReviewColorData();
    fetchReviewTurbidityData();
  }, []);

  useEffect(() => {
    setData({...datas, latitude: appData.latitude,
    longitude: appData.longitude,
    collection_time:appData.currentTime})
   },[appData]);

  const onHandleCancel=()=>{
    setAppData({...appData, latitude: '',
    longitude: '',
    currentTime: ''})
    setData(initialData);
    navigation.goBack()
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.captureButtonBg}
            onPress={()=>handleImageClick()}>
            <MaterialIcons
              style={styles.captureButton}
              name="photo-camera"
              size={32}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Schedule Type</Text>
              <TextInput
                style={styles.input}
                value={datas?.schedule_type}
                onChangeText={text => setData({ ...datas, schedule_type: text })}
              />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Sample Type</Text>
              <SelectDropdown
              data={dropdownSample}
                defaultValue={selectedSampleType}
                onSelect={selectedItem => setSelectedSampleType(selectedItem.sample_type_id)}
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) =>
                selectedItem.sample_type}
                buttonTextStyle={styles.dropdownButtonText}
                rowTextForSelection={(item, index) => item.sample_type}
                renderDropdownIcon={() => (
                  <Text style={styles.dropdownIcon}>▼</Text>
                )}
                dropdownStyle={styles.dropdownContainer}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Serial No</Text>
              <TextInput
                style={styles.input}
                value={datas?.serial_no}
                onChangeText={text => setData({ ...datas, serial_no: text })}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Point of collection</Text>
              <SelectDropdown
                data={dropdownPoc}
                defaultValue={selectedPocType}
                onSelect={selectedItem => setselectedPocType(selectedItem.poc_id)}
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={selectedItem => selectedItem.poc_type}
                buttonTextStyle={styles.dropdownButtonText}
                rowTextForSelection={(item, index) => item.poc_type}
                renderDropdownIcon={() => (
                  <Text style={styles.dropdownIcon}>▼</Text>
                )}
                dropdownStyle={styles.dropdownContainer}
      
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.labelcollect}>
                Collection Time
              </Text>
              <TextInput type='date' style={styles.input} value={datas.collection_time} />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Container</Text>

              <SelectDropdown
                data={dropdownContainer}
                defaultValue={selectedContainerType}
                onSelect={selectedItem =>
                  setSelectedContainerType(selectedItem.container_type_id)
                }
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) =>
                selectedItem.container_type
                }
                rowTextForSelection={(item, index) => item.container_type}
                renderDropdownIcon={() => (
                  <Text style={styles.dropdownIcon}>▼</Text>
                )}
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
              <TextInput
                style={styles.input}
                value={datas?.employee_id}
                onChangeText={text => setData({ ...datas, employee_id: text })}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Color</Text>
              <SelectDropdown
                data={dropdownColor}
                defaultValue={selectedColorType}
                onSelect={selectedItem => setselectedColorType(selectedItem.sample_color_id)}
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={selectedItem => selectedItem.sample_color}
                rowTextForSelection={(item, index) => item.sample_color}
                buttonTextStyle={styles.dropdownButtonText}
                renderDropdownIcon={() => (
                  <Text style={styles.dropdownIcon}>▼</Text>
                )}
                dropdownStyle={styles.dropdownContainer}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Latitude</Text>
              <TextInput
                style={styles.input}
                value={datas?.latitude?.toString()}
                onChangeText={text => setData({ ...datas, latitude: text })}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Turbidity</Text>
              <SelectDropdown
                data={dropdownTurbitidy}
                defaultValue={selectedTurbidityType}
                onSelect={selectedItem =>
                  setselectedTurbidityType(selectedItem.sample_turbidity_id)
                }
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={selectedItem => selectedItem.sample_turbidity}
                buttonTextStyle={styles.dropdownButtonText}
                rowTextForSelection={(item, index) => item.sample_turbidity}
                renderDropdownIcon={() => (
                  <Text style={styles.dropdownIcon}>▼</Text>
                )}
                dropdownStyle={styles.dropdownContainer}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Longitude</Text>
              <TextInput
                style={styles.input}
                value={datas?.longitude?.toString()}
                onChangeText={text => setData({ ...datas, longitude: text })}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Treatment Type</Text>
              <SelectDropdown
                data={dropdownTreatment}
                defaultValue={selectedTreatmentType}
                onSelect={selectedItem =>
                  setSelectedTreatmentType(selectedItem.treatment_type_id)
                }
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={selectedItem => selectedItem.treatment_type}
                rowTextForSelection={(item, index) => item.treatment_type}
                buttonTextStyle={styles.dropdownButtonText}
                renderDropdownIcon={() => (
                  <Text style={styles.dropdownIcon}>▼</Text>
                )}
                dropdownStyle={styles.dropdownContainer}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Button
            title="Draft"
            onPress={() => console.log('Drafts')}
            color="black"
          />
          <Button title="Submit" onPress={handleSave} color="green" />
          <Button
            title="Cancel"
            onPress={() => onHandleCancel()}
            color="red"
          />
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
    backgroundColor: 'red',
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
  labelcollect: {
    color: 'black',
  },
});

export default ReviewData;
