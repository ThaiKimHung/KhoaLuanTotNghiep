import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontSize from '../components/size';
// import {Avatar} from 'react-native-paper';
// import {GetAllUser} from '../apis/apiUser';
import flatListData from '../data/Dulieu';
import BaiDangComponent from '../components/BaiDangComponent';

export default class BaiDangComponentScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderItem = ({item}) => {
    return (
      <BaiDangComponent
        HinhDaiDien={item.Avatar}
        Username={item.Username}
        NoiDung={item.NoiDung}
        Solike={item.Solike}
        SoComment={item.SoComment}></BaiDangComponent>
    );
    // alert(item);
  };
  render() {
    return (
      <View>
        <FlatList
          data={flatListData}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.ID_user}
        />
      </View>
    );
  }
}
