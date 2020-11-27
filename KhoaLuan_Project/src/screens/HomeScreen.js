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
import BaiDangComponenet from '../components/BaiDangComponenet';
// import {useTheme} from '@react-navigation/native';
// const {colors} = useTheme();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('props_homesceen', this);
    return (
      <View style={styles.container}>
        <Header nthis={this}></Header>

        <ChonLoaiBaiDang
          onPress={
            () => {
              this.props.navigation.navigate('ScreenLoaiBaiDang');
            }
            //
          }></ChonLoaiBaiDang>

        <ScrollView style={{flex: 1}}>
          <BaiDangComponenet></BaiDangComponenet>
          <BaiDangComponenet></BaiDangComponenet>
          <BaiDangComponenet></BaiDangComponenet>
        </ScrollView>

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
