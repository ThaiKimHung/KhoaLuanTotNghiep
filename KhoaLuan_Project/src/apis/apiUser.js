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
async function PostBaiDang_Nhom(strbody) {
  let res = await Utils.post_api(apiUser + `addBaiDang_Group`, strbody);
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

async function GetChiTietBaiDang(user, idbaidang) {
  let res = await Utils.get_api(
    apiUser + `getDSBaiDangViewDetail?id_user=${user}&id_baidang=${idbaidang}`,
  );
  return res;
}

async function Update_BaiDang(strbody) {
  let res = await Utils.post_api(apiUser + `UpdateBaiDang`, strbody);
  return res;
}

async function Update_BaiDang_KhenThuong(strbody) {
  let res = await Utils.post_api(apiUser + `UpdateBaiDang_KT`, strbody);
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

async function AddComment(strbody) {
  let res = await Utils.post_api(apiUser + `addComment`, strbody);
  return res;
}
async function AddComment_Child(strbody) {
  let res = await Utils.post_api(apiUser + `addComment_chill`, strbody);
  return res;
}

async function Update_CMT(strbody) {
  let res = await Utils.post_api(apiUser + `UpdateComment`, strbody);
  return res;
}
async function DeleteComment_Like(id_cmt = '') {
  let res = await Utils.post_api(
    apiUser + `deleteComment_like?id_cmt=${id_cmt}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

async function DeleteComment(id_cmt = '') {
  let res = await Utils.post_api(
    apiUser + `deleteComment?id_cmt=${id_cmt}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

async function GetDSGroup(iduser) {
  let res = await Utils.get_api(apiUser + `getDSGroup?id_user=${iduser}`);
  return res;
}

async function GetDS_BaiDangGroup(iduser, idgroup) {
  let res = await Utils.get_api(
    apiUser + `getDSBaiDang_In_Group?id_user=${iduser}&id_group=${idgroup}`,
  );
  return res;
}

async function AddBaiDang_KhenThuong(strbody) {
  let res = await Utils.post_api(apiUser + `addBaiDang_KT`, strbody);
  return res;
}

async function AddBaiDang_KhenThuong_Nhom(strbody) {
  let res = await Utils.post_api(apiUser + `addBaiDang_KT_Group`, strbody);
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
  GetChiTietBaiDang,
  GetDSLike,
  AddLike,
  PostBaiDang,
  PostBaiDang_Nhom,
  Update_BaiDang,
  Update_BaiDang_KhenThuong,
  DeleteLikeTrongBaiDang,
  DeleteCommentTrongBaiDang,
  DeleteBaiDang,
  DeleteBaiDang_Like,
  AddComment,
  AddComment_Child,
  Update_CMT,
  DeleteComment_Like,
  DeleteComment,
  GetDSGroup,
  GetDS_BaiDangGroup,
  AddBaiDang_KhenThuong,
  AddBaiDang_KhenThuong_Nhom,
};
