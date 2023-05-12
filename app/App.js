
import { StyleSheet, View,StatusBar } from 'react-native';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
