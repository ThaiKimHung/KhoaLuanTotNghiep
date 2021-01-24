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
using MangXaHoi.SignalR;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
    public class LuotXemController : ApiController
    {
        [Route("addLuotXem")]
        [HttpPost]
        public object addLuotXem(Models.LuotXem data)
        {

            {
                int status = 0;
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                  
                  
                    val.Add("ID_THONGDIEP", data.id_thongdiep);

                    val.Add("ID_USER", data.id_user);



                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        dt = cnn.CreateDataTable(@"select * from TBL_LUOTXEM where ID_THONGDIEP="+ data.id_thongdiep+" and ID_USER="+ data.id_user, Conds);
                        dr = dt.Select();
                        var total = dt.Rows.Count;

                        if (total == 1)
                        {
                            status = 0;
                            return Json(new
                            {
                                status = status,
                            });
                        }
                        else
                        {

                      

                        if (cnn.Insert(val, "TBL_LUOTXEM") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
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

        [Route("CountLuotXem")]
        [HttpGet]
        public object CountLuotXem(int id_thongdiep)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_count = new DataTable();
                DataTable dt_user = new DataTable();
                Hashtable val = new Hashtable();
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {



                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                       

                        dt_count = cnn.CreateDataTable(@"
  select  count(ID_THONGDIEP) as luotxem  from TBL_LUOTXEM as lx,TBL_USER as u where lx.ID_USER=u.ID_USER
   and ID_THONGDIEP=" + id_thongdiep, Conds);
                      
                    }

                    return Json(new
                    {

                        status = 1,
                        Data = from g in dt_count.AsEnumerable()

                               select new
                               {

                                 
                                   luotxem = g["luotxem"],
                                   



                               }
                    });
                    ;


                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }


        [Route("getDSLuotXem")]
        [HttpGet]
        public object getDSLuotXem( int id_thongdiep)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_count = new DataTable();
                DataTable dt_user = new DataTable();
                Hashtable val = new Hashtable();
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                   


                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@" select * from TBL_LUOTXEM  where ID_THONGDIEP="+ id_thongdiep, Conds);

                        dt_count = cnn.CreateDataTable(@"
  select  count(ID_THONGDIEP) as luotxem  from TBL_LUOTXEM as lx,TBL_USER as u where lx.ID_USER=u.ID_USER
   and ID_THONGDIEP=" + id_thongdiep, Conds);
                        dt_user = cnn.CreateDataTable(@" select * from TBL_USER", Conds);

                    }

                    return Json(new
                    {

                        status = 1,
                        Data = from g in dt.AsEnumerable()

                               select new
                               {

                                   //id_thongdiep = g["ID_THONGDIEP"],
                                   id_user = g["ID_USER"],
                                   //Count_LuotXem = (from lx in dt_count.AsEnumerable()

                                   //                 select new
                                   //                 {
                                   //                     luotxem = lx["luotxem"],


                                   //                 }).FirstOrDefault(),

                                   User_Xem = from u in dt_user.AsEnumerable()
                                               where u["ID_USER"].Equals(g["ID_USER"])
                                               select new
                                               {
                                                   hinhanh = u["AVATAR"],
                                                   Avatar = $"{link}/Avatar/{  u["AVATAR"]}",

                                               },                           



                               }
                    });
                    ;
            
                
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }


    }
}