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
import FontSize from './size';
import {SearchBar} from 'react-native-elements';
import {GetAllUser} from '../apis/apiUser';

const goback = require('../assets/images/go-back-left-arrow.png');
const avatar = require('../assets/images/avatar.png');
// const congratulation = require('../assets/images/congratulations.png');
export default class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      searchText: '',
      filteredData: [],
    };
  }
  _GetAllUser = async () => {
    let res = await GetAllUser();
    console.log('ress all user bên search user', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: false,
      });
    } else {
      this.setState({refresh: false});
      alert('thất bại trong việc tải user');
    }
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[styles.khungchua]}
        onPress={
          //   () => {
          //   this.props.navigation.navigate('KhenThuong', item);
          // }
          this.props.onPress()
        }>
        {item.Avatar ? (
          <View
            style={{
              marginLeft: 5,
              borderRadius: 30,
              height: FontSize.scale(30),
              width: FontSize.verticalScale(30),
            }}>
            <Image
              style={{
                height: FontSize.scale(30),
                width: FontSize.verticalScale(30),
                borderRadius: 20,
              }}
              resizeMode="cover"
              source={{uri: item.Avatar}}></Image>
          </View>
        ) : (
          <View
            style={{
              marginLeft: 5,
              borderRadius: 30,
              height: FontSize.scale(30),
              width: FontSize.verticalScale(30),
            }}>
            <Image
              style={{
                height: FontSize.scale(30),
                width: FontSize.verticalScale(30),
                borderRadius: 20,
              }}
              resizeMode="cover"
              containerStyle={{margin: 5}}
              source={avatar}></Image>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingRight: 10,
          }}>
          <Text>{item.Username}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  search = (searchText) => {
    this.setState({searchText: searchText});
    let filteredData = this.state.DsUser.filter((item) =>
      Utils.removeAccents(item['Username'])
        .toUpperCase()
        .includes(Utils.removeAccents(searchText.toUpperCase())),
    );
    this.setState({filteredData: filteredData});
  };

  componentDidMount() {
    this._GetAllUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={this.props.navigation.goBack}
              style={{justifyContent: 'center', marginLeft: 5}}>
              <Image
                source={goback}
                style={{
                  height: FontSize.scale(13),
                  width: FontSize.verticalScale(18),
                }}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>Tìm kiếm nhân viên</Text>
          </View>
        </View>
        <View style={styles.header}>
          <SearchBar
            placeholder="Tìm thành viên..."
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
        </View>
        <View style={styles.footer}>
          <FlatList
            data={
              this.state.filteredData && this.state.filteredData.length > 0
                ? this.state.filteredData
                : this.state.DsUser
            }
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetAllUser);
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
    // padding: 10,
    // backgroundColor: 'yellow',
  },
  header: {
    // backgroundColor: '#4285F4',
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
    height: '92%',
    width: '100%',
    // paddingTop: 5,
    // padding: 10,
  },
  khungchua: {
    flexDirection: 'row',
    // padding: 10,
    marginTop: 5,
    // justifyContent: 'flex-start',
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
  back: {
    flexDirection: 'row',
    height: FontSize.scale(45),
    backgroundColor: '#007DE3',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 10,
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    // textAlign: 'center',
  },
});
