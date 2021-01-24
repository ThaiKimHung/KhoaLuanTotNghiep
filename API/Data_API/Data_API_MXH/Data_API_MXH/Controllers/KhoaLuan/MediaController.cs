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
using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Drawing;
using System.Web.Http.Cors;
using DpsLibs.Data;
using System.Collections;
using System.Data;
using APIModel.Classes;
using System.Threading;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
    public class MediaController : ApiController
    {

        [Route("deleteMedia")]
        [HttpDelete]
        public object deleteMedia(int id_media)
        {

            {

                SqlConditions Conds = new SqlConditions();
                SqlConditions Conds_tb = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {





              
                    Conds_tb.Add("ID_MEDIA", id_media);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        //cnn.Delete(Conds_tb, "TBL_THONGBAO");
                        Thread.Sleep(500);

                        if (cnn.Delete(Conds_tb, "TBL_MEDIA") < 0)
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

        [Route("updateMedia")]
        [HttpPost]
        public object updateMedia(Models.Media data)
        {

            if (data.base64 != null&& data.hinhanh!=null)
            {
                //string base11 = data.base64.ToString();
                string filename = data.hinhanh;
                int so = 0;


                int baidang;


                try
                {
                    String path = HttpContext.Current.Server.MapPath($"~/Media/"); //Path

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
                            else filename = "1_" + filename;
                        }
                        else filename = "1_" + filename;
                    }

                    //set the image path
                    string imgPath = Path.Combine(path, filename);

                    byte[] imageBytes = Convert.FromBase64String(data.base64);

                    File.WriteAllBytes(imgPath, imageBytes);



                    {

                        SqlConditions Conds = new SqlConditions();
                        DataTable dt = new DataTable();
                        DataTable lastid = new DataTable();
                        Hashtable val = new Hashtable();
                        DataTable dt_token = new DataTable();
                        DataRow[] dr;
                        string Id = "";

                        try
                        {
                            if (data.title == null)
                            {
                                val.Add("TIEUDE", "");
                            }
                            else
                            {
                                val.Add("TIEUDE", data.title);
                            }


                            val.Add("HINHANH", filename);


                       
                            Conds.Add("ID_MEDIA", data.ID_media);

                            using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                            {
                                if (cnn.Update(val,Conds, "TBL_MEDIA") < 0)
                                {
                                    return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                                }
                            }


                        }
                        catch (Exception ex)
                        {
                            return JsonResultCommon.Exception(ex);
                        }
                    }
                }



                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);

                }
            }
            else
            {
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable lastid = new DataTable();
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                DataRow[] dr;
                string Id = "";

                try
                {




                    val.Add("TIEUDE", data.title);
                  

             
                  
                    Conds.Add("ID_MEDIA", data.ID_media);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_MEDIA") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }


                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

            return JsonResultCommon.ThanhCong();
        }

    
        [Route("addMedia")]
        [HttpPost]

        public async Task<object> addMedia(string tieude,string template, int id_user, Models.ImageModel data)
        {
            if (data.image != null)
            {
                string base64 = data.image.ToString();
                string filename = data.name;
                int so = 0;


                int baidang;


                try
                {
                    String path = HttpContext.Current.Server.MapPath($"~/Media/"); //Path

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



                    {

                        SqlConditions Conds = new SqlConditions();
                        DataTable dt = new DataTable();
                        DataTable lastid = new DataTable();
                        Hashtable val = new Hashtable();
                        DataTable dt_token = new DataTable();
                        DataRow[] dr;
                        string Id = "";

                        try
                        {
                            if(tieude==null)
                            {
                                val.Add("TIEUDE", "");
                            }    
                            else
                            {
                                val.Add("TIEUDE", tieude);
                            }    


                            val.Add("HINHANH", filename);
                          

                            val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                            val.Add("CreatedBy", id_user);

                            using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                            {
                                if (cnn.Insert(val, "TBL_MEDIA") < 0)
                                {
                                    return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                                }
                            }


                        }
                        catch (Exception ex)
                        {
                            return JsonResultCommon.Exception(ex);
                        }
                    }
                }



                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);

                }
            }
            else
            {
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable lastid = new DataTable();
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                DataRow[] dr;
                string Id = "";

                try
                {




                    val.Add("TIEUDE", tieude);
                          val.Add("template", template);

                    val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("CreatedBy", id_user);

                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_MEDIA") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    }


                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

            return JsonResultCommon.ThanhCong();
        }

        [Route("GetDetailMedia")]
        [HttpGet]
        public object GetDetailMedia(int _idmedia)
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
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"
 select ID_MEDIA,HINHANH,template,TIEUDE,CreatedBy,CreatedDate,UserName,AVATAR from TBL_MEDIA as me,TBL_USER as u where me.CreatedBy=u.ID_USER
  AND ID_MEDIA=" + _idmedia
, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   id_media = r["ID_MEDIA"],
                                   img_media = r["HINHANH"],
                                   hinhanh = $"{link}/Media/{r["HINHANH"]}",
                                   title = r["TIEUDE"],
                                   createdate = r["CreatedDate"],
                                   template = r["template"],
                                   createby = r["CreatedBy"],
                                   username = r["UserName"],
                                   hinhanh_user = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{r["AVATAR"]}",


                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }

        [Route("GetIDMedia")]
        [HttpGet]
        public object GetIDMedia()
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
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"
  select ID_MEDIA from TBL_MEDIA"
, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   id_media = r["ID_MEDIA"],
                                 


                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }



        [Route("GetDS_MyMedia")]
        [HttpGet]
        public object GetDS_MyMedia(int id_usser)
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
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"
   select ID_MEDIA,HINHANH,template,TIEUDE,CreatedBy,CreatedDate,UserName,AVATAR from TBL_MEDIA as me,TBL_USER as u where me.CreatedBy=u.ID_USER
 and me.CreatedBy=" + id_usser
, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   id_media = r["ID_MEDIA"],
                                   img_media = r["HINHANH"],
                                   template = r["template"],
                                   hinhanh = $"{link}/Media/{r["HINHANH"]}",
                                   title = r["TIEUDE"],
                                   createdate = r["CreatedDate"],

                                   createby = r["CreatedBy"],
                                   username = r["UserName"],
                                   hinhanh_user = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{r["AVATAR"]}",


                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }




        [Route("GetDSMedia")]
        [HttpGet]
        public object GetDSMedia()
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
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"
  select TOP 4  ID_MEDIA,HINHANH,template,TIEUDE,CreatedBy,CreatedDate,UserName,AVATAR from TBL_MEDIA as me,TBL_USER as u where me.CreatedBy=u.ID_USER
 ORDER BY  NEWID() DESC

", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   id_media = r["ID_MEDIA"],
                                   img_media = r["HINHANH"],
                                   hinhanh = $"{link}/Media/{r["HINHANH"]}",
                                   title = r["TIEUDE"],
                                   createdate = r["CreatedDate"],
                                   template = r["template"],
                                   createby = r["CreatedBy"],
                                   username = r["UserName"],
                                   hinhanh_user = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{r["AVATAR"]}",


                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }



        [Route("GetDSAllMedia")]
        [HttpGet]
        public object GetDSAllMedia()
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
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"
  select ID_MEDIA,HINHANH,template,TIEUDE,CreatedBy,CreatedDate,UserName,AVATAR from TBL_MEDIA as me,TBL_USER as u where me.CreatedBy=u.ID_USER
 ORDER BY  NEWID() DESC

", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   id_media = r["ID_MEDIA"],
                                   img_media = r["HINHANH"],
                                   hinhanh = $"{link}/Media/{r["HINHANH"]}",
                                   title = r["TIEUDE"],
                                   createdate = r["CreatedDate"],
                                   template = r["template"],
                                   createby = r["CreatedBy"],
                                   username = r["UserName"],
                                   hinhanh_user = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{r["AVATAR"]}",


                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }
    }
}

    
