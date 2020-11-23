import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';

import Header from '../components/Header';
// import {useTheme} from '@react-navigation/native';
// const {colors} = useTheme();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Header nthis={this}></Header>
        <Text>Home Screen</Text>
        <Button
          title="Go to details screen"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
