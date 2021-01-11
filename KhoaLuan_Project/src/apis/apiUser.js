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

async function GetUserProfile(iduser) {
  let res = await Utils.get_api(apiUser + `GetUserProfile?id_user=${iduser}`);
  return res;
}

async function UpdateUserProfile_User(iduser, idnv, strbody) {
  let res = await Utils.post_api(
    apiUser + `UpdateUserProfile_User?id_user=${iduser}&id_nv=${idnv}`,
    strbody,
  );
  return res;
}
async function UpdateUserProfile_NV(iduser, idnv, strbody) {
  let res = await Utils.post_api(
    apiUser + `UpdateUserProfile_NV?id_user=${iduser}&id_nv=${idnv}`,
    strbody,
  );
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

//test ảnh đây nè=========================================
async function FileBaiDang(strbody) {
  let res = await Utils.post_api(apiUser + `File_baidang`, strbody);
  return res;
}

async function File_Updatebaidang(idbaidang, strbody) {
  let res = await Utils.post_api(
    apiUser + `File_Updatebaidang?id_baidang=${idbaidang}`,
    strbody,
  );
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
async function GetDSCommnet(iduser, id_baidang) {
  let res = await Utils.get_api(
    apiUser + `getDSComment?id_user=${iduser}&id_baidang=${id_baidang}`,
  );
  return res;
}
async function Update_CMT(strbody) {
  let res = await Utils.post_api(apiUser + `UpdateComment`, strbody);
  return res;
}

async function Update_CMT_Child(strbody) {
  let res = await Utils.post_api(apiUser + `UpdateCommentChild`, strbody);
  return res;
}

async function Comment_like(idcmt, type, iduser) {
  let res = await Utils.get_api(
    apiUser + `Comment_like?id=${idcmt}&type=${type}&id_user=${iduser}`,
  );
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
async function AddGroup(strbody) {
  let res = await Utils.post_api(apiUser + `addGroup`, strbody);
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
async function GetDSBaiDang_Nhom(user, idgroup) {
  let res = await Utils.get_api(
    apiUser + `getDSBaiDang_In_Group?id_user=${user}&id_group=${idgroup}`,
  );
  return res;
}
async function getDSUser_Nhom(idgroup, user) {
  let res = await Utils.get_api(
    apiUser + `getDSUser_Group?id_group=${idgroup}&id_user=${user}`,
  );
  return res;
}
async function GetDSUser_In_Group(idgroup) {
  let res = await Utils.get_api(
    apiUser + `GetDSUser_In_Group?id_group=${idgroup}`,
  );
  return res;
}

async function GetDSAllUser_In_Group(idgroup, iduser) {
  let res = await Utils.get_api(
    apiUser + `GetDSAllUser_In_Group?id_group=${idgroup}&id_user=${iduser}`,
  );
  return res;
}

async function GetDSUser_filter_InGroup(idgroup) {
  let res = await Utils.get_api(
    apiUser + `GetDSUser_filter_InGroup?id_gr=${idgroup}`,
  );
  return res;
}

async function Update_Quyen_User(iduser, strbody) {
  let res = await Utils.post_api(
    apiUser + `Update_quyen_Memmber?id_user=${iduser}`,
    strbody,
  );
  return res;
}

async function deleteGroup(idgruop) {
  let res = await Utils.post_api(
    apiUser + `deleteGroup?id_group=${idgruop}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

async function addUserGroup(idgroup, iduser, strbody) {
  let res = await Utils.post_api(
    apiUser + `addUserGroup?id_group=${idgroup}&id_user=${iduser}`,
    strbody,
  );
  return res;
}

async function DeleteUserGroup(idgroup, iduser) {
  let res = await Utils.post_api(
    apiUser + `Delete_User?id_group=${idgroup}&id_user=${iduser}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

async function AvatarUser(iduser, strbody) {
  let res = await Utils.post_api(
    apiUser + `AvatarUser?id_user=${iduser}`,
    strbody,
  );
  return res;
}

async function AddThongBao(iduser, strbody) {
  let res = await Utils.post_api(
    apiUser + `addThongBao?id_user=${iduser}`,
    strbody,
  );
  // this.BanThongBao();
  return res;
}

async function GetDSThongBao(iduser) {
  let res = await Utils.get_api(apiUser + `GetDSThongBao?id_user=${iduser}`);
  return res;
}

async function CountSoLuong_ThongBao(iduser) {
  let res = await Utils.get_api(apiUser + `Count_ThongBao?iduser=${iduser}`);
  return res;
}

async function Danhdaudadoc() {
  let res = await Utils.post_api(apiUser + `UpdateTinhTrangTrueAllThongBao`);
  return res;
}

async function Update_ThongBao(idbaidang) {
  let res = await Utils.post_api(
    apiUser + `UpdateTinhTrangTrueThongBao?id_thongbao=${idbaidang}`,
  );
  return res;
}

async function Delete_ThongBao(idbaidang) {
  let res = await Utils.post_api(
    apiUser + `deleteThongBao?id_thongbao=${idbaidang}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

async function BanThongBao() {
  let res = await Utils.post_api(apiUser + `BanThongBao`);
  return res;
}

async function GetDSMedia() {
  let res = await Utils.get_api(apiUser + `GetDSAllMedia`);
  return res;
}

async function GetDetailMedia(idbangtin) {
  let res = await Utils.get_api(
    apiUser + `GetDetailMedia?_idmedia=${idbangtin}`,
  );
  return res;
}
async function addMedia(tieude, iduser, strbody) {
  let res = await Utils.post_api(
    apiUser + `addMedia?tieude=${tieude}&template=null&id_user=${iduser}`,
    strbody,
  );
  // this.BanThongBao();
  return res;
}

async function GetDSNhanVien() {
  let res = await Utils.get_api(apiUser + `GetDSNhanVien`);
  return res;
}

async function Delete_Media(id_media) {
  let res = await Utils.post_api(
    apiUser + `deleteMedia?id_media=${id_media}`,
    null,
    false,
    true,
    'DELETE',
  );
  return res;
}

export {
  Login,
  Logout,
  GetLoaiBaiDang,
  GetAllUser,
  GetUserProfile,
  UpdateUserProfile_User,
  UpdateUserProfile_NV,
  PostTinhTrang,
  GetDSKhenThuong,
  GetDSBaiDang,
  GetChiTietBaiDang,
  File_Updatebaidang,
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
  GetDSCommnet,
  Comment_like,
  Update_CMT,
  Update_CMT_Child,
  DeleteComment_Like,
  DeleteComment,
  AddGroup,
  GetDSGroup,
  deleteGroup,
  GetDS_BaiDangGroup,
  AddBaiDang_KhenThuong,
  AddBaiDang_KhenThuong_Nhom,
  getDSUser_Nhom,
  GetDSBaiDang_Nhom,
  GetDSUser_In_Group,
  GetDSUser_filter_InGroup,
  Update_Quyen_User,
  addUserGroup,
  GetDSAllUser_In_Group,
  DeleteUserGroup,
  FileBaiDang,
  AvatarUser,
  AddThongBao,
  GetDSThongBao,
  Danhdaudadoc,
  Update_ThongBao,
  Delete_ThongBao,
  BanThongBao,
  CountSoLuong_ThongBao,
  GetDSMedia,
  GetDetailMedia,
  addMedia,
  GetDSNhanVien,
  Delete_Media,
};
