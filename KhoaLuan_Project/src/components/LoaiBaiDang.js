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
    console.log('ảnh', anh);
    // await Utils.nsetStorage(nkey.id_user, this.state.id_userne);
    return (
      <View style={styles.container}>
        <SvgUri
          width={FontSize.scale(100)}
          height={FontSize.verticalScale(100)}
          source={{
            uri: this.props.anh,
          }}
        />
        <Text style={{margin: 5, textAlign: 'center'}}>{tennhom}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});
