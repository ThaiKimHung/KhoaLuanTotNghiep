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
    public class LikeController : ApiController
    {
        // GET api/<controller>
        [Route("getDSLike")]
        [HttpGet]
        public object getDSLike()
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
                //Conds.Add("email", Email);
                //Conds.Add("password", Pass);
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    link = "https://localhost:44340/";

                    dt = cnn.CreateDataTable("select * from TBL_LIKE", Conds);
                    //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);

                    //dr = dt.Select();
                    //foreach (DataRow r in dr)
                    //{
                    //    if (File.Exists(HttpContext.Current.Server.MapPath($"~/image/Icon/{r["title"]}.png")))
                    //    {
                    //        r["ICON_APP"] = link + $"image/Icon/{r["title"]}.png";
                    //    }
                    //}
                }

                return Json(new
                {
                    status = 1,
                    Data = from r in dt.AsEnumerable()
                           select new
                           {

                               ID_like = r["ID_LIKE"],
                               title_like = r["title"],
                               link_icon_like = r["LINK_ICON"],
                               Disabled_icon = r["Disabled_icon"],
                               //Icon_app = r["ICON_APP"],

                           },
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        
    }

    

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}