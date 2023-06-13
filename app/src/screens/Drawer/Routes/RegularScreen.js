import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { Url } from "../../../../Global_Variable/api_link"
import RegularscreenData from './RegularscreenData';
import ModalRegular from './modalRegularChild';

const RegularScreen = () => {
  const [regularscheduletype, setRegularScheduleType] = useState([]);
  const [sampletype, setSampleType] = useState([]);
  const [cards, setCards] = useState([]);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '', '', '']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  // for navigation
  const navigation = useNavigation();

  useEffect(() => {
    RegularDetail()
    console.log(Url, "Url");
  }, []);

  const RegularDetail = async () => {
    try {
      const response = await axios.get(Url+'/regularcarddetail');
      console.log(Url, "url check");
      const data = response.data;
      console.log(response, "api cal");
      setCards(data);
      setFilteredCards(data);
    } catch (error) {
      console.log('Error fetching Regular card details:', error);
    }
  };

  useEffect(() => {
    fetchRegularScheduleType();
    fetchSampleType();
  }, []);

  const fetchRegularScheduleType  = async () => {
    try {
      const response = await fetch(Url+'/regularscheduletype');
      const jsonData = await response.json();
      setRegularScheduleType(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSampleType = async () => {
    try {
      const response = await fetch(Url+'/sampletypes');
      const jsonData = await response.json();
      setSampleType(jsonData);
    } catch (error) {
      console.error(error);
    }
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

  const handleSearch = (text) => {
    const filteredCards = cards.filter((card) => {
      const companyName = (card.company_name || "").toLowerCase();
      const taluk = (card.taluk || "").toLowerCase();
      const village = (card.village || "").toLowerCase();
      const category = (card.category || "").toLowerCase();
      const scheduleTypes = regularscheduletype?.map((item) => (item.schedule_type || "").toLowerCase()) || [];
      const sampleTypes = sampletype?.map((item) => (item.sample_type || "").toLowerCase()) || [];
      const searchValueLower = text.toLowerCase();
  
      return (
        companyName.includes(searchValueLower) ||
        taluk.includes(searchValueLower) ||
        village.includes(searchValueLower) ||
        category.includes(searchValueLower) ||
        scheduleTypes.includes(searchValueLower) ||
        sampleTypes.includes(searchValueLower)
        );
        });
        setFilteredCards(filteredCards);
      };
      const renderItem = ({ item }) =>{
        return (
        <ScrollView>
        <View style={styles.RegularCardMain}>
        {isModalVisible && <ModalRegular visible={isModalVisible} item={cards} setcards={setCards}/>}
        <TouchableOpacity onPress={navigateToRegularScreenChild}>
        <Text style={styles.CardSerialNo}>
        11000
        <Text style={styles.CardDetailRight}>{item.company_name}</Text>
        </Text>
        <View style={styles.row}>
        <View style={styles.column}>
        <Text style={styles.CardDetail}>
        Region/Taluk:
        <Text style={styles.CardMap}>{item.taluk}</Text>
        </Text>
        <Text style={styles.CardDetail}> Village:
        <Text style={styles.CardMap}>{item.village}</Text>
        </Text>
        </View>
        <View style={styles.column}>
        <Text style={styles.CardDetail}>
        No Of Samples:
        <Text style={styles.CardMap}>{item.water}</Text>
        </Text>
        <Text style={styles.CardDetail}>
        Category:
        <Text style={styles.CardMap}>{item.category}</Text>
        </Text>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.column}>
        {regularscheduletype.map((scheduleItem, index) => (
        <Text key={index} style={styles.CardDetail}>
        Scheduled Type:
        <Text style={styles.CardMap}>{scheduleItem.schedule_type}</Text>
        </Text>
        ))}
        </View>
        <View style={styles.column}>
        {sampletype.map((sampleItem, index) => (
        <Text key={index} style={styles.CardDetail}>
        Sample Type:
        <Text style={styles.CardMap}>{sampleItem.sample_type}</Text>
        </Text>
        ))}
        </View>
        </View>
        </TouchableOpacity>
        </View>
        </ScrollView>
        );
        };
        
        const renderNoRecords = () => {
        return (
        <View style={styles.noRecordsContainer}>
        <Text style={styles.noRecordsText}>No records found</Text>
        </View>
        );
        };
        
        return (
        <ScrollView>
        <View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.rowContainer}>
        <TextInput
        style={styles.searchBarInput}
        placeholder="Search"
        placeholderTextColor="gray"
        value={searchValue}
        onChangeText={(text) => {
        setSearchValue(text);
        handleSearch(text);
        }}
        autoFocus // Enable autofocus
        />
       
        <View style={styles.searchIconContainer}>
        <MaterialIcons
                   name="search"
                   size={20}
                   color="gray"
                   onPress={handleSearch}
                 />
        </View>
        </View>
        <FlatList
        data={filteredCards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderNoRecords}
        />
        </View>
        </ScrollView>
        );
        };
        export default RegularScreen;
        
const styles = {
  noRecordsText:{
color:"grey",
textAlign:"center",
marginTop:40,
fontSize:16,
  },
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
borderRadius: 20,
borderColor:'black',
},
searchIconContainer: {
  position: 'absolute',
  paddingLeft:5,
  // right: 1,
},
headersample:{
  backgroundColor: '#CCCCCC',
  height: 37,
  color: 'black',
  fontSize: 15,
  fontWeight: 'bold',
  paddingLeft: 20,
  paddingTop: 9,

},
searchBar: {
  flex: 1,
  height: 35,
  width: 100,
  borderColor: 'red',
  borderWidth: 1,
  paddingLeft: 10,
  borderRadius: 20,
  marginRight: 10,
  color: 'red',
},
searchBarInput:{
  borderColor: 'black',
  color:'black',
  borderWidth: 1,
  height:40, 
  width:180,
  borderRadius:7,
  paddingLeft: 27, // Adjust this value to align the placeholder text
  paddingRight: 10,
},
card: {
backgroundColor: 'red',
marginTop: 20,
marginLeft: 30,
marginRight: 10,
height: 100,
borderRadius: 10,
width: 280,
justifyContent: 'center',
alignItems: 'center',
},
cardContent: {
color: 'white',
fontSize: 18,
fontWeight: 'bold',
},
modalContainer: {
color: 'red',
},
input: {
color: 'black',
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#f5f5f5',
},
input: {
color: 'black',
width: 200,
height: 40,
borderColor: 'black',
borderWidth: 1,
borderRadius: 5,
padding: 5,
marginTop: 10,
},
buttonLabelSave: {
color: 'white',
fontWeight: 'bold',
backgroundColor: 'green',
width: 45,
borderRadius: 10,
marginTop: 10,
paddingLeft: 7,
},
buttonLabelCancel: {
color: 'red',
color: 'white',
fontWeight: 'bold',
backgroundColor: 'red',
width: 54,
height: 20,
borderRadius: 10,
marginTop: 10,
},
RegularCardMain: {
  backgroundColor: '#D0E3F1',
  marginTop: 20,
  width: 350,
  height: 139,
  padding: 10,
  marginLeft: 5,
  },
  row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  },
  column: {
  flex: 1,
  },
  CardSerialNo: {
  backgroundColor: '#CCCCCC',
  height: 37,
  color: 'black',
  fontSize: 15,
  fontWeight: 'bold',
  paddingLeft: 9,
  },
  CardDetail: {
  marginTop: 5,
  paddingLeft: 9,
  fontWeight: 'bold',
  color: 'black',
  },
  CardDetailRight: {
  color: 'blue',
  textAlign: 'right',
  paddingRight: 200,
  },
  CardMap: {
  marginLeft: 15,
  fontWeight: '400',
  paddingLeft: 10,
  color: 'black',
  },
  SearchIcon: {
  marginTop: 30,
  marginLeft: 20,
  paddingRight:20,
  },
  };
  
