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
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../../../context/DataContext';
import { Url } from '../../../../Global_Variable/api_link';

const ReviewData = ({ route, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const [dropdownSample, setDropdownSample] = useState([]);
  const [dropdownPoc, setDropdownPoc] = useState([]);
  const [dropdownTreatment, setDropdownTreatment] = useState([]);
  const [dropdownContainer, setDropdownContainer] = useState([]);
  const [dropdownColor, setDropdownColor] = useState([]);
  const [dropdownTurbitidy, setDropdownTurbidity] = useState([]);

  const [selectedSampleType, setSelectedSampleType] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState('');
  const [selectedTreatmentType, setSelectedTreatmentType] = useState('');
  const [selectedPocType, setselectedPocType] = useState('');
  const [selectedTurbidityType, setselectedTurbidityType] = useState('');
  const [selectedColorType, setselectedColorType] = useState('');

  const { data } = route?.params;
  const { appData, setAppData } = useContext(DataContext);

  // local storage
  const [userData, setUserData] = useState('');
  const [employeeIds, setEmployeeIds] = useState('');
  const [capturedImages, setCapturedImages] = useState([]);
  const [imagesTaken, setImagesTaken] = useState(0);

  const initialData = {
    schedule_type: data?.schedule_type,
    longitude: appData?.longitude,
    latitude: appData?.latitude,
    turbidity: '',
    serial_no: data?.serial_no,
    point_of_collection: '',
    collection_time: '',
    container: '',
    employee_id: '',
    color: '',
    treatment_type: '',
  }
  const [datas, setData] = useState({
    schedule_type: data?.schedule_type,
    longitude: '',
    latitude: '',
    turbidity: '',
    serial_no: data?.serial_no,
    point_of_collection: '',
    collection_time: '',
    container: '',
    employee_id: '',
    color: '',
    treatment_type: '',
  });

  const handleImageClick = () => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      lastScreen: 'ReviewData',
      setCapturedImages: setCapturedImages, // Set the capturedImages state from ReviewData component
    }));
    navigation.navigate('CameraPopup', { data: route?.params?.data });
    
  };

  const handleSave = async () => {
    console.log("datta",route.params);
    if (data && data?.sample_id) {
      const formData = new FormData();
      // Add form fields
      formData.append('sample_type', selectedSampleType);
      formData.append('longitude', datas.longitude);
      formData.append('latitude', datas.latitude);
      formData.append('turbidity', selectedTurbidityType);
      formData.append('serial_no', datas.serial_no);
      formData.append('point_of_collection', selectedPocType);
      formData.append('collection_time', datas.collection_time);
      formData.append('container', selectedContainerType);
      formData.append('employee_id', datas.employee_id);
      formData.append('color', selectedColorType);
      formData.append('treatment_type', selectedTreatmentType);

      // Append sample_coll_id to the form data
      // formData.append('sample_coll_id', data?.sampleCollIdValue);

      // Add captured images
      appData.capturedImages.forEach((image, index) => {
        formData.append('sample_photos', {
          uri: image.uri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        });
      });


      console.log('Form Data:', formData); // Log the form data
      try {
        const response = await axios.put(
          `${Url}/reviewdata/${data?.sample_id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log("FORM", response.data);
        Alert.alert('Success', 'Data saved successfully');
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } catch (error) {
        console.log('Error updating data:', error);
        Alert.alert('Error', 'Failed to update data');
      }
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
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("userDetails")
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


  const onHandleCancel = () => {
    setAppData({
      ...appData,
      latitude: '',
      longitude: '',
      currentTime: '',
      capturedImages: [],
      setCapturedImages: () => { } // Initial empty function
    });
    setData(initialData);
    navigation.goBack();
  };
  // console.log("captureeed", appData.capturedImages );
  useEffect(() => {
    setData({
      ...datas, latitude: appData.latitude,
      longitude: appData.longitude,
      collection_time: appData.currentTime
    })
  }, [appData]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.captureButtonBg}
            onPress={() => handleImageClick()}
          >
            <MaterialIcons
              style={styles.captureButton}
              name="photo-camera"
              size={32}
              color="black"
            />
          </TouchableOpacity>
          <Text style={{ color: '#999999' }}>Capture Image</Text>
        </View>
        <View style={styles.capturedImagesContainer}>
          {appData.capturedImages.map((image, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={{ uri: image.uri }}
                style={styles.capturedImage}
              />
            </View>
          ))}
        </View>


        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Schedule Type</Text>
              <TextInput
                style={styles.input}
                value={datas?.schedule_type}
                onChangeText={(text) =>
                  setData((prevData) => ({ ...prevData, schedule_type: text }))
                }
                editable={false}
              />

            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Sample Type</Text>
              <SelectDropdown
                data={dropdownSample}
                defaultValue={selectedSampleType}
                onSelect={(selectedItem) =>
                  setSelectedSampleType(selectedItem.sample_type_id)
                }
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) =>
                  selectedItem.sample_type
                }
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

          {/* ... Other input fields */}

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Serial No</Text>
              <TextInput
                style={styles.input}
                value={datas?.serial_no}
                editable={false}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Point of collection</Text>
              <SelectDropdown
                data={dropdownPoc}
                defaultValue={selectedPocType}
                onSelect={(selectedItem) => setselectedPocType(selectedItem.poc_id)}
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) => selectedItem.poc_type}
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
              <Text style={styles.label}>
                Collection Time
              </Text>
              <TextInput type='date' style={styles.input} value={datas.collection_time}
                editable={false}
              />

            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Container</Text>

              <SelectDropdown
                data={dropdownContainer}
                defaultValue={selectedContainerType}
                onSelect={(selectedItem) =>
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
                editable={false}
              />
            </View>



            <View style={styles.inputColumn}>
              <Text style={styles.label}>Color</Text>
              <SelectDropdown
                data={dropdownColor}
                defaultValue={selectedColorType}
                onSelect={(selectedItem) => setselectedColorType(selectedItem.sample_color_id)}
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) => selectedItem.sample_color}
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
                onChangeText={(text) =>

                  setData((prevData) => ({ ...prevData, latitude: text }))
                }
                editable={false}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Turbidity</Text>
              <SelectDropdown
                data={dropdownTurbitidy}
                defaultValue={selectedTurbidityType}
                onSelect={(selectedItem) =>
                  setselectedTurbidityType(selectedItem.sample_turbidity_id)
                }
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) => selectedItem.sample_turbidity}
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
                onChangeText={(text) =>
                  setData((prevData) => ({ ...prevData, longitude: text }))
                }
                editable={false}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Treatment Type</Text>
              <SelectDropdown
                data={dropdownTreatment}
                defaultValue={selectedTreatmentType}
                onSelect={(selectedItem) =>
                  setSelectedTreatmentType(selectedItem.treatment_type_id)
                }
                buttonStyle={styles.dropdownButton}
                buttonTextAfterSelection={(selectedItem) => selectedItem.treatment_type}
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
          <Button title="Submit" onPress={() => handleSave()} color="green" />
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
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  captureButtonBg: {
    backgroundColor: '#999999',
    height: 100,
    width: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    borderRadius: 25,
    textAlign: 'center',
  },
  capturedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 8,
  },
  inputContainer: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputColumn: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
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
  dropdownButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    color: 'black',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  dropdownIcon: {
    fontSize: 16,
    color: 'black',
  },
  dropdownContainer: {
    width: '40%',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: 'black',
  },
  // dropdownRow: {
  //   padding: 10,
  //   backgroundColor: '#fff',
  //   color:'black',
  // },
  // dropdownRowText: {
  //   fontSize: 16,
  //   color: 'black',
  //   textAlign:'center',
  //   paddingRight:100,
  //   width:10,
  // },
  capturedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
  },
  card: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
});

export default ReviewData;
