import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardGraph = () => {
  const [completed, setCompleted] = useState(0);
  const [incomplete, setIncomplete] = useState(0);
  const [scheduled, setScheduled] = useState(0);
  const [unscheduled, setUnscheduled] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/dashboard");
      const data = response.data;

      setCompleted(data.completed);
      setIncomplete(data.incomplete);
      setScheduled(data.scheduled);
      setUnscheduled(data.unscheduled);
    } catch (error) {
      console.log(error);
    }
  };

  const maxDataValue = Math.max(completed, incomplete, scheduled, unscheduled);

  const calculateBarHeight = (dataValue) => {
    return (dataValue / maxDataValue) * 150; // Adjust the height scaling factor as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dashboardText}>Dashboard</Text>
      <View style={styles.hrLine} />
      <View style={styles.graphContainer}>
        {/* <Image
          source={require('../../assets/bar.png')}
          style={[styles.bar, { height: calculateBarHeight(maxDataValue) }]}
        /> */}
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.dataText}>Completed: {completed}</Text>
          <Text style={styles.dataText}>Incomplete: {incomplete}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.dataText}>Scheduled: {scheduled}</Text>
          <Text style={styles.dataText}>Unscheduled: {unscheduled}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20, // Increase padding to increase the size of the dashboard
  },
  dashboardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  hrLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  graphContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 20,
    // backgroundColor: '#D0E3F1',
  },
  bar: {
    flex: 1,
    // resizeMode: 'contain',
    height:200,
    marginTop:40,
    width:200,
    backgroundColor:'grey',
  },
  dataContainer: {
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dataText: {
    fontSize: 18,
    color: 'black',
    marginVertical: 5,
    backgroundColor: '#BFDDF3',
    width: 150,
    height: 30,
    marginTop:70,
    borderRadius:20,
    paddingRight:10,
  },
  dataTextt:{
    fontSize: 18,
    color: 'black',
    marginVertical: 5,
    backgroundColor: '#BFDDF3',
    width: 150,
    height: 30,
    marginTop:50,
    borderRadius:20,
    marginRight:10,
  }
});

export default DashboardGraph;
