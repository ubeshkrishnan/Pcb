import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import RegularFields from "./RegularField";

export default class RegularField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      regularFieldValue: '',
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  };
  navigateToReviewData = () => {
    this.props.navigation.navigate('RegularFields'); // Replace 'RegularFields' with the actual name of your route
  };
  
  handleRegularFieldValueChange = (value) => {
    this.setState({ regularFieldValue: value });
  };

  handleAddRegularField = () => {
    const { regularFieldValue } = this.state;
    // Do something with the regularFieldValue, such as saving it or using it in the parent component
    console.log('Regular Field Value:', regularFieldValue);
    this.toggleModal();
  };

  render() {
    const { isVisible, regularFieldValue } = this.state;

    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal}>
          <Text style={{color: 'blue'}}>Add</Text>
        </TouchableOpacity>

        <Modal visible={isVisible} onRequestClose={this.toggleModal}>
          <View>
            <Text style={{color: 'red'}}>Add Regular Field</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'red', paddingHorizontal: 10 }}
              placeholder="Regular Field Value"
              value={regularFieldValue}
              onChangeText={this.handleRegularFieldValueChange}
            />
            <TouchableOpacity onPress={this.handleAddRegularField}>
              <Text>Add Field</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleModal}>
            <Text style={{color: 'blue'}}>Close</Text>

            </TouchableOpacity>

          </View>

        </Modal>

      </View>
    );
  }
}
