import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import FontSize from './size';
const avatar = require('../assets/images/avatar.png');
import {nGlobalKeys} from '../apis/globalKey';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
export default class ChonLoaiBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    };
  }
  _getThongTin = async () => {
    this.setState({
      avatar: await Utils.ngetStorage(nkey.avatar),
    });
  };
  componentDidMount() {
    if (this.state.avatar === '') {
      setInterval(this._getThongTin, 1000);
    } else {
      clearInterval(1000);
    }
  }

  render() {
    return (
      <View>
        {/* khung chứa avata và khung text input*/}
        <View style={styles.khungchua}>
          <Avatar
            size="medium"
            source={
              this.state.avatar
                ? {uri: this.state.avatar}
                : {
                    uri:
                      'https://png.pngtree.com/png-clipart/20190904/original/pngtree-black-round-pattern-user-cartoon-avatar-png-image_4492904.jpg',
                  }
            }
            activeOpacity={0.7}
            rounded
          />

          <TouchableOpacity
            style={styles.khung_textinput}
            onPress={this.props.onPress}>
            <Text style={{color: '#696969'}}>Bạn muốn đăng thông tin gi?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  khungchua: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#E9EBEE',
  },
  khung_textinput: {
    flex: 1,
    margin: 5,
    borderRadius: 50,
    borderColor: '#69696990',
    borderWidth: 1,
    height: FontSize.scale(30),
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
