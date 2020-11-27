import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import FontSize from './size';
import SvgUri from 'react-native-svg-uri';
export default class LoaiBaiDang extends React.Component {
  render() {
    const {anh, tennhom} = this.props;

    return (
      <TouchableOpacity style={styles.container}>
        <SvgUri
          width={FontSize.scale(100)}
          height={FontSize.verticalScale(100)}
          source={{
            uri:
              'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
          }}
        />
        <Text style={{margin: 5, textAlign: 'center'}}>{tennhom}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // height: FontSize.scale(100),
    borderColor: '#000000',
    borderWidth: 1,
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingTop: 5,
    // backgroundColor: 'green',
  },
  khungchua: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: 'yellow',
  },
  khung_textinput: {
    backgroundColor: 'blue',
    flex: 1,
    marginLeft: 5,
    borderRadius: 50,
    borderColor: '#000000',
    borderWidth: 1,
    height: FontSize.scale(30),
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
