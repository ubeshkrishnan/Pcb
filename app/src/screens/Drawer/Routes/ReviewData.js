import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import React, { Component } from 'react';

export default class ReviewData extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/reviw.jpg')} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
  <View style={styles.inputColumn}>
    <Text style={styles.label}>Sample Type</Text>
    <TextInput style={styles.input} />
  </View>
  <View style={styles.inputColumn}>
    <Text style={styles.label}>Sample Type</Text>
    <TextInput style={styles.input} />
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
    <Text style={styles.label}>Collection Time Stamp</Text>
    <TextInput style={styles.input} />
  </View>
  <View style={styles.inputColumn}>
    <Text style={styles.label}>Container</Text>
    <TextInput style={styles.input} />
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
    <Text style={styles.label}>Turbidity </Text>
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
    <TextInput style={styles.input} />
  </View>
</View>   
          </View>
        <View style={styles.buttonRow}>
        <Button
  title="Drafts"
  onPress={() => console.log('Drafts')}
  color="black" // Set the desired color value here
/>
 <Button title="Save" onPress={() => console.log('Save')} color="green"/>
          <Button title="Cancel" onPress={() => console.log('Cancel')} color="red"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputColumn: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 2,
    color:'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
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
  image: {
    width: 250,
    height: 140,
  },
  inputContainer: {
    width: '80%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '65%',
  },
  draft:{
    Color:'black'
  }
});
