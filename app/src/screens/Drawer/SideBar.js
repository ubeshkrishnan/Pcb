import React, { Component } from 'react';
import DashboardGraph from '../Dashboard/DashboardGraph';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import ic_menu from '../../assets/list.png';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
console.disableYellowBox = true;

const menu = [
  { title: 'MAIN MENU' },
  { title: 'SAMPLING' },
  { title: 'Regular' },
  { title: 'Actionable' },
  { title: 'Spot Sampling-Unscheduled' },
  { title: 'Profile' },
  { title: 'Records' },
];

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  renderDrawer() {
    return (
      <View style={styles.menuContainer}>
        <FlatList
          style={{ flex: 1.0 }}
          data={menu}
          extraData={this.state}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle} key={index}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  openDrawer() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.mainContainer}>
          <Drawer
            ref={(ref) => (this.drawer = ref)}
            content={this.renderDrawer()}
            type="static"
            tapToClose={true}
            openDrawerOffset={0.35}
            styles={drawerStyles}
            side="left"
          >
            <View style={styles.headerContainer}>
              <View style={styles.menuButton}>
                <TouchableOpacity
                  onPress={this.openDrawer.bind(this)}
                  style={styles.menuButtonContainer}
                >
                  <Image style={styles.menuIcon} source={ic_menu} />
                </TouchableOpacity>
              </View>
              <View style={styles.menuButton} />
            </View>
            {/* Additional content */}
            <View style={styles.contentContainer}>
              {/* <Text style={styles.contentText}>Dashboard</Text> */}
             
            </View>
            <DashboardGraph/>
          </Drawer>
        </View>
      </SafeAreaView>
    );
  }
}

const drawerStyles = {
  drawer: {
    flex: 1.0,
    backgroundColor: '#3B5998',
  },
  main: {
    flex: 1.0,
    backgroundColor: 'red',
  },
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1.0,
    backgroundColor: 'white',
  },
  safeAreaStyle: {
    flex: 1.0,
    backgroundColor: '#3B5998',
  },
  headerContainer: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'White',
  },
  menuButton: {
    position: 'absolute',
    left: 8,
    alignSelf: 'center',
    tintColor: 'white',
  },
  menuContainer: {
    flex: 1.0,
    backgroundColor: '#3B5998',
  },
    menuTitleContainer: {
        alignItem:'center',
        height: 60,
        width:'100%',
        flexDirection:'row',
    },
    menuTitle: {
        width: '100%',
        color: 'white',
        fontSize: 17,
        alignSelf: 'center',
        marginLeft: 40,
    },
    menuButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 44,
    },
    menuIcon: {
        tintColor: 'black',
    },

})
