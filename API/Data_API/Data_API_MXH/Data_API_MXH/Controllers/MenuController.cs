using APIModel;
using APIModel.Classes;
using DpsLibs.Data;
using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Data_API_MXH.Controllers
{
    [RoutePrefix("api/menu")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MenuController : ApiController
    {
        #region Load menu
        /// <summary>
        /// Load menu
        /// </summary>
        /// <returns></returns>
        [Route("LayMenuChucNang")]
        [HttpGet]
        public object LayMenuChucNang()
        {
            ErrorModel error = new ErrorModel();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            DataSet ds = new DataSet();
            string sql = ""; ;
            string id_menu = "0";
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                //Dùng cho HR
                string id_menu_hr = Data_API_MXH.BLayer.Menu.GetIDMenu_HR(loginData.Id.ToString(), loginData.IDKHDPS.ToString());
                if (!string.IsNullOrEmpty(id_menu_hr))
                {
                    id_menu += id_menu_hr;
                }

                //select menu
                sql = $@"select title, Target, Summary, '#' as ALink, ISNULL(Icon, 'flaticon-interface-7') as Icon, '' as title_, position, Code
                from Mainmenu where code in (select distinct groupname from tbl_submenu where  Id_row in ({id_menu})) order by position 
                select title, AllowPermit, Target, tbl_submenu.id_row, PhanLoai1, PhanLoai2, GroupName, ALink, Summary, AppLink, AppIcon, '' as title_ from tbl_submenu  where id_row in ({id_menu}) order by position";
                using (DpsConnection cnn = new DpsConnection("ConnectionStringLandingPage", true))
                {
                    ds = cnn.CreateDataSet(sql);
                    if (ds.Tables.Count == 0) return JsonResultCommon.ThatBai("Không có dữ liệu", cnn.LastError);
                }

                var data = from r in ds.Tables[0].AsEnumerable()
                             orderby r["position"]
                             select new
                             {
                                 Code = r["Code"].ToString(),
                                 Title = r["title"].ToString(),
                                 Target = r["Target"],
                                 Summary = r["Summary"].ToString(),
                                 Icon = r["Icon"].ToString(),
                                 ALink = r["ALink"].ToString(),
                                 Child = from c in ds.Tables[1].AsEnumerable()
                                         where c["groupname"].ToString().Trim().ToLower().Equals(r["Code"].ToString().Trim().ToLower())
                                         select new
                                         {
                                             Title = c["title"].ToString(),
                                             Summary = c["Summary"].ToString(),
                                             AllowPermit = c["AllowPermit"].ToString(),
                                             Target = c["Target"].ToString(),
                                             GroupName = c["GroupName"].ToString(),
                                             ALink = c["ALink"].ToString(),
                                             PhanLoai1 = c["PhanLoai1"].ToString(),//Dùng cho HR
                                             PhanLoai2 = c["PhanLoai2"].ToString(),//Dùng cho HR
                                         },
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