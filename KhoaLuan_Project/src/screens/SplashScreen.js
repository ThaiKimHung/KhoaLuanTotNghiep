import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  Button,
  ActivityIndicator,
} from 'react-native';
import FontSize from '../components/size';
const imagebackgroung = require('../assets/images/backgroundTong.png');
const logo = require('../assets/images/Jee.png');
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({loader: false});
    }, 3000);
  }

  render() {
    // console.log('navi', this.props);
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={imagebackgroung}
          style={styles.image_background}>
          <View style={styles.header}>
            <View style={styles.khung_logo}>
              <Image source={logo} style={styles.logo}></Image>
            </View>
          </View>
          <View style={[styles.footer]}>
            {this.state.loader ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              this.props.navigation.navigate('SigninScreen')
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  header: {
    // backgroundColor: 'blue',
    height: '40%',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    // backgroundColor: 'yellow',
    padding: 20,
  },

  khung_logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: '80%',
    width: '40%',
  },
  image_background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: height,
    width: width,
    flex: 1,
  },
});
