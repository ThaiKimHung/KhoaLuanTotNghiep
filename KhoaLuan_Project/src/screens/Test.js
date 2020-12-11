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
} from 'react-native';
import ModalComponent from '../components/ModalComponent';
const logo = require('../assets/images/Jeelogo.png');
import Tooltip from 'react-native-walkthrough-tooltip';
import DanhSachLike from '../components/DanhSachLike';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSLike} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const thich = require('../assets/images/thich.png');
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      toolTipVisible: true,
      DSLike: [],
    };
  }
  change() {
    this.setState({
      toolTipVisible: !this.state.toolTipVisible,
    });
  }
  _GetDSLike = async () => {
    let res = await GetDSLike();
    console.log('ress ds like', res);
    if (res.status == 1) {
      this.setState({
        DSLike: res.Data,
        // refresh: !this.state.refresh,
      });
      // alert(5);
    } else {
      this.setState({DSLike: []});
      //   alert('thất bại');
    }
  };
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={{paddingHorizontal: 5}}>
        <SvgUri
          width={FontSize.scale(25)}
          height={FontSize.verticalScale(25)}
          source={{
            uri: item.link_icon_like,
          }}
        />
      </TouchableOpacity>
    );
  };
  componentDidMount() {
    this._GetDSLike();
  }
  render() {
    const {display} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => this.change()}>
          <Text>Press me</Text>
        </TouchableOpacity>
        <Tooltip
          isVisible={this.state.toolTipVisible}
          // content={<DanhSachLike></DanhSachLike>}
          content={
            <View style={{flex: 1, backgroundColor: 'blue'}}>
              <FlatList
                data={this.state.DSLike}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
              />
              {/* <DanhSachLike></DanhSachLike> */}
            </View>
          }
          arrowSize={{width: 200, height: 200}}
          placement="top"
          onClose={() => this.setState({toolTipVisible: false})}></Tooltip>
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
