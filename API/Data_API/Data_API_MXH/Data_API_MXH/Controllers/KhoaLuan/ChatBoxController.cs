
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
using System.Threading;
using System.Drawing;
using System.Threading.Tasks;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
    public class ChatBoxController : ApiController
    {
        // GET api/<controller>
        [Route("File_UpdateMess")]
        [HttpPost]

        public async Task<object> File_UpdateMess([FromBody] Models.ImageModel data)
        {

            DataTable lastid = new DataTable();
            DataRow[] dr;
            string Id = "";
            Hashtable val = new Hashtable();

            //!string.IsNullOrEmpty(data.image.ToString())
            //Data_API_MXH.Assets.Common.getDomain();
            if (data.image != null)
            {
                string base64 = data.image.ToString();
                string filename = data.name;
                int so = 0;


                int baidang;


                try
                {
                    String path = HttpContext.Current.Server.MapPath($"~/UploadedFiles/"); //Path

                    //Check if directory exist
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                    }
                    while (File.Exists(path + filename))
                    {
                        string[] s = filename.Split('_');
                        if (s.Length >= 2)
                        {
                            if (int.TryParse(s[0], out so)) filename = (so + 1) + "_" + filename.Substring(so.ToString().Length + 1);
                            else filename = "1_" + data.name;
                        }
                        else filename = "1_" + data.name;
                    }

                    //set the image path
                    string imgPath = Path.Combine(path, filename);

                    byte[] imageBytes = Convert.FromBase64String(data.image.ToString());

                    File.WriteAllBytes(imgPath, imageBytes);

                    try
                    {
                        //Conds.Add("email", Email);
                        //Conds.Add("password", Pass);




                        using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                        {

                            SqlConditions Conds = new SqlConditions();
                            Thread.Sleep(500);
                            lastid = cnn.CreateDataTable(@"
                            SELECT Max(ID_MESS) as asLastID FROM TBL_MESSENGES");
                            dr = lastid.Select();

                            Id = lastid.Rows[0]["asLastID"].ToString();

                            //foreach (DataRow r in dr[0].Table.Rows)
                            //{

                            //    Id = r["asLastID"].ToString();


                            //}
                            
                            baidang = Int32.Parse(Id);
                            val.Add("TYPE_MESS", filename);



                            Conds.Add("ID_MESS", baidang);


                            if (cnn.Update(val, Conds, "TBL_MESSENGES") < 0)
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
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }

            }

            return JsonResultCommon.ThatBai("Cập nhật thất bại");



        }


        [Route("UpdateMessenger")]
        [HttpPost]
        public object UpdateMessenger(Models.chatbox data)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {

                    val["NOIDUNG_MESS"] = data.message;
                    Conds.Add("ID_MESS", data.idchat);

                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val,Conds, "TBL_MESSENGES") < 0)
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
        }

        [Route("DeleteAllMessenger")]
        [HttpDelete]
        public object DeleteAllMessenger(int id_user_send, int id_user_nhan)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                string sql = "";
                string id_mess_tam;
                int id_mess;
                DataRow[] dr;
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {


                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        dt = cnn.CreateDataTable(sql);
                        dr = dt.Select();


                        Conds.Add("ID_USER_SEND", id_user_send);
                        Conds.Add("ID_USER_NHAN", id_user_nhan);
                        if (cnn.Delete(Conds, "TBL_MESSENGES") < 0)
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
        }

        [Route("DeleteMessenger")]
        [HttpPost]
        public object DeleteMessenger(int id_user_cr,int id_mess)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                     val["COL_DISABLED_CURRENT"] =id_user_cr;
                  
                    Conds.Add("ID_MESS", id_mess);

                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_MESSENGES") < 0)
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
        }

        [Route("DeleteForeverMessenger")]
        [HttpDelete]
        public object DeleteForeverMessenger(int id_mess)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                  

                    Conds.Add("ID_MESS", id_mess);

                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Delete(Conds, "TBL_MESSENGES") < 0)
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
        }

        [Route("GetDSMessenger")]
        [HttpGet]
        public object GetDSMessenger(int id_user_send,int id_user_revice)
        {

            {
                int status = 0;
                string Id = "";

                string Token = "";

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_nhan = new DataTable();

                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();
                string sql;
                sql = @"
select * from TBL_MESSENGES where (ID_USER_SEND=" + id_user_send + " or ID_USER_SEND =" + id_user_revice + ")and (ID_USER_NHAN=" + id_user_revice + " or ID_USER_NHAN=" + id_user_send + ")  AND COL_DISABLED_CURRENT!="+ id_user_send;
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(sql, Conds);

                        dt_nhan =cnn.CreateDataTable(@"select * from TBL_MESSENGES where ID_USER_NHAN="+ id_user_revice, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }
                      
                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {
                                   idchat = r["ID_MESS"],

                                   message = r["NOIDUNG_MESS"],
                                   type = r["LINK_ICON_IN_MESSAGE"],
                                   Create_date = r["DATE_SEND"],
                                   userid_nhan = r["ID_USER_NHAN"],
                                   hinhanh = r["TYPE_MESS"],
                                   imgchat = $"{link}/UploadedFiles/{  r["TYPE_MESS"]}",
                                   userid_send = r["ID_USER_SEND"],
                                   //hinhanh = r["AVATAR"],
                                   //avatar = $"{link}/Avatar/{  r["AVATAR"]}",

                                   //MesengerNhan= from g in dt_nhan.AsEnumerable()
                                   //              select new
                                   //              {
                                   //                  idchat = r["ID_MESS"],

                                   //                  message = r["NOIDUNG_MESS"],
                                   //                  type = r["LINK_ICON_IN_MESSAGE"],
                                   //                  Create_date = r["DATE_SEND"],
                                   //                  userid_nhan = r["ID_USER_NHAN"],

                                   //                  userid_send = r["ID_USER_SEND"],



                                   //              },
                               }



                    });

                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }


        [Route("GetUserNhanMessenger")]
        [HttpGet]
        public object GetUserNhanMessenger(int id_user_send)
        {

            {
                int status = 0;
                string Id = "";

                string Token = "";

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_nhan = new DataTable();
                DataTable dt_max = new DataTable();

                DataTable dt_mess = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();
                string sql;
                sql = @"
  select  distinct (ID_USER_SEND) as user_  from TBL_MESSENGES where   ID_USER_NHAN="+ id_user_send+" UNION select  distinct (ID_USER_NHAN)  from TBL_MESSENGES where ID_USER_SEND="+ id_user_send; 
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(sql, Conds);

                        dt_nhan = cnn.CreateDataTable(@"select * from TBL_USER", Conds);
                        dt_max= cnn.CreateDataTable(@"  select  MAX(ID_MESS) as id_max ,ID_USER_NHAN,ID_USER_SEND from TBL_MESSENGES group by ID_USER_NHAN,ID_USER_SEND", Conds);
                        dt_mess= cnn.CreateDataTable(@"  select  * from TBL_MESSENGES  where COL_DISABLED_CURRENT!=" + id_user_send + " order by ID_MESS  DESC ", Conds);

                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {
                                   id_user_nhan = r["user_"],


                                   Mess = (from ms in dt_mess.AsEnumerable()
                                          where ms["ID_USER_SEND"].Equals(id_user_send) && ms["ID_USER_NHAN"].Equals(r["user_"])||
                                           ms["ID_USER_NHAN"].Equals(id_user_send) && ms["ID_USER_SEND"].Equals(r["user_"])

                                           select new
                                          {
                                              idchat = ms["ID_MESS"],

                                              message = ms["NOIDUNG_MESS"],
                                              userid_send = ms["ID_USER_SEND"],
                                              userid_nhan = ms["ID_USER_NHAN"],
                                              create_date = ms["DATE_SEND"],


                                          }).FirstOrDefault(),


                                   TT_user = from user in dt_nhan.AsEnumerable()
                                             where user["ID_USER"].ToString().Equals(r["user_"].ToString())
                                             select new
                                             {
                                                 ID_user = user["ID_USER"],
                                                 Username = user["UserName"],
                                                 ID_NV = user["IDNV"],
                                                 hinhanh = user["AVATAR"],
                                                 avatar = $"{link}/Avatar/{user["AVATAR"]}",

                                             },

                               }



                    }) ;

                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }
        [Route("addMessenger")]
        [HttpPost]
        public object addMessenger(Models.chatbox data)
        {

            {
                string link = Data_API_MXH.Assets.Common.getDomain();

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                string Id = "";
                int id_mess;
                DataTable lastid = new DataTable();
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);





                    val.Add("NOIDUNG_MESS", data.message);

                    val.Add("ID_USER_SEND", data.userid_send);
                    val.Add("ID_USER_NHAN", data.userid_nhan);
                    val.Add("TYPE_MESS", data.type);
                    val.Add("DATE_SEND", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                    val.Add("COL_DISABLED_CURRENT", data.disable);




                    //Conds.Add("ID_USER", data.ID_User);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Insert(val, "TBL_MESSENGES") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }

                 

                        lastid = cnn.CreateDataTable(@"SELECT Max(ID_MESS) as asLastID FROM TBL_MESSENGES");
                        dr = lastid.Select();

                        Id = lastid.Rows[0]["asLastID"].ToString();

                        id_mess = Int32.Parse(Id);
                        Thread.Sleep(1000);
                        dt = cnn.CreateDataTable(@" select * from TBL_MESSENGES
 ", Conds);
                       
                        var dl = from r in dt.AsEnumerable()
                                 where r["ID_MESS"].Equals(id_mess)
                                 select new
                                 {
                                     idchat = r["ID_MESS"],

                                     message = r["NOIDUNG_MESS"],
                                     userid_send = r["ID_USER_SEND"],
                                     userid_nhan = r["ID_USER_NHAN"],
                                     create_date= r["DATE_SEND"],
                                     disable = r["COL_DISABLED_CURRENT"],
                                     hinhanh = r["TYPE_MESS"],
                                     imgchat = $"{link}/UploadedFiles/{r["TYPE_MESS"]}",

                                     //hinhanh = r["AVATAR"],
                                     //avatar = $"{link}/Avatar/{  r["AVATAR"]}",
                                     //tinhtrang = r["TinhTrang"],

                                 };
                        mangxahoi.PushToAllMessenger(dl, null);

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