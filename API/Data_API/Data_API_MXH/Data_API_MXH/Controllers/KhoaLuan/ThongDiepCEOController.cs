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
using System.Threading.Tasks;
using System.Threading;
using MangXaHoi.SignalR;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
    public class ThongDiepCEOController : ApiController
    {
       [ Route("UpdateGhim")]
        [HttpPost]
        public object UpdateGhim(int id_user,int id_thongdiep)
        {
            int status = 0;
            string Id = "";
            int id_group = 0;
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "", link = "";
            Hashtable val = new Hashtable();
            Hashtable val_member = new Hashtable();
            DataTable dt_token = new DataTable();
            DataTable lastid = new DataTable();
            string sqlq = "";



            try
            {




                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    val.Add("COL_DISABLE",false);



                    Conds.Add("ID_THONGDIEP", id_thongdiep);
                

                    if (cnn.Update(val, Conds, "TBL_THONGDIEPCEO") < 0)

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
        [Route("CheckGhim")]
        [HttpGet]
        public object getDSGhim()
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
SELECT ID_THONGDIEP,COL_DISABLE FROM TBL_GHIM ", Conds);


                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()

                           select new
                           {

                               id_thongdiep = g["ID_THONGDIEP"],
                               ghim = g["COL_DISABLE"],



                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("getDSGhim")]
        [HttpGet]
        public object getDSGhim(int id_user)
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
SELECT * FROM TBL_GHIM as g,TBL_THONGDIEPCEO as td where g.ID_THONGDIEP=td.ID_THONGDIEP and ID_USER="+id_user, Conds);


                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()

                           select new
                           {

                               id_thongdiep = g["ID_THONGDIEP"],
                               title = g["TIEUDE"],
                               noidung = g["NOIDUNG"],
                               media = g["TYPEPOST"],
                               imgmedia = $"{link}/UploadedFiles/{g["TYPEPOST"]}",
                               //id_user = r["ID_USER"],

                               //user_name = r["UserName"],
                               create_by = g["CreatedBy"],
                               createdate = g["CreatedDate"],
                               //hinhanh = g["AVATAR"],
                               //AlowEdit = g["CreatedBy"],
                               //Avatar = $"{link}/Avatar/{  g["AVATAR"]}",




                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("DeleteGhim")]
        [HttpDelete]
        public object DeleteGhim(int id_user, int id_thongdiep)
        {

            {
                int status = 0;
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val = new Hashtable();
                Hashtable val2 = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);



                    //val.Add("ID_COMMENT", data.id_cmt);
                    //val.Add("ID_BAIDANG", data.ID_BaiDang);
                  


                    Conds.Add("ID_USER", id_user);
                    Conds.Add("ID_THONGDIEP", id_thongdiep);
                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        //    dt = cnn.CreateDataTable(@"SELECT COL_DISABLE FROM TBL_THONGDIEPCEO as g where  g.ID_THONGDIEP="+id_thongdiep, Conds);
                        //    dr = dt.Select();
                        //    var total = dt.Rows.Count;


                        if (cnn.Delete(Conds, "TBL_GHIM") < 0)
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

        [Route("addTBLGhim")]
        [HttpPost]
        public object addTBLGhim(int id_user, int id_thongdiep)
        {

            {
                int status = 0;
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val = new Hashtable();
                Hashtable val2 = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);



                    //val.Add("ID_COMMENT", data.id_cmt);
                    //val.Add("ID_BAIDANG", data.ID_BaiDang);
                    val.Add("ID_THONGDIEP", id_thongdiep);
                   

                    val.Add("ID_USER", id_user);


                    //Conds.Add("ID_USER", id_user);
                    Conds.Add("ID_THONGDIEP", id_thongdiep);
                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        //    dt = cnn.CreateDataTable(@"SELECT COL_DISABLE FROM TBL_THONGDIEPCEO as g where  g.ID_THONGDIEP="+id_thongdiep, Conds);
                        //    dr = dt.Select();
                        //    var total = dt.Rows.Count;


                        if (cnn.Insert(val, "TBL_GHIM") < 0)
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
        [Route("addGhim")]
        [HttpPost]
        public object addGhim(int id_user,int id_thongdiep)
        {

            {
                int status = 0;
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val = new Hashtable();
                Hashtable val2 = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);



                    //val.Add("ID_COMMENT", data.id_cmt);
                    // val.Add("ID_BAIDANG", data.ID_BaiDang);
                    //val.Add("ID_THONGDIEP", id_thongdiep);
                    //val.Add("COL_DISABLE", true);

                    //val.Add("ID_USER", id_user);


                    val2.Add("COL_DISABLE", true);


                    //Conds.Add("ID_USER", id_user);
                    Conds.Add("ID_THONGDIEP", id_thongdiep);
                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        //    dt = cnn.CreateDataTable(@"SELECT COL_DISABLE FROM TBL_THONGDIEPCEO as g where  g.ID_THONGDIEP="+id_thongdiep, Conds);
                        //    dr = dt.Select();
                        //    var total = dt.Rows.Count;


                        if (cnn.Update(val2, Conds, "TBL_THONGDIEPCEO") < 0)
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
        [Route("getRanDomDSThongDiep")]
        [HttpGet]
        public object getRanDomDSThongDiep()
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
 
SELECT TOP 1  ID_THONGDIEP,TIEUDE,CreatedDate FROM TBL_THONGDIEPCEO ORDER BY NEWID()
", Conds);




                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()

                           select new
                           {

                               id_thongdiep=g["ID_THONGDIEP"],
                               title = g["TIEUDE"],
                           
                               createdate = g["CreatedDate"],
                             




                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("getDSThongDiep")]
        [HttpGet]
        public object getDSThongDiep()
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
  select * from TBL_THONGDIEPCEO as td ,TBL_USER as u where u.ID_USER=td.CreatedBy

", Conds);




                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()
                        
                           select new
                           {

                               id_thongdiep = g["ID_THONGDIEP"],
                               title = g["TIEUDE"],
                               noidung = g["NOIDUNG"],
                               media= g["TYPEPOST"],
                               imgmedia= $"{link}/UploadedFiles/{g["TYPEPOST"]}",
                               //id_user = r["ID_USER"],

                               //user_name = r["UserName"],
                               create_by = g["CreatedBy"],
                               createdate = g["CreatedDate"],
                               hinhanh = g["AVATAR"],
                               ghim = g["COL_DISABLE"],
                               AlowEdit = g["CreatedBy"],
                               Avatar = $"{link}/Avatar/{  g["AVATAR"]}",




                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }


        [Route("getDSThongDiepDetail")]
        [HttpGet]
        public object getDSThongDiepDetail(int id_td)
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
    select	ID_THONGDIEP,TIEUDE,NOIDUNG,TYPEPOST,CreatedBy,CreatedDate,HOTEN,CHUCVU,AVATAR,COL_DISABLE from TBL_THONGDIEPCEO as td ,
 TBL_USER as u,TBL_NHANVIEN as nv where u.ID_USER=td.CreatedBy and u.IDNV=nv.IDNV and ID_THONGDIEP=" + id_td, Conds);




                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt.AsEnumerable()

                           select new
                           {

                               id_thongdiep = g["ID_THONGDIEP"],
                               title = g["TIEUDE"],
                               noidung = g["NOIDUNG"],
                                hoten = g["HOTEN"],
                                chucvu = g["CHUCVU"],
                               media = g["TYPEPOST"],
                               ghim = g["COL_DISABLE"],
                               imgmedia = $"{link}/UploadedFiles/{g["TYPEPOST"]}",
                               //user_name = r["UserName"],
                               create_by = g["CreatedBy"],
                               createdate = g["CreatedDate"],
                               hinhanh = g["AVATAR"],
                               AlowEdit = g["CreatedBy"],
                               Avatar = $"{link}/Avatar/{ g["AVATAR"]}",




                           }
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }
        // GET api/<controller>
        [Route("addThongDiep")]
        [HttpPost]
        public object addThongDiep(Models.ThongDiepCEO data)
        {
            int status = 0;
            string Id = "";
            int id_group = 0;
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataRow[] dr;
            string Idtb = "";
            int id_thongd;
            DataRow[] dr_tb;
            DataTable lastidTD = new DataTable();
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "", link = "";
            Hashtable val = new Hashtable();
            Hashtable val_member = new Hashtable();
            DataTable dt_token = new DataTable();
            DataTable lastid = new DataTable();
            string sqlq = "";



            try
            {


             
              
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {


                    val.Add("TIEUDE", data.title);
                    val.Add("COL_DISABLE", false);

                    val.Add("NOIDUNG", data.noidung);
                    val.Add("CreatedBy", data.create_by);
                    val.Add("CreatedDate", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));

                    if (cnn.Insert(val, "TBL_THONGDIEPCEO") < 0)

                    {
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }
                    dt = cnn.CreateDataTable(@"select * from TBL_THONGDIEPCEO as td ,TBL_USER as u where u.ID_USER=td.CreatedBy", Conds);
                    lastidTD = cnn.CreateDataTable(@"SELECT Max(ID_THONGDIEP) as asLastTB FROM TBL_THONGDIEPCEO");


                    dr_tb = lastidTD.Select();

                    Idtb = lastidTD.Rows[0]["asLastTB"].ToString();

                    id_thongd = Int32.Parse(Idtb);

                    Thread.Sleep(500);
                    dr = dt.Select();

                    var dl = from g in dt.AsEnumerable()
                             where g["ID_THONGDIEP"].Equals(id_thongd)
                             select new
                             {
                                 id_thongdiep = g["ID_THONGDIEP"],
                                 title = g["TIEUDE"],
                                 noidung = g["NOIDUNG"],
                                 media = g["TYPEPOST"],
                                 imgmedia = $"{link}/UploadedFiles/{g["TYPEPOST"]}",
                                 //id_user = r["ID_USER"],
                                 ghim = g["COL_DISABLE"],
                                 //user_name = r["UserName"],
                                 create_by = g["CreatedBy"],
                                 createdate = g["CreatedDate"],
                                 hinhanh = g["AVATAR"],
                                 AlowEdit = g["CreatedBy"],
                                 Avatar = $"{link}/Avatar/{  g["AVATAR"]}",

                             };
                    mangxahoi.PushTChangelThongDiep(dl, null);

                }
                return JsonResultCommon.ThanhCong();

            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }



        }

        [Route("UpdateThongDiep")]
        [HttpPost]
        public object UpdateThongDiep(Models.ThongDiepCEO data)
        {
            int status = 0;
            string Id = "";
            int id_group = 0;
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "", link = "";
            Hashtable val = new Hashtable();
            Hashtable val_member = new Hashtable();
            DataTable dt_token = new DataTable();
            DataTable lastid = new DataTable();
            string sqlq = "";



            try
            {




                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    val.Add("TIEUDE", data.title);


                    val.Add("NOIDUNG", data.noidung);

                    Conds.Add("ID_THONGDIEP", data.id_thongdiep);

                    if (cnn.Update(val, Conds, "TBL_THONGDIEPCEO") < 0)

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
        [Route("File_ThongDiep")]
        [HttpPost]

        public async Task<object> File_ThongDiep([FromBody] Models.ImageModel data)
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
                            lastid = cnn.CreateDataTable(@"
                             SELECT Max(ID_THONGDIEP) as asLastID FROM TBL_THONGDIEPCEO");
                            dr = lastid.Select();

                            Id = lastid.Rows[0]["asLastID"].ToString();

                            //foreach (DataRow r in dr[0].Table.Rows)
                            //{

                            //    Id = r["asLastID"].ToString();


                            //}
                            baidang = Int32.Parse(Id);
                            val.Add("TYPEPOST", filename);



                            Conds.Add("ID_THONGDIEP", baidang);


                            if (cnn.Update(val, Conds, "TBL_THONGDIEPCEO") < 0)
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
        [Route("File_Updatethongdiep")]
        [HttpPost]

        public async Task<object> File_Updatethongdiep(int id_thongdiep, [FromBody] Models.ImageModel data)
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


                            val.Add("TYPEPOST", filename);



                            Conds.Add("ID_THONGDIEP", id_thongdiep);


                            if (cnn.Update(val, Conds, "TBL_THONGDIEPCEO") < 0)
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


        [Route("DeleteThongDiep")]
        [HttpDelete]
        public object DeleteThongDiep(int id_thongdiep)
        {
            int status = 0;
            string Id = "";
            int id_group = 0;
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "", link = "";
            Hashtable val = new Hashtable();
            Hashtable val_member = new Hashtable();
            DataTable dt_token = new DataTable();
            DataTable lastid = new DataTable();
            string sqlq = "";



            try
            {




                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {

                    Conds.Add("ID_THONGDIEP", id_thongdiep);

                    if (cnn.Delete( Conds, "TBL_THONGDIEPCEO") < 0)

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