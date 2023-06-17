import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { Url } from "../../../../../Global_Variable/api_link"
import RegularscreenData from '../RegularscreenData';
import ModalRegular from './modalRegularChild';
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../../../store/Reviewstore'

const RegularScreen = () => {
  const store = useSelector(store => store.counter);
  // console.log(store,"store")
  const dispatch = useDispatch();

  const [regularscheduletype, setRegularScheduleType] = useState([]);
  const [sampletype, setSampleType] = useState([]);
  const [cards, setCards] = useState([]);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '', '', '']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading status

  // for navigation
  const navigation = useNavigation();

  useEffect(() => {
    RegularDetail()
    console.log(Url, "Url");
  }, []);

  const RegularDetail = async () => {
    try {
      const response = await axios.get(Url + '/regularcarddetail');
      if (response && response.data) {
        const data = response.data;
        setCards(data);
        setFilteredCards(data);
        setIsLoading(false); // Set loading status to false after data is fetched
      } else {
        console.log('Error fetching Regular card details:', response);
      }
    } catch (error) {
      console.log('Error fetching Regular card details:', error);
    }
  };

  useEffect(() => {
    fetchRegularScheduleType();
    fetchSampleType();
  }, []);

  const fetchRegularScheduleType = async () => {
    try {
      const response = await fetch(Url + '/regularscheduletype');
      const jsonData = await response.json();
      setRegularScheduleType(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSampleType = async () => {
    try {
      const response = await fetch(Url + '/sampletypes');
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

  const clearSearch = () => {
    setSearchValue('');
  };

  const renderItem = ({ item }) => {
    return (
      <ScrollView>
        <View style={styles.RegularCardMain}>
          {isModalVisible && <ModalRegular visible={isModalVisible} item={cards} setcards={setCards} />}
          <TouchableOpacity onPress={navigateToRegularScreenChild}>
          <Text style={styles.CardSerialNo}>
  <Text style={styles.SerialNoText}>11000</Text>{" "}
  
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

  const renderEndData = () => {
    if (isLoading) {
      return <Text >Loading...</Text>;
    } else {
      return <Text style={styles.CardEndText}>END DATA</Text>;
    }
  };

  return (
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
          autoFocus
          clearButtonMode="while-editing"
        />
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={handleSearch}
        >
          <MaterialIcons name="search" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderNoRecords}
      />
      {renderEndData()}
    </View>
  );
};

export default RegularScreen;


const styles = {
  noRecordsText: {
    color: "grey",
    textAlign: "center",
    marginTop: 40,
    fontSize: 20,
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
  SerialNoText: {
    fontWeight: 'bold',
    color: 'red',
    marginRight:20,
    textDecorationLine: 'underline',

  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 20,
    borderRadius: 20,
    borderColor: 'black',
  },
  searchIconContainer: {
    position: 'absolute',
    paddingLeft: 5,
    // right: 1,
    paddingBottom: 10,
  },
  headersample: {
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
  searchBarInput: {
    borderColor: 'black',
    color: 'black',
    borderWidth: 1,
    height: 40,
    width: 180,
    borderRadius: 7,
    paddingLeft: 27, // Adjust this value to align the placeholder text
    paddingRight: 10,
    marginBottom: 14,
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

  RegularCardMain: {
    backgroundColor: '#D0E3F1',
    marginTop: 20,
    height: 'auto',
    padding: 10,
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
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
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 30,
    height: "auto",
    padding: 10,
    borderBottomLeftRadius: 50,  
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
    paddingRight: 20,

  },

  CardEndText: {
    color: 'red',
    backgroundColor: 'white',
    height: 27,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 15,
  }
};
