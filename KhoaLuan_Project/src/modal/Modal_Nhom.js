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
  FlatList,
} from 'react-native';
import {GetDSGroup} from '../apis/apiUser';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import FontSize from '../components/size';
const logo = require('../assets/images/Jeelogo.png');
export default class Modal_Nhom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      DSNhom: [],
    };
  }
  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    // Utils.goback(this, '');
  }
  _GetDSGroup = async () => {
    let res = await GetDSGroup(await Utils.ngetStorage(nkey.id_user));
    // let res = await GetDSGroup(1);
    console.log(res);
    if (res.status == 1) {
      this.setState({
        DSNhom: res.Data,
      });
    }
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 5, paddingVertical: 5}}
        onPress={() => {
          // Utils.goscreen(this, 'KhenThuong', {iduser: item});
          // this.props.navigation.navigate('KhenThuong', item);
          this.props.route.params.DataNhomVe(item);
        }}>
        <Text style={{textAlign: 'center'}}>{item.Ten_Group}</Text>
      </TouchableOpacity>
    );
  };

  componentDidMount = async () => {
    await this._GetDSGroup();
  };

  render() {
    const {display} = this.state;
    console.log('this mdoal nhóm', this);
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={display} transparent={true}>
          <TouchableOpacity
            onPress={() => this.change()}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: '20%',
                  width: '50%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                }}>
                <FlatList
                  data={this.state.DSNhom}
                  renderItem={this._renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
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
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default App;
