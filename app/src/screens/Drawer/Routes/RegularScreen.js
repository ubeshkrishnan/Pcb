import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const Regular = () => {
  const [cards, setCards] = useState([]);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '', '', '']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const handleAddCard = () => {
    setIsModalVisible(true);
  };

  const handleSaveCard = () => {
    const newCard = {
      content: [
        [
          inputValues[0],
          inputValues[1],
          inputValues[2],
          inputValues[3],
          inputValues[4],
          inputValues[5],
          inputValues[6],
          inputValues[7],
        ],
      ],
    };
    setCards((prevCards) => [...prevCards, newCard]);
    setInputValues(['', '', '', '', '', '', '', '']);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setInputValues(['', '', '', '', '', '', '', '']);
    setIsModalVisible(false);
  };

  const handleInputChange = (index, text) => {
    setInputValues((prevInputValues) => {
      const updatedInputValues = [...prevInputValues];
      updatedInputValues[index] = text;
      return updatedInputValues;
    });
  };

  const navigateToRegularScreenChild = () => {
    navigation.navigate('RegularScreenChild'); // Replace 'RegularScreenChild' with the actual name of your route
  }

  const placeholders = [
    'Number',
    'Scheme',
    'Category',
    'Region/Taluk',
    'Scheduled Type',
    'Village',
    'No.of Samples',
    'Sample Type',
  ];
  const inputStyles = [
    styles.firstInput,
    styles.secondInput,
    styles.thirdInput,
    styles.fourthInput,
    styles.fifthInput,
    styles.sixthInput,
    styles.seventhInput,
    styles.eighthInput,
  ];

  return (
    <ScrollView>
      <View>
        <Text style={styles.CardSerialNo}>
          <MaterialIcons name="search" size={20} style={styles.SearchIcon} />
          <Text style={styles.CardMap}> SAMPLING</Text>
        </Text>

        <View style={styles.horizontalLine}></View>

        <View style={styles.rowContainer}>
          <TextInput style={styles.searchBar} placeholder="Search" />

          <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
            <Text style={styles.addButtonLabel}>Add</Text>
          </TouchableOpacity>
        </View>

        {cards.map((card, cardIndex) => (
          <TouchableOpacity key={cardIndex} onPress={navigateToRegularScreenChild}>
            <View style={styles.RegularCardMain}>
              <Text style={styles.CardSerialNo}></Text>
              {card.content.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.CardSerialNo}>
                      {row[0]}
                      <Text style={styles.CardDetailRight}>{row[1]}</Text>
                    </Text>
                    <Text style={styles.CardDetail}>
                      Region/Taluk:
                      <Text style={styles.CardMap}>{row[2]}</Text>
                    </Text>
                    <Text style={styles.CardDetail}>
                      Village:
                      <Text style={styles.CardMap}>{row[3]}</Text>
                      </Text>
                    <Text style={styles.CardDetail}>
                      No Of Samples:
                      <Text style={styles.CardMap}>{row[4]}</Text>
                    </Text>
                    <Text style={styles.CardDetail}>
                      Category:
                      <Text style={styles.CardMap}>{row[5]}</Text>
                    </Text>
                    <Text style={styles.CardDetail}>
                      Scheduled Type:
                      <Text style={styles.CardMap}>{row[6]}</Text>
                    </Text>
                    <Text style={styles.CardDetail}>
                      Sample Type:
                      <Text style={styles.CardMap}>{row[7]}</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.RegularCardMain}>
          <TouchableOpacity onPress={navigateToRegularScreenChild}>
            <Text style={styles.CardSerialNo}>
              11000
              <Text style={styles.CardDetailRight}>Sivajothi Blue Metal</Text>
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.CardDetail}>
   
                  Region/Taluk:<Text style={styles.CardMap}> Coimbatore</Text>
                </Text>
                <Text style={styles.CardDetail}>
                  Village:<Text style={styles.CardMap}> Korapatti</Text>
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.CardDetail}>
                  No Of Samples:<Text style={styles.CardMap}> 2</Text>
                </Text>
                <Text style={styles.CardDetail}>
                  Category:<Text style={styles.CardMap}>Red Large</Text>
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.CardDetail}>
                  Scheduled Type:<Text style={styles.CardMap}> Scheduled</Text>
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.CardDetail}>
                  Sample Type:<Text style={styles.CardMap}> Effluent</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
        
            {[1, 2, 3, 4, 5, 6, 7, 8].map((inputIndex) => (
              <TextInput
                key={inputIndex}
                style={styles.input}
                placeholder={placeholders[inputIndex - 1]}
                placeholderTextColor="black"
                value={inputValues[inputIndex - 1]}
                onChangeText={(text) => handleInputChange(inputIndex - 1, text)}
              />
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
              <Text style={styles.buttonLabelSave}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonLabelCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Regular;



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
    width: 100,
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
    MarginLeft:20,
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
    width:280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10, // Adjust the marginBottom value as needed
  },
  

  modalContainer:{
color:'red'
  },
  input:{
    color:'black'
  },
  modalContainer: {
    // backgroundColor: 'grey', // Set input screen color as grey
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
// For input fields

  firstInput: {
    // Updated style for the first input
    color: 'red', // Set the desired color for the first input

  },
  secondInput: {
    // Styles specific to the second input
    color: 'black', 
  },
  thirdInput: {
    // Styles specific to the third input
  },
  fourthInput: {
    // Styles specific to the fourth input
  },
  fifthInput: {
    // Styles specific to the fifth input
  },
  sixthInput: {
    // Styles specific to the sixth input
  },
  seventhInput: {
    // Styles specific to the seventh input
  },
  eighthInput: {
    // Styles specific to the eighth input
  },
  saveButton: {
    // Your save button styles
  },
  cancelButton: {
    // Your cancel button styles
  },
  buttonLabelSave: {
    // Your button label styles
    color:'white',
    fontWeight:'bold',
    backgroundColor:'green',
    width:45,
    borderRadius:10,
    marginTop:10,
    paddingLeft:7,
  },
  buttonLabelCancel:{
    color:'red',
    color:'white',
    fontWeight:'bold',
    backgroundColor:'red',
    width:54,
    height:20,
    borderRadius:10,
    marginTop:10,
  },
  // Regular card
  RegularCardMain: {
    backgroundColor: '#D0E3F1',
    marginTop: 20,
    width: 350,
    height: 160,
    padding: 10,
    marginLeft:5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  CardSerialNo:{
backgroundColor:'#CCCCCC',
height:27,
color:'black',
fontSize:15,
fontWeight:"bold",
paddingLeft:9,
 },
 CardDetail:{
marginTop:5,
paddingLeft:9,
fontWeight:'bold',
color:'black',
 },
 CardDetailRight: {
  color: 'blue',
  textAlign: 'right',

  paddingRight:100,
},
 CardMap:{
  marginLeft: 15, // Adjust the marginLeft value to move the component to the right
  fontWeight: '400',
  paddingLeft: 10,
  color:'black',
 },
};