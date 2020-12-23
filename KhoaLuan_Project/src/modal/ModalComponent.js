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
} from 'react-native';
// import ModalComponent from '../components/ModalComponent';
import Utils from '../apis/Utils';
const logo = require('../assets/images/Jeelogo.png');
const disconnected = require('../assets/images/disconected.png');
import FontSize from '../components/size';
export default class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }
  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    // Utils.goback(this, '');
  }

  render() {
    const {display} = this.state;
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={display} transparent={true}>
          <TouchableOpacity
            onPress={() => this.change()}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: '40%',
                  width: '60%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={disconnected}
                  style={{
                    height: FontSize.scale(100),
                    width: FontSize.verticalScale(200),
                    // alignItems: 'center',
                  }}></Image>
                <TouchableOpacity
                  style={{
                    // backgroundColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    Xin hãy kết nối với Internet để tiếp tục sử dụng
                  </Text>
                </TouchableOpacity>
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
