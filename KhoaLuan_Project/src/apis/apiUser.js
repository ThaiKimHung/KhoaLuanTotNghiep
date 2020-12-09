import Utils from './Utils';

const apiUser = 'api/KhoaLuan/';

async function Login(user = '', pass = '') {
  let res = await Utils.post_api(
    apiUser + `postDSUser?Email=${user}&Pass=${pass}`,
    null,
    false,
    false,
  );
  return res;
}

async function Logout() {
  let res = await Utils.get_api(apiUser + 'LogOut');
  return res;
}

async function GetLoaiBaiDang(user = '') {
  let res = await Utils.get_api(
    apiUser + `PhanQuyenLoaiBaiDang?id_user=${user}`,
  );
  return res;
}
async function GetAllUser() {
  let res = await Utils.get_api(apiUser + `GetDSUser`);
  return res;
}

async function PostTinhTrang(strbody) {
  let res = await Utils.post_api(apiUser + `UpdateUserName`, strbody);
  return res;
}

async function GetDSKhenThuong() {
  let res = await Utils.get_api(apiUser + `GetDSKhenThuong`);
  return res;
}

async function GetDSBaiDang() {
  let res = await Utils.get_api(apiUser + `getDSBaiDang`);
  return res;
}

export {
  Login,
  Logout,
  GetLoaiBaiDang,
  GetAllUser,
  PostTinhTrang,
  GetDSKhenThuong,
  GetDSBaiDang,
};
