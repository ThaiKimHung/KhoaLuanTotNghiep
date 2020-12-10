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
import SvgUri from 'react-native-svg-uri';

import {GetDSLike} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const thich = require('../assets/images/thich.png');
export default class DanhSachLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DSLike: [],
    };
  }

  _GetDSLike = async () => {
    let res = await GetDSLike();
    console.log('ress ds like', res);
    if (res.status == 1) {
      this.setState({
        DSLike: res.Data,
        // refresh: !this.state.refresh,
      });
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
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.DSLike}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: FontSize.scale(30),
    width: FontSize.scale(240),
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    // padding: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  imageSize: {
    height: FontSize.scale(18),
    width: FontSize.verticalScale(18),
  },
});
