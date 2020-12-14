import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import FontSize from '../components/size';
import Utils from '../apis/Utils';
const goback = require('../assets/images/go-back-left-arrow.png');

export default class GoBack extends React.Component {
  render() {
    console.log('this goBack', this);
    const {name} = this.props;
    return (
      <View style={styles.back}>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={this.props.onPress}
            style={{justifyContent: 'center', marginLeft: 5}}>
            <Image
              source={goback}
              style={{
                height: FontSize.scale(15),
                width: FontSize.verticalScale(25),
                tintColor: '#4F4F4F',
              }}></Image>
          </TouchableOpacity>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    height: FontSize.scale(45),
    backgroundColor: '#007DE3',
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    // textAlign: 'center',
    color: '#4F4F4F',
  },
});
