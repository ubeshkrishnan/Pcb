import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import RegularScreen from '../screens/Drawer/Routes/RegularScreen';
import ActionableScreen from '../screens/Drawer/Routes/ActionableScreen';
import SpotSampling from '../screens/Drawer/Routes/SpotSamplingScreen';
import RecordsScreen from '../screens/Drawer/Routes/RecordScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Regular" component={RegularScreen} />
      <Drawer.Screen name="Actionable" component={ActionableScreen} />
      <Drawer.Screen name="SpotSampling" component={SpotSampling} />
      <Drawer.Screen name="Records" component={RecordsScreen} />
    </Drawer.Navigator>
  );
};