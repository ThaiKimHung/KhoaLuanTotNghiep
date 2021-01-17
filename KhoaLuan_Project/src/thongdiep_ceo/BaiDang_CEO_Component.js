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
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

// import DanhSachLike from './DanhSachLike';
// import ModalComponent from '../components/ModalComponent';

import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import * as Animatable from 'react-native-animatable';

import {ROOTGlobal} from '../apis/dataGlobal';
import {
  GetDSLike,
  AddLike,
  DeleteBaiDang_Like,
  AddThongBao,
  BanThongBao,
  AddThongBao_Like,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const avatar = require('../assets/images/avatar.jpg');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');
const welcome = require('../assets/images/welcome.png');
const noti = require('../assets/images/bell.png');
const sheld = require('../assets/images/shield.png');
const light = require('../assets/images/light-bulb.png');
const windowWidth = Dimensions.get('window').width;
const arrow = require('../assets/images/right-arrow-black-triangle.png');
import moment from 'moment';
import Utils from '../apis/Utils';

export default class BaiDang_CEO_Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thich: false,
      toolTipVisible: false,
      DaLike: [],
      DataChuyenVe: [],
      likeSelected: {},
    };
    this.id_like = 1;
    this.id_user = '';
    this.item = {};
    // ROOTGlobal.GetDsAllBaiDang_Nhom = this.GetDsAllBaiDang_Nhom;
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={{paddingHorizontal: 5}}>
        <SvgUri
          width={FontSize.scale(25)}
          height={FontSize.verticalScale(25)}
          source={{
            uri: item.link_icon_like,
          }}
        />
      </TouchableOpacity>
    );
  };

  // TaoLike_Like = async () => {
  //   Utils.goscreen(this.props.nthis.props.nthis, 'ModalLike', {
  //     chuyenData: this.ChuyenData,
  //   });

  //   await this.TaoLike(
  //     this.item.Id_BaiDang,
  //     this.state.likeSelected,
  //     await Utils.ngetStorage(nkey.id_user),
  //   );

  //   // switch(this.state.likeSelected){
  //   //   case 1:

  //   // }
  // };

  componentDidMount = async () => {
    // this._GetDSLike();
    // console.log('this bài đăng component did mount', this);
    // this.CheckLike();
    // await this.GanDataSauKhiChuyenVe();
  };

  render() {
    const {item = {}} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
            <Text>{item.title}</Text>
            <Text>{item.noidung}</Text>
            {item.media ? (
              <View style={{marginVertical: 5}}>
                <Image
                  source={{uri: item.imgmedia}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 5,
    borderColor: '#69696920',
    backgroundColor: '#E9EBEE',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    // justifyContent: 'space-between',
  },
  khung_tenUser: {
    // flexDirection: 'row',
    flex: 1,
  },
  khung_daubacham: {
    padding: 5,
  },
  txt_TenUser: {
    fontWeight: 'bold',
    fontSize: FontSize.reSize(20),
    marginHorizontal: 5,
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderRadius: 10,
  },
  footer1: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_bacham: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
  },
  khung_DemSoLike_Comt: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  khung_DemSoLike: {
    flexDirection: 'row',
    padding: 3,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  khung_DemSoComment: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLike_Commnet: {
    height: FontSize.scale(17),
    width: FontSize.verticalScale(18),
    marginRight: 2,
  },
  daubacham: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
  },
  khungLike_Commnet: {
    borderTopWidth: 1,
    borderColor: '#69696930',
    flexDirection: 'row',
    padding: 5,
  },
  khung_Thich: {
    flexDirection: 'row',
    padding: 3,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  khung_BinhLuan: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#69696920',
  },
  text_Like_cmt: {
    marginLeft: FontSize.reSize(5),
    textAlign: 'center',
    color: '#4F4F4F',
  },
  text_Like_cmt1: {
    marginLeft: FontSize.reSize(5),
    textAlign: 'center',
    color: '#007DE3',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    height: FontSize.scale(250),
    // padding: 5,
    // tintColor: 'yellow',
    // marginBottom: -50,
  },
});
