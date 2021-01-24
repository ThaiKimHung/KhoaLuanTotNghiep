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
using Newtonsoft.Json.Linq;
using System.Web.Http.Cors;
using System.Threading;
using System.Threading.Tasks;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
    public class FlowController : ApiController
    {

        [Route("DeleteFlow")]
        [HttpDelete]
        public object DeleteFlow(int id_canhan, int id_cr)
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


                Conds.Add("ID_CANHAN", id_canhan);



                Conds.Add("USER_Flow", id_cr);

                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {


                    if (cnn.Delete(Conds, "TBL_Flow") < 0)
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

        [Route("CheckFlow")]
        [HttpGet]
        public object CheckFlow(int id_cr,int id_canhan)
        {
            int status = 0;
            string Id = "";
            int total;
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataTable dt_count = new DataTable();
            DataTable dt_user = new DataTable();
            DataTable checkflow = new DataTable();
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


                    checkflow = cnn.CreateDataTable(@" select ID_CANHAN from TBL_Flow where USER_Flow=" + id_cr + " and ID_CANHAN=" + id_canhan, Conds);
                }

                total= checkflow.Rows.Count;
                if(total>0)
                {
                    return Json(new
                    {

                        check = true

                    }); 


                } 
                else
                {
                    return Json(new
                    {
                        
                        check = false

                    }); 
                }    
              
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("addFlow")]
        [HttpPost]
        public object addFlow(int id_canhan,int id_cr)
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


                val.Add("ID_CANHAN", id_canhan);


             
                val.Add("USER_Flow",id_cr);
              
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {


                    if (cnn.Insert(val, "TBL_Flow") < 0)
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
        [Route("getFlow")]
        [HttpGet]
        public object getFlow(int id_canhan)
        {
            int status = 0;
            string Id = "";
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataTable dt_count = new DataTable();
            DataTable dt_user = new DataTable();
            DataTable checkflow = new DataTable();
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

                    dt_user = cnn.CreateDataTable(@"select  top 4 USER_Flow from TBL_Flow where ID_CANHAN=" + id_canhan+"ORDER by newid()",Conds);
                    

                    dt = cnn.CreateDataTable(@" select ID_USER,AVATAR,TINHTRANG from TBL_USER ");
                    dt_count= cnn.CreateDataTable(@"select count(ID_CANHAN) as tong,ID_CANHAN from TBL_Flow where ID_CANHAN=" + id_canhan + "group by ID_CANHAN");

                }

                return Json(new
                {

                    status = 1,
                    Data = from g in dt_count.AsEnumerable()

                           select new
                           {

                               tong = g["tong"],

                             Flow = from cnt in dt_user.AsEnumerable()

                                             select new
                                             {
                                                user_flow= cnt["USER_Flow"],
                                           

                               TT_User_Flow = from flow in dt.AsEnumerable()
                                              where flow["ID_USER"].Equals(cnt["USER_Flow"])
                                              select new
                                              {
                                                  TinhTrang=flow["TINHTRANG"],
                                                  hinh = flow["AVATAR"],

                                                  Avatar = $"{link}/Avatar/{flow["AVATAR"]}",
                                              },
                                             },

                           }
                
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

    }
}