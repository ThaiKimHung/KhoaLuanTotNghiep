using Data_API_MXH.BLayer;
using APIModel;
using APIModel.BLayer;
using APIModel.Classes;
using DpsLibs.Data;
using System;
using System.Data;
using System.Linq;
using System.Web.Http;

namespace Data_API_MXH.Controllers
{
    [RoutePrefix("api/dashboard")]
    public class DashBoardController : ApiController
    {
        #region Load danh sách thông báo
        /// <summary>
        /// Load danh sách thông báo
        /// </summary>
        /// <param name="appcode"></param>
        /// <returns></returns>
        [Route("Get_DSThongBao")]
        [HttpGet]
        public object Get_DSThongBao(string appcode)
        {
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            string Langcode = Request.Headers.GetValues("Langcode").FirstOrDefault();
            DataTable dt = new DataTable();
            DateTime MinDate = DateTime.Today.AddDays(-200);
            string sql = "";
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                Conds.Add("MinDate", MinDate, SqlOperator.Greaterthan);
                Conds.Add("NotifyTo", loginData.Id);
                if (appcode != "Land") Conds.Add("UserNotify.AppCode", appcode);
                sql = @"select *,'' as image,AppList.Domain, UserNotify.AppCode from UserNotify join AppList on AppList.AppCode = UserNotify.AppCode where (where) order by NotifyTime desc";
                using (DpsConnection cnn = new DpsConnection("ConnectionStringLandingPage", true))
                {
                    dt = cnn.CreateDataTable(sql, "(where)", Conds);
                }
                int total = dt.Rows.Count;
                //Không có dữ liệu
                if (total == 0)
                {
                    return JsonResultCommon.ThanhCong(string.Empty);
                }
                //Xử lý dữ liệu
                foreach (DataRow dr in dt.Rows)
                {
                    string translate = General.getErrorMessageFromBackend(dr["Langkey"].ToString(), Langcode, "");
                    string[] data = dr["ReplaceData"].ToString().Split(new string[] { "$;$" }, StringSplitOptions.None);
                    foreach (string r in data)
                    {
                        string[] key = r.ToString().Split(new string[] { "$:$" }, StringSplitOptions.None);
                        if (key.Length == 2)
                        {
                            if (!string.IsNullOrEmpty(translate))
                            {
                                translate = translate.Replace($"${key[0]}$", key[1].ToString());
                            }
                        }
                    }
                    dr["title"] = translate;
                }

