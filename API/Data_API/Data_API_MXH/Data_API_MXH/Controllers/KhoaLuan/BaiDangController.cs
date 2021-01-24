using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DpsLibs.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using APIModel;
using APIModel.Classes;
using APIModel.BLayer;
using System.Collections;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Web.Http.Cors;
using System.Threading;

namespace Data_API_MXH.Controllers.KhoaLuan
{

    [RoutePrefix("api/KhoaLuan")]
    //[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    public class BaiDangController : ApiController
    {
        [Route("Baidang_Datasource")]
        [HttpGet]


        public object Baidang_Datasource([FromUri] QueryParams query)
        {
            try
            {

                query = query == null ? new QueryParams() : query;
                PageModel pageModel = new PageModel();
                DataRow[] dr;
                string link = Data_API_MXH.Assets.Common.getDomain();
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    string sqlq = @"
 select ID_BAIDANG,bd.ID_LOAIBAIDANG,bd.TIEUDE, loai.TENLOAIBAIDANG,NOIDUNG_BAIDANG,TYPEPOST,CreatedDate,CreatedBy,UpdateDate,UpdateBy,ID_KHENTHUONG,ID_GROUP,u.UserName,u.AVATAR from TBL_BAIDANG as bd,TBL_USER as u,TBL_LOAIBAIDANG as loai


 where  bd.CreatedBy=u.ID_USER and loai.ID_LOAIBAIDANG=bd.ID_LOAIBAIDANG
              ORDER BY ID_BAIDANG DESC 
";
                    var dt = cnn.CreateDataTable(sqlq);
                
                    if (cnn.LastError != null || dt == null)
                        return JsonResultCommon.SQL(cnn.LastError.Message);
                    var temp = dt.AsEnumerable();
                    #region Sort/filter
                    Dictionary<string, string> sortableFields = new Dictionary<string, string>{
                        { "TIEUDE","TIEUDE" },

                    };
                    if (!string.IsNullOrEmpty(query.sortField) && sortableFields.ContainsKey(query.sortField))
                    {
                        if ("asc".Equals(query.sortOrder))
                            temp = temp.OrderBy(x => x[sortableFields[query.sortField]]);
                        else
                            temp = temp.OrderByDescending(x => x[sortableFields[query.sortField]]);
                    }
                    if (!string.IsNullOrEmpty(query.filter["TIEUDE"]))
                    {
                        string keyword = query.filter["TIEUDE"].ToLower();
                        temp = temp.Where(x => x["TIEUDE"].ToString().ToLower().Contains(keyword));
                    }

                    #endregion
                    int i = temp.Count();
                    if (i == 0)
                        return JsonResultCommon.ThanhCong(new List<string>(), pageModel, User.IsInRole("68"));
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
                    dt = dt.AsEnumerable().Skip((query.page - 1) * query.record).Take(query.record).CopyToDataTable();
                    var data = from r in dt.AsEnumerable()
                               select new
                               {

                                   Id_BaiDang = r["ID_BAIDANG"],
                                   Id_LoaiBaiDang = r["ID_LOAIBAIDANG"],
                                   tenloaibaidang=r["TENLOAIBAIDANG"],
                                   title = r["TIEUDE"],
                                   username = r["UserName"],

                                   hinhanh = r["AVATAR"],
                                   avatar = $"{link}/Avatar/{ r["AVATAR"]}",
                                   NoiDung = r["NOIDUNG_BAIDANG"],
                                   CreatedDate = r["CreatedDate"],
                                   CreatedBy = r["CreatedBy"],
                                   Id_Group = r["ID_GROUP"],
                                   UpdateDate = r["UpdateDate"],
                                   UpdateBy = r["UpdateBy"],
                                   id_khenthuong = r["ID_KHENTHUONG"],
                                   AllowEdit = r["CreatedBy"],

                               };



                    return JsonResultCommon.ThanhCong(data, pageModel, User.IsInRole("68"));
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }
        [Route("getDSBaiDang")]
        [HttpGet]


        public object getDSBaiDang(int id_user)
        {

            PageModel pageModel = new PageModel();
            string sql = "";
            SqlConditions Conds = new SqlConditions();

            string link = Data_API_MXH.Assets.Common.getDomain();

            DataTable dt_baidang = new DataTable();
            DataTable dt_user = new DataTable();

            DataTable dt_like_baidang = new DataTable();

            DataTable dt_like_comment = new DataTable();
            DataTable dt_comment = new DataTable();
            DataTable dt_user_comment = new DataTable();
            DataTable dt = new DataTable();
            DataTable dt_like = new DataTable();
            DataTable dt_comment_parent = new DataTable();
            DataTable dt_icon = new DataTable();

            DataTable dt_baidang_like_user = new DataTable();

            DataTable dt_comment_like_user = new DataTable();

            DataTable dt_kt = new DataTable();
            DataTable dt_group = new DataTable();
            DataRow[] dr;
            // DataRow[] dr;



            try
            {
                ////tesst tam
                //sql = @"select* from TBL_BAIDANG";

                // code dung 
                sql = @"
                select ID_BAIDANG,ID_LOAIBAIDANG,TIEUDE,NOIDUNG_BAIDANG,TYPEPOST,CreatedDate,CreatedBy,UpdateDate,UpdateBy,ID_KHENTHUONG,ID_GROUP from TBL_BAIDANG
                ORDER BY ID_BAIDANG DESC";


                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    dt = cnn.CreateDataTable(sql, Conds);
                    dt_comment = cnn.CreateDataTable(@"select * from TBL_COMMENT");
                    dt_like = cnn.CreateDataTable(@"select * from TBL_COMMENT");
                    //dt_user_baidang = cnn.CreateDataTable(@"select * from TBL_USER");
                    dt_user = cnn.CreateDataTable(@"select * from TBL_USER");

                    dt_like_baidang = cnn.CreateDataTable(@" 
   select l.ID_LIKE,likebd.ID_BAIDANG, l.title,count(likebd.ID_LIKE) as tong ,l.LINK_ICON from TBL_BAIDANG_LIKE as likebd ,TBL_LIKE as l where
 l.ID_LIKE=likebd.ID_LIKE and likebd.COL_DISABLED=0  group by l.title,likebd.ID_BAIDANG,l.ID_LIKE,l.LINK_ICON
");
                    dt_user_comment = cnn.CreateDataTable(@"select * from TBL_USER");
                    dt_like_comment = cnn.CreateDataTable(@"     select l.ID_LIKE,cmtlike.ID_COMMENT, l.title,count(cmtlike.ID_LIKE) as tong,l.LINK_ICON  from TBL_COMMENT_LIKE as cmtlike ,TBL_LIKE as l where
 l.ID_LIKE=cmtlike.ID_LIKE and cmtlike.COL_DISABLED=0 group by l.title,cmtlike.ID_COMMENT,l.ID_LIKE,l.LINK_ICON   

");

                    dt_icon = cnn.CreateDataTable("select * from TBL_LIKE");

                    dt_baidang_like_user = cnn.CreateDataTable(@" select l.ID_LIKE,likebd.ID_BAIDANG, l.title,l.LINK_ICON,likebd.CREATE_BY,likebd.COL_DISABLED from TBL_BAIDANG_LIKE as likebd ,TBL_LIKE as l where
 l.ID_LIKE=likebd.ID_LIKE and likebd.COL_DISABLED=0
  
");

                    dt_comment_like_user = cnn.CreateDataTable(@" select l.ID_LIKE,like_cmt.ID_COMMENT, l.title,l.LINK_ICON,like_cmt.CREATE_BY  from TBL_COMMENT_LIKE as like_cmt ,TBL_LIKE as l where
 l.ID_LIKE=like_cmt.ID_LIKE and like_cmt.COL_DISABLED=0
");

                    dt_comment_parent = cnn.CreateDataTable(@"  SELECT *
FROM TBL_COMMENT
WHERE ID_COMMENT_PARENT !=0");
                    dt_kt = cnn.CreateDataTable(@"

select * from TBL_KHENTHUONG
");

                    dt_group = cnn.CreateDataTable(@"

select ID_GROUP,TEN_GROUP from TBL_GROUP 
");
                }


                var total = dt.Rows.Count;
                if (total == 0)
                {
                    return JsonResultCommon.ThanhCong(string.Empty, pageModel);
                }


                //lay anh usser


                //anh usser cmt



                return Json(new
                {

                    status = 1,
                    data = from r in dt.AsEnumerable()
                           select new
                           {
                               Id_BaiDang = r["ID_BAIDANG"],
                               Id_LoaiBaiDang = r["ID_LOAIBAIDANG"],
                               title = r["TIEUDE"],
                               NoiDung = r["NOIDUNG_BAIDANG"],
                               CreatedDate = r["CreatedDate"],
                               CreatedBy = r["CreatedBy"],
                               Id_Group = r["ID_GROUP"],
                               hinhanh = r["TYPEPOST"],
                               image = $"{link}/UploadedFiles/{r["TYPEPOST"]}",
                               UpdateDate = r["UpdateDate"],
                               UpdateBy = r["UpdateBy"],
                               id_khenthuong = r["ID_KHENTHUONG"],
                               AllowEdit = r["CreatedBy"],

                               // bai dang duoc like
                               Group = from g in dt_group.AsEnumerable()
                                       where r["ID_GROUP"].Equals(g["ID_GROUP"])
                                       select new
                                       {
                                           id_group = g["ID_GROUP"],
                                           ten_group = g["TEN_GROUP"],
                                           //icon = g["LINK_ICON"],
                                       },


                               KhenThuong = from kt in dt_kt.AsEnumerable()
                                            where r["ID_KHENTHUONG"].Equals(kt["ID_KHENTHUONG"])
                                            select new
                                            {
                                                id_khenthuong = kt["ID_KHENTHUONG"],
                                                tieude_kt = kt["TIEUDE"],
                                                icon = kt["LINK_ICON"],
                                            },


                               Like = (
                                       from lr in dt_baidang_like_user.AsEnumerable()
                                       where lr["ID_BAIDANG"].Equals(r["ID_BAIDANG"]) && lr["CREATE_BY"].Equals(id_user)
                                       //&& lr["CreatedBy"].Equals(r["CreatedBy"]))
                                       select new
                                       {
                                           CreateBy = lr["CREATE_BY"],
                                           ID_like = lr["ID_LIKE"],
                                           title = lr["title"],
                                           icon = lr["LINK_ICON"],
                                           //icon_app = lr["ICON_APP"]
                                       }).FirstOrDefault(),

                               //Like = ttt,
                               Like_BaiDang = from like_bd in dt_like_baidang.AsEnumerable()
                                              where like_bd["ID_BAIDANG"].ToString().Equals(r["ID_BAIDANG"].ToString())
                                              select new
                                              {
                                                  ID_like = like_bd["ID_LIKE"],
                                                  title = like_bd["title"],
                                                  icon = like_bd["LINK_ICON"],
                                                  //icon_app= like_bd["ICON_APP"],
                                                  tong = like_bd["tong"],



                                              },
                               User_DangBai = from user in dt_user.AsEnumerable()
                                              where user["ID_USER"].ToString().Equals(r["CreatedBy"].ToString())
                                              select new
                                              {
                                                  ID_user = user["ID_USER"],
                                                  Username = user["UserName"],
                                                  ID_NV = user["IDNV"],

                                                  hinhanh = user["AVATAR"],
                                                  avatar = $"{link}/Avatar/{user["AVATAR"]}",

                                              },
                               // Trong bai dang co nhung commet nao
                               Coment = from h in dt_comment.AsEnumerable()
                                        where h["ID_BAIDANG"].ToString().Equals(r["ID_BAIDANG"].ToString())
                                        select new
                                        {
                                            id_cmt = h["ID_COMMENT"],
                                            Id_BaiDang = h["ID_BAIDANG"],

                                            NoiDung_cmt = h["NOIDUNG_COMMENT"],
                                            typepost = h["TYPEPOST"],
                                            CreatedBy = h["CreatedBy_cmt"],
                                            CreatedDate = h["CreatedDate_cmt"],
                                            id_cmt_parent = h["ID_COMMENT_PARENT"],
                                            //Dan_Nhan = h["ID_DANNHAN"],
                                            UpdatedDate = h["UpdatedDate_cmt"],
                                            UpdatedBy = h["UpdatedBy_cmt"],
                                            AllowEdit = h["CreatedBy_cmt"],

                                            User_comment = from user in dt_user.AsEnumerable()
                                                           where user["ID_USER"].ToString().Equals(h["CreatedBy_cmt"].ToString())
                                                           select new
                                                           {
                                                               ID_user = user["ID_USER"],
                                                               Username = user["UserName"],
                                                               ID_NV = user["IDNV"],
                                                               hinhanh = user["AVATAR"],
                                                               avatar = $"{link}/Avatar/{user["AVATAR"]}",

                                                           },
                                            Like = (
                                       from lr in dt_comment_like_user.AsEnumerable()
                                       where lr["ID_COMMENT"].Equals(h["ID_COMMENT"]) && lr["CREATE_BY"].Equals(id_user)
                                       //&& lr["CreatedBy"].Equals(r["CreatedBy"]))
                                       select new
                                       {
                                           CreateBy = lr["CREATE_BY"],
                                           ID_like = lr["ID_LIKE"],
                                           title = lr["title"],
                                           icon = lr["LINK_ICON"],
                                           //icon_app = lr["ICON_APP"],
                                       }).FirstOrDefault(),
                                            Like_Comment = from like_cmt in dt_like_comment.AsEnumerable()
                                                           where like_cmt["ID_COMMENT"].ToString().Equals(h["ID_COMMENT"].ToString())
                                                           select new
                                                           {
                                                               ID_like = like_cmt["ID_LIKE"],
                                                               title = like_cmt["title"],
                                                               icon = like_cmt["LINK_ICON"],
                                                               //icon_app = like_cmt["ICON_APP"],
                                                               tong = like_cmt["tong"],


                                                           },

                                            Comment_child = from like_cmt_chill in dt_comment_parent.AsEnumerable()
                                                            where like_cmt_chill["ID_COMMENT_PARENT"].ToString().Equals(h["ID_COMMENT"].ToString())
                                                            select new
                                                            {
                                                                id_cmt = like_cmt_chill["ID_COMMENT"],
                                                                Id_BaiDang = like_cmt_chill["ID_BAIDANG"],

                                                                NoiDung_cmt = like_cmt_chill["NOIDUNG_COMMENT"],
                                                                TypePost = like_cmt_chill["TYPEPOST"],
                                                                CreatedBy_cmt = like_cmt_chill["CreatedBy_cmt"],
                                                                CreatedDate_cmt = like_cmt_chill["CreatedDate_cmt"],
                                                                id_comment_parent = like_cmt_chill["ID_COMMENT_PARENT"],
                                                                //Dan_Nhan = h["ID_DANNHAN"],
                                                                UpdatedDate_cmt = like_cmt_chill["UpdatedDate_cmt"],
                                                                UpdatedBy_cmt = like_cmt_chill["UpdatedBy_cmt"],
                                                                AllowEdit = like_cmt_chill["CreatedBy_cmt"],

                                                                User_comment_child = from user in dt_user.AsEnumerable()
                                                                                     where user["ID_USER"].ToString().Equals(like_cmt_chill["CreatedBy_cmt"].ToString())
                                                                                     select new
                                                                                     {
                                                                                         ID_user = user["ID_USER"],
                                                                                         Username = user["UserName"],
                                                                                         ID_NV = user["IDNV"],
                                                                                         hinhanh = user["AVATAR"],
                                                                                         avatar = $"{link}/Avatar/{user["AVATAR"]}",

                                                                                     },

                                                                Like_child = (
                                                                           from lr in dt_comment_like_user.AsEnumerable()
                                                                           where lr["ID_COMMENT"].Equals(like_cmt_chill["ID_COMMENT"]) && lr["CREATE_BY"].Equals(id_user)
                                                                           //&& lr["CreatedBy"].Equals(r["CreatedBy"]))
                                                                           select new
                                                                           {
                                                                               CreateBy = lr["CREATE_BY"],
                                                                               ID_like = lr["ID_LIKE"],
                                                                               title = lr["title"],
                                                                               icon = lr["LINK_ICON"],
                                                                               //icon_app = lr["ICON_APP"],
                                                                           }).FirstOrDefault(),
                                                                Like_Comment_child = from like_cmt in dt_like_comment.AsEnumerable()
                                                                                     where like_cmt["ID_COMMENT"].ToString().Equals(like_cmt_chill["ID_COMMENT"].ToString())
                                                                                     select new
                                                                                     {
                                                                                         ID_like = like_cmt["ID_LIKE"],
                                                                                         title = like_cmt["title"],
                                                                                         icon = like_cmt["LINK_ICON"],
                                                                                         //icon_app = like_cmt["ICON_APP"],
                                                                                         tong = like_cmt["tong"],


                                                                                     },







                                                            },


                                        },


                           },
                    //CustemerID = loginData.IDKHDPS,
                    page = pageModel
                }); ; ;
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }





     


        [Route("addBaiDang")]
        [HttpPost]
        public object addBaiDang(Models.BaiDang data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);


                    val.Add("ID_LOAIBAIDANG", data.Id_LoaiBaiDang);
                    val.Add("TIEUDE", data.title);
                    val.Add("NOIDUNG_BAIDANG", data.NoiDung);
                    //val.Add("ID_KHENTHUONG", data.id_khenthuong);
                    val.Add("TYPEPOST", data.typepost);
                    val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("CreatedBy", data.CreatedBy);
                    val.Add("UpdateDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("UpdateBy", data.UpdateBy);


                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_BAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }

        [Route("addBaiDang_Group")]
        
        [HttpPost]
        public object addBaiDang_Group(Models.BaiDang data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);


                    val.Add("ID_LOAIBAIDANG", data.Id_LoaiBaiDang);
                    val.Add("TIEUDE", data.title);
                    val.Add("NOIDUNG_BAIDANG", data.NoiDung);
                    val.Add("ID_GROUP", data.Id_Group);
                    val.Add("TYPEPOST", data.typepost);

                    val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("CreatedBy", data.CreatedBy);
                    val.Add("UpdateDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("UpdateBy", data.UpdateBy);


                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_BAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }



        [Route("addBaiDang_KT")]
        [HttpPost]
        public object addBaiDang_KT(Models.BaiDang data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);


                    val.Add("ID_LOAIBAIDANG", data.Id_LoaiBaiDang);
                    val.Add("TIEUDE", data.title);
                    val.Add("NOIDUNG_BAIDANG", data.NoiDung);
                    val.Add("ID_KHENTHUONG", data.id_khenthuong);
                    val.Add("TYPEPOST", data.typepost);
                    val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("CreatedBy", data.CreatedBy);
                    val.Add("UpdateDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("UpdateBy", data.UpdateBy);


                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_BAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }


        [Route("addBaiDang_KT_Group")]
        [HttpPost]
        public object addBaiDang_KT_Group(Models.BaiDang data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);


                    val.Add("ID_LOAIBAIDANG", data.Id_LoaiBaiDang);
                    val.Add("TIEUDE", data.title);
                    val.Add("NOIDUNG_BAIDANG", data.NoiDung);
                    val.Add("ID_KHENTHUONG", data.id_khenthuong);
                    val.Add("ID_GROUP", data.Id_Group);
                    val.Add("TYPEPOST", data.typepost);
                    val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("CreatedBy", data.CreatedBy);
                    val.Add("UpdateDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("UpdateBy", data.UpdateBy);


                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_BAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }

        [Route("deleteBaiDang")]
        [HttpDelete]
        public object deleteBaiDang(int id_baidang)
        {

            {

                SqlConditions Conds = new SqlConditions();
                SqlConditions Conds_tb = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {





                    Conds.Add("ID_BAIDANG", id_baidang);
                    Conds_tb.Add("ID_BAIDANG", id_baidang);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        cnn.Delete(Conds_tb, "TBL_THONGBAO");
                        Thread.Sleep(500);

                        if (cnn.Delete(Conds, "TBL_BAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }
        [Route("UpdateBaiDang")]
        [HttpPost]
        public object UpdateBaiDang(Models.BaiDang data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {

                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);

                    val.Add("TIEUDE", data.title);
                    val.Add("NOIDUNG_BAIDANG", data.NoiDung);
                    val.Add("UpdateDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("UpdateBy", data.UpdateBy);
                    //val.Add("ID_KHENTHUONG", data.id_khenthuong);
                    Conds.Add("ID_BAIDANG", data.ID_BaiDang);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_BAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }



        }

        [Route("UpdateBaiDang_KT")]
        [HttpPost]
        public object UpdateBaiDang_KT(Models.BaiDang data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {

                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);

                    val.Add("TIEUDE", data.title);
                    val.Add("NOIDUNG_BAIDANG", data.NoiDung);
                    val.Add("UpdateDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("UpdateBy", data.UpdateBy);
                    val.Add("ID_KHENTHUONG", data.id_khenthuong);
                    Conds.Add("ID_BAIDANG", data.ID_BaiDang);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_BAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }



        }
        [Route("Baidang_like")]
        [HttpGet]
        public object Baidang_like(int id, int type, int id_user)
        {
            try
            {
                //string Token = Request.Headers.GetValues("Token").FirstOrDefault();
                //LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
                //if (loginData == null)
                //    return JsonResultCommon.DangNhap();
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    //string sqlq = "select ISNULL((select count(*) from TBL_BAIDANG where ID_BAIDANG = " + id + "),0)";
                    //if (int.Parse(cnn.ExecuteScalar(sqlq).ToString()) != 1)
                    //    return JsonResultCommon.KhongTonTai("Bài Đăng");
                    string sqlq ="";

                    SqlConditions Conds = new SqlConditions();
                    sqlq = "select * from TBL_BAIDANG_LIKE l join TBL_LIKE ico on l.ID_LIKE=ico.ID_LIKE where CREATE_BY=" + id_user + " and ID_BAIDANG=" + id;
                    DataTable dt = cnn.CreateDataTable(sqlq);
                    if (cnn.LastError != null || dt == null)
                        return JsonResultCommon.Exception(cnn.LastError);
                    bool value = true;
                    int re = 0;
                    Hashtable val = new Hashtable();
                    if (dt.Rows.Count == 0)
                    {
                        val["ID_BAIDANG"] = id;
                        val["ID_LIKE"] = type;
                        val["CREATE_BY"] = id_user;
                        val["CREATE_DATE"] = DateTime.Now;


                        value = type == 0;// !(bool)dt.Rows[0]["disabled"];
                        val["COL_DISABLED"] = value;



                        re = cnn.Insert(val, "TBL_BAIDANG_LIKE");
                    }
                    else
                    {
                        value = type == 0;// !(bool)dt.Rows[0]["disabled"];
                        val["COL_DISABLED"] = value;
                        if (type > 0)
                            val["ID_LIKE"] = type;
                        val["UPDATE_BY"] = id_user;
                        val["UPDATE_DATE"] = DateTime.Now;
                        Conds.Add("ID_BAIDANG",id);
                        Conds.Add("CREATE_BY",id_user);
                            re = cnn.Update(val, Conds, "TBL_BAIDANG_LIKE");
                        if(re<0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                       
                       
                    }
                    return JsonResultCommon.ThanhCong();
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        [Route("deleteBaiDang_like")]
        [HttpDelete]
        public object deleteBaiDang_like(int id_baidang)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {





                    Conds.Add("ID_BAIDANG", id_baidang);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Delete(Conds, "TBL_BAIDANG_LIKE") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }

                    return JsonResultCommon.ThanhCong();
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }

    }
}
