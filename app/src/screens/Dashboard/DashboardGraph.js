import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';

const DashboardGraph = () => {
  // Assume you have the dynamic data available as variables
  const completed = 180;
  const incomplete = 50;
  const scheduled = 100;
  const unscheduled = 220;

  const maxDataValue = Math.max(completed, incomplete, scheduled, unscheduled);

  const calculateBarHeight = (dataValue) => {
    return (dataValue / maxDataValue) * 150; // Adjust the height scaling factor as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dashboardText}>Dashboard</Text>
      <View style={styles.hrLine} />
      <View style={styles.graphContainer}>
        {/* Reversed order of bars */}
        <View style={[styles.bar, { height: calculateBarHeight(unscheduled) }]} />
        <View style={[styles.bar, { height: calculateBarHeight(scheduled) }]} />
        <View style={[styles.bar, { height: calculateBarHeight(incomplete) }]} />
        <View style={[styles.bar, { height: calculateBarHeight(completed) }]} />
      </View>
      <View style={styles.dataContainer}>
        {/* Render dynamically fetched data */}
        <Text style={styles.dataText}>Completed: {completed}</Text>
        <Text style={styles.dataText}>Incomplete: {incomplete}</Text>
        <Text style={styles.dataText}>Scheduled: {scheduled}</Text>
        <Text style={styles.dataText}>Unscheduled: {unscheduled}</Text>
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bar: {
    width: 50,
    backgroundColor: 'blue',
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
    backgroundColor: 'grey',
    width: 150,
    height: 30,
  },
});


export default DashboardGraph;
