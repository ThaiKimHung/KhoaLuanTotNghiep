import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {
  AppgetGlobal,
  AppgetRootGlobal,
  AppsetGlobal,
  ROOTGlobal,
} from './dataGlobal';
// --call API

// const domain = 'http://192.168.3.49/';
// const domain = 'http://192.168.43.236/';
// const domain = 'http://192.168.3.43/';
const domain = 'http://192.168.100.5/';
// const domain = 'https://localhost:44340/';
// const domain = 'http://192.168.43.178/';
// const domain = 'http://192.168.0.102/';
// const domain = 'http://192.168.3.54/';
// const domain = 'http://192.168.1.99/';
// const domain = 'http://192.168.3.62/';
async function post_api(
  strUrl,
  strBody = '{}',
  showMsg = false,
  chktoken = true,
  method = '',
) {
  var smethod = 'POST';
  if (strBody == '') smethod = 'GET';
  if (method) {
    smethod = method;
  }
  let token = '';
  if (token == '') {
    token = await ngetStorage('token', '');
  }
  try {
    const response = await fetch(domain + strUrl, {
      method: smethod,
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: strBody,
    });
    const res = await response.json();
    // console.log(res);
    if (res.status == 0) {
      nlog('[API]Lỗi API------------:', res);
    }
    if (res.status == 5) {
      // alert(2)
      navigate('Modal_KTDangNhap');
      return {status: 1};
    }
    if (res.ExceptionMessage != undefined) {
      // edit tuỳ từng object api
      nlog('[API]Lỗi API------------:', res);
      return -3;
    }
    const result = handleResponse(res);
    return result;
  } catch (error) {
    nlog('[API]Lỗi error:', error);
    if (showMsg) Alert.alert('Lỗi mạng', 'Kết nối server thất bại');
    return -1;
  }
}

async function get_api(strUrl, showMsg = false, chktoken = true) {
  const res = await post_api(strUrl, '', showMsg, chktoken);
  return res;
}

// -- custom AynsStore
// function ngetParam(nthis, keys, defaultValue) {
//   // let param = nthis.props.navigation.getParam(keys, defaultValue);
//   let param = nthis.props.route.params(keys, defaultValue);
//   return param;
// }

function ngetParam(nthis, keys, defaultValue) {
  // let param = nthis.props.navigation.getParam(keys, defaultValue);
  let param = nthis.props.route.params[keys];
  if (param) return param;
  else return defaultValue;
}
//--Thông số cấu hình mặc

function nlog(...val) {
  // console.log(...val);
}

// -- custom AynsStore
async function ngetStorage(keys, defaultValue = null) {
  let temp = await AsyncStorage.getItem(keys);
  if (temp == null) return defaultValue;
  try {
    let tempValue = JSON.parse(temp);
    return tempValue;
  } catch (error) {
    return temp;
  }
}
async function nsetStorage(keys, value) {
  if (typeof value !== 'string') value = JSON.stringify(value);
  await AsyncStorage.setItem(keys, value);
}
// --navigation, [core] pass param on all of app
function goscreen(nthis, routeName, param = null) {
  if (param == null)
    nthis.props.navigation.navigate(routeName, {lang: nthis.lang});
  else nthis.props.navigation.navigate(routeName, {...param, lang: nthis.lang});
}

function goscreenReplace(nthis, routeName, param = null) {
  if (param == null)
    nthis.props.navigation.replace(routeName, {lang: nthis.lang});
  else
    nthis.props.navigation.replace(routeName, {
      ...param,
      lang: nthis.lang,
    });
}

function goscreenPush(nthis, routeName, param = null) {
  if (param == null) nthis.props.navigation.push(routeName, {lang: nthis.lang});
  else nthis.props.navigation.push(routeName, {...param, lang: nthis.lang});
}

function goback(nthis, routeName = '') {
  if (routeName == '') nthis.props.navigation.goBack();
  else nthis.props.navigation.goBack(routeName);
}

function navigate(routeName, params = {}) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function handleResponse(res) {
  if (res < 0 || res.status == undefined) return resFalse(res);
  if (res.status >= 1) {
    return resTrue(res);
  }
  return resFalse(res);
}

let resFalse = (res = null, message = 'Xử lý thất bại') => {
  try {
    if (
      res.data != undefined ||
      res.error != undefined ||
      res.status != undefined ||
      res.message != undefined
    )
      return {
        data: null,
        status: 0,
        title: 'Cảnh báo',
        message,
        ...res,
      };
    return {
      data: res,
      status: 0,
      title: 'Cảnh báo',
      message,
    };
  } catch (error) {
    return {
      data: res,
      status: 0,
      title: 'Cảnh báo',
      message,
    };
  }
};
let resTrue = (res = {}, message = 'Xử lý thành công') => {
  return {
    status: 1,
    title: 'Thông báo',
    message,
    ...res,
  };
};

// -- Các hàm xử lý thao tác với biến gốc rootGlobal
// Hàm get giá trị theo keys - read only. Giá trị thay đổi không làm thay đổi giá trị root
function getGlobal(keys, defaultValue) {
  return AppgetGlobal(keys, defaultValue);
}
// Hàm get giá trị gốc theo keys - read write. Giá trị thay đổi làm thay đổi giá trị root
function getRootGlobal(keys, defaultValue) {
  return AppgetRootGlobal(keys, defaultValue);
}
// Hàm khởi tạo một biến gốc, cũng có thể dùng để thay đổi một gốc.
function setGlobal(keys, value) {
  AppsetGlobal(keys, value);
}
function removeAccents(str) {
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
//--
//-------END---------
export default {
  goscreen,
  nlog,
  goback,
  post_api,
  get_api,
  goscreenPush,
  ngetStorage,
  nsetStorage,
  ngetParam,
  navigate,
  handleResponse,
  resFalse,
  resTrue,
  getGlobal,
  getRootGlobal,
  setGlobal,
  removeAccents,
  goscreenReplace,
};
