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
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});
