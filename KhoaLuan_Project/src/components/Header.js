import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  Button,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontSize from './size';

// const iconMenu = require('../assets/images/menu.png');

const timkiem = require('../assets/images/search.png');
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
//make a Component
export default class Header extends React.Component {
  // console.log('nthis cua ma hinh :', nthis);
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bgHeader}>
        <Text style={styles.headerStyle}>JFace</Text>
        {/* <TouchableOpacity
          style={styles.khung_icon}
          onPress={() => this.onPressShowTextInput()}>
          <Image source={timkiem} style={styles.icon}></Image>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgHeader: {
    backgroundColor: '#007DE3',
    // justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    position: 'relative',
    flexDirection: 'row',
    width: width,
    height: FontSize.scale(40),
    padding: 10,
  },
  headerStyle: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  khung_icon: {
    width: FontSize.scale(30),
    height: FontSize.verticalScale(30),
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#4285F480',
  },
  icon: {
    width: FontSize.scale(15),
    height: FontSize.verticalScale(15),
    marginLeft: 5,
    tintColor: '#000000',
  },
  khung_timkiem_Text: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flex: 1,
    paddingLeft: 5,
  },
  header2: {
    backgroundColor: '#EEEEEE',
    // justifyContent: 'center',
    // backgroundColor: 'blue',
    alignItems: 'center',
    elevation: 10,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    position: 'relative',
    flexDirection: 'row',
    width: width,
    height: FontSize.scale(40),
    paddingHorizontal: 10,
  },
});
