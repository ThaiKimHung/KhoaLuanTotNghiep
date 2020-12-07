import React, {Component, Fragment} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {GetAllUser} from '../apis/apiUser';
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
  Alert,
} from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      selectedItems: [],
    };
  }
  _GetAllUser = async () => {
    let res = await GetAllUser();
    console.log('ress', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: !this.state.refresh,
      });
    } else {
      this.setState({refresh: !this.state.refresh});
      alert('thất bại');
    }
    console.log('data', this.state.DsUser);
    console.log(
      'this',
      this.state.DsUser.map((e) => {
        return e.Username;
      }),
    );
  };
  componentDidMount() {
    this._GetAllUser();
    // console.log('this', this.state.DsUser);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headingText}>
          Searchable Dropdown from Dynamic Array from Server
        </Text>
        <SearchableDropdown
          onItemSelect={(item) => {
            const items = this.state.selectedItems;
            items.push(item);
            this.setState({selectedItems: items});
            alert(item);
          }}
          containerStyle={{padding: 5}}
          onRemoveItem={(item, index) => {
            const items = this.state.selectedItems.filter(
              (sitem) => sitem.id !== item.id,
            );
            this.setState({selectedItems: items});
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 140}}
          items={this.state.DsUser}
          defaultIndex={2}
          resetValue={false}
          textInputProps={{
            placeholder: 'placeholder',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            },
            onTextChange: (text) => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});
