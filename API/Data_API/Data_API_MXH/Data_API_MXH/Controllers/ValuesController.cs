using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using APIModel;
using APIModel.BLayer;
using APIModel.Classes;
using DpsLibs.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Collections;
using System.Web.UI.WebControls;

namespace Data_API_MXH.Controllers
{
    public class ValuesController : ApiController
    {
        [RoutePrefix("api/comment")]
        //[CusAuthorize(Roles = "3400")]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        public class WeCommentController : ApiController
        {
            APIModel.Models.Notify Knoti;
            /// <summary>
            /// ds comment
            /// </summary>
            /// <param name="query"></param>
            /// <returns></returns>
            [Route("List")]
            [HttpGet]
            public object List([FromUri] QueryParams query)
            {
                if (query == null)
                    query = new QueryParams();
                bool Visible = true;
                PageModel pageModel = new PageModel();
                try
                {
                    //string Token = Request.Headers.GetValues("Token").FirstOrDefault();
                    //LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
                    //if (loginData == null)
                    //    return JsonResultCommon.DangNhap();

                    //string domain = General.GetDomainApi(loginData.IDKHDPS.ToString());
                    using (DpsConnection cnn = new DpsConnection())
                    {
                        SqlConditions Conds = new SqlConditions();
                        string dieukienSort = "CreatedDate", dieukien_where = " ";
                        //if (string.IsNullOrEmpty(query.filter["object_type"]) || string.IsNullOrEmpty(query.filter["object_id"]))
                        //    return JsonResultCommon.Custom("Đói tượng bắt buộc nhập");
                        //dieukien_where += " and object_type=@object_type and object_id=@object_id";
                        //Conds.Add("object_type", query.filter["object_type"]);
                        //Conds.Add("object_id", query.filter["object_id"]);

                        //if (!string.IsNullOrEmpty(query.filter["LastID"]))
                        //{

                        //}
                        //if (!string.IsNullOrEmpty(query.filter["id_parent"]))
                        //{
                        //    dieukien_where += " and (c.id_parent = @id_parent)";
                        //    dieukien_where = dieukien_where.Replace("@id_parent", query.filter["id_parent"]);
                        //}
                        //if (!string.IsNullOrEmpty(query.filter["keyword"]))
                        //{
                        //    dieukien_where += " and (comment like '%@keyword%')";
                        //    dieukien_where = dieukien_where.Replace("@keyword", query.filter["keyword"]);
                        //}
                        #region Sort data theo các dữ liệu bên dưới
                        Dictionary<string, string> sortableFields = new Dictionary<string, string>
                        {
                            { "comment", "comment"},
                            { "CreatedBy", "NguoiTao"},
                            { "CreatedDate", "CreatedDate"},
                            { "UpdatedBy", "NguoiSua"},
                            {"UpdatedDate","UpdatedDate" }
                        };
                        #endregion
                        if (!string.IsNullOrEmpty(query.sortField) && sortableFields.ContainsKey(query.sortField))
                            dieukienSort = sortableFields[query.sortField] + ("desc".Equals(query.sortOrder) ? " desc" : " asc");
                        else
                            dieukienSort = "CreatedDate desc";
                        #region Xét quyền xem/chỉnh sửa
                        //if (DpsLibs.StockPermit.Permit.IsReadOnlyPermit("3400", loginData.UserName))
                        //{
                        //    Visible = false;
                        //}
                        #endregion
                        #region Trả dữ liệu về backend để hiển thị lên giao diện
                        string sqlq = @"select c.*,acc.*, coalesce(tong,0) as reply from we_comment c join V_account acc on c.CreatedBy=acc.id_nv
left join (select count(*) as tong, id_parent from we_comment where disabled=0 group by id_parent) child on child.id_parent=c.id_row where c.disabled=0 " + dieukien_where + "  order by " + dieukienSort;
                        sqlq += ";select att.*, acc.username from we_attachment att join tbl_account acc on att.createdby=acc.id_nv where disabled=0 and object_type=3";
                        sqlq += @";select l.*, ico.title, ico.icon, nv.holot+' '+nv.ten as hoten from we_comment_like l 
join we_like_icon ico on ico.id_row = l.type
join tbl_nhanvien nv on l.createdby = nv.id_nv where l.disabled = 0 and ico.disabled = 0";
                        DataSet ds = cnn.CreateDataSet(sqlq, Conds);
                        if (cnn.LastError != null || ds == null)
                            return JsonResultCommon.Exception(cnn.LastError);
                        DataTable dt = ds.Tables[0];
                        if (dt.Rows.Count == 0)
                            return JsonResultCommon.ThanhCong(new List<string>(), pageModel, Visible);
                        var temp = dt.AsEnumerable();
                        dt = temp.CopyToDataTable();
                        int total = dt.Rows.Count;
                        pageModel.TotalCount = total;
                        pageModel.AllPage = (int)Math.Ceiling(total / (decimal)query.record);
                        pageModel.Size = query.record;
                        pageModel.Page = query.page;
                        if (query.more)
                        {
                            query.page = 1;
                            query.record = pageModel.TotalCount;
                        }
                        // Phân trang
                        var ttttt = dt.AsEnumerable().Where(x => x["id_parent"] == DBNull.Value).Skip((query.page - 1) * query.record).Take(query.record);
                        var asChilds = dt.AsEnumerable().Where(x => x["id_parent"] != DBNull.Value).AsEnumerable();
                        ttttt = asChilds.Concat(ttttt);
                        var data = getChild(dt.AsEnumerable(), ds.Tables[1].AsEnumerable(), ds.Tables[2].AsEnumerable(), null);
                        return JsonResultCommon.ThanhCong(data, pageModel, Visible);
                    }
                    #endregion
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
            private object getChild(IEnumerable<DataRow> data, IEnumerable<DataRow> asAttachment, IEnumerable<DataRow> asLike, object parent = null)
            {
                if (parent == null)
                    parent = DBNull.Value;
                return from r in data
                       where r["id_parent"].Equals(parent)
                       select parseObject(r, asAttachment, asLike, data);
            }

            private object parseObject(DataRow r, IEnumerable<DataRow> asAttachment, IEnumerable<DataRow> asLike = null, IEnumerable<DataRow> data = null)
            {
                return new
                {
                    id_row = r["id_row"],
                    comment = r["comment"],
                    CreatedDate = string.Format("{0:dd/MM/yyyy HH:mm}", r["CreatedDate"]),
                    CreatedBy = r["CreatedBy"],
                    NguoiNhans = new List<string>(),
                    //AllowEdit = r["CreatedBy"].ToString() == loginData.Id.ToString(),
                    NguoiTao = new
                    {
                        id_nv = r["id_nv"],
                        hoten = r["hoten"],
                        username = r["username"],
                        mobile = r["mobile"],
                        //image = WeworkLiteController.genLinkImage(domain, loginData.IDKHDPS, r["id_nv"].ToString())
                    },
                    UpdatedDate = r["UpdatedDate"] == DBNull.Value ? "" : string.Format("{0:dd/MM/yyyy HH:mm}", r["UpdatedDate"]),
                    Attachment = from dr in asAttachment
                                 where dr["object_id"].Equals(r["id_row"])
                                 select new
                                 {
                                     id_row = dr["id_row"],
                                     ////path = WeworkLiteController.genLinkAttachment(domain, dr["path"]),
                                     filename = dr["filename"],
                                     type = dr["type"],
                                     //isImage = UploadHelper.IsImage(dr["type"].ToString()),
                                     //icon = UploadHelper.GetIcon(dr["type"].ToString()),
                                     size = dr["size"],
                                     NguoiTao = dr["username"],
                                     CreatedBy = dr["CreatedBy"],
                                     CreatedDate = string.Format("{0:dd/MM/yyyy HH:mm}", dr["CreatedDate"])
                                 },
                    Like = asLike == null ? null : (from dr in asLike
                                                    where dr["id_comment"].Equals(r["id_row"]) && dr["CreatedBy"].ToString() == 16110.ToString()
                                                    select new
                                                    {
                                                        type = dr["type"],
                                                        title = dr["title"],
                                                        icon = "assets/media/icons/" + dr["icon"],
                                                    }).FirstOrDefault(),
                    Likes = asLike == null ? null : from dr in asLike
                                                    where dr["id_comment"].Equals(r["id_row"])
                                                    group dr by new { a = dr["type"], b = dr["icon"], c = dr["title"] } into g
                                                    select new
                                                    {
                                                        type = g.Key.a,
                                                        title = g.Key.c,
                                                        icon = "assets/media/icons/" + g.Key.b,
                                                        tong = g.Count(),
                                                        Users = string.Join(Environment.NewLine, from u in g select u["hoten"]),

                                                    },
                    Children = data == null ? new List<string>() : getChild(data, asAttachment, asLike, r["id_row"])
                };
            }

            #region like
            /// <summary>
            /// 
            /// </summary>
            /// <param name="id"></param>
            /// <param name="type">0:unline, we_like_icon: 1: like,2 love,3: haha, 4 wow, 5 sad, 6 care, 7 ảngy</param>
            /// <returns></returns>
            [Route("like")]
            [HttpGet]
            public object Like(long id, int type)
            {
                try
                {
                    //string Token = Request.Headers.GetValues("Token").FirstOrDefault();
                    //LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
                    //if (loginData == null)
                    //    return JsonResultCommon.DangNhap();
                    using (DpsConnection cnn = new DpsConnection())
                    {
                        string sqlq = "select ISNULL((select count(*) from we_comment where id_row = " + id + "),0)";
                        if (long.Parse(cnn.ExecuteScalar(sqlq).ToString()) != 1)
                            return JsonResultCommon.KhongTonTai("Bình luận");
                        sqlq = "select * from we_comment_like l join we_like_icon ico on l.type=ico.id_row where CreatedBy=" + 1 + " and id_comment=" + id;
                        DataTable dt = cnn.CreateDataTable(sqlq);
                        if (cnn.LastError != null || dt == null)
                            return JsonResultCommon.Exception(cnn.LastError);
                        bool value = true;
                        int re = 0;
                        Hashtable val = new Hashtable();
                        if (dt.Rows.Count == 0)
                        {
                            val["id_comment"] = id;
                            val["type"] = type;
                            val["CreatedBy"] = 16116;
                            val["CreatedDate"] = DateTime.Now;
                            re = cnn.Insert(val, "we_comment_like");
                        }
                        else
                        {
                            value = type == 0;// !(bool)dt.Rows[0]["disabled"];
                            val["disabled"] = value;
                            if (type > 0)
                                val["type"] = type;
                            val["UpdatedBy"] = 16116;
                            val["UpdatedDate"] = DateTime.Now;
                            re = cnn.Update(val, new SqlConditions() { { "id_row", dt.Rows[0]["id_row"] } }, "we_comment_like");
                        }
                        if (re <= 0)
                            return JsonResultCommon.Exception(cnn.LastError);
                        sqlq += @";select l.*, ico.title, ico.icon, nv.holot+' '+nv.ten as hoten from we_comment_like l 
        join we_like_icon ico on ico.id_row = l.type
        join tbl_nhanvien nv on l.createdby = nv.id_nv where l.disabled = 0 and ico.disabled = 0 and l.id_comment=" + id;
                        DataSet ds = cnn.CreateDataSet(sqlq);
                        DataRow r = ds.Tables[0].Rows[0];
                        var data = new
                        {
                            Like = (bool)r["disabled"] ? null : new
                            {
                                type = r["type"],
                                title = r["title"],
                                icon = "assets/media/icons/" + r["icon"],
                            },
                            Likes = from dr in ds.Tables[1].AsEnumerable()
                                    group dr by new { a = dr["type"], b = dr["icon"], c = dr["title"] } into g
                                    select new
                                    {
                                        type = g.Key.a,
                                        title = g.Key.c,
                                        icon = "assets/media/icons/" + g.Key.b,
                                        tong = g.Count(),
                                        Users = string.Join(Environment.NewLine, from u in g select u["hoten"]),

                                    },
                        };
                        return JsonResultCommon.ThanhCong(data);
                    }
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }

                #endregion
            }


            /// <summary>
            /// 
            /// </summary>
            /// <param name="data"></param>
            /// <returns></returns>
            //            [Route("Insert")]
            //            [HttpPost]
            //            public async Task<object> Insert([FromBody] CommentModel data)
            //            {
            //                string LogContent = "", LogEditContent = "";
            //                try
            //                {
            //                    string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            //                    LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
            //                    if (loginData == null)
            //                        return JsonResultCommon.DangNhap();
            //                    string strRe = "";
            //                    if (string.IsNullOrEmpty(data.comment))
            //                        strRe += (strRe == "" ? "" : ",") + "nội dung";
            //                    if (data.object_type <= 0 || data.object_id <= 0)
            //                        strRe += (strRe == "" ? "" : ",") + "đối tượng";
            //                    if (strRe != "")
            //                        return JsonResultCommon.BatBuoc(strRe);
            //                    int id_action = data.object_type == 2 ? 24 : 0;


            //                    string domain = General.GetDomainApi(loginData.IDKHDPS.ToString());
            //                    using (DpsConnection cnn = new DpsConnection())
            //                    {
            //                        long iduser = loginData.Id;
            //                        long idk = loginData.IDKHDPS;
            //                        Hashtable val = new Hashtable();
            //                        val.Add("comment", data.comment);
            //                        if (data.id_parent > 0)
            //                            val.Add("id_parent", data.id_parent);
            //                        val.Add("object_type", data.object_type);
            //                        val.Add("object_id", data.object_id);
            //                        val.Add("CreatedDate", DateTime.Now);
            //                        val.Add("CreatedBy", iduser);
            //                        cnn.BeginTransaction();
            //                        if (cnn.Insert(val, "we_comment") != 1)
            //                        {
            //                            cnn.RollbackTransaction();
            //                            return JsonResultCommon.Exception(cnn.LastError);
            //                        }
            //                        long idc = long.Parse(cnn.ExecuteScalar("select IDENT_CURRENT('we_comment')").ToString());
            //                        if (data.Attachments != null)
            //                        {
            //                            foreach (var item in data.Attachments)
            //                            {
            //                                var temp = new AttachmentModel()
            //                                {
            //                                    item = item,
            //                                    object_type = 3,
            //                                    object_id = idc,
            //                                    id_user = loginData.Id
            //                                };
            //                                if (!AttachmentController.upload(temp, cnn))
            //                                {
            //                                    cnn.RollbackTransaction();
            //                                    return JsonResultCommon.Exception(cnn.LastError);
            //                                }
            //                            }
            //                        }
            //                        LogContent = LogEditContent = "Thêm mới dữ liệu comment: comment=" + data.comment + ", object_type=" + data.object_type + ", object_id=" + data.object_id;
            //                        DpsPage.Ghilogfile(loginData.IDKHDPS.ToString(), LogEditContent, LogContent, loginData.UserName);
            //                        if (data.id_parent == 0)
            //                        {
            //                            if (!WeworkLiteController.log(cnn, id_action, data.object_id, loginData.Id, data.comment, null, idc))
            //                            {
            //                                cnn.RollbackTransaction();
            //                                return JsonResultCommon.Exception(cnn.LastError);
            //                            }
            //                        }
            //                        cnn.EndTransaction();
            //                        data.id_row = idc;
            //                        string sql = @"select c.*,acc.*, coalesce(tong,0) as reply from we_comment c join V_account acc on c.CreatedBy=acc.id_nv
            //left join(select count(*) as tong, id_parent from we_comment where disabled = 0 group by id_parent) child on child.id_parent = c.id_row where c.disabled = 0 and c.id_row=" + idc;
            //                        sql += ";select att.*, acc.username from we_attachment att join tbl_account acc on att.createdby=acc.id_nv where disabled=0 and object_type=3 and object_id=" + idc;
            //                        DataSet ds = cnn.CreateDataSet(sql);
            //                        var re = parseObject(ds.Tables[0].Rows[0], domain, loginData, ds.Tables[1].AsEnumerable());

            //                        #region Notify replay comment 

            //                        if (data.id_parent > 0)
            //                        {
            //                            // get user comment

            //                            //string query = @"SELECT CreatedBy  FROM we_comment  WHERE (id_row = )" + data.id_parent ;
            //                            //DataSet user = cnn.CreateDataSet(sql);
            //                            object nguoitao = cnn.ExecuteScalar("SELECT CreatedBy  FROM we_comment  WHERE id_row = " + data.id_parent).ToString();
            //                            if (nguoitao != null && nguoitao.ToString() != loginData.Id.ToString())
            //                            {
            //                                Hashtable has_replace1 = new Hashtable();
            //                                NotifyModel notify_model = new NotifyModel();
            //                                has_replace1 = new Hashtable();
            //                                has_replace1.Add("nguoigui", loginData.FullName);
            //                                //has_replace.Add("project_team", data.title);
            //                                notify_model.AppCode = "WW";
            //                                notify_model.From_IDNV = loginData.Id.ToString();
            //                                notify_model.To_IDNV = nguoitao.ToString();
            //                                notify_model.TitleLanguageKey = "ww_replaycomment";
            //                                notify_model.ReplaceData = has_replace1;
            //                                notify_model.To_Link_MobileApp = "";
            //                                notify_model.To_Link_WebApp = "/tasks/detail/" + data.object_id;
            //                                try
            //                                {
            //                                    if (notify_model != null)
            //                                    {
            //                                        Knoti = new APIModel.Models.Notify();
            //                                        bool kq = Knoti.PushNotify(notify_model.From_IDNV, notify_model.To_IDNV, notify_model.AppCode, notify_model.TitleLanguageKey, notify_model.ReplaceData, notify_model.To_Link_WebApp, notify_model.To_Link_MobileApp, notify_model.ComponentName, notify_model.Component);
            //                                    }
            //                                }
            //                                catch
            //                                { }
            //                            }

            //                        }
            //                        #endregion

            //                        #region Notify nhắc tên người được tag
            //                        Hashtable has_replace = new Hashtable();
            //                        for (int i = 0; i < data.Users.Count; i++)
            //                        {
            //                            if (data.Users[i].id_nv.ToString() != loginData.Id.ToString())
            //                            {
            //                                NotifyModel notify_model = new NotifyModel();
            //                                has_replace = new Hashtable();
            //                                has_replace.Add("nguoigui", loginData.FullName);
            //                                //has_replace.Add("project_team", data.title);
            //                                notify_model.AppCode = "WW";
            //                                notify_model.From_IDNV = loginData.Id.ToString();
            //                                notify_model.To_IDNV = data.Users[i].id_nv.ToString();
            //                                notify_model.TitleLanguageKey = "ww_comment";
            //                                notify_model.ReplaceData = has_replace;
            //                                notify_model.To_Link_MobileApp = "";
            //                                notify_model.To_Link_WebApp = "/tasks/detail/" + data.object_id;
            //                                try
            //                                {
            //                                    if (notify_model != null)
            //                                    {
            //                                        Knoti = new APIModel.Models.Notify();
            //                                        bool kq = Knoti.PushNotify(notify_model.From_IDNV, notify_model.To_IDNV, notify_model.AppCode, notify_model.TitleLanguageKey, notify_model.ReplaceData, notify_model.To_Link_WebApp, notify_model.To_Link_MobileApp, notify_model.ComponentName, notify_model.Component);
            //                                    }
            //                                }
            //                                catch
            //                                { }
            //                            }
            //                        }
            //                        #endregion
            //                        return JsonResultCommon.ThanhCong(re);
            //                    }
            //                }
            //                catch (Exception ex)
            //                {
            //                    return JsonResultCommon.Exception(ex);
            //                }
            //            }

            //            public List<String> ListUser(string str)
            //            {
            //                var list = new List<String>();
            //                var newArr = str.Split(' ');
            //                foreach (string character in newArr)
            //                {
            //                    if (character[0] == '@')
            //                    {
            //                        list.Add(character.Replace('@', ' '));
            //                    }
            //                }
            //                return list;
            //            }

            //            /// <summary>
            //            /// 
            //            /// </summary>
            //            /// <param name="data"></param>
            //            /// <returns></returns>
            //            [Route("Update")]
            //            [HttpPost]
            //            public async Task<object> Update([FromBody] CommentModel data)
            //            {
            //                try
            //                {
            //                    string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            //                    LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
            //                    if (loginData == null)
            //                        return JsonResultCommon.DangNhap();
            //                    string strRe = "";
            //                    if (string.IsNullOrEmpty(data.comment))
            //                        strRe += (strRe == "" ? "" : ",") + "nội dung";
            //                    if (strRe != "")
            //                        return JsonResultCommon.BatBuoc(strRe);

            //                    using (DpsConnection cnn = new DpsConnection())
            //                    {
            //                        long iduser = loginData.Id;
            //                        long idk = loginData.IDKHDPS;
            //                        SqlConditions sqlcond = new SqlConditions();
            //                        sqlcond.Add("id_row", data.id_row);
            //                        sqlcond.Add("disabled", 0);
            //                        string s = "select * from we_comment where (where)";
            //                        DataTable old = cnn.CreateDataTable(s, "(where)", sqlcond);
            //                        if (old == null || old.Rows.Count == 0)
            //                            return JsonResultCommon.KhongTonTai("Bình luận");

            //                        Hashtable val = new Hashtable();
            //                        val.Add("comment", data.comment);
            //                        val.Add("UpdatedDate", DateTime.Now);
            //                        val.Add("UpdatedBy", iduser);
            //                        cnn.BeginTransaction();
            //                        if (cnn.Update(val, sqlcond, "we_comment") != 1)
            //                        {
            //                            cnn.RollbackTransaction();
            //                            return JsonResultCommon.Exception(cnn.LastError);
            //                        }
            //                        DataTable dt = cnn.CreateDataTable(s, "(where)", sqlcond);
            //                        string LogContent = "", LogEditContent = "";
            //                        LogEditContent = DpsPage.GetEditLogContent(old, dt);
            //                        if (!LogEditContent.Equals(""))
            //                        {
            //                            LogEditContent = "Chỉnh sửa dữ liệu (" + data.id_row + ") : " + LogEditContent;
            //                            LogContent = "Chỉnh sửa dữ liệu comment (" + data.id_row + "), Chi tiết xem trong log chỉnh sửa chức năng";
            //                        }
            //                        DpsPage.Ghilogfile(loginData.IDKHDPS.ToString(), LogEditContent, LogContent, loginData.UserName);
            //                        cnn.EndTransaction();

            //                        #region Notify nhắc tên người được tag
            //                        if (data.Users != null)
            //                        {
            //                            Hashtable has_replace = new Hashtable();
            //                            for (int i = 0; i < data.Users.Count; i++)
            //                            {
            //                                NotifyModel notify_model = new NotifyModel();
            //                                has_replace = new Hashtable();
            //                                has_replace.Add("nguoigui", loginData.FullName);
            //                                //has_replace.Add("project_team", data.title);
            //                                notify_model.AppCode = "WW";
            //                                notify_model.From_IDNV = loginData.Id.ToString();
            //                                notify_model.To_IDNV = data.Users[i].id_nv.ToString();
            //                                notify_model.TitleLanguageKey = "ww_comment";
            //                                notify_model.ReplaceData = has_replace;
            //                                notify_model.To_Link_MobileApp = "";
            //                                notify_model.To_Link_WebApp = "/tasks/detail/" + data.object_id;
            //                                try
            //                                {
            //                                    if (notify_model != null)
            //                                    {
            //                                        Knoti = new APIModel.Models.Notify();
            //                                        bool kq = Knoti.PushNotify(notify_model.From_IDNV, notify_model.To_IDNV, notify_model.AppCode, notify_model.TitleLanguageKey, notify_model.ReplaceData, notify_model.To_Link_WebApp, notify_model.To_Link_MobileApp, notify_model.ComponentName, notify_model.Component);
            //                                    }
            //                                }
            //                                catch
            //                                { }
            //                            }
            //                        }
            //                        #endregion

            //                        return JsonResultCommon.ThanhCong(data);
            //                    }
            //                }
            //                catch (Exception ex)
            //                {
            //                    return JsonResultCommon.Exception(ex);
            //                }
            //            }

            //            /// <summary>
            //            /// 
            //            /// </summary>
            //            /// <param name="id"></param>
            //            /// <returns></returns>
            //            [Route("Delete")]
            //            [HttpGet]
            //            public BaseModel<object> Delete(long id)
            //            {
            //                try
            //                {
            //                    string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            //                    //LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
            //                    if (loginData == null)
            //                        return JsonResultCommon.DangNhap();
            //                    long iduser = loginData.Id;
            //                    long idk = loginData.IDKHDPS;
            //                    using (DpsConnection cnn = new DpsConnection())
            //                    {
            //                        string sqlq = "select ISNULL((select count(*) from we_comment where Disabled=0 and  id_row = " + id + "),0)";
            //                        if (long.Parse(cnn.ExecuteScalar(sqlq).ToString()) != 1)
            //                            return JsonResultCommon.KhongTonTai("Bình luận");
            //                        sqlq = "update we_comment set Disabled=1, UpdatedDate=getdate(), UpdatedBy=" + iduser + " where id_row = " + id;
            //                        cnn.BeginTransaction();
            //                        if (cnn.ExecuteNonQuery(sqlq) != 1)
            //                        {
            //                            cnn.RollbackTransaction();
            //                            return JsonResultCommon.Exception(cnn.LastError);
            //                        }
            //                        string LogContent = "Xóa dữ liệu comment (" + id + ")";
            //                        //DpsPage.Ghilogfile(loginData.IDKHDPS.ToString(), LogContent, LogContent, loginData.UserName);
            //                        cnn.EndTransaction();
            //                        return JsonResultCommon.ThanhCong();
            //                    }
            //                }
            //                catch (Exception ex)
            //                {
            //                    return JsonResultCommon.Exception(ex);
            //                }
            //            }

            #region like
            /// <summary>
            /// 
            /// </summary>
            /// <param name="id"></param>
            /// <param name="type">0:unline, we_like_icon: 1: like,2 love,3: haha, 4 wow, 5 sad, 6 care, 7 ảngy</param>
            /// <returns></returns>
            [Route("like")]
            [HttpGet]
            public object like(long id, int type)
            {
                try
                {
                    string Token = Request.Headers.GetValues("Token").FirstOrDefault();
                    //LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
                    //if (loginData == null)
                    //    return JsonResultCommon.DangNhap();
                    using (DpsConnection cnn = new DpsConnection())
                    {
                        string sqlq = "select ISNULL((select count(*) from we_comment where id_row = " + id + "),0)";
                        if (long.Parse(cnn.ExecuteScalar(sqlq).ToString()) != 1)
                            return JsonResultCommon.KhongTonTai("Bình luận");
                     sqlq = "select * from we_comment_like l join we_like_icon ico on l.type=ico.id_row where CreatedBy=16116 and id_comment=1";
                        DataTable dt = cnn.CreateDataTable(sqlq);
                        if (cnn.LastError != null || dt == null)
                            return JsonResultCommon.Exception(cnn.LastError);
                        bool value = true;
                        int re = 0;
                        Hashtable val = new Hashtable();
                        if (dt.Rows.Count == 0)
                        {
                            val["id_comment"] = id;
                            val["type"] = type;
                            val["CreatedBy"] = 16116;
                            val["CreatedDate"] = DateTime.Now;
                            re = cnn.Insert(val, "we_comment_like");
                        }
                        else
                        {
                            value = type == 0;// !(bool)dt.Rows[0]["disabled"];
                            val["disabled"] = value;
                            if (type > 0)
                                val["type"] = type;
                            //val["UpdatedBy"] = loginData.Id;
                            val["UpdatedDate"] = DateTime.Now;
                            re = cnn.Update(val, new SqlConditions() { { "id_row", dt.Rows[0]["id_row"] } }, "we_comment_like");
                        }
                        if (re <= 0)
                            return JsonResultCommon.Exception(cnn.LastError);
                        sqlq += @";select l.*, ico.title, ico.icon, nv.holot+' '+nv.ten as hoten from we_comment_like l 
            join we_like_icon ico on ico.id_row = l.type
            join tbl_nhanvien nv on l.createdby = nv.id_nv where l.disabled = 0 and ico.disabled = 0 and l.id_comment=" + id;
                        DataSet ds = cnn.CreateDataSet(sqlq);
                        DataRow r = ds.Tables[0].Rows[0];
                        var data = new
                        {
                            Like = (bool)r["disabled"] ? null : new
                            {
                                type = r["type"],
                                title = r["title"],
                                icon = "assets/media/icons/" + r["icon"],
                            },
                            Likes = from dr in ds.Tables[1].AsEnumerable()
                                    group dr by new { a = dr["type"], b = dr["icon"], c = dr["title"] } into g
                                    select new
                                    {
                                        type = g.Key.a,
                                        title = g.Key.c,
                                        icon = "assets/media/icons/" + g.Key.b,
                                        tong = g.Count(),
                                        Users = string.Join(Environment.NewLine, from u in g select u["hoten"]),

                                    },
                        };
                        return JsonResultCommon.ThanhCong(data);
                    }
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
            #endregion
        




        public class CommentModel
            {
                public long id_row { get; set; }
                /// <summary>
                /// 1: work,2 topic
                /// </summary>
                public int object_type { get; set; }
                public long object_id { get; set; }
                public string comment { get; set; }
                public long id_parent { get; set; }
                public List<CommentUserModel> Users { get; set; }
                //public List<FileUploadModel> Attachments { get; set; }
            }

            public class CommentUserModel
            {
                public long id_nv { get; set; } = 0;
                public string hoten { get; set; }
                public string username { get; set; }
            }
        }
    }

}