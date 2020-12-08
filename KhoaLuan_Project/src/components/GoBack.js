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
const goback = require('../assets/images/go-back-left-arrow.png');

export default class GoBack extends React.Component {
  render() {
    const {name} = this.props;
    return (
      <View style={styles.back}>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={this.props.nthis.navigation.goBack}
            style={{justifyContent: 'center', marginLeft: 5}}>
            <Image
              source={goback}
              style={{
                height: FontSize.scale(13),
                width: FontSize.verticalScale(18),
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
    backgroundColor: 'green',
    height: FontSize.scale(35),
    backgroundColor: '#4F94CD',
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    // textAlign: 'center',
  },
});
