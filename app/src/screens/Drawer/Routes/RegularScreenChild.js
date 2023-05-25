import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Regular = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddCard = () => {
    setIsModalVisible(true);
  };

  const handleSaveCard = () => {
    const newCard = {
      content: [
        [inputValues[0], inputValues[1]],
        [inputValues[2], inputValues[3]],
      ],
    };
    setCards([...cards, newCard]);
    setInputValues(['', '', '', '', '', '']);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setInputValues(['', '', '', '', '', '']);
    setIsModalVisible(false);
  };

  const handleInputChange = (index, text) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = text;
      return updatedValues;
    });
  };

  const navigateToReviewData = () => {
    navigation.navigate('ReviewData');
  };

  const placeholders = [
    'Serial No',
    'Scheme',
    'Point Of Collection',
    'Collection Time Stamp',
    'Latitude',
    'Longitude',
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
    <View>
      <Text style={styles.CardSerialNo}>
        {' '}
        <MaterialIcons name="search" size={20} style={styles.SearchIcon} />
        <Text style={styles.CardMap}> SAMPLING</Text>
      </Text>

      <View style={styles.horizontalLine}></View>

      <View style={styles.rowContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          // Add any additional props or event handlers as needed
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonLabel}>Add</Text>
        </TouchableOpacity>
      </View>

      {cards.map((card, cardIndex) => (
        <TouchableOpacity key={cardIndex} onPress={navigateToReviewData}>
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

      <View style={styles.RegularCard}>
        <TouchableOpacity onPress={navigateToReviewData}>
          <Text style={styles.CardSerialNo}>
            11000 - 01
            <Text style={styles.CardDetailRight}>Sivajothi Blue Metal</Text>
          </Text>

          <Text style={styles.CardDetail}>
            Point of Collection:
            <Text style={styles.CardMap}> ETP Outlet</Text>
          </Text>
          <Text style={styles.CardDetail}>
            Collection Time Stamp:
            <Text style={styles.CardMap}> 10.08.2022 09.44.57</Text>
            </Text>
            <Text style={styles.CardDetail}>
  Latitude:<Text style={styles.CardMap}> 11.101620</Text>
</Text>
<Text style={styles.CardDetail}>
  Longitude:<Text style={styles.CardMap}> 77.031220</Text>
</Text>
</TouchableOpacity>
</View>
<View style={styles.RegularCard}>
<TouchableOpacity onPress={navigateToReviewData}>
  <Text style={styles.CardSerialNo}>
    11000 - 02
    <Text style={styles.CardDetailRight}>Sivajothi Blue Metal</Text>
  </Text>
  <View style={styles.HorizontalLine} />
  <Text style={styles.CardDetail}>
    Point of Collection:<Text style={styles.CardMap}> STP Outlet</Text>
  </Text>
  <Text style={styles.CardDetail}>
    Collection Time Stamp:<Text style={styles.CardMap}> 10.08.2022 09.44.57</Text>
  </Text>
  <Text style={styles.CardDetail}>
    Latitude:<Text style={styles.CardMap}> 11.1020272</Text>
  </Text>
  <Text style={styles.CardDetail}>
    Longitude:<Text style={styles.CardMap}> 77.3022045</Text>
  </Text>
</TouchableOpacity>
</View>

<Modal visible={isModalVisible} animationType="slide">
<View style={styles.modalContainer}>
  {[1, 2, 3, 4, 5, 6].map((inputIndex) => (
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
//  input: {
//     // Your common input styles
//   },
  firstInput: {
    // Updated style for the first input
    color: 'red', // Set the desired color for the first input

  },
  secondInput: {
    // Styles specific to the second input
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
    color:'green',
    fontWeight:'bold',
  },
  buttonLabelCancel:{
    color:'red',
    
  },
  // Regular card
  RegularCard: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 138,
    width: 335,
  },
  CardSerialNo:{
backgroundColor:'white',
height:27,
color:'black',
fontSize:15,
fontWeight:"bold",
paddingLeft:9,
textDecorationLine: "underline",
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