
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
   
    public class KhenThuongController : ApiController
    {

        [Route("GetRanDomTop2KhenThuong")]
        [HttpGet]
        public object GetRanDomTop2KhenThuong()
        {

            {
                int status = 0;

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "", link = "";

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        link = "http://192.168.3.49/";

                        dt = cnn.CreateDataTable(@" 
 SELECT TOP 2 bd.ID_BAIDANG,bd.ID_KHENTHUONG,kt.TIEUDE as kttd,bd.TIEUDE as bdtieude,kt.LINK_ICON FROM TBL_BAIDANG as bd ,TBL_KHENTHUONG as kt  where bd.ID_KHENTHUONG=kt.ID_KHENTHUONG  and ID_LOAIBAIDANG=2
ORDER BY NEWID()
", Conds);

                        dr = dt.Select();
                      
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dr.AsEnumerable()
                               select new
                               {
                                   id_baidang=r["ID_BAIDANG"],
                                   ID_khenthuong = r["ID_KHENTHUONG"],
                                   tieudekt = r["kttd"],
                                   tieudebaidang=r["bdtieude"],
                                   icon = r["LINK_ICON"],

                               },
                        
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }

        [Route("GetDSKhenThuong")]
        [HttpGet]
        public object GetDSKhenThuong()
        {

            {
                int status = 0;

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "", link = "";

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        link = "http://192.168.3.49/";

                        dt = cnn.CreateDataTable("select * from TBL_KHENTHUONG", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);

                        dr = dt.Select();
                        //foreach (DataRow r in dr)
                        //{
                        //    if (File.Exists(HttpContext.Current.Server.MapPath($"~/image/khenthuong/{r["ID_KHENTHUONG"]}.jpg")))
                        //    {
                        //        r["ICON_APP"] = link + $"image/khenthuong/{r["ID_KHENTHUONG"]}.jpg";
                        //    }
                        //}
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dr.AsEnumerable()
                               select new
                               {

                                   ID_khenthuong = r["ID_KHENTHUONG"],
                                   tieude = r["TIEUDE"],
                                   icon = r["LINK_ICON"],
                                
                               },
                        //ID_khenthuong = r["ID_KHENTHUONG"],
                        //tieude = r["TIEUDE"],
                        //icon = r["LINK_ICON"],
                        //Noidungkt = r["NOIDUNG_KHEN_THUONG"],
                        //user_KT = r["USER_KT"],
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }


        [Route("addKhenThuong")]
        [HttpPost]
        public object addKhenThuong(Models.Group data)
        {
            int status = 0;
            string Id = "";
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "", link = "";
            Hashtable val = new Hashtable();
            DataTable dt_token = new DataTable();
            try
            {


                val.Add("TEN_GROUP", data.ten_group);


                val.Add("CREATE_DATE", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                val.Add("CREATE_BY", data.CreatedBy);
                val.Add("UPDATE_DATE", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                val.Add("UPDATE_BY", data.UpdatedBy);
                val.Add("Avatar_group", data.avatar_group);
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {


                    if (cnn.Insert(val, "TBL_GROUP") < 0)
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
        [Route("GetLuuTruKhenThuongUser")]
        [HttpGet]
        public object GetLuuTruKhenThuongUser()
        {

            {
                int status = 0;

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
                       
                        string sql = @"
select bd.ID_BAIDANG,bd.TIEUDE,bd.NOIDUNG_BAIDANG,bd.CreatedDate,bd.CreatedBy,kt.TIEUDE AS TIEUDE_KT,kt.LINK_ICON,u.UserName,u.AVATAR from TBL_BAIDANG as bd,TBL_KHENTHUONG as kt,TBL_USER as u where bd.ID_KHENTHUONG 
is not null and bd.ID_KHENTHUONG=kt.ID_KHENTHUONG and bd.CreatedBy=u.ID_USER
";

                        dt = cnn.CreateDataTable(sql, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);

                        dr = dt.Select();
                        //foreach (DataRow r in dr)
                        //{
                        //    if (File.Exists(HttpContext.Current.Server.MapPath($"~/image/User/{r["ID_USER"]}.jpg")))
                        //    {
                        //        r["AVATAR"] = link + $"image/User/{r["ID_USER"]}.jpg";
                        //    }
                        //}
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dr.AsEnumerable()
                               select new
                               {

                                   Id_BaiDang = r["ID_BAIDANG"],
                                   tieude_baidang = r["TIEUDE"],
                                   noidungbaidang = r["NOIDUNG_BAIDANG"],
                                   createdate = r["CreatedDate"],
                                   createby = r["CreatedBy"],
                                   tieude_kt = r["TIEUDE_KT"],
                                   icon_kt = r["LINK_ICON"],
                                   user_name = r["UserName"],
                                   hinhanh = r["AVATAR"],
                                   avatar = $"{link}/Avatar/{ r["AVATAR"]}",
                               },
                        //ID_khenthuong = r["ID_KHENTHUONG"],
                        //tieude = r["TIEUDE"],
                        //icon = r["LINK_ICON"],
                        //Noidungkt = r["NOIDUNG_KHEN_THUONG"],
                        //user_KT = r["USER_KT"],
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }





        [Route("GetDSKhenThuongUser")]
        [HttpGet]
        public object GetDSKhenThuongUser()
        {

            {
                int status = 0;

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "", link = "";

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        link = "http://192.168.3.49/";
                        string sql = @"  select tk.ID_KHENTHUONG,NOIDUNG_KHEN_THUONG,TIEUDE,LINK_ICON,HOTEN from TBL_KHENTHUONG_USER as tk, TBL_USER as u,TBL_NHANVIEN as nv,TBL_KHENTHUONG as t where tk.USER_KT=u.ID_USER and u.IDNV=nv.IDNV and tk.ID_KHENTHUONG=t.ID_KHENTHUONG
";

                        dt = cnn.CreateDataTable(sql, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);

                        dr = dt.Select();
                        //foreach (DataRow r in dr)
                        //{
                        //    if (File.Exists(HttpContext.Current.Server.MapPath($"~/image/User/{r["ID_USER"]}.jpg")))
                        //    {
                        //        r["AVATAR"] = link + $"image/User/{r["ID_USER"]}.jpg";
                        //    }
                        //}
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dr.AsEnumerable()
                               select new
                               {

                                   ID_khenthuong = r["ID_KHENTHUONG"],
                                   noidung_kt = r["NOIDUNG_KHEN_THUONG"],
                                   tieude= r["TIEUDE"],
                                   hoten= r["HOTEN"],
                                   icon = r["LINK_ICON"],
                               },
                        //ID_khenthuong = r["ID_KHENTHUONG"],
                        //tieude = r["TIEUDE"],
                        //icon = r["LINK_ICON"],
                        //Noidungkt = r["NOIDUNG_KHEN_THUONG"],
                        //user_KT = r["USER_KT"],
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