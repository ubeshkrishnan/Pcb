import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Url } from '../../../../Global_Variable/api_link';

const RegularScreenChild = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(Url+'/regularscreenchild');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  };

  const navigateToReviewData = () => {
    navigation.navigate('ReviewData');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.CardSerialNo}>
        {/* <MaterialIcons name="search" size={20} style={styles.SearchIcon} /> */}
        <Text >11000 - Sivajothi Blue Metal</Text>
      </Text>

      <View style={styles.horizontalLine}></View>

      {data.map((item) => (
        <View style={styles.RegularCard} key={item.id}>
          <TouchableOpacity onPress={navigateToReviewData}>
            <Text style={styles.CardSerialNo}>
              {item.serialNo}
              <Text style={styles.CardDetailRight}>11001-01</Text>
            </Text>

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
              {/* <MaterialIcons name="keyboard-arrow-right" size={40} style={styles.RightArrowIcon} /> */}
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
  CardSerialNo: {
    backgroundColor: '#CCCCCC',
    height: 27,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 9,
    textDecorationLine: 'underline',
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
    height: 125,
    marginLeft:20,
    marginRight:20,
    // width: 325,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  // ArrowContainer: {
  //   marginLeft: 10, // Adjust the spacing as needed
  // },
  
};
