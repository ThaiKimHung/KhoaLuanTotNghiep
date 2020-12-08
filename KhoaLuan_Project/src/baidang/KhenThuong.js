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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import SearchableDropdown from 'react-native-searchable-dropdown';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSKhenThuong} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const search = require('../assets/images/search.png');
export default class KhenThuong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsKhenThuong: [],
      refresh: true,
      search: '',
      setSearch: '',
    };
  }

  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const [masterDataSource, setMasterDataSource] = useState([]);
  EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };
  _GetDsKhenThuong = async () => {
    let res = await GetDSKhenThuong();
    console.log('res ds khen thưởng', res);
    if (res.status === 1) {
      this.setState({
        DsKhenThuong: res.Data,
        refresh: !this.state.refresh,
      });
      console.log('ds khen thưởng', this.state.DsKhenThuong);
    } else {
      this.setState({
        refresh: !this.state.refresh,
      });
    }
  };

  componentDidMount() {
    this._GetDsKhenThuong();
  }
  updateSearch = (search) => {
    this.setState({search});
  };

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
    const item = this.props.route.params;
    console.log('item', item);
    console.log('props', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Chọn thành viên:
          </Text>
          <TouchableOpacity
            style={styles.thanh_search}
            onPress={() => {
              this.props.navigation.navigate('SearchUser');
            }}>
            <Image source={search} style={styles.icon}></Image>
            {item ? (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#000000',
                  flex: 1,
                }}>
                {item.Username}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#69696980',
                  flex: 1,
                }}>
                Mời bạn chọn nhân viên
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Nhập nội dung:
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#69696980"
            placeholder="Nội dung bài đăng"
            multiline={true}
            style={styles.textinput}></TextInput>
        </View>
        <View style={styles.footer}>
          {this.state.DsKhenThuong.length != 0 ? (
            <FlatList
              data={this.state.DsKhenThuong}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.EmptyListMessage}
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true}, this._GetDsKhenThuong);
              }}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
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
    backgroundColor: '#9C9C9C',
    // height: '24%',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  footer: {
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
  textinput: {
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: FontSize.reSize(20),
  },
  thanh_search: {
    // flex: 1,
    height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 5,
  },
  icon: {
    width: FontSize.scale(25),
    height: FontSize.verticalScale(25),
    marginLeft: 5,
    tintColor: '#696969',
    marginLeft: 10,
  },
});
