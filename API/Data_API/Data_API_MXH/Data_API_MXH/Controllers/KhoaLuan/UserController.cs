

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

namespace Data_API_MXH.Controllers.User_Admin
{
    [RoutePrefix("api/KhoaLuan")]
    //[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    /*RoutePrefix tự nó sẽ không tạo ra một tuyến đường. Đây dường như là kiến ​​thức phổ biến, 
    Tôi muốn biết một nguồn nêu rõ lý do tại sao. */


    public class UserController : ApiController

    {
        [Route("USer_Quanly_Datasource")]
        [HttpGet]


        public object USer_Quanly_Datasource([FromUri] QueryParams query)
        {
            try
            {

                query = query == null ? new QueryParams() : query;
                PageModel pageModel = new PageModel();
                DataRow[] dr;
                string link = Data_API_MXH.Assets.Common.getDomain();
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    string sqlq = @"  select ID_USER,Email,UserName,AVATAR,HOTEN,NGAYSINH,TENPHONG from TBL_USER as u,TBL_NHANVIEN as nv,TBL_PHONGBAN as pb where u.IDNV=nv.IDNV and pb.ID_PHONG=nv.ID_PHONG

";
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
                               select new
                               {

                                   Id_user = r["ID_USER"],
                                   email = r["Email"],
                                  
                                   username = r["UserName"],
                                   hoten = r["HOTEN"],
                                   ngaysinh = r["NGAYSINH"],
                                   tenphong = r["TENPHONG"],
                                   hinhanh = r["AVATAR"],
                                   avatar = $"{link}/Avatar/{ r["AVATAR"]}",
                                 

                               };



                    return JsonResultCommon.ThanhCong(data, pageModel, User.IsInRole("68"));
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("getDSUser_Data")]
        [HttpGet]


        public object getDSUser_Data([FromUri] QueryParams query)
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
select ID_USER,u.IDNV,UserName,AVATAR,CHUCVU,HOTEN from TBL_USER as u ,TBL_NHANVIEN as nv where u.IDNV=nv.IDNV and ID_USER!=13

";
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
                    if (!string.IsNullOrEmpty(query.filter["UserName"]))
                    {
                        string keyword = query.filter["UserName"].ToLower();
                        temp = temp.Where(x => x["UserName"].ToString().ToLower().Contains(keyword));
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

                                   id_user = r["ID_USER"],
                                   id_nv = r["IDNV"],
                                  
                                   username = r["UserName"],

                                   hinhanh = r["AVATAR"],
                                   avatar = $"{link}/Avatar/{ r["AVATAR"]}",
                                   hoten = r["HOTEN"],
                                   chucvu = r["CHUCVU"],

                                   //AllowEdit = r["CreatedBy"],

                               };



                    return JsonResultCommon.ThanhCong(data, pageModel, User.IsInRole("68"));
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }
        //postDSUser
        [Route("postDSUser")]
        [HttpPost]
        public object PostDSUser(string Email, string Pass)
        {

            {
                int status = 0;
                string Id = "";
                //string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();
                // string x = Request.Headers.GetValues("email").FirstOrDefault();
                //string Token = Request.Headers.GetValues("Token").FirstOrDefault();
                DataTable dt_token = new DataTable();
                try
                {
                    Conds.Add("email", Email);
                    Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"
select ID_USER, u.IDNV,TINHTRANG, UserName, AVATAR, Pass, Email, nv.CHUCVU from TBL_USER as u, TBL_NHANVIEN as nv where u.IDNV = nv.IDNV and Email=@email and Pass=@password", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }
                    var total = dt.Rows.Count;

                    if (total != 1)
                    {
                        status = 0;
                        return Json(new
                        {
                            status = status,
                        });
                    }
                    else
                    {
                        status = 1;
                        string token = Guid.NewGuid().ToString();
                        Id = dt.Rows[0]["ID_USER"].ToString();
                        if (AddLoginSection(Id, token))
                        {
                            return Json(new
                            {
                                status = status,
                                // Token = token
                                data = from r in dt.AsEnumerable()
                                       select new
                                       {
                                           ID_user = r["ID_USER"],
                                           Username = r["UserName"],
                                           Password = r["Pass"],
                                           Email = r["Email"],
                                           Token = token,
                                           chucvu = r["CHUCVU"],
                                           hinhanh = r["AVATAR"],
                                           Avatar = $"{link}/Avatar/{  r["AVATAR"]}",
                                           TinhTrang = r["TINHTRANG"],

                                           //Occupation = r["occupation"],



                                       }
                            }); ;
                        }
                        else
                        {

                        }
                        {
                            status = 0;
                            return Json(new
                            {
                                status = status,
                            });
                        }


                    }

                }
                catch (Exception ex)
                {

                    return JsonResultCommon.Exception(ex);
                }
            }





        }

