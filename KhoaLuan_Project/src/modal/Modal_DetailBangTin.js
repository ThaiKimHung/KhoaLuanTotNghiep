import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
} from 'react-native';
// import ModalComponent from '../components/ModalComponent';
import Utils from '../apis/Utils';
import {GetDetailMedia} from '../apis/apiUser';
import FontSize from '../components/size';

const avatar = require('../assets/images/avatar.png');
const logo = require('../assets/images/Jeelogo.png');
const disconnected = require('../assets/images/disconected.png');
export default class Modal_DetailBangTin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      idbangtin: '',
      thongtinBT: '',
    };
  }
  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    Utils.goback(this, '');
  }
  nhanData = async () => {
    const {id_media = {}} = this.props.route.params;
    // await console.log('id bang tin', id_media);
    await this.setState({
      idbangtin: id_media,
    });
    // await console.log('modal detail', this.props);
  };

  _GetThongTin = async () => {
    let res = await GetDetailMedia(await this.state.idbangtin);
    console.log('res', res);
    if (res.status == 1) {
      await this.setState({
        thongtinBT: res.Data[0],
      });
      // await console.log(res.Data[0]);
    }
  };

  componentDidMount = async () => {
    await this.nhanData();
    await this._GetThongTin();
  };

  render() {
    const {display, thongtinBT} = this.state;
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={display} transparent={true}>
          <TouchableOpacity
            onPress={() => this.change()}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: FontSize.scale(300),
                  width: FontSize.verticalScale(200),
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  {thongtinBT.img_media ? (
                    <ImageBackground
                      source={{uri: thongtinBT.hinhanh}}
                      style={{
                        borderRadius: 10,
                        height: FontSize.scale(290),
                        width: FontSize.verticalScale(190),
                        backgroundColor: 'yellow',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            marginLeft: 5,
                            borderRadius: 30,
                            height: FontSize.scale(40),
                            width: FontSize.verticalScale(40),
                          }}>
                          <Image
                            style={{
                              height: FontSize.scale(40),
                              width: FontSize.verticalScale(40),
                              borderRadius: 30,
                            }}
                            resizeMode="cover"
                            source={
                              // item.hinhanh_user ? {uri: item.Avatar} :
                              avatar
                            }></Image>
                        </View>
                        <Text style={{fontSize: FontSize.reSize(20)}}>
                          {thongtinBT.username}
                        </Text>
                      </View>
                      <View style={{marginTop: 5}}>
                        <Text style={{fontSize: 18, margin: 5}}>
                          {thongtinBT.title}
                        </Text>
                      </View>
                    </ImageBackground>
                  ) : (
                    <TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            marginLeft: 5,
                            borderRadius: 30,
                            height: FontSize.scale(40),
                            width: FontSize.verticalScale(40),
                          }}>
                          <Image
                            style={{
                              height: FontSize.scale(40),
                              width: FontSize.verticalScale(40),
                              borderRadius: 30,
                            }}
                            resizeMode="cover"
                            source={
                              // item.hinhanh_user ? {uri: item.Avatar} :
                              avatar
                            }></Image>
                        </View>
                        <Text style={{fontSize: FontSize.reSize(20)}}>
                          {thongtinBT.username}
                        </Text>
                      </View>
                      <Text> đay là k có ảnh</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C020',
  },
});
