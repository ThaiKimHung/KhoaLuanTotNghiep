import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import Header from '../components/Header';
import ChonLoaiBaiDang from '../components/ChonLoaiBaiDang';
// import {useTheme} from '@react-navigation/native';
// const {colors} = useTheme();
import ScreenAllBaiDang from './ScreenAllBaiDang';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
    };
  }
  render() {
    // const {ds} = this.props.route.params;
    // console.log('props_homesrceen', this.props);
    // console.log('item id', ds);
    return (
      <View style={styles.container}>
        <Header nthis={this}></Header>

        <ChonLoaiBaiDang
          onPress={() => {
            this.props.navigation.navigate('ScreenLoaiBaiDang');
          }}></ChonLoaiBaiDang>

        <View style={{flex: 1}}>
          <ScreenAllBaiDang></ScreenAllBaiDang>
        </View>

        {/* <Button
          title="Go to details screen"
          onPress={() => navigation.navigate('Details')}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
});
