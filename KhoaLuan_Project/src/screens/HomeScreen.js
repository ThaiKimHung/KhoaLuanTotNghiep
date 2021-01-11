import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import Utils from '../apis/Utils';
import Header from '../components/Header';
import ChonLoaiBaiDang from '../components/ChonLoaiBaiDang';
// import {useTheme} from '@react-navigation/native';
// const {colors} = useTheme();
import ScreenAllBaiDang from './ScreenAllBaiDang';
import ScreenAllBaiDang_V2 from './ScreenAllBaiDang_V2';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontSize from '../components/size';
import {SearchBar} from 'react-native-elements';

import {GetDSMedia} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const arrow = require('../assets/images/right-arrow.png');

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
    };
  }
  render() {
    // const {ds} = this.props.route.params;
    // console.log('props_homesrceen', this.props);
    // console.log('item id', ds);
    return (
      <View style={{flex: 1}}>
        <Header nthis={this}></Header>

        <ChonLoaiBaiDang
          onPress={() => {
            // this.props.navigation.navigate('ScreenLoaiBaiDang');
            Utils.goscreen(this, 'ScreenLoaiBaiDang');
          }}></ChonLoaiBaiDang>

        <ScrollView>
          <View
            style={{
              height: FontSize.scale(40),
              justifyContent: 'center',
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}
              onPress={() => Utils.goscreen(this, 'ScreenBangTin')}>
              <Text style={{textAlign: 'center', fontSize: 18}}>Xem tin</Text>
              <Image
                source={arrow}
                style={{
                  height: FontSize.scale(15),
                  width: FontSize.verticalScale(15),
                }}></Image>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <ScreenAllBaiDang_V2 nthis={this}></ScreenAllBaiDang_V2>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
});
