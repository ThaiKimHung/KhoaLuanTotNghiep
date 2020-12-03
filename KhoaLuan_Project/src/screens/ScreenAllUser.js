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
import {Avatar} from 'react-native-paper';
import {GetAllUser} from '../apis/apiUser';

const avatar = require('../assets/images/avatar.png');
// const congratulation = require('../assets/images/congratulations.png');
export default class ScreenAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
    };
  }
  _GetAllUser = async () => {
    let res = await GetAllUser();
    console.log('ress', res);
    if (res.status == 0) {
      this.setState({DsUser: res.data.Data, refresh: !this.state.refresh});
    } else {
      this.setState({refresh: !this.state.refresh});
      alert('thất bại');
    }
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.khungchua]}>
        {item.Avatar ? (
          <Avatar.Image
            style={{margin: 5}}
            source={{uri: item.Avatar}}
            size={FontSize.reSize(50)}
          />
        ) : (
          <Avatar.Image
            style={{margin: 5}}
            source={avatar}
            size={FontSize.reSize(50)}
          />
        )}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingRight: 10,
          }}>
          <Text>{item.Username}</Text>
          {item.TinhTrang === true ? (
            <this.online></this.online>
          ) : (
            <this._offine></this._offine>
          )}
        </View>
      </View>
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

  online() {
    return (
      <View
        style={{
          height: FontSize.scale(10),
          width: FontSize.verticalScale(10),
          backgroundColor: 'green',
          borderRadius: 8,
        }}></View>
    );
  }

  _offine() {
    return (
      <View
        style={{
          height: FontSize.scale(10),
          width: FontSize.verticalScale(10),
          backgroundColor: 'gray',
          borderRadius: 8,
        }}></View>
    );
  }
  componentDidMount() {
    this._GetAllUser();
  }

  render() {
    console.log(' ds user dưới body', this.state.DsUser);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(20)}}>
            Danh sách
          </Text>
        </View>
        <View style={styles.footer}>
          <FlatList
            data={this.state.DsUser}
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
    height: '92%',
    width: '100%',
    paddingTop: 5,
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
});
