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

async function PostBaiDang(strbody) {
  let res = await Utils.post_api(apiUser + `addBaiDang`, strbody);
  return res;
}
async function GetDSKhenThuong() {
  let res = await Utils.get_api(apiUser + `GetDSKhenThuong`);
  return res;
}

async function GetDSBaiDang(user) {
  let res = await Utils.get_api(apiUser + `getDSBaiDang?id_user=${user}`);
  return res;
}
async function GetDSLike() {
  let res = await Utils.get_api(apiUser + `getDSLike`);
  return res;
}
//192.168.3.43/api/KhoaLuan/Baidang_like?id=1&type=1&id_user=1
async function AddLike(id = '', type = '', id_user = '') {
  let res = await Utils.get_api(
    apiUser + `Baidang_like?id=${id}&type=${type}&id_user=${id_user}`,
  );
  return res;
}
async function DeleteLikeTrongBaiDang(idbaidang = '') {
  let res = await Utils.post_api(
    apiUser + `deleteBaiDang_like?id_baidang=${idbaidang}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}
async function DeleteCommentTrongBaiDang(idbaidang = '') {
  let res = await Utils.post_api(
    apiUser + `deleteComment_inBaiDang?id_baidang=${idbaidang}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

async function DeleteBaiDang(idbaidang = '') {
  let res = await Utils.post_api(
    apiUser + `deleteBaiDang?id_baidang=${idbaidang}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}
async function DeleteBaiDang_Like(idbaidang = '') {
  let res = await Utils.post_api(
    apiUser + `deleteBaiDang_like?id_baidang=${idbaidang}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

// KhoaLuan/deleteBaiDang?id_baidang=1
export {
  Login,
  Logout,
  GetLoaiBaiDang,
  GetAllUser,
  PostTinhTrang,
  GetDSKhenThuong,
  GetDSBaiDang,
  GetDSLike,
  AddLike,
  PostBaiDang,
  DeleteLikeTrongBaiDang,
  DeleteCommentTrongBaiDang,
  DeleteBaiDang,
  DeleteBaiDang_Like,
};
