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
using System.Web.Http.Cors;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
    //[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    public class CommentController : ApiController
    {
        [Route("addComment")]
        [HttpPost]
        public object addComment(Models.Comment data)
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



                    //val.Add("ID_COMMENT", data.id_cmt);
                    val.Add("ID_BAIDANG", data.ID_BaiDang);
                    val.Add("CreatedBy_cmt", data.CreatedBy);
                  
                    val.Add("NOIDUNG_COMMENT", data.NoiDung_cmt);
                   
                    val.Add("TYPEPOST", data.typepost);
                    val.Add("ID_COMMENT_PARENT", data.id_cmt_parent);
   
                    val.Add("CreatedDate_cmt", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));


                    val.Add("UpdatedBy_cmt", data.UpdatedBy);
                    val.Add("UpdatedDate_cmt", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                   

                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_COMMENT") < 0)
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

        [Route("addComment_chill")]
        [HttpPost]
        public object addComment_chill(Models.Comment data)
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



                    //val.Add("ID_COMMENT", data.id_cmt);
                   // val.Add("ID_BAIDANG", data.ID_BaiDang);
                    val.Add("CreatedBy_cmt", data.CreatedBy);

                    val.Add("NOIDUNG_COMMENT", data.NoiDung_cmt);

                    val.Add("TYPEPOST", data.typepost);
                    val.Add("ID_COMMENT_PARENT", data.id_cmt_parent);

                    val.Add("CreatedDate_cmt", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));


                    val.Add("UpdatedBy_cmt", data.UpdatedBy);
                    val.Add("UpdatedDate_cmt", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));


                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_COMMENT") < 0)
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
        [Route("deleteComment")]
        [HttpDelete]
        public object deleteComment(int id_cmt)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {





                    Conds.Add("ID_COMMENT", id_cmt);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Delete(Conds, "TBL_COMMENT") < 0)
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

        [Route("UpdateComment")]
        [HttpPost]
        public object UpdateComment(Models.Comment data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                   // val["ID_COMMENT"] = data.id_cmt;
                    val["ID_BAIDANG"] = data.ID_BaiDang;
                    val["CreatedBy_cmt"] = data.CreatedBy;
                    val["TYPEPOST"] = data.typepost;
                    val["CreatedDate_cmt"] = data.CreatedDate;

                    val["ID_COMMENT_PARENT"] = data.id_cmt_parent;



                    val["NOIDUNG_COMMENT"] = data.NoiDung_cmt;
                    val["UpdatedBy_cmt"] = data.CreatedBy;
                    val["UpdatedDate_cmt"] = DateTime.Now.ToString("MM/dd/yyyy HH:mm");
                    Conds.Add("ID_COMMENT", data.id_cmt);
                    
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val,Conds, "TBL_COMMENT") < 0)
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


        [Route("UpdateCommentChild")]
        [HttpPost]
        public object UpdateCommentChild(Models.Comment data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    // val["ID_COMMENT"] = data.id_cmt;
                   // val["ID_BAIDANG"] = data.ID_BaiDang;
                    //val["CreatedBy_cmt"] = data.CreatedBy;
                    val["TYPEPOST"] = data.typepost;
                   // val["CreatedDate_cmt"] = data.CreatedDate;

                   // val["ID_COMMENT_PARENT"] = data.id_cmt_parent;



                    val["NOIDUNG_COMMENT"] = data.NoiDung_cmt;
                    val["UpdatedBy_cmt"] = data.CreatedBy;
                    val["UpdatedDate_cmt"] = DateTime.Now.ToString("MM/dd/yyyy HH:mm");
                    Conds.Add("ID_COMMENT", data.id_cmt);

                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_COMMENT") < 0)
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



        [Route("deleteComment_inBaiDang")]
        [HttpDelete]
        public object deleteComment_inBaiDang(int id_baidang)
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
                        if (cnn.Delete(Conds, "TBL_COMMENT") < 0)
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


            [Route("deleteComment_like")]
            [HttpDelete]
            public object deleteComment_like(int id_cmt)
            {

                {

                    SqlConditions Conds = new SqlConditions();
                    DataTable dt = new DataTable();

                    Hashtable val = new Hashtable();
                    DataTable dt_token = new DataTable();
                    try
                    {





                        Conds.Add("ID_COMMENT", id_cmt);
                        using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                        {
                            if (cnn.Delete(Conds, "TBL_COMMENT_LIKE") < 0)
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


















        

        [Route("Comment_like")]
        [HttpGet]
        public object Comment_like(int id, int type, int id_user)
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
                    string sqlq = "";

                    SqlConditions Conds = new SqlConditions();
                    sqlq = "select * from TBL_COMMENT_LIKE l join TBL_LIKE ico on l.ID_LIKE=ico.ID_LIKE where CREATE_BY=" + id_user + " and ID_COMMENT=" + id;
                    DataTable dt = cnn.CreateDataTable(sqlq);
                    if (cnn.LastError != null || dt == null)
                        return JsonResultCommon.Exception(cnn.LastError);
                    bool value = true;
                    int re = 0;
                    Hashtable val = new Hashtable();
                    if (dt.Rows.Count == 0)
                    {
                        val["ID_COMMENT"] = id;
                        val["ID_LIKE"] = type;
                        val["CREATE_BY"] = id_user;
                        val["CREATE_DATE"] = DateTime.Now;
                        value = type == 0;// !(bool)dt.Rows[0]["disabled"];
                        val["COL_DISABLED"] = value;


                        re = cnn.Insert(val, "TBL_COMMENT_LIKE");
                    }
                    else
                    {
                        value = type == 0;// !(bool)dt.Rows[0]["disabled"];
                        val["COL_DISABLED"] = value;
                        if (type > 0)
                            val["ID_LIKE"] = type;
                        val["UPDATE_BY"] = id_user;
                        val["UPDATE_DATE"] = DateTime.Now;
                        Conds.Add("ID_COMMENT", id);
                        Conds.Add("CREATE_BY", id_user);
                        re = cnn.Update(val, Conds, "TBL_COMMENT_LIKE");
                        if (re < 0)
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


        [Route("getDSCOmment")]
        [HttpGet]


        public object getDSBaiDang(int id_user,int id_baidang)
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
                //sql = @"
                //select ID_BAIDANG,ID_LOAIBAIDANG,TIEUDE,NOIDUNG_BAIDANG,TYPEPOST,CreatedDate,CreatedBy,UpdateDate,UpdateBy,ID_KHENTHUONG,ID_GROUP from TBL_BAIDANG
                //ORDER BY ID_BAIDANG DESC";


                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    //dt = cnn.CreateDataTable(sql, Conds);
                    dt_comment = cnn.CreateDataTable(@"select * from TBL_COMMENT", Conds);
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


                var total = dt_comment.Rows.Count;
                if (total == 0)
                {
                    return JsonResultCommon.ThanhCong(string.Empty, pageModel);
                }
               

              
                //anh usser cmt


                return Json(new
                {

                         status = 1,
                        
                               data = from h in dt_comment.AsEnumerable()
                                        where h["ID_BAIDANG"].Equals(id_baidang)
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
                                                               avatar = $"{link}/Avatar/{ user["AVATAR"]}",

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
                                                                                         avatar = $"{link}/Avatar/{ user["AVATAR"]}",

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
                    //CustemerID = loginData.IDKHDPS,
                    page = pageModel
                }); ; ;
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }

    }

}