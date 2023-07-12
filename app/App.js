import React from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import MainNavigator from './src/navigation/mainNavigator';
import { DataProvider } from './src/context/DataContext';

export default function App() {
  return (
    <DataProvider>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea}>
        <MainNavigator />
      </SafeAreaView>
    </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
