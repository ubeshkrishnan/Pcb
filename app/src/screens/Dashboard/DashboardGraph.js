import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { Url } from "../../../Global_Variable/api_link";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DashboardGraph = () => {
  const [completed, setCompleted] = useState(0);
  const [incomplete, setIncomplete] = useState(0);
  const [schedule, setSchedule] = useState(0);
  const [unschedule, setUnschedule] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const completeResponse = await axios.get(Url + "/complete");
      const incompleteResponse = await axios.get(Url + "/incomplete");
      const scheduleResponse = await axios.get(Url + "/schedule");
      const unscheduleResponse = await axios.get(Url + "/unschedule");

      setCompleted(completeResponse.data[0].completed);
      setIncomplete(incompleteResponse.data[0].incompleted);
      setSchedule(scheduleResponse.data[0].scheduled);
      setUnschedule(unscheduleResponse.data[0].unscheduled);
      
    } catch (error) {
      console.log("Error:", error);
      console.log(scheduleResponse.data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hrLine} />
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Completed</Text>
          <Text style={styles.cardData}>{completed}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Incomplete</Text>
          <Text style={styles.cardData}>{incomplete}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule</Text>
          <Text style={styles.cardData}>{schedule}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unschedule</Text>
          <Text style={styles.cardData}>{unschedule}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    // marginBottom: 20,
  },
  hrLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '100%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    backgroundColor: '#BFDDF3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  cardData: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DashboardGraph;
