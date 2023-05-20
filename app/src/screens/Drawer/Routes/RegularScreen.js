import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';

export default class Regular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [], // Holds the dynamically added cards
      inputValues: ['', '', '', '', '', ''], // Holds the values of the inputs in the popup
      isModalVisible: false, // Tracks the visibility of the popup
    };
  }

  handleAddCard = () => {
    this.setState({ isModalVisible: true });
  };

  handleSaveCard = () => {
    const { inputValues, cards } = this.state;
    const newCard = {
      content: [
        [inputValues[0], inputValues[1]],
        [inputValues[2], inputValues[3]],
      ],
    };
    this.setState((prevState) => ({
      cards: [...prevState.cards, newCard],
      inputValues: ['', '', '', '', '', ''],
      isModalVisible: false,
    }));
  };

  handleCancel = () => {
    this.setState({ inputValues: ['', '', '', '', '', ''], isModalVisible: false });
  };

  handleInputChange = (index, text) => {
    const { inputValues } = this.state;
    inputValues[index] = text;
    this.setState({ inputValues });
  };

  navigateToReviewData = () => {
    this.props.navigation.navigate('ReviewData');
  };

  render() {
    const { cards, inputValues, isModalVisible } = this.state;

    return (
      <View>
        <Text style={styles.headerText}>SAMPLING-REGULAR</Text>

        <View style={styles.horizontalLine}></View>

        <View style={styles.rowContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            // Add any additional props or event handlers as needed
          />

          <TouchableOpacity style={styles.addButton} onPress={this.handleAddCard}>
            <Text style={styles.addButtonLabel}>Add</Text>
          </TouchableOpacity>
        </View>

              {cards.map((card, cardIndex) => (
        <TouchableOpacity key={cardIndex} onPress={this.navigateToReviewData}>
          <View style={styles.card}>
            {card.content.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((column, columnIndex) => (
                  <Text key={columnIndex} style={styles.cardContent}>
                    {column}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            {[1, 2, 3, 4].map((inputIndex) => (
              <TextInput
                key={inputIndex}
                style={styles.input}
                placeholder={`Enter card content ${inputIndex}`}
                value={inputValues[inputIndex - 1]}
                onChangeText={(text) => this.handleInputChange(inputIndex - 1, text)}
              />
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={this.handleSaveCard}>
              <Text style={styles.buttonLabel}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={this.handleCancel}>
              <Text style={styles.buttonLabel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = {
  headerText: {
    color: 'black',
    marginTop: 15,
    marginLeft: 20,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 20,
  },
  searchBar: {
    flex: 1,
    height: 35,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 20,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'red',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 10,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10, // Adjust the marginBottom value as needed
  },
  
  buttonLabel:{
    color:'black'
  },
  modalContainer:{
color:'red'
  },
  input:{
    color:'black'
  },
  modalContainer: {
    backgroundColor: 'grey', // Set input screen color as grey
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'black', // Set input color as red
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },

};