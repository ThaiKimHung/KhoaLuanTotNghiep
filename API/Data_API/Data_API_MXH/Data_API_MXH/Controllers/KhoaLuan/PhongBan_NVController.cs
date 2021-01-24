

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
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PhongBan_NVController : ApiController
    {
        [Route("GetDSNhanVien_PB")]
        [HttpGet]
        public object GetDSNhanVien_PB(int id_phong)
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
                string sql = "";

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    sql = @"   select IDNV,pb.ID_PHONG,TENPHONG,CHUCVU,HOTEN,DIACHI,NGAYSINH,SDT,GIOITINH,NGAYVAOLAM from TBL_NHANVIEN as nv ,TBL_PHONGBAN as pb where nv.ID_PHONG=pb.ID_PHONG
";
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        //link = "http://192.168.3.49/";

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
                               where
   r["ID_PHONG"].Equals(id_phong)
                               select new
                               {

                                   id_NV = r["IDNV"],
                                   id_phong = r["ID_PHONG"],
                                   hoten = r["HOTEN"],
                                   chucvu = r["CHUCVU"],
                                   diachi = r["DIACHI"],
                                   ngaysinh = r["NGAYSINH"],
                                   sdt = r["SDT"],
                                   gioitinh = r["GIOITINH"],
                                   // Roles = r["roles"],
                                   tenphong = r["TENPHONG"],
                                   ngayvaolam = r["NGAYVAOLAM"],
                                   //Occupation = r["occupation"],
                                   //Phoned = r["Phone"],
                                   //Address = r["Address"],
                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }


        [Route("Get_DSNhanVien_Dashboard")]
        [HttpGet]
        public object Get_DSNhanVien_Dashboard(int id_phong,[FromUri] QueryParams query)
        {
            try
            {
                PageModel pageModel = new PageModel();
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    string sqlq = @"   select IDNV,pb.ID_PHONG,TENPHONG,CHUCVU,HOTEN,DIACHI,NGAYSINH,SDT,GIOITINH,NGAYVAOLAM from TBL_NHANVIEN as nv ,TBL_PHONGBAN as pb where nv.ID_PHONG=pb.ID_PHONG";
                    var dt = cnn.CreateDataTable(sqlq);
                    if (cnn.LastError != null || dt == null)
                        return JsonResultCommon.SQL(cnn.LastError.Message);
                    var temp = dt.AsEnumerable();
                    #region Sort/filter
                    Dictionary<string, string> sortableFields = new Dictionary<string, string>{
                        { "HOTEN","HOTEN" },
                     
                    };
                    if (!string.IsNullOrEmpty(query.sortField) && sortableFields.ContainsKey(query.sortField))
                    {
                        if ("asc".Equals(query.sortOrder))
                            temp = temp.OrderBy(x => x[sortableFields[query.sortField]]);
                        else
                            temp = temp.OrderByDescending(x => x[sortableFields[query.sortField]]);
                    }
                    var xaaaa = query.filter;
                    if (!string.IsNullOrEmpty(query.filter["HOTEN"]))
                    {
                        string keyword = query.filter["HOTEN"].ToLower();
                        temp = temp.Where(x => x["HOTEN"].ToString().ToLower().Contains(keyword));
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
                               where
r["ID_PHONG"].Equals(id_phong)
                               select new
                               {

                                   id_NV = r["IDNV"],
                                   id_phong = r["ID_PHONG"],
                                   hoten = r["HOTEN"],
                                   chucvu = r["CHUCVU"],
                                   diachi = r["DIACHI"],
                                   ngaysinh = r["NGAYSINH"],
                                   sdt = r["SDT"],
                                   gioitinh = r["GIOITINH"],
                                   // Roles = r["roles"],
                                   tenphong = r["TENPHONG"],
                                   ngayvaolam = r["NGAYVAOLAM"],

                               };
                
                    return JsonResultCommon.ThanhCong(data, pageModel, User.IsInRole("68"));
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }


        [Route("GetDSNhanVien")]
        [HttpGet]
        public object GetDSNhanVien()
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
                string sql = "";

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    sql = @" 
				select * from TBL_NHANVIEN
";
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        //link = "http://192.168.3.49/";

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

                                   id_NV = r["IDNV"],
                                   id_phong = r["ID_PHONG"],
                                   hoten = r["HOTEN"],
                                   chucvu = r["CHUCVU"],
                                   diachi = r["DIACHI"],
                                   ngaysinh = r["NGAYSINH"],
                                   sdt = r["SDT"],
                                   gioitinh = r["GIOITINH"],
                                   // Roles = r["roles"],
                                 
                                   //Occupation = r["occupation"],
                                   //Phoned = r["Phone"],
                                   //Address = r["Address"],
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