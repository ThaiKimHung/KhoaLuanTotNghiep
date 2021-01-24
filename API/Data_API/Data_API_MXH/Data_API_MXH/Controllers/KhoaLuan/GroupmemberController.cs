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
using System.Threading;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]
   
    public class GroupmemberController : ApiController
    {
        [Route("GetDSUser_filter_InGroup")]
        [HttpGet]
        public object GetDSUser_filter_InGroup(int id_gr)
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
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        link = "http://192.168.43.236/";
                        //link = "http://192.168.3.49/";
                        // link = "https://localhost:44340/";
                        dt = cnn.CreateDataTable(@"SELECT ID_USER,UserName,AVATAR
FROM TBL_USER
EXCEPT
select  u.ID_USER,u.UserName,AVATAR from TBL_GROUPMEMBER as gm ,TBL_USER as u  where GM.ID_USER=U.ID_USER and ID_GROUP="+ id_gr+"", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);

                        dr = dt.Select();
                        foreach (DataRow r in dr)
                        {
                            if (File.Exists(HttpContext.Current.Server.MapPath($"~/image/User/{r["AVATAR"]}.jpg")))
                            {
                                r["AVATAR"] = link + $"image/User/{r["AVATAR"]}.jpg";
                            }
                        }
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dr.AsEnumerable()
                               select new
                               {

                                   ID_user = r["ID_USER"],
                                 
                                   Username = r["UserName"],
                                  
                                   // Roles = r["roles"],
                                   Avatar = r["AVATAR"],

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


        [Route("Update_quyen_Memmber")]
        [HttpPost]
        public object Update_quyen_Memmber(int id_user, Models.User_Group data)
        {
            int status = 0;
            string Id = "";
            int id_group = 0;
            string Token = "";
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "", link = "";
            Hashtable val = new Hashtable();
            Hashtable val_member = new Hashtable();
            DataTable dt_token = new DataTable();
            DataTable lastid = new DataTable();
            string sqlq = "";



            try
            {





                val.Add("QUYEN_ADMIN", data.quyen_group);

                Conds.Add("ID_GROUP", data.Id_Group);
                Conds.Add("ID_USER", id_user);
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {



                    if (cnn.Update(val, Conds, "TBL_GROUPMEMBER") < 0)

                    {
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }


                }
                return JsonResultCommon.ThanhCong("Cập nhật thành công !");

            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }



        }

        [Route("GetDSUser_In_Group")]
        [HttpGet]
        public object GetDSUser_In_Group(int id_group)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt_group = new DataTable();
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

                       
                      
                        dt_group = cnn.CreateDataTable(@"

select ID_GROUP, U.ID_USER, QUYEN_ADMIN
, CREATE_DATE, IDNV, UserName, AVATAR from TBL_GROUPMEMBER AS G, TBL_USER AS U WHERE G.ID_USER = U.ID_USER  and QUYEN_ADMIN=0 and ID_GROUP="+ id_group
, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);

                       
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt_group.AsEnumerable()
                              
                               select new
                               {

                                   Id_group = r["ID_GROUP"],
                                   id_user = r["ID_USER"],
                                   id_nv = r["IDNV"],
                                   Username = r["UserName"],
                                   quyen_group = r["QUYEN_ADMIN"],
                                   create_date = r["CREATE_DATE"],

                                   // Roles = r["roles"],
                                


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
        // GET api/<controller>
        [Route("addUserGroup")]
        [HttpPost]

        public object addUserGroup(int id_group, int id_user, Models.User_Group data)
        {

            string sqlq = "";

            SqlConditions Conds = new SqlConditions();
            sqlq = "select * from TBL_GROUPMEMBER  where ID_USER=" + id_user + " and ID_GROUP=" + id_group;

            bool value = true;
            DataRow[] dr;
            int re = 0;
            int id_gr = 0;
            Hashtable val_member = new Hashtable();
            string Id = "";
            DataTable lastid = new DataTable();
            Hashtable val = new Hashtable();

            try
            {
                //string Token = Request.Headers.GetValues("Token").FirstOrDefault();
                //LoginData loginData = API_KD.Assets.Common.GetUserByToken(Token);
                //if (loginData == null)
                //    return JsonResultCommon.DangNhap();
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    Thread.Sleep(500);
                    DataTable dt = cnn.CreateDataTable(sqlq);
                    if (cnn.LastError != null || dt == null)
                        return JsonResultCommon.Exception(cnn.LastError);

                    if (dt.Rows.Count == 0 && id_group != 0)
                    {

                        val.Add("ID_GROUP", data.Id_Group);


                        val.Add("CREATE_DATE", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                        val.Add("ID_USER", id_user);

                        val.Add("QUYEN_ADMIN", data.quyen_group);

                        re = cnn.Insert(val, "TBL_GROUPMEMBER");
                    }
                    else if (data.Id_Group == 0 || id_group == 0)
                    {

                        lastid = cnn.CreateDataTable(@"
            SELECT TOP 1 ID_GROUP asLastID FROM TBL_GROUP ORDER BY ID_GROUP DESC");
                        dr = lastid.Select();

                        foreach (DataRow r in dr[0].Table.Rows)
                        {

                            Id = r["asLastID"].ToString();


                        }
                        id_gr = Int32.Parse(Id);

                        val_member.Add("ID_GROUP", id_gr);


                        val_member.Add("CREATE_DATE", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                        val_member.Add("ID_USER", id_user);
                        val_member.Add("QUYEN_ADMIN", 1);


                        if (cnn.Insert(val_member, "TBL_GROUPMEMBER") < 0)

                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }

                    }
                    else
                    {

                        return JsonResultCommon.ThatBai("Thành viên đã tồn tại !", cnn.LastError);


                    }


                    return JsonResultCommon.ThanhCong();
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        // GET api/<controller>/5
        [Route("Delete_User")]
        [HttpDelete]
        public object Delete_User(int id_group,int id_user)
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
          
            try
            {


                Conds.Add("ID_GROUP", id_group);
                Conds.Add("ID_USER", id_user);
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {




                    if (cnn.Delete(Conds, "TBL_GROUPMEMBER") < 0)

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


        [Route("DataSource_Group")]
        [HttpGet]
        public object DataSource_Group(int id_group, [FromUri] QueryParams query)
        {
            try
            {
                DataRow[] dr;
                string link = Data_API_MXH.Assets.Common.getDomain();
                PageModel pageModel = new PageModel();
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    string sqlq = @"   
select ID_GROUP, U.ID_USER, QUYEN_ADMIN
, CREATE_DATE, IDNV, UserName, AVATAR from TBL_GROUPMEMBER AS G, TBL_USER AS U WHERE G.ID_USER = U.ID_USER and ID_GROUP="+id_group;
                    var dt = cnn.CreateDataTable(sqlq);
                    if (cnn.LastError != null || dt == null)
                        return JsonResultCommon.SQL(cnn.LastError.Message);
                    var temp = dt.AsEnumerable();
                    #region Sort/filter
                    Dictionary<string, string> sortableFields = new Dictionary<string, string>{
                        { "UserName","UserName" },

                    };
                    if (!string.IsNullOrEmpty(query.sortField) && sortableFields.ContainsKey(query.sortField))
                    {
                        if ("asc".Equals(query.sortOrder))
                            temp = temp.OrderBy(x => x[sortableFields[query.sortField]]);
                        else
                            temp = temp.OrderByDescending(x => x[sortableFields[query.sortField]]);
                    }
                    var xaaaa = query.filter;
                    if (!string.IsNullOrEmpty(query.filter["UserName"]))
                    {
                        string keyword = query.filter["UserName"].ToLower();
                        temp = temp.Where(x => x["UserName"].ToString().ToLower().Contains(keyword));
                    }

                    #endregion
                    int i = temp.Count();
                    if (i == 0)
                        return JsonResultCommon.ThanhCong(new List<string>(), pageModel);
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
    //                           where
    //r["ID_GROUP"].Equals(id_group)
                               select new
                               {

                                   Id_group = r["ID_GROUP"],
                                   id_user = r["ID_USER"],
                                   id_nv = r["IDNV"],
                                   Username = r["UserName"],
                                   quyen_group = r["QUYEN_ADMIN"],
                                   create_date = r["CREATE_DATE"],
                                   hinhanh = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{ r["AVATAR"]}",
                                   // Roles = r["roles"],
                                


                               };

                    return JsonResultCommon.ThanhCong(data, pageModel);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }

        [Route("GetDSAllUser_In_Group")]
        [HttpGet]
        public object GetDSAllUser_In_Group(int id_group, int id_user)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt_group = new DataTable();
                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                     
                        dt_group = cnn.CreateDataTable($@"

select ID_GROUP, U.ID_USER, QUYEN_ADMIN
, CREATE_DATE, IDNV, UserName, AVATAR from TBL_GROUPMEMBER AS G, TBL_USER AS U WHERE G.ID_USER = U.ID_USER and ID_GROUP ="+id_group+" and U.ID_USER not in ("+id_user+") ORDER BY QUYEN_ADMIN DESC"
, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);

                        dr = dt_group.Select();
                       
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt_group.AsEnumerable()
                               where r["ID_GROUP"].Equals(id_group)
                               select new
                               {

                                   Id_group = r["ID_GROUP"],
                                   id_user = r["ID_USER"],
                                   id_nv = r["IDNV"],
                                   Username = r["UserName"],
                                   quyen_group = r["QUYEN_ADMIN"],
                                   create_date = r["CREATE_DATE"],

                                   // Roles = r["roles"],
                                   hinhanh = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{  r["AVATAR"]}",


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