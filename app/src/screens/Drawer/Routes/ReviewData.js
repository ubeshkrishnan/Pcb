import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, ScrollView,TouchableOpacity  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ReviewData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSampleType: '',
    };
  }
  handleImageClick = () => {
    // Navigate to the CameraPopup component or perform any other action
    // For simplicity, let's assume you're using React Navigation and want to navigate to CameraPopup
    this.props.navigation.navigate('CameraPopup');
  };
  render() {
    const { selectedSampleType } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
         <View style={styles.container}>
          <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={this.handleImageClick}>
            <MaterialIcons name="photo-camera" size={32} color="black" />
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
                style={{ backgroundColor: 'grey', color: 'black', borderWidth: 1, borderColor: 'black', height: 40 }}

                  selectedValue={selectedSampleType}
                  onValueChange={(itemValue) => this.setState({ selectedSampleType: itemValue })}
                  itemStyle={{ color: 'black', fontSize: 16 }}
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    color:'black'
  },
  inputColumn: {
    flex: 1,
    marginRight: 10,
    height:49,
  },
  label: {
    fontSize: 16,
    marginBottom: 2,
    color:'black'
  },
  input: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    color:'black'
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
    width: 220,
    height: 120,
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
