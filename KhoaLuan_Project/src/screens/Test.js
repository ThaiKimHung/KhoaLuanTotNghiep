import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TouchableWithoutFeedback,
  FlatList,
  Picker,
} from 'react-native';

import {GetDSGroup} from '../apis/apiUser';
import DropDownPicker from 'react-native-custom-dropdown';
const logo = require('../assets/images/Jeelogo.png');
import Tooltip from 'react-native-walkthrough-tooltip';
import DanhSachLike from '../components/DanhSachLike';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import Icon from 'react-native-vector-icons/Feather';

import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import Utils from '../apis/Utils';
const thich = require('../assets/images/thich.png');

// import {Picker} from '@react-native-community/picker';
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      dsNhom: [],
      mangtam: [],
    };
    this.controller;
  }
  _GetDSGroup = async () => {
    // let res = await GetDSGroup(await Utils.ngetStorage(nkey.id_user));
    let res = await GetDSGroup(2);
    console.log('res', res);
    if (res.status == 1) {
      this.setState({
        dsNhom: res.Data,
      });
      console.log('state', this.state.dsNhom);
    }
  };
  LaymangTam = async () => {
    let temp = this.state.dsNhom.map((e) => {
      var ritem = {};
      ritem['value'] = e.ID_group + '';
      ritem['label'] = e.Ten_Group;
      return ritem;
    });
    await this.setState({mangtam: temp});
  };

  componentDidMount = async () => {
    await this._GetDSGroup();
    await this.LaymangTam();
    // await console.log('hi', this.state.item);
  };

  render() {
    return (
      <View>
        <Text>hi</Text>
        <DropDownPicker
          // onOpen={() => {
          //   this.setState({
          //     pdiing: true,
          //     isOpen: true,
          //   });
          // }}
          items={this.state.mangtam}
          // defaultValue={}
          style={{backgroundColor: 'red', minHeight: 50}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          // onClose={() => {
          //   this.setState({isOpen: false});
          // }}
          dropDownStyle={{backgroundColor: 'red', position: 'absolute'}}
          // onChangeItem={(item) =>
          //   this.setState({
          //     country: item.value,
          //   })
          // }
        ></DropDownPicker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
  },
});
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default App;
