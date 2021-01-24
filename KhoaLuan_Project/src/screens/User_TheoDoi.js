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
import {Avatar, SearchBar} from 'react-native-elements';
import {GetAllUser} from '../apis/apiUser';
import Utils from '../apis/Utils';

const avatar = require('../assets/images/avatar.jpg');
const goback = require('../assets/images/go-back-left-arrow.png');
// const congratulation = require('../assets/images/congratulations.png');
export default class User_TheoDoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      searchText: '',
      filteredData: [],
      dsnguoitheodoi: '',
    };
  }

  _renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <TouchableOpacity style={[styles.khungchua]}>
        <View
          style={{
            marginLeft: 5,
            borderRadius: 30,
            height: FontSize.scale(30),
            width: FontSize.verticalScale(30),
            margin: 10,
          }}>
          <Image
            style={{
              height: FontSize.scale(30),
              width: FontSize.verticalScale(30),
              borderRadius: 30,
            }}
            resizeMode="cover"
            source={item.hinh ? {uri: item.Avatar} : avatar}></Image>
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

  nhanData = async () => {
    // console.log('theo dõi', this.props.route.params);
    const {id_nguoidang = {}} = this.props.route.params;
    await this.setState({
      dsnguoitheodoi: id_nguoidang[0],
    });
    // await console.log('hi', await this.state.dsnguoitheodoi);
  };

  async componentDidMount() {
    // await this._GetAllUser();
    await this.nhanData();
  }

  render() {
    // console.log('this search', this);
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => Utils.goback(this, '')}
              style={{justifyContent: 'center', marginLeft: 5}}>
              <Image
                source={goback}
                style={{
                  height: FontSize.scale(13),
                  width: FontSize.verticalScale(18),
                }}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>Danh sách người theo dõi</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <FlatList
            data={this.state.dsnguoitheodoi}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            // refreshing={this.state.refresh}
            // onRefresh={() => {
            //   this.setState({refresh: true});
            // }}
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