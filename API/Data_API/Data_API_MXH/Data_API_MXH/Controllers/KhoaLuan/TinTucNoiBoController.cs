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
    public class TinTucNoiBoController : ApiController
    {
        [Route("getDSBaiDang_TinTucNoiBo")]
        [HttpGet]


        public object getDSBaiDang_TinTucNoiBo([FromUri] QueryParams query)
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
select ID_BAIDANG,ID_LOAIBAIDANG,TIEUDE,NOIDUNG_BAIDANG,TYPEPOST,CreatedDate,CreatedBy,UpdateDate,UpdateBy,ID_KHENTHUONG,ID_GROUP,u.UserName,u.AVATAR from TBL_BAIDANG as bd,TBL_USER as u

 where ID_LOAIBAIDANG=1 and bd.CreatedBy=u.ID_USER
                ORDER BY ID_BAIDANG DESC 

";
                    var dt = cnn.CreateDataTable(sqlq);
                    dr = dt.Select();
                    foreach (DataRow r in dr)
                    {
                        if (File.Exists(HttpContext.Current.Server.MapPath($"~/image/User/{r["AVATAR"]}.jpg")))
                        {
                            r["Avatar"] = link + $"image/User/{r["AVATAR"]}.jpg";
                        }
                    }
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

    }
}