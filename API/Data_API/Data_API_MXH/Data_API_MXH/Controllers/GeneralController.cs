using APIModel;
using APIModel.BLayer;
using APIModel.Classes;
using DocumentFormat.OpenXml.Bibliography;
using DpsLibs.Data;
using LinqToExcel;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Data_API_MXH.Controllers
{
    [RoutePrefix("api/controllergeneral")]
    public class GeneralController : ApiController
    {
        [Route("Get_DSTruyCapNhanh")]
        [HttpGet]
        public object Get_DSTruyCapNhanh()
        {
            BaseModel<object> model = new BaseModel<object>();
            ErrorModel error = new ErrorModel();
            SqlConditions Conds = new SqlConditions();
            string orderByStr = " Util_QuickAccess.position "; string whereStr = " UserID=@UserID ";
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            DataTable dt = new DataTable();
            string sqlq = "";
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData != null)
                {
                    Conds.Add("UserID", loginData.Id);

                    using (DpsConnection cnn = new DpsConnection("ConnectionStringLandingPage", true))
                    {
                        sqlq = $@"select iif (tbl_submenu.icon is not NULL,tbl_submenu.icon,Mainmenu.icon) as icon, tbl_submenu.title, 
                        tbl_submenu.alink, Util_QuickAccess.menuid, tbl_submenu.target,Util_QuickAccess.BackgroundColor,Util_QuickAccess.TextColor
                        from Util_QuickAccess join tbl_submenu on menuid = tbl_submenu.id_row
                        join Mainmenu on tbl_submenu.groupname =Mainmenu.Code
                        where { whereStr } order by { orderByStr}";
                        dt = cnn.CreateDataTable(sqlq, Conds);
                        int dem = dt.Rows.Count;
                        if (dem == 0)
                        {
                            model.status = 0;
                            error = new ErrorModel();
                            error.message = "Không có dữ liệu";
                            error.code = Data_API_MXH.Assets.Constant.ERRORCODE;
                            return Json(new
                            {
                                status = 1,
                                error = error,
                                data = String.Empty,
                            });
                        }

                        return Json(new
                        {
                            status = 1,
                            data = from r in dt.AsEnumerable()
                                   select new
                                   {
                                       ID = r["menuid"],
                                       Icon = r["icon"],
                                       Title = r["title"],
                                       Alink = r["alink"],
                                       Target = r["target"],
                                       BackgroundColor = !string.IsNullOrEmpty(r["BackgroundColor"].ToString()) ? r["BackgroundColor"] : "",
                                       TextColor = !string.IsNullOrEmpty(r["TextColor"].ToString()) ? r["TextColor"] : "",
                                   },
                        });
                    }
                }
                else
                {
                    model.status = 0;
                    error = new ErrorModel();
                    error.message = "Phiên đăng nhập hết hiệu lực.Vui lòng đăng nhập lại!";
                    error.code = Data_API_MXH.Assets.Constant.ERRORCODE;
                    return Json(new
                    {
                        status = 0,
                        error = error,
                        data = String.Empty,
                    });
                }
            }
            catch (Exception ex)
            {
                model.status = 0;
                error = new ErrorModel();
                error.message = "Lỗi dữ liệu hoặc bạn phải truyền Token!";
                error.code = Data_API_MXH.Assets.Constant.ERRORCODE;
                return Json(new
                {
                    status = 0,
                    error = error,
                    data = String.Empty,
                });
            }
        }

        #region Lấy danh sách loại phép theo tên loại
        /// /// <summary>
        /// Lấy danh sách loại phép theo tên loại
        /// </summary>
        /// <returns></returns>
        [Route("GetListTypeLeaveByTitle")]
        [HttpGet]
        public object GetListTypeLeaveByTitle(string title)
        {
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            DataTable dt = new DataTable();
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                Conds.Add("CustemerID", loginData.IDKHDPS);
                Conds.Add("nhom", DBNull.Value, SqlOperator.Is);
                Conds.Add("disable", 0);
                if (!string.IsNullOrEmpty(title)) Conds.Add("title", title);

                using (DpsConnection cnn = new DpsConnection())
                {
                    dt = cnn.CreateDataTable(@"SELECT ID_type, title, resourcekey, vitri, IsAnnualLeave FROM xnp_types where (where) order by vitri", "(where)", Conds);
                    dt.Columns.Add("SoNgay", typeof(double));
                    foreach (DataRow dr in dt.Rows)
                    {
                        dr["SoNgay"] = BLayer.Phepnam.RemainLeave(dr["ID_type"].ToString(), DateTime.Today.Year, loginData.Id.ToString(), DateTime.Today, cnn);
                    }
                }

                var data = from r in dt.AsEnumerable()
                           select new
                           {
                               ID_type = r["ID_type"],
                               title = r["title"],
                               SoNgay = r["SoNgay"],
                               IsPhepNam = r["IsAnnualLeave"],
                           };
                return JsonResultCommon.ThanhCong(data);
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion
    }
}