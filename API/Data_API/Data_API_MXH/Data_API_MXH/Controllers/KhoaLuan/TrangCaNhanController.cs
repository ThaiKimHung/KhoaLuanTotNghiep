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
using System.Threading.Tasks;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
    public class TrangCaNhanController : ApiController
    {


        [Route("deleteBaiDangChiaSe")]
        [HttpDelete]
        public object deleteBaiDangChiaSe(int id_baidangcanhan)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {





                    Conds.Add("ID_BAIDANG", id_baidangcanhan);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Delete(Conds, "TBL_BaiDang_TRANGCANHAN") < 0)
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

        [Route("UpdateTrangCaNhan")]
        [HttpPost]
        public object UpdateTrangCaNhan(Models.TrangCaNhan data)
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

                    val.Add("TieuSu", data.tieusu);
                 
                    Conds.Add("ID_CANHAN", data.id_canhan);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_TRANGCANHAN") < 0)
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
        [Route("GetDataEDit")]
        [HttpGet]
        public object GetDataEDit(int id_baidang)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "";
                DataTable dt_kt = new DataTable();
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        dt_kt = cnn.CreateDataTable(@"

select * from TBL_KHENTHUONG
");

                        dt = cnn.CreateDataTable(@"

   select * from TBL_BAIDANG where ID_BAIDANG="+id_baidang, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }
                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
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

                                   KhenThuong = from kt in dt_kt.AsEnumerable()
                                                where r["ID_KHENTHUONG"].Equals(kt["ID_KHENTHUONG"])
                                                select new
                                                {
                                                    id_khenthuong = kt["ID_KHENTHUONG"],
                                                    tieude_kt = kt["TIEUDE"],
                                                    icon = kt["LINK_ICON"],
                                                },


                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }
        [Route("Create_TrangCanNhan")]
        [HttpPost]
        public object Create_TrangCanNhan()
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                DataTable dt_tb = new DataTable();
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                string tam = "";
                int id_user = 0;
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);



                    //val.Add("ID_COMMENT", data.id_cmt);
                    // val.Add("ID_BAIDANG", data.ID_BaiDang);
               

                
                  


                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt_tb = cnn.CreateDataTable(@"SELECT Max(ID_USER) as asLastID FROM TBL_USER");

                        dr = dt_tb.Select();
                        tam = dt_tb.Rows[0]["asLastID"].ToString();

                        id_user = Int32.Parse(tam);


                        Thread.Sleep(500);

                        val.Add("ID_USER",id_user);

                        if (cnn.Insert(val, "TBL_TRANGCANHAN") < 0)
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
        [Route("ShareBaiDang")]
        [HttpPost]
        public object ShareBaiDang(int id_user,int id_baidang)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_canhan = new DataTable();
                Hashtable val = new Hashtable();
                DataRow[] dr_canhan;
                string id_tam = "";
                int id_cn;
                DataTable dt_token = new DataTable();
                try
                {
                 
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);




                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        dt_canhan = cnn.CreateDataTable(@" select ID_CANHAN from TBL_TRANGCANHAN where ID_USER="+ id_user+"");
                        dr_canhan = dt_canhan.Select();
                        id_tam = dt_canhan.Rows[0]["ID_CANHAN"].ToString();

                        id_cn = Int32.Parse(id_tam);




                        val.Add("ID_CANHAN", id_cn);
                    val.Add("ID_USER", id_user);
                        val.Add("ID_BAIDANG", id_baidang);
                        val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                        val.Add("COL_DISABLE", false);
                        if (cnn.Insert(val, "TBL_BaiDang_TRANGCANHAN") < 0)
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
        [Route("deleteBaiTrangCaNhan")]
        [HttpPost]
        public object deleteBaiTrangCaNhan(int id_baidangcanhan)
        {

            {

                SqlConditions Conds = new SqlConditions();
                SqlConditions Conds_tb = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {




                    val.Add("COL_DISABLE", true);

                    Conds.Add("ID_BAIDANG_CANHAN", id_baidangcanhan);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        
                      

                        if (cnn.Update(val,Conds, "TBL_BaiDang_TRANGCANHAN") < 0)
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
        [Route("UpdateAnhBia")]
        [HttpPost]

        public async Task<object> UpdateAnhBia(int id_canhan,[FromBody] Models.ImageModel data)
        {

            DataTable lastid = new DataTable();
            DataRow[] dr;
            string Id = "";
            Hashtable val = new Hashtable();

            //!string.IsNullOrEmpty(data.image.ToString())
            //Data_API_MXH.Assets.Common.getDomain();
            if (data.image != null)
            {
                string base64 = data.image.ToString();
                string filename = data.name;
                int so = 0;


                int baidang;


                try
                {
                    String path = HttpContext.Current.Server.MapPath($"~/UploadedFiles/"); //Path

                    //Check if directory exist
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                    }
                    while (File.Exists(path + filename))
                    {
                        string[] s = filename.Split('_');
                        if (s.Length >= 2)
                        {
                            if (int.TryParse(s[0], out so)) filename = (so + 1) + "_" + filename.Substring(so.ToString().Length + 1);
                            else filename = "1_" + data.name;
                        }
                        else filename = "1_" + data.name;
                    }

                    //set the image path
                    string imgPath = Path.Combine(path, filename);

                    byte[] imageBytes = Convert.FromBase64String(data.image.ToString());

                    File.WriteAllBytes(imgPath, imageBytes);

                    try
                    {
                        //Conds.Add("email", Email);
                        //Conds.Add("password", Pass);




                        using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                        {

                            SqlConditions Conds = new SqlConditions();
                            Thread.Sleep(500);
                           
                            val.Add("AnhBia", filename);



                            Conds.Add("ID_CANHAN", id_canhan);


                            if (cnn.Update(val, Conds, "TBL_TRANGCANHAN") < 0)
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
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }

            }

            return JsonResultCommon.ThatBai("Cập nhật thất bại");



        }



        [Route("getDSBaiDangTrangCaNhan")]
        [HttpGet]


        public object getDSBaiDangTrangCaNhan(int id_user)
        {

            PageModel pageModel = new PageModel();
            string sql = "";
            string sql_baidang = "";
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
            DataTable dt_baidangcanhan = new DataTable();
            DataTable dt_kt = new DataTable();
            DataTable dt_group = new DataTable();
            DataRow[] dr;
            // DataRow[] dr;



            try
            {
                sql_baidang = @" select ID_BAIDANG,CreatedDate from TBL_BAIDANG where CreatedBy=" + id_user+ "UNION select ID_BAIDANG,CreatedDate from TBL_BaiDang_TRANGCANHAN where ID_USER=" + id_user+ " ORDER BY CreatedDate DESC";

                sql = @"
  select ID_BAIDANG,ID_LOAIBAIDANG,TIEUDE,NOIDUNG_BAIDANG,TYPEPOST,CreatedDate,CreatedBy,UpdateDate,UpdateBy,ID_KHENTHUONG,ID_GROUP from TBL_BAIDANG
                ORDER BY ID_BAIDANG DESC";


                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    //dt = cnn.CreateDataTable(sql, Conds);
                    dt = cnn.CreateDataTable(sql);
                    dt_baidangcanhan= cnn.CreateDataTable(sql_baidang, Conds);
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
                    data = from r in dt_baidangcanhan.AsEnumerable()
                           select new
                           {   Id_baidang_canhan = r["ID_BAIDANG"],
                                

                               DataBaiDang = from p in dt.AsEnumerable()
                                       where p["ID_BAIDANG"].Equals(r["ID_BAIDANG"])
                                       select new
                                       {
                                           Id_BaiDang = p["ID_BAIDANG"],
                                           Id_LoaiBaiDang = p["ID_LOAIBAIDANG"],
                                           title = p["TIEUDE"],
                                           NoiDung = p["NOIDUNG_BAIDANG"],
                                           CreatedDate = p["CreatedDate"],
                                           CreatedBy = p["CreatedBy"],
                                           Id_Group = p["ID_GROUP"],
                                           hinhanh = p["TYPEPOST"],
                                           image = $"{link}/UploadedFiles/{p["TYPEPOST"]}",
                                           UpdateDate = p["UpdateDate"],
                                           UpdateBy = p["UpdateBy"],
                                           id_khenthuong = p["ID_KHENTHUONG"],
                                           AllowEdit = p["CreatedBy"],
                                       

                               // bai dang duoc like
                               Group = from g in dt_group.AsEnumerable()
                                       where p["ID_GROUP"].Equals(g["ID_GROUP"])
                                       select new
                                       {
                                           id_group = g["ID_GROUP"],
                                           ten_group = g["TEN_GROUP"],
                                           //icon = g["LINK_ICON"],
                                       },


                               KhenThuong = from kt in dt_kt.AsEnumerable()
                                            where p["ID_KHENTHUONG"].Equals(kt["ID_KHENTHUONG"])
                                            select new
                                            {
                                                id_khenthuong = kt["ID_KHENTHUONG"],
                                                tieude_kt = kt["TIEUDE"],
                                                icon = kt["LINK_ICON"],
                                            },


                               Like = (
                                       from lr in dt_baidang_like_user.AsEnumerable()
                                       where lr["ID_BAIDANG"].Equals(p["ID_BAIDANG"]) && lr["CREATE_BY"].Equals(id_user)
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
                                              where like_bd["ID_BAIDANG"].ToString().Equals(p["ID_BAIDANG"].ToString())
                                              select new
                                              {
                                                  ID_like = like_bd["ID_LIKE"],
                                                  title = like_bd["title"],
                                                  icon = like_bd["LINK_ICON"],
                                                  //icon_app= like_bd["ICON_APP"],
                                                  tong = like_bd["tong"],



                                              },
                               User_DangBai = from user in dt_user.AsEnumerable()
                                              where user["ID_USER"].ToString().Equals(p["CreatedBy"].ToString())
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
                                        where h["ID_BAIDANG"].ToString().Equals(p["ID_BAIDANG"].ToString())
                                        select new
                                        {
                                            id_cmt = h["ID_COMMENT"],
                                            Id_BaiDang = h["ID_BAIDANG"],

                                            NoiDung_cmt = h["NOIDUNG_COMMENT"],
                                            typepost = h["TYPEPOST"],
                                            hinh_cmt = $"{link}/UploadedFiles/{h["TYPEPOST"]}",
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
                                                                hinh_cmt = $"{link}/UploadedFiles/{like_cmt_chill["TYPEPOST"]}",
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

        [Route("getTrangCaNhan")]
        [HttpGet]
        public object getTrangCaNhan(int id_user)
        {
            int status = 0;
            string Id = "";
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataTable dt_group = new DataTable();
            DataTable dt_user = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "";
            string link = Data_API_MXH.Assets.Common.getDomain();

            DataTable dt_token = new DataTable();
            try
            {

                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {




                    dt = cnn.CreateDataTable(@"
select  distinct ID_CANHAN,u.ID_USER,AnhBia,UserName,AVATAR,TieuSu
from TBL_TRANGCANHAN as cn, TBL_USER as u where cn.ID_USER=u.ID_USER and u.ID_USER=" + id_user, Conds);


                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()

                           select new
                           {

                               id_canhan = g["ID_CANHAN"],
                               Id_user = g["ID_USER"],
                              hinhanhbia = g["AnhBia"],
                              tieusu=g["TieuSu"],
                              anhbia = $"{link}/UploadedFiles/{g["AnhBia"]}",
                               //media = g["TYPEPOST"],
                               //imgmedia = $"{link}/UploadedFiles/{g["TYPEPOST"]}",
                               //id_user = r["ID_USER"],

                               user_name = g["UserName"],

                               hinhanh = g["AVATAR"],

                               Avatar = $"{link}/Avatar/{  g["AVATAR"]}",




                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }


        [Route("getRanDoomAnh")]
        [HttpGet]
        public object getRanDoomAnh(int id_user)
        {
            int status = 0;
            string Id = "";
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataTable dt_group = new DataTable();
            DataTable dt_user = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "";
            string link = Data_API_MXH.Assets.Common.getDomain();

            DataTable dt_token = new DataTable();
            try
            {

                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {




                    dt = cnn.CreateDataTable(@"
 select TOP 1 * from  TBL_BAIDANG where CreatedBy="+id_user+ " and TYPEPOST !=null or TYPEPOST!=''  ORDER BY  NEWID() ", Conds);


                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()

                           select new
                           {
                               img = g["TYPEPOST"],
                               hinhanh = $"{link}/UploadedFiles/{g["TYPEPOST"]}",
                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("getGioiThieu")]
        [HttpGet]
        public object getGioiThieu(int id_user)
        {
            int status = 0;
            string Id = "";
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataTable dt_group = new DataTable();
            DataTable dt_user = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "";
            string link = Data_API_MXH.Assets.Common.getDomain();

            DataTable dt_token = new DataTable();
            try
            {

                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {




                    dt = cnn.CreateDataTable(@"

  select ID_USER,u.IDNV,HOTEN,CHUCVU,DIACHI from TBL_USER as u , TBL_NHANVIEN as nv where u.IDNV=nv.IDNV and ID_USER=" + id_user, Conds);


                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()

                           select new
                           {

                               Id_user = g["ID_USER"],
                               Id_nv = g["IDNV"],
                               hoten = g["HOTEN"],
                               //media = g["TYPEPOST"],
                               //imgmedia = $"{link}/UploadedFiles/{g["TYPEPOST"]}",
                               //id_user = r["ID_USER"],

                               chucvu = g["CHUCVU"],

                               diachi = g["DIACHI"],

                            




                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("getDSBaiDangFlowTrangCaNhan")]
        [HttpGet]


        public object getDSBaiDangFlowTrangCaNhan(int id_curent, int id_user)

        {

            PageModel pageModel = new PageModel();
            string sql = "";
            string sql_baidang = "";
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
            DataTable dt_baidangcanhan = new DataTable();
            DataTable dt_kt = new DataTable();
            DataTable dt_group = new DataTable();
            DataRow[] dr;
            // DataRow[] dr;



            try
            {
                sql_baidang = @" select ID_BAIDANG,CreatedDate from TBL_BAIDANG where CreatedBy=" + id_user + "UNION select ID_BAIDANG,CreatedDate from TBL_BaiDang_TRANGCANHAN where ID_USER=" + id_user + " ORDER BY CreatedDate DESC";

                sql = @"
  select ID_BAIDANG,ID_LOAIBAIDANG,TIEUDE,NOIDUNG_BAIDANG,TYPEPOST,CreatedDate,CreatedBy,UpdateDate,UpdateBy,ID_KHENTHUONG,ID_GROUP from TBL_BAIDANG
                ORDER BY ID_BAIDANG DESC";


                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    //dt = cnn.CreateDataTable(sql, Conds);
                    dt = cnn.CreateDataTable(sql);
                    dt_baidangcanhan = cnn.CreateDataTable(sql_baidang, Conds);
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
                    data = from r in dt_baidangcanhan.AsEnumerable()
                           select new
                           {
                               Id_baidang_canhan = r["ID_BAIDANG"],


                               DataBaiDang = from p in dt.AsEnumerable()
                                             where p["ID_BAIDANG"].Equals(r["ID_BAIDANG"])
                                             select new
                                             {
                                                 Id_BaiDang = p["ID_BAIDANG"],
                                                 Id_LoaiBaiDang = p["ID_LOAIBAIDANG"],
                                                 title = p["TIEUDE"],
                                                 NoiDung = p["NOIDUNG_BAIDANG"],
                                                 CreatedDate = p["CreatedDate"],
                                                 CreatedBy = p["CreatedBy"],
                                                 Id_Group = p["ID_GROUP"],
                                                 hinhanh = p["TYPEPOST"],
                                                 image = $"{link}/UploadedFiles/{p["TYPEPOST"]}",
                                                 UpdateDate = p["UpdateDate"],
                                                 UpdateBy = p["UpdateBy"],
                                                 id_khenthuong = p["ID_KHENTHUONG"],
                                                 AllowEdit = p["CreatedBy"],


                                                 // bai dang duoc like
                                                 Group = from g in dt_group.AsEnumerable()
                                                         where p["ID_GROUP"].Equals(g["ID_GROUP"])
                                                         select new
                                                         {
                                                             id_group = g["ID_GROUP"],
                                                             ten_group = g["TEN_GROUP"],
                                                             //icon = g["LINK_ICON"],
                                                         },


                                                 KhenThuong = from kt in dt_kt.AsEnumerable()
                                                              where p["ID_KHENTHUONG"].Equals(kt["ID_KHENTHUONG"])
                                                              select new
                                                              {
                                                                  id_khenthuong = kt["ID_KHENTHUONG"],
                                                                  tieude_kt = kt["TIEUDE"],
                                                                  icon = kt["LINK_ICON"],
                                                              },


                                                 Like = (
                                             from lr in dt_baidang_like_user.AsEnumerable()
                                             where lr["ID_BAIDANG"].Equals(p["ID_BAIDANG"]) && lr["CREATE_BY"].Equals(id_curent)
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
                                                                where like_bd["ID_BAIDANG"].ToString().Equals(p["ID_BAIDANG"].ToString())
                                                                select new
                                                                {
                                                                    ID_like = like_bd["ID_LIKE"],
                                                                    title = like_bd["title"],
                                                                    icon = like_bd["LINK_ICON"],
                                                                    //icon_app= like_bd["ICON_APP"],
                                                                    tong = like_bd["tong"],



                                                                },
                                                 User_DangBai = from user in dt_user.AsEnumerable()
                                                                where user["ID_USER"].ToString().Equals(p["CreatedBy"].ToString())
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
                                                          where h["ID_BAIDANG"].ToString().Equals(p["ID_BAIDANG"].ToString())
                                                          select new
                                                          {
                                                              id_cmt = h["ID_COMMENT"],
                                                              Id_BaiDang = h["ID_BAIDANG"],

                                                              NoiDung_cmt = h["NOIDUNG_COMMENT"],
                                                              typepost = h["TYPEPOST"],
                                                              hinh_cmt = $"{link}/UploadedFiles/{h["TYPEPOST"]}",
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
                                                         where lr["ID_COMMENT"].Equals(h["ID_COMMENT"]) && lr["CREATE_BY"].Equals(id_curent)
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
                                                                                  hinh_cmt = $"{link}/UploadedFiles/{like_cmt_chill["TYPEPOST"]}",
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
                                                                                             where lr["ID_COMMENT"].Equals(like_cmt_chill["ID_COMMENT"]) && lr["CREATE_BY"].Equals(id_curent)
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