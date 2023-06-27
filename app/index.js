/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import store from '../app/src/store'; // Import the store
import { Provider } from 'react-redux'
import { FingerprintJsProProvider } from '@fingerprintjs/fingerprintjs-pro-react-native';

const AppWithProvider = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
AppRegistry.registerComponent(appName, () => AppWithProvider);

