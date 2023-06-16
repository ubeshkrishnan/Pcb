import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { Url } from '../../../../../Global_Variable/api_link';
import { Picker } from '@react-native-picker/picker';

const SpotSampling = () => {
  const [serialNoCounter, setSerialNoCounter] = useState(1);
  const [pointOfCollection, setPointOfCollection] = useState('');
  const [collectionTime, setCollectionTime] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const [sampleId, setSampleId] = useState('');

  const fetchPointOfCollectionOptions = async () => {
    try {
      const response = await axios.get(Url + '/spotpointofcollection');
      setDropdownData(response.data);
    } catch (error) {
      console.error('Error fetching point of collection options', error);
    }
  };

  useEffect(() => {
    fetchPointOfCollectionOptions();
  }, []);
 
  const handleSave = () => {
    const data = {
      sample_id: sampleId,
      poc_id: pointOfCollection,
      collection_time: collectionTime,
      latitude: latitude,
      longitude: longitude,
    };

    axios
      .get(Url + '/spotpointofcollection/update', { params: data }) // Use GET request instead of POST
      .then(response => {
        console.log('GET request successful', response.data);
      })
      .catch(error => {
        console.error('Error making GET request', error);
      });
  };

  const incrementSerialNo = () => {
    setSerialNoCounter(prevCounter => prevCounter + 1);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.label}>Serial No</Text>
        <TextInput
          style={styles.input}
          placeholder="Serial No"
          placeholderTextColor="#CCCCCC"
          value={serialNoCounter.toString()}
          onChangeText={() => {}}
          editable={false}
        />

        <Text style={styles.label}>Point Of Collection</Text>

        <View style={styles.picker}>
          <Picker
            selectedValue={pointOfCollection}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              setPointOfCollection(itemValue);
              setSampleId(dropdownData[itemIndex].sample_id);
            }}
          >
            {dropdownData.map(item => (
              <Picker.Item
                key={item.poc_type}
                label={item.label}
                value={item.poc_type}
                color="red"
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Collection Time Stamp</Text>
        <TextInput
          style={styles.input}
          placeholder="Collection Time Stamp"
          placeholderTextColor="#CCCCCC"
          value={collectionTime}
          onChangeText={text => setCollectionTime(text)}
        />

        <Text style={styles.label}>Latitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          placeholderTextColor="#CCCCCC"
          value={latitude}
          onChangeText={text => setLatitude(text)}
        />
  <Text style={styles.label}>Longitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          placeholderTextColor="#CCCCCC"
          value={longitude}
          onChangeText={text => setLongitude(text)}
        />

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <View style={styles.buttonSpacer} />
          <Button title="Cancel" onPress={() => console.log('Cancel pressed')} />
        </View>
      </View>
    </ScrollView>
  );
};
       

export default SpotSampling;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 200,
    height: 40,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    color: 'black',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttonSpacer: {
    width: 10,
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 200,
    height: 40,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    color: 'red',

  },
});