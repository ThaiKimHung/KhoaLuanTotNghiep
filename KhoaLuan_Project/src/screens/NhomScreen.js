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
import {SearchBar} from 'react-native-elements';
import {GetAllUser, GetDSGroup} from '../apis/apiUser';
import Utils from '../apis/Utils';
const avatar = require('../assets/images/avatar.jpg');
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
// const congratulation = require('../assets/images/congratulations.png');
import {ROOTGlobal} from '../apis/dataGlobal';
export default class NhomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      searchText: '',
      filteredData: [],
      dsNhom: [],
    };
    ROOTGlobal.GetDsNhom = this._GetDSGroup;
  }

  _GetDSGroup = async () => {
    let res = await GetDSGroup(await Utils.ngetStorage(nkey.id_user));
    // let res = await GetDSGroup(1);
    // console.log('res', res);
    if (res.status == 1) {
      this.setState({
        dsNhom: res.Data,
        refresh: false,
      });
      // console.log('ds nhóm', this.state.dsNhom);
    } else {
      this.setState({
        refresh: false,
      });
    }
  };

  FoodterMessage = ({item}) => {
    return (
      <View onPress={() => getItem(item)}>
        <ActivityIndicator size="small" color="#0078D7"></ActivityIndicator>
      </View>
    );
  };
  _renderItem = ({item, index}) => {
    // console.log('iten nhom screen', item.Ten_Group);
    return (
      <TouchableOpacity
        style={[styles.khungchua]}
        onPress={() => {
          Utils.goscreen(this, 'ScreenBaiDangNhom', {
            id_nguoidang: item,
            screennhom: item.ID_group,
            tennhom: item.Ten_Group,
          });
        }}>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            padding: 15,
          }}>
          <Text>{item.Ten_Group}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };
  search = (searchText) => {
    this.setState({searchText: searchText});
    // let filteredData = this.state.DsUser.filter(function (item) {
    //   return item.Username.includes(searchText);
    // });
    let filteredData = this.state.dsNhom.filter((item) =>
      Utils.removeAccents(item['Ten_Group'])
        .toUpperCase()
        .includes(Utils.removeAccents(searchText.toUpperCase())),
    );
    this.setState({filteredData: filteredData});
  };

  componentDidMount() {
    this._GetDSGroup();
  }

  render() {
    // console.log(' ds user dưới body', this.state.DsUser);

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Tìm nhóm..."
          showCancel="true"
          platform="android"
          containerStyle={{
            backgroundColor: '#DDDDDD80',
            borderRadius: 20,
            height: FontSize.scale(40),
            justifyContent: 'center',
          }}
          onChangeText={this.search}
          value={this.state.searchText}
        />
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(20)}}>
            Các nhóm đã tham gia
          </Text>
        </View>
        <View style={styles.footer}>
          <FlatList
            data={
              this.state.filteredData && this.state.filteredData.length > 0
                ? this.state.filteredData
                : this.state.dsNhom
            }
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetDSGroup);
            }}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>
      </View>
    );
  }
}
const widthScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: '#4285F4',
    height: FontSize.scale(50),
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  footer: {
    height: '100%',
    width: '100%',
    paddingTop: 5,
    marginBottom: 10,
  },
  khungchua: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#C0C0C020',
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
