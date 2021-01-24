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
    public class PhanQuyen_LoaiBaiDangController : ApiController
    { /// <summary>
      /// 
      /// phan quyen loai bai dang
      /// </summary>
        [Route("PhanQuyenLoaiBaiDang")]
        [HttpGet]

        public object GetPhanQuyenLoaiBaiDang(int id_user)
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
                string  link = Data_API_MXH.Assets.Common.getDomain();

                DataTable dt_token = new DataTable();
                try
                {
                    Conds.Add("id_user", id_user);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                     

                        //dt = cnn.CreateDataTable("select * from TBL_NHOM_QUYEN_LOAIBAIDANG, TBL_NHOM_QUYEN_USER, TBL_LOAIBAIDANG where TBL_NHOM_QUYEN_LOAIBAIDANG.ID_QUYEN = TBL_NHOM_QUYEN_USER.ID_QUYEN and TBL_NHOM_QUYEN_LOAIBAIDANG.ID_LOAIBAIDANG = TBL_LOAIBAIDANG.ID_LOAIBAIDANG and ID_USER =@id_user", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);
                        dt = cnn.CreateDataTable("select * from TBL_NHOM_QUYEN_LOAIBAIDANG as qbd,TBL_LOAIBAIDANG as loai where qbd.ID_LOAIBAIDANG = loai.ID_LOAIBAIDANG and  ID_USER =@id_user", Conds);
                        dr = dt.Select();
                        foreach (DataRow r in dr)
                        {
                            if (File.Exists(HttpContext.Current.Server.MapPath($"~/image/khenthuong/{r["ID_LOAIBAIDANG"]}.jpg")))
                            {
                                r["ICON_APP"] = link + $"image/khenthuong/{r["ID_LOAIBAIDANG"]}.jpg";
                            }
                        }
                    }




                    return Json(new
                    {
                        status = 1,
                        data = from r in dr.AsEnumerable()
                               select new
                               {

                                   Id_LoaiDang = r["ID_LOAIBAIDANG"],
                                   TenLoaiDang = r["TENLOAIBAIDANG"],
                                   Icon_BaiDang = r["LINK_ICON_BAIDANG"],
                                   Icon_app = r["ICON_APP"],
                                   check=true,


                               },
                    }); ;
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }

            }
        }

        [Route("GetUpdateQuyenLoaiBaiDang")]
        [HttpGet]

        public object GetUpdateQuyenLoaiBaiDang(int id_user)
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
                string title = "", link = "";

                DataTable dt_token = new DataTable();
                try
                {
                    Conds.Add("id_user", id_user);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        link = "http://192.168.43.236/";
                        // link = "http://192.168.3.49/";
                        //link = "https://localhost:44340/";

                        //dt = cnn.CreateDataTable("select * from TBL_NHOM_QUYEN_LOAIBAIDANG, TBL_NHOM_QUYEN_USER, TBL_LOAIBAIDANG where TBL_NHOM_QUYEN_LOAIBAIDANG.ID_QUYEN = TBL_NHOM_QUYEN_USER.ID_QUYEN and TBL_NHOM_QUYEN_LOAIBAIDANG.ID_LOAIBAIDANG = TBL_LOAIBAIDANG.ID_LOAIBAIDANG and ID_USER =@id_user", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);
                        dt = cnn.CreateDataTable(@"SELECT ID_LOAIBAIDANG,TENLOAIBAIDANG
FROM TBL_LOAIBAIDANG
EXCEPT
SELECT lbd.ID_LOAIBAIDANG,TENLOAIBAIDANG
FROM TBL_NHOM_QUYEN_LOAIBAIDANG as lbd,TBL_LOAIBAIDANG as bd  
WHERE ID_USER=@id_user and lbd.ID_LOAIBAIDANG=bd.ID_LOAIBAIDANG
", Conds);

                    }




                    return Json(new
                    {
                        status = 1,
                        data = from r in dt.AsEnumerable()
                               select new
                               {

                                   Id_LoaiDang = r["ID_LOAIBAIDANG"],
                                   TenLoaiDang = r["TENLOAIBAIDANG"],
                                   check = false,




                               },
                    }); ;
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }

        [Route("UpdateQuyenLoaiBaiDang")]
        [HttpPost]

        public object UpdateQuyenLoaiBaiDang(int id_user, int loai)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                Hashtable val = new Hashtable();
                List<object> rs = new List<object>();
                string title = "", link = "";

                DataTable dt_token = new DataTable();
                try
                {

                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        val.Add("ID_LOAIBAIDANG", loai);



                        val.Add("ID_USER", id_user);


                        if (cnn.Insert(val, "TBL_NHOM_QUYEN_LOAIBAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                        return JsonResultCommon.ThanhCong();
                    }


                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }
        [Route("DeleteQuyenLoaiBaiDang")]
        [HttpDelete]

        public object DeleteQuyenLoaiBaiDang(int id_user, int loai)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                Hashtable val = new Hashtable();
                List<object> rs = new List<object>();
                string title = "", link = "";

                DataTable dt_token = new DataTable();
                try
                {

                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {





                        Conds.Add("ID_USER", id_user);
                        Conds.Add("ID_LOAIBAIDANG", loai);

                        if (cnn.Delete(Conds, "TBL_NHOM_QUYEN_LOAIBAIDANG") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                        return JsonResultCommon.ThanhCong();
                    }


                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }
    }
}

        
    
