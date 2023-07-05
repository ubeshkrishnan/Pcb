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
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewData = ({ route, navigation }) => {
  const store = useSelector(store => store.counter);
  const { appData, setAppData}=useContext(DataContext);
  const dispatch = useDispatch();
  // local storage
  const [userData, setUserData] = useState('');
  const [employeeIds, setEmployeeIds] = useState('');
  const [capturedImages, setCapturedImages] = useState([]);
  const [imagesTaken, setImagesTaken] = useState(0);

  const [selectedSampleType, setSelectedSampleType] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState('');
  const [selectedTreatmentType, setSelectedTreatmentType] = useState('');
  const [selectedPocType, setselectedPocType] = useState('');
  const [selectedTurbidityType, setselectedTurbidityType] = useState('');
  const [selectedColorType, setselectedColorType] = useState('');

  const [users, setUsers] = useState([]);
  // console.log('ReivewRoute',route.params.data)
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
      employee_id:  '',
      color: '',
      treatment_type: '',
    }
  
  const [datas, setData] = useState(initialData);

  const handleImageClick = () => {
    setAppData({ ...appData, lastScreen: 'ReviewData' });
    navigation.navigate('CameraPopup', { data:route?.params?.data })
    capturedImages: capturedImages;
    imagesTaken: imagesTaken;
    setCapturedImages: setCapturedImages;
    setImagesTaken: setImagesTaken;
  };
  
  const handleSave = async  () => {
    // console.log(data,"datttaa");
    
    if (data && data?.sample_id) {
      const payload = {
        sample_type: selectedSampleType,
        longitude: datas.longitude,
        latitude: datas.latitude,
        turbidity: selectedTurbidityType,
        serial_no: datas.serial_no,
        point_of_collection: selectedPocType,
        collection_time: datas.collection_time,
        container: selectedContainerType,
        employee_id: userData.user_id,
        color: selectedColorType,
        treatment_type: selectedTreatmentType,
      };
      console.log(payload, "payy"); 
      console.log(data?.sample_id, "payy"); 

      axios
        .put(`${Url}/reviewdata/${data?.sample_id}`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // console.log('URL:',data?.sample_id);
          console.log('Response:', response.data);
          // Show success alert
          Alert.alert('Success', 'Data saved successfully');
        })
        .catch((error) => {
          // console.log('URL:',data?.sample_id);
          console.log('Error updating data:', error);
          // Show error alert
          Alert.alert('Error', 'Failed to update data');
        });
    } else {
      console.log('Sample ID not available.');
    }
  };

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
    const fetchData =async  () => {
      try {
      const  data = await AsyncStorage.getItem("userDetails")
      if (data) {
        setUserData(JSON.parse(data));
      }
      // console.log("DEE:",data);
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };
  fetchData();
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
  
  const renderEmployeeIds = () => {
   
    return employeeIds.map((id) => (
      <Text key={id} style={styles.employee_id}>
        {id}
      </Text>
    ));
   
  };

  
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
        value={userData.employee_id}
        onSelect={selectedItem =>
                  setUserData(selectedItem.userData.user.id)
                }
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
          <Button title="Submit" onPress={()=>handleSave()} color="green" />
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
