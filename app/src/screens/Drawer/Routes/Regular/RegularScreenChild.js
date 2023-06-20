import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Url } from '../../../../../Global_Variable/api_link';
import ModalRegularChild from './modalRegularChild';

const RegularScreenChild = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(Url + '/regularscreenchild');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  };

  const navigateToReviewData = (item) => {
    navigation.navigate('Review Data', { data: item });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>11000 - Sivajothi Blue Metal</Text>
        <TouchableOpacity onPress={openModal} style={styles.addButton}>
          <MaterialIcons name="add" size={20} style={styles.addButtonIcon} />
          <Text style={styles.addButtonLabel}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalLine}></View>

      {data.map((item) => (
        <View style={styles.RegularCard} key={item.id}>
          <TouchableOpacity onPress={() => navigateToReviewData(item)}>
            <Text style={styles.CardSerialNo}>
              {item.serialNo}
              <Text style={styles.CardDetailRight}>11001-01</Text>
            </Text>

            <ModalRegularChild visible={modalVisible} item={data} setcards={setData} onClose={closeModal} />

            <Text style={styles.CardDetail}>
              Point of Collection:
              <Text style={styles.CardMap}> {item.poc_type}</Text>
            </Text>
            <Text style={styles.CardDetail}>
              Collection Time Stamp:
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
      ))}
    </View>
  );
};

export default RegularScreenChild;

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
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 10,
    color:'black',
    
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
};

