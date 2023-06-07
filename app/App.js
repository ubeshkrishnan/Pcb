import React from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import MainNavigator from './src/navigation/mainNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea}>
        <MainNavigator />
      </SafeAreaView>
    </View>
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
