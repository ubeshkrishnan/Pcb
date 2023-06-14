import { Text, View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { Url } from '../../../../Global_Variable/api_link';

const SpotSampling = () => {
  const [serial_no, setSerialNo] = useState('');
  const [point_of_collection, setPointOfCollection] = useState('');
  const [collection_time, setCollectionTimeStamp] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSave = () => {
    // Create an object with the data to be sent

    const data = {
      serial_no: serial_no,
      point_of_collection: point_of_collection,
      collection_time: collection_time,
      latitude: latitude,
      longitude: longitude,
    };
console.log(data,"data")
    // Make the POST request
    axios.post(Url+'/spotsampling', data)
      .then(response => {
        console.log('POST request successful', response.data);
      })
      .catch(error => {
        console.error('Error making POST request', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.label}>Serial No</Text>
        <TextInput
          style={styles.input}
          placeholder="Serial No"
          placeholderTextColor="#CCCCCC"
          value={serial_no}
          onChangeText={text => setSerialNo(text)}
        />

        <Text style={styles.label}>Point Of Collection</Text>
        <TextInput
          style={styles.input}
          placeholder="Point Of Collection"
          placeholderTextColor="#CCCCCC"
          value={point_of_collection}
          onChangeText={text => setPointOfCollection(text)}
        />

        <Text style={styles.label}>Collection Time Stamp</Text>
        <TextInput
          style={styles.input}
          placeholder="Collection Time Stamp"
          placeholderTextColor="#CCCCCC"
          value={collection_time}
          onChangeText={text => setCollectionTimeStamp(text)}
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

        <Text style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <View style={styles.buttonSpacer} /> {/* Adding space between buttons */}
          <Button title="Cancel" onPress={() => console.log('Cancel pressed')} />
        </Text>
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
    color:'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttonSpacer: {
    width: 10,
  },
});
