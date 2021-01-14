import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import GoBack from '../components/GoBack';
import {GetThongBao, BanThongBao} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import ImagePicker from 'react-native-image-crop-picker';

const search = require('../assets/images/search.png');

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _getthongbao = async () => {
    // alert(5);
    // console.log('hi');
    let res = await BanThongBao();
    // console.log('res thong báo', res);
  };
  // sendNotification = (data) => {
  //   let headers = {
  //     'Content-Type': 'application/json; charset=utf-8',
  //     Authorization: 'Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj',
  //   };

  //   let endpoint = 'https://onesignal.com/api/v1/notifications';

  //   let params = {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify({
  //       app_id: '2db1f7fd-d78c-4cf2-986b-c1b505665cf8',
  //       contents: {en: 'English Message'},
  //       included_segments: ['305c45b3-4fc1-4f6c-bba6-a9175010dee7'],
  //     }),
  //   };
  //   fetch(endpoint, params).then((res) => console.log(res));
  // };
  componentDidMount = () => {
    // this.sendNotification('hi dây la thong bao');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          // onPress={() => this.sendNotification('dây la thong bao')}
          onPress={() => this._getthongbao()}
          style={{height: 100, width: 200, backgroundColor: 'green'}}>
          <Text>Thông báo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: CarColors.white,
  },
  imgContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  safeArea: {
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  imgView: {
    width: '50%',
    marginVertical: 10,
  },
});
