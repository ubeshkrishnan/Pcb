import { Text, View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import React, { Component } from 'react';

const  SpotSampling =()=> {
 
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
          <Text style={styles.label}>Serial No</Text>
          <TextInput style={styles.input} placeholder="Serial No" placeholderTextColor="#CCCCCC" />
          <Text style={styles.label}>Point Of Collection</Text>
          <TextInput style={styles.input} placeholder="Point Of Collection" placeholderTextColor="#CCCCCC" />
          <Text style={styles.label}>Latitude</Text>
          <TextInput style={styles.input} placeholder="Latitude" placeholderTextColor="#CCCCCC" />
          <Text style={styles.label}>Longitude</Text>
          <TextInput style={styles.input} placeholder="Longitude" placeholderTextColor="#CCCCCC" />
          <Text style={styles.label}>Field 5</Text>
          <TextInput style={styles.input} placeholder="Field 5" placeholderTextColor="#CCCCCC" />
          <Text style={styles.buttonContainer}>
            <Button title="Save" onPress={() => console.log('Save pressed')} />
            <View style={styles.buttonSpacer} /> {/* Adding space between buttons */}
            <Button title="Cancel" onPress={() => console.log('Cancel pressed')} />
          </Text>
        </View>
      </ScrollView>
    );
  }

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
