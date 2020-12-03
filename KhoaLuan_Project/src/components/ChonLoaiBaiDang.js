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
import {Avatar} from 'react-native-paper';
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
          <Avatar.Image
            style={{margin: 5}}
            source={{uri: this.state.avatar}}
            // source={avatar}
            size={FontSize.reSize(50)}
          />
          <TouchableOpacity
            style={styles.khung_textinput}
            onPress={this.props.onPress}>
            <Text>Bạn muốn đăng thông tin gi?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'green',
    // height: '10%',
  },
  khungchua: {
    flexDirection: 'row',
    // padding: 10,
    marginTop: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#C0C0C020',
  },
  khung_textinput: {
    // backgroundColor: 'blue',
    flex: 1,
    margin: 5,
    borderRadius: 50,
    borderColor: '#000000',
    borderWidth: 1,
    height: FontSize.scale(30),
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
