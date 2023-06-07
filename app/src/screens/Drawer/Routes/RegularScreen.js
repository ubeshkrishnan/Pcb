import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { Url } from "../../../../Global_Variable/api_link"
import RegularscreenData from './RegularscreenData';
import ModalRegular from './modalRegular';

const Regular = () => {
// const [modaldata, setModaldata] = useState([])
  const [taluk, setTaluk] = useState([]);
  const [cards, setCards] = useState([]);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '', '', '']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleAddCard = () => {
    setIsModalVisible(true);
  };


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

    } catch (error) {
      console.log('Error fetching Regular card details:', error);
    }
  };
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get(Url +"/regularschedule")
      .then((response) => {
        if (response && response.data) {
          setSchedule(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  // const DATA = [
  //   {
  //     "industry_id": 62,
  //     "ocms_id": "R15CBN199052",
  //     "company_name": "SIVA SAKTHI INDUSTRIES",
  //     "point_of_collection": "",
  //     "phone_no": "9489183142",
  //     "email": "sravibe@gmail.com",
  //     "status": 1,
  //     "industry_location": "COIMBATORE NORTH",
  //     "pincode": "645216",
  //     "revenue_district": "Coimbatore",
  //     "taluk": "ANNUR",
  //     "village": "SARAKAR SAMAKULAM",
  //     "category": "ORANGE-Small",
  //     "pollution_type": 2,
  //     "created_date": "2023-05-10T01:51:27.000Z",
  //     "created_by": 1,
  //     "updated_date": null,
  //     "updated_by": null,
  //     "industry_type": "2042-Industry or processes involving foundry operations having capacity less than 5 MT/hr as such units require coal/coke at less than 500 Kg/hr",
  //     "date_of_commissioning": "1/23/2023 0:00",
  //     "ownership": "",
  //     "faxno_with_code": "",
  //     "jurisdivtion_office": "DEE CBE SOUTH",
  //     "is_updated": 1,
  //     "not_applicable": 0,
  //     "air": 0,
  //     "water": 1,
  //     "sludge": 0,
  //     "sewage": 0,
  //     "id": 62,
  //     "password": "207b20d49306ccab2ceedbd3461ca0fe",
  //     "is_logged": null,
  //     "user_role_id": 28,
  //     "soil": 0,
  //     "trade_effulent": 0,
  //     "noise": 0,
  //     "sample_coll_id": 28,
  //     "ref_id": 427,
  //     "region_id": 11,
  //     "schedule_type": 1,
  //     "location_type": 2,
  //     "cost_type": 1,
  //     "stage_id": 1,
  //     "assign_to": 1,
  //     "priority": null,
  //     "schedule_month": "2024-02",
  //     "ack_no": null,
  //     "recived_date": "2023-05-10T07:21:27.287Z",
  //     "finacial_id": null,
  //     "frequency": 3,
  //     "verified_status": null,
  //     "sample_received_date": null,
  //     "recived_to": null,
  //     "purpose": 1,
  //     "sample_type_id": 2,
  //     "survey": null
  //   },
  //   {
  //     "industry_id": 62,
  //     "ocms_id": "R15CBN199052",
  //     "company_name": "SIVA SAKTHI INDUSTRIES",
  //     "point_of_collection": "",
  //     "phone_no": "9489183142",
  //     "email": "sravibe@gmail.com",
  //     "status": 1,
  //     "industry_location": "COIMBATORE NORTH",
  //     "pincode": "645216",
  //     "revenue_district": "Coimbatore",
  //     "taluk": "ANNUR",
  //     "village": "SARAKAR SAMAKULAM",
  //     "category": "ORANGE-Small",
  //     "pollution_type": 2,
  //     "created_date": "2023-05-10T01:51:27.000Z",
  //     "created_by": 1,
  //     "updated_date": null,
  //     "updated_by": null,
  //     "industry_type": "2042-Industry or processes involving foundry operations having capacity less than 5 MT/hr as such units require coal/coke at less than 500 Kg/hr",
  //     "date_of_commissioning": "1/23/2023 0:00",
  //     "ownership": "",
  //     "faxno_with_code": "",
  //     "jurisdivtion_office": "DEE CBE SOUTH",
  //     "is_updated": 1,
  //     "not_applicable": 0,
  //     "air": 0,
  //     "water": 1,
  //     "sludge": 0,
  //     "sewage": 0,
  //     "id": 62,
  //     "password": "207b20d49306ccab2ceedbd3461ca0fe",
  //     "is_logged": null,
  //     "user_role_id": 28,
  //     "soil": 0,
  //     "trade_effulent": 0,
  //     "noise": 0,
  //     "sample_coll_id": 26,
  //     "ref_id": 425,
  //     "region_id": 11,
  //     "schedule_type": 1,
  //     "location_type": 2,
  //     "cost_type": 1,
  //     "stage_id": 1,
  //     "assign_to": 1,
  //     "priority": null,
  //     "schedule_month": "2023-08",
  //     "ack_no": null,
  //     "recived_date": "2023-05-10T07:21:27.254Z",
  //     "finacial_id": null,
  //     "frequency": 3,
  //     "verified_status": null,
  //     "sample_received_date": null,
  //     "recived_to": null,
  //     "purpose": 1,
  //     "sample_type_id": 2,
  //     "survey": null
  //   },
  //   {
  //     "industry_id": 62,
  //     "ocms_id": "R15CBN199052",
  //     "company_name": "SIVA SAKTHI INDUSTRIES",
  //     "point_of_collection": "",
  //     "phone_no": "9489183142",
  //     "email": "sravibe@gmail.com",
  //     "status": 1,
  //     "industry_location": "COIMBATORE NORTH",
  //     "pincode": "645216",
  //     "revenue_district": "Coimbatore",
  //     "taluk": "ANNUR",
  //     "village": "SARAKAR SAMAKULAM",
  //     "category": "ORANGE-Small",
  //     "pollution_type": 2,
  //     "created_date": "2023-05-10T01:51:27.000Z",
  //     "created_by": 1,
  //     "updated_date": null,
  //     "updated_by": null,
  //     "industry_type": "2042-Industry or processes involving foundry operations having capacity less than 5 MT/hr as such units require coal/coke at less than 500 Kg/hr",
  //     "date_of_commissioning": "1/23/2023 0:00",
  //     "ownership": "",
  //     "faxno_with_code": "",
  //     "jurisdivtion_office": "DEE CBE SOUTH",
  //     "is_updated": 1,
  //     "not_applicable": 0,
  //     "air": 0,
  //     "water": 1,
  //     "sludge": 0,
  //     "sewage": 0,
  //     "id": 62,
  //     "password": "207b20d49306ccab2ceedbd3461ca0fe",
  //     "is_logged": null,
  //     "user_role_id": 28,
  //     "soil": 0,
  //     "trade_effulent": 0,
  //     "noise": 0,
  //     "sample_coll_id": 28,
  //     "ref_id": 427,
  //     "region_id": 11,
  //     "schedule_type": 1,
  //     "location_type": 2,
  //     "cost_type": 1,
  //     "stage_id": 1,
  //     "assign_to": 1,
  //     "priority": null,
  //     "schedule_month": "2024-02",
  //     "ack_no": null,
  //     "recived_date": "2023-05-10T07:21:27.287Z",
  //     "finacial_id": null,
  //     "frequency": 3,
  //     "verified_status": null,
  //     "sample_received_date": null,
  //     "recived_to": null,
  //     "purpose": 1,
  //     "sample_type_id": 2,
  //     "survey": null
  //   },
  // ]
  // const DATA =[
  //   {
  //     "industry_id": 62,
  //     "ocms_id": "R15CBN199052",
  //     "company_name": "Test Data",
  //     "point_of_collection": "",
  //     "phone_no": "9489183142",
  //     "email": "sravibe@gmail.com",
  //     "status": 1,
  //     "industry_location": "COIMBATORE NORTH",
  //     "pincode": "645216",
  //     "revenue_district": "Coimbatore",
  //     "taluk": "item",
  //     "village": "SARAKAR SAMAKULAM",
  //     "category": "ORANGE-Small",
  //     "pollution_type": 2,
  //     "created_date": "2023-05-10T01:51:27.000Z",
  //     "created_by": 1,
  //     "updated_date": null,
  //     "updated_by": null,
  //     "industry_type": "2042-Industry or processes involving foundry operations having capacity less than 5 MT/hr as such units require coal/coke at less than 500 Kg/hr",
  //     "date_of_commissioning": "1/23/2023 0:00",
  //     "ownership": "",
  //     "faxno_with_code": "",
  //     "jurisdivtion_office": "DEE CBE SOUTH",
  //     "is_updated": 1,
  //     "not_applicable": 0,
  //     "air": 0,
  //     "water": 1,
  //     "sludge": 0,
  //     "sewage": 0,
  //     "id": 62,
  //     "password": "207b20d49306ccab2ceedbd3461ca0fe",
  //     "is_logged": null,
  //     "user_role_id": 28,
  //     "soil": 0,
  //     "trade_effulent": 0,
  //     "noise": 0,
  //     "sample_coll_id": 28,
  //     "ref_id": 427,
  //     "region_id": 11,
  //     "schedule_type": 1,
  //     "location_type": 2,
  //     "cost_type": 1,
  //     "stage_id": 1,
  //     "assign_to": 1,
  //     "priority": null,
  //     "schedule_month": "2024-02",
  //     "ack_no": null,
  //     "recived_date": "2023-05-10T07:21:27.287Z",
  //     "finacial_id": null,
  //     "frequency": 3,
  //     "verified_status": null,
  //     "sample_received_date": null,
  //     "recived_to": null,
  //     "purpose": 1,
  //     "sample_type_id": 2,
  //     "survey": null
  //   }
  // ]
  const renderItem = ({ item }) => {
    console.log(item)
    return (
<ScrollView>
      <View  style={styles.RegularCardMain} >
        {isModalVisible  && <ModalRegular visible={isModalVisible} item={cards} setcards={setCards}/>}
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
                <Text style={styles.CardDetail}>
                  Village:
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
                <Text style={styles.CardDetail}>
                  Scheduled Type:
                  <Text style={styles.CardMap}>{item.schedule_type}</Text>
                </Text>
                </View>
                <View style={styles.column}>
                <Text style={styles.CardDetail}>
                  Sample Type:
                  <Text style={styles.CardMap}>{item.sample_type_id}</Text>
                </Text>
              </View>
              </View>
           
         
        </TouchableOpacity>

      </View>
      </ScrollView>
    )
  }
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

        <FlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        // extraData={selectedId}
        />
{/* 
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
        </View> */}
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
    MarginLeft: 20,
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
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10, // Adjust the marginBottom value as needed
  },


  modalContainer: {
    color: 'red'
  },
  input: {
    color: 'black'
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

  
  buttonLabelSave: {
    // Your button label styles
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
  // Regular card
  RegularCardMain: {
    backgroundColor: '#D0E3F1',
    marginTop: 20,
    width: 350,
    height: 135,
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
    height: 22,
    color: 'black',
    fontSize: 15,
    fontWeight: "bold",
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

    paddingRight: 100,
  },
  CardMap: {
    marginLeft: 15, // Adjust the marginLeft value to move the component to the right
    fontWeight: '400',
    paddingLeft: 10,
    color: 'black',
  },
};