        internal static object UpdateUserName_Offline(int id_user)
        {
            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                string link = Data_API_MXH.Assets.Common.getDomain();
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);

                    val.Add("TINHTRANG", false);
                    Conds.Add("ID_USER", id_user);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_USER") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }

                        dt = cnn.CreateDataTable("select * from TBL_USER", Conds);
                    }
                    var dl = from r in dt.AsEnumerable()
                             select new
                             {
                                 ID_user = r["ID_USER"],
                                 ID_NV = r["IDNV"],
                                 Username = r["UserName"],
                                 Password = r["Pass"],
                                 Email = r["Email"],
                                 Token = r["Token"],
                                 TinhTrang = r["TINHTRANG"],
                                 // Roles = r["roles"],
                                 hinhanh = r["AVATAR"],
                                 Avatar = $"{link}/Avatar/{  r["AVATAR"]}",

                             };
                    //mangxahoi.PushToAllUsers_CheckOnline(dl, null);

                    return JsonResultCommon.ThanhCong(dl);
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }



        internal static object UpdateUserName_Online(int id_user)
        {
            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                string link = Data_API_MXH.Assets.Common.getDomain();
                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);

                    val.Add("TINHTRANG", true);
                    Conds.Add("ID_USER", id_user);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_USER") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }

                        dt = cnn.CreateDataTable("select * from TBL_USER", Conds);
                    }
                    var dl = from r in dt.AsEnumerable()
                             select new
                             {
                                 ID_user = r["ID_USER"],
                                 ID_NV = r["IDNV"],
                                 Username = r["UserName"],
                                 Password = r["Pass"],
                                 Email = r["Email"],
                                 Token = r["Token"],
                                 TinhTrang = r["TINHTRANG"],
                                 // Roles = r["roles"],
                                 hinhanh = r["AVATAR"],
                                 Avatar = $"{link}/Avatar/{  r["AVATAR"]}",

                             };
                    mangxahoi.PushToAllUsers_CheckOnline(dl, null);

                    return JsonResultCommon.ThanhCong(dl);
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }

        /// <summary>
        /// Thêm tonken đăng nhập
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="userID">id người dùng</param>
        /// <param name="token">token đăng nhập</param>
        /// <param name="thoihan">thời hạn hiệu lực của phiên đăng nhập (mặc định 7 ngày)</param>
        /// <returns></returns>
        public bool AddLoginSection(string userID, string token, int thoihan = 7)
        {

            SqlConditions Conds = new SqlConditions();

            if (string.IsNullOrEmpty(token))
                return false;
            try
            {

                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {
                    string ngayhethan = DateTime.Now.AddDays(thoihan).ToString("yyyy-MM-dd HH:mm:ss");
                    Hashtable val = new Hashtable();
                    //val.Add("Id", userID);

                    val.Add("Token", token); // cập nhật  cột accessToken trong bản UserDangNhap dựa vào khóa chính  là id
                    Conds.Add("ID_USER", userID);//  lấy khóa chính là id trong bản UserDangNhap (trả về count )
                                                 //val.Add("Locked", 0);
                                                 //val.Add("ExpiryDate", ngayhethan);
                    var result = cnn.Update(val, Conds, "TBL_USER");
                    if (result == 1)
                    {
                        return true;
                    }
                    else return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        [Route("GetDSUser")]
        [HttpGet]
        public object GetDSUser()
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
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable("select * from TBL_USER", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   ID_user = r["ID_USER"],
                                   ID_NV = r["IDNV"],
                                   Username = r["UserName"],
                                   Password = r["Pass"],
                                   Email = r["Email"],
                                   Token = r["Token"],
                                   TinhTrang = r["TINHTRANG"],
                                   // Roles = r["roles"],

                                   hinhanh = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{  r["AVATAR"]}",

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



        [Route("GetDSUser_profile_change")]
        [HttpGet]
        public object GetDSUser_profile_change(int id_user)
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
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"select ID_USER, u.IDNV,TINHTRANG, UserName, AVATAR, Pass, Email, nv.CHUCVU from TBL_USER as u, TBL_NHANVIEN as nv where u.IDNV = nv.IDNV and u.ID_USER=" + id_user, Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   ID_user = r["ID_USER"],
                                   Username = r["UserName"],
                                   Password = r["Pass"],

                                   Email = r["Email"],
                                   chucvu = r["CHUCVU"],
                                   hinhanh = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{  r["AVATAR"]}",
                                   TinhTrang = r["TINHTRANG"],
                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }





        [Route("GetrandomDSUser")]
        [HttpGet]
        public object GetrandomDSUser()
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
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {


                        dt = cnn.CreateDataTable(@"SELECT TOP 4 ID_USER,UserName,AVATAR FROM TBL_USER where TINHTRANG=1
ORDER BY NEWID()", Conds);
                        //dt_token = cnn.CreateDataTable("select * from LoginSection where Token = @token and Id = @Id_nv", Conds);


                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   ID_user = r["ID_USER"],
                                   hinhanh = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{  r["AVATAR"]}",

                                   Username = r["UserName"],





                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }



        [Route("GetUserProfile")]
        [HttpGet]
        public object GetUserProfile(int id_user)
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
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@"  select ID_USER,nv.IDNV,UserName,AVATAR,DIACHI,NGAYSINH,SDT,GIOITINH from TBL_USER  as u ,TBL_NHANVIEN as nv  where  u.IDNV=nv.IDNV and ID_USER=" + id_user, Conds);
                       
                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                   ID_user = r["ID_USER"],
                                   ID_NV = r["IDNV"],
                                   Username = r["UserName"],
                                   hinhanh = r["AVATAR"],
                                   Avatar = $"{link}/Avatar/{  r["AVATAR"]}",
                                   diachi = r["DIACHI"],
                                   ngaysinh = r["NGAYSINH"],
                                   sdt = r["SDT"],
                                   gioitinh = r["GIOITINH"],

                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }


        [Route("GetNVNotUser")]
        [HttpGet]
        public object GetNVNotUser()
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
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(@" SELECT IDNV,HOTEN
FROM TBL_NHANVIEN

EXCEPT
SELECT  u.IDNV,HOTEN
FROM TBL_USER as u,TBL_NHANVIEN as nv where u.IDNV=nv.IDNV
", Conds);

                    }

                    return Json(new
                    {
                        status = 1,
                        Data = from r in dt.AsEnumerable()
                               select new
                               {

                                 
                                   id_nv = r["IDNV"],
                                   hoten =r["HOTEN"],



                               },
                    });
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }

        public bool ktma(string ma)
        {
            DataTable dt_user = new DataTable();
            DataRow[] dr;
            SqlConditions Conds = new SqlConditions();
            using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
            {

                dt_user = cnn.CreateDataTable(@"
select Email from TBL_USER

", Conds);
                dr = dt_user.Select();
                for(int i=0;i<dt_user.Rows.Count;i++)
                {
                    if(dt_user.Rows[i]["Email"].ToString()==ma)
                    {
                        return true;
                    }

                  
                }

                return false;
                //var nv = qlks.TAIKHOANs.Where(t => t.TENTK == ma).FirstOrDefault();
                //if (nv == null)
                //{
                //    return false;
                //}
                //return true;
            }
        }
        [Route("GetCreateUser")]
        [HttpPost]
        public object GetCreateUser(Models.User data)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_user = new DataTable();
                DataRow[] dr;
                Hashtable val_user = new Hashtable();
                Hashtable val = new Hashtable();
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "", link = "";
                string name;
                bool check;

                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);

                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt_user = cnn.CreateDataTable(@"
select Email from TBL_USER

", Conds);
                         dr = dt_user.Select();
                       


                        if (ktma(data.email.ToString())==false)
                            {

                                val.Add("IDNV", data.IDNV);

                                val.Add("Email", data.email);
                                val.Add("UserName", data.username);
                                val.Add("Pass", data.pass);
                                val.Add("TINHTRANG", data.TinhTrang);
                            }
                            else
                            {
                            val.Add("IDNV", data.IDNV);

                            val.Add("Email", data.email+"hufi");
                            val.Add("UserName", data.username);
                            val.Add("Pass", data.pass);
                            val.Add("TINHTRANG", data.TinhTrang);

                            return JsonResultCommon.Trung("Tài khoản" + data.email );
                            //val.Add("IDNV", data.IDNV);

                            //val.Add("Email", data.email);
                            //val.Add("UserName", data.username);
                            //val.Add("Pass", data.pass);
                            //val.Add("TINHTRANG", data.TinhTrang);
                        }
                        

                            if (cnn.Insert(val, "TBL_USER") < 0)
                            {
                                return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                            }

                        
                        return JsonResultCommon.ThanhCong();
                    }
                }

                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }
        [Route("DeleteUser")]
        [HttpDelete]
        public object DeleteUser(int id_user)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val_user = new Hashtable();
                Hashtable val = new Hashtable();
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
                        
                        Conds.Add("ID_USER", id_user);

                        if (cnn.Delete( Conds, "TBL_USER") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }

                        return JsonResultCommon.ThanhCong();
                    }
                }

                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }

        [Route("UpdateUserProfile_NV")]
        [HttpPost]
        public object UpdateUserProfile_NV(int id_user, int id_nv, Models.nhanvien datanv)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val_user = new Hashtable();
                Hashtable val = new Hashtable();
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
                        val.Add("DIACHI", datanv.diachi);
                        DateTime myDate = DateTime.Parse(datanv.ngaysinh);
                        val.Add("NGAYSINH", myDate);
                        val.Add("SDT", datanv.sdt);
                        val.Add("GIOITINH", datanv.gioitinh);
                        Conds.Add("IDNV", id_nv);

                        if (cnn.Update(val, Conds, "TBL_NHANVIEN") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }

                        return JsonResultCommon.ThanhCong();
                    }
                }

                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }
        }


        [Route("UpdateUserProfile_User")]
        [HttpPost]
        public object UpdateUserProfile_User(int id_user, int id_nv, Models.AcountUser data)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val_user = new Hashtable();
                Hashtable val = new Hashtable();
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


                        val.Add("UserName", data.username);


                        Conds.Add("ID_USER", id_user);

                        if (cnn.Update(val, Conds, "TBL_USER") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }


                        return JsonResultCommon.ThanhCong();

                    }
                }


                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }

            }
        }

        [Route("UpdatePass")]
        [HttpPost]
        public object UpdatePass(int id_user, string pass)
        {

            {
                int status = 0;
                string Id = "";
                string Token = "";
                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataRow[] dr;
                Hashtable val_user = new Hashtable();
                Hashtable val = new Hashtable();
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


                        val.Add("Pass", pass);


                        Conds.Add("ID_USER", id_user);

                        if (cnn.Update(val, Conds, "TBL_USER") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }


                        return JsonResultCommon.ThanhCong();

                    }
                }


                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }


            }


            }






            [Route("UpdateUserName")]
            [HttpPost]
            public object UpdateUserName(Models.UpdateUser data)
            {

                {

                    SqlConditions Conds = new SqlConditions();
                    DataTable dt = new DataTable();

                    Hashtable val = new Hashtable();
                    DataTable dt_token = new DataTable();
                    try
                    {
                        //Conds.Add("email", Email);
                        //Conds.Add("password", Pass);

                        val.Add("TINHTRANG", data.TinhTrang);
                        Conds.Add("ID_USER", data.ID_User);
                        using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                        {
                            if (cnn.Update(val, Conds, "TBL_USER") < 0)
                            {
                                return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                            }

                            dt = cnn.CreateDataTable("select * from TBL_USER", Conds);
                        }
                        var dl = from r in dt.AsEnumerable()
                                 select new
                                 {
                                     ID_user = r["ID_USER"],
                                     ID_NV = r["IDNV"],
                                     Username = r["UserName"],
                                     Password = r["Pass"],
                                     Email = r["Email"],
                                     Token = r["Token"],
                                     TinhTrang = r["TINHTRANG"],
                                     // Roles = r["roles"],
                                     Avatar = r["AVATAR"],

                                 };
                        mangxahoi.PushToAllUsers_CheckOnline(dl, null);

                        return JsonResultCommon.ThanhCong(dl);
                    }
                    catch (Exception ex)
                    {
                        return JsonResultCommon.Exception(ex);
                    }
                }


            }
        }
    }









