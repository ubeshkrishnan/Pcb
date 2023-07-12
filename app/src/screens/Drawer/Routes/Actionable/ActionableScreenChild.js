import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, ActivityIndicator, ScrollView, TextInput, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Url } from '../../../../../Global_Variable/api_link';
import ModalActionableChild from './modalActionable';
import { useRoute } from '@react-navigation/native';

const ActionableScreenChild = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const route = useRoute();

  // NO RECORDS FOUND
  const renderNoRecords = () => {
    return <NoRecordsFound />;
  };

  const renderEndData = () => {
    return <EndDataMessage />;
  };

  const openModalRegular = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (route.params.sampleId) {
      fetchData();
    }
  }, [route.params]);

  const fetchData = async () => {
    try {
      const response = await axios.get(Url + `/actionablescreenchild/${route.params.sampleId}`);
      setData(response.data);
      setFilteredData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchValue(query);
    const filteredData = data.filter((item) => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        (item.serial_no && item.serial_no.toString().includes(query)) || // Modified condition
        (item.poc_type && item.poc_type.toLowerCase().includes(lowerCaseQuery)) ||
        (item.collectionTimeStamp && item.collectionTimeStamp.includes(lowerCaseQuery)) ||
        (item.latitude && item.latitude.includes(lowerCaseQuery)) ||
        (item.longitude && item.longitude.includes(lowerCaseQuery))
      );
    });
    setFilteredData(filteredData);
  };

  const clearSearch = () => {
    setSearchValue('');
    setFilteredData(data);
  };

  const navigateToReviewData = (item) => {
    navigation.navigate('ReviewData', { data: item });
  };

  const EndDataMessage = () => {
    return (
      <View style={styles.endDataContainer}>
        <Text style={styles.endDataText}>END DATA</Text>
      </View>
    );
  };

  const NoRecordsFound = () => {
    return (
      <View style={styles.noRecordsContainer}>
        <Text style={styles.noRecordsText}>No records found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>11000 - Sivajothi Blue Metal</Text>
        <TouchableOpacity onPress={()=>openModalRegular()} style={styles.addButton}>
          <MaterialIcons name="add" size={20} style={styles.addButtonIcon} />
          <Text style={styles.addButtonLabel}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalLine}></View>
      <View style={styles.rowContainer}>
        <View style={styles.searchBarInputContainer}>
          <TouchableOpacity style={styles.searchIconContainer}>
            <MaterialIcons name="search" size={20} color="gray" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search"
            placeholderTextColor="gray"
            value={searchValue}
            onChangeText={handleSearch}
            clearButtonMode="while-editing"
          />

          {searchValue.length > 0 && (
            <TouchableOpacity style={styles.clearIconContainer} onPress={clearSearch}>
              <MaterialIcons name="clear" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.serialNo}
          ListEmptyComponent={renderNoRecords}
          renderItem={({ item,index }) => (
            <View key={'Item'+index} style={styles.RegularCard}>
              <TouchableOpacity onPress={() => navigateToReviewData(item)}>
                <Text style={styles.CardSerialNo}>
                  {item.serialNo}
                  <Text style={styles.CardDetailRight}>{item.serial_no}</Text>
                </Text>

                <ModalActionableChild visible={modalVisible} item={item} setcards={setData} onClose={closeModal} />

                <Text style={styles.CardDetail}>point Of Collection :
                  {item.poc_typ}
                  <Text style={styles.CardMap}> {item.poc_type}</Text>
                </Text>
                <Text style={styles.CardDetail}>Collection Time:
                  <Text style={styles.CardMap}> {item.collection_time}</Text>
                  <Text style={styles.CardMap}> {item.collectionTimeStamp}</Text>
                </Text>
                <Text style={styles.CardDetail}>
                  Latitude:<Text style={styles.CardMap}> {item.latitude}</Text>
                </Text>
                <Text style={styles.CardDetail}>
                  Longitude:<Text style={styles.CardMap}> {item.longitude}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={renderEndData}
        />
      )}
    </View>
  );
};

export default ActionableScreenChild;



const styles = {
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
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
  searchBarInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    // marginTop: 20,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width: 180,
  },
  searchIconContainer: {
    paddingLeft: 5,
  },
  searchBarInput: {
    flex: 1,
    color: 'black',
    paddingLeft: 10,
  },
  clearIconContainer: {
    paddingRight: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 10,
    color: 'black',

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
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  CardDetailRight: {
    color: 'blue',
    textAlign: 'right',
    paddingRight: 100,
  },
  CardMap: {
    marginLeft: 15,
    fontWeight: '400',
    paddingLeft: 15,
    color: 'red',
  },
  RegularCard: {
    backgroundColor: '#D0E3F1',
    marginTop: 20,
    height: 'auto',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 10,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
  },
  addButtonIcon: {
    color: 'white',
    marginRight: 5,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  noRecordsText: {
    color: "grey",
    textAlign: "center",
    marginTop: 40,
    fontSize: 20,
  },
  endDataContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  endDataText: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
};

