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
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSKhenThuong} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

export default class KhenThuong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsKhenThuong: [],
    };
  }

  _GetDsKhenThuong = async () => {
    let res = await GetDSKhenThuong();
    console.log('res ds khen thưởng', res);
    this.setState({DsKhenThuong: res.data.Data});
    console.log('ds khen thưởng', this.state.DsKhenThuong);
  };

  componentDidMount() {
    // await this._GetAsync();
    this._GetDsKhenThuong();
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[styles.khung, {marginLeft: index % 2 != 0 ? 10 : 0}]}>
        <View style={styles.khung_DS}>
          <SvgUri
            width={FontSize.scale(100)}
            height={FontSize.verticalScale(100)}
            source={{
              uri: item.icon,
            }}
          />
          <Text style={{margin: 5, textAlign: 'center'}}>{item.tieude}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(20)}}>
            Bạn muốn đăng bài gì?
          </Text>
        </View>
        <View style={styles.footer}>
          {this.state.DsKhenThuong.length != 0 ? (
            <FlatList
              data={this.state.DsKhenThuong}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {/* <FlatList
            data={this.state.DsKhenThuong}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}></FlatList>
          {console.log('state', this.state.DsKhenThuong)} */}
        </View>
      </View>
    );
  }
}
const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    // backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: '#4285F4',
    height: '8%',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  footer: {
    // flex: 1,
    // backgroundColor: 'green',
    // flexDirection: 'row',
    height: '100%',
    width: '100%',
    paddingTop: 10,
  },
  khung: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'yellow',
    borderRadius: 10,
    height: FontSize.scale(heightScreen / 2.5),
    width: FontSize.verticalScale(widthScreen / 2.5),
  },
  container_khung: {
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  khung_DS: {
    // width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});