                return Json(new
                {
                    status = 1,
                    data = from r in dt.AsEnumerable()
                           select new
                           {
                               Rowid = r["Rowid"],
                               Title = r["title"],
                               NotifyTime = r["NotifyTime"],
                               Link = appcode != r["AppCode"].ToString() ? r["Domain"] + "" + r["link"] : r["link"],
                               Target = r["Target"],
                               Icon = r["Icon"],
                               AppIcon = r["AppIcon"],
                               AppLink = r["AppLink"],
                               ComponentName = r["ComponentName"],
                               Component = r["Component"],
                               AppCode = r["AppCode"],
                           },
                    TongSoLuong = total,
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion

        #region Load danh sách nhắc nhở
        /// <summary>
        /// Load danh sách nhắc nhở
        /// </summary>
        /// <param name="appcode"></param>
        /// <returns></returns>
        [Route("Get_DSNhacNho")]
        [HttpGet]
        public object Get_DSNhacNho(string appcode)
        {
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            string Langcode = Request.Headers.GetValues("Langcode").FirstOrDefault();
            DataTable dt = new DataTable();
            DateTime MinDate = DateTime.Today.AddDays(-200);
            string link = "";
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                Conds.Add("MinDate", MinDate);
                Conds.Add("AppCode", appcode);
                Conds.Add("Id_nv", loginData.Id);
                string select = @"select * from Reminders join ReminderTypes on ReminderTypes.TypeID = Reminders.Loai where Id_nv=@Id_nv and ((Soluong is null) or (Soluong>0)) and AppCode=@AppCode";
                using (DpsConnection cnn = new DpsConnection("ConnectionStringLandingPage", true))
                {
                    dt = cnn.CreateDataTable(select, Conds);
                }
                int total = dt.Rows.Count;
                //Không có dữ liệu
                if (total == 0)
                {
                    return JsonResultCommon.ThanhCong(string.Empty);
                }
                //Xử lý dữ liệu
                foreach (DataRow dr in dt.Rows)
                {
                    string translate = General.getErrorMessageFromBackend(dr["Langkey"].ToString(), Langcode, "");
                    if (!string.IsNullOrEmpty(translate))
                    {
                        translate = translate.Replace("$soluong$", dr["soluong"].ToString());
                    }
                    dr["title"] = translate;
                }

                return Json(new
                {
                    status = 1,
                    data = from r in dt.AsEnumerable()
                           select new
                           {
                               Rowid = r["Rowid"],
                               Title = r["title"],
                               Link = r["link"],
                               Target = r["Target"],
                               Icon = r["Icon"],
                               AppIcon = link + r["AppIcon"],
                               AppLink = r["AppLink"],
                               ComponentName = r["ComponentName"],
                           },
                    TongSoLuong = total,
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion

        #region Load danh sách nhắc nhở
        /// <summary>
        /// Load danh sách nhắc nhở
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Route("Get_DSThongBao_Dashboard")]
        [HttpGet]
        public object Get_DSThongBao_Dashboard([FromUri] QueryParams query)
        {
            query = query == null ? new QueryParams() : query;
            PageModel pageModel = new PageModel();
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            string Langcode = Request.Headers.GetValues("Langcode").FirstOrDefault();
            DataTable dt = new DataTable();
            string sql = "";
            DateTime MinDate = DateTime.Today.AddDays(-200);
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                if (!query.filter["appcode"].Equals("Land")) Conds.Add("UserNotify.AppCode", query.filter["appcode"]);
                Conds.Add("NotifyTo", loginData.Id);
                Conds.Add("MinDate", MinDate);
                sql = @"select top (20) *,'' as image,AppList.Domain, UserNotify.AppCode from UserNotify join AppList on AppList.AppCode = UserNotify.AppCode where (where) order by NotifyTime desc";
                using (DpsConnection cnn = new DpsConnection("ConnectionStringLandingPage", true))
                {
                    dt = cnn.CreateDataTable(sql, "(where)", Conds);
                }
                int total = dt.Rows.Count;
                //Không có dữ liệu
                if (total == 0)
                {
                    return JsonResultCommon.ThanhCong(string.Empty, pageModel);
                }
                //Xử lý dử liệu
                foreach (DataRow dr in dt.Rows)
                {
                    string translate = General.getErrorMessageFromBackend(dr["Langkey"].ToString(), Langcode, "");
                    string[] data = dr["ReplaceData"].ToString().Split(new string[] { "$;$" }, StringSplitOptions.None);
                    foreach (string r in data)
                    {
                        string[] key = r.ToString().Split(new string[] { "$:$" }, StringSplitOptions.None);
                        if (key.Length == 2)
                        {
                            if (!string.IsNullOrEmpty(translate))
                            {
                                translate = translate.Replace($"${key[0]}$", key[1].ToString());
                            }
                        }
                    }
                    dr["title"] = translate;
                }

                pageModel.TotalCount = total;
                pageModel.AllPage = (int)Math.Ceiling(total / (decimal)query.record);
                pageModel.Size = query.record;
                pageModel.Page = query.page;
                pageModel.Page = query.page;
                if (query.more)
                {
                    query.page = 1;
                    query.record = pageModel.TotalCount;
                }
                // Phân trang
                dt = dt.AsEnumerable().Skip((query.page - 1) * query.record).Take(query.record).CopyToDataTable();

                var rs = from r in dt.AsEnumerable()
                         select new
                         {
                             Rowid = r["Rowid"],
                             Title = r["title"],
                             NotifyTime = r["NotifyTime"],
                             Link = query.filter["appcode"] != r["AppCode"].ToString() ? r["Domain"] + "" + r["link"] : r["link"],
                             Target = r["Target"],
                             Icon = r["Icon"],
                             AppIcon = r["AppIcon"],
                             AppLink = r["AppLink"],
                             ComponentName = r["ComponentName"],
                             Component = r["Component"],
                             AppCode = r["AppCode"],
                         };
                return JsonResultCommon.ThanhCong(rs);
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion
    }
}