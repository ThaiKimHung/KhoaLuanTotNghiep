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
using MangXaHoi.SignalR;
using System.Web.Http.Cors;
using System.Threading;
using System.Text;
using System.Web.Script.Serialization;

namespace Data_API_MXH.Controllers.KhoaLuan
{


    [RoutePrefix("api/KhoaLuan")]
    //[EnableCors(origins: "*", headers: "*", methods: "*" ,SupportsCredentials = true)]
    public class ThongBaoController : ApiController
    {
        [Route("Count_ThongBao")]
        [HttpGet]
        public object Count_ThongBao(int iduser)
        {

            {
                int status = 0;
                string Id = "";

                string Token = "";

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_tb_cmt = new DataTable();

                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();
                string sql;
                string count;
                sql = @"

  
         select COUNT(ID_THONGBAO) 
        from TBL_THONGBAO
        where TINHTRANG='false' and ID_USER != " + iduser;
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        count = cnn.ExecuteScalar(sql).ToString();

                    }

                    return Json(new
                    {
                        status = 1,
                        Data = new
                        {
                            soluong = count

                        },
                    });

                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }
        // code hùng app
        [Route("BanThongBao")]
        [HttpPost]
        public void BanThongBao()
        {

            int status = 0;
            string Id = "";

            string Token = "";

            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            DataTable dt_tb_cmt = new DataTable();

            DataRow[] dr;
            bool Visible = true;
            List<object> rs = new List<object>();
            string title = "";
            string link = Data_API_MXH.Assets.Common.getDomain();
            string sql;
            sql = @"

select ID_THONGBAO,TIEUDE,ID_BAIDANG,ID_COMMENT,tb.ID_USER,TimeTB,u.AVATAR,u.UserName,tb.TinhTrang
from TBL_THONGBAO as tb, TBL_USER as u
where tb.ID_USER=u.ID_USER and ID_THONGBAO = (select max(ID_THONGBAO) from TBL_THONGBAO)
ORDER BY ID_THONGBAO DESC

";
            DataTable dt_token = new DataTable();
            try
            {
                //Conds.Add("email", Email);
                //Conds.Add("password", Pass);
                using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                {

                    dt = cnn.CreateDataTable(sql, Conds);

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

                string message = "";
                string id_baidang = "";
                foreach (var it in dt.AsEnumerable())
                {

                    id_baidang = it["ID_BAIDANG"].ToString();
                    message += it["UserName"].ToString() + " ";
                    message += it["TIEUDE"].ToString();

                    //message += it["TimeTb"].ToString();
                }




                var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;

                request.KeepAlive = true;
                request.Method = "POST";
                request.ContentType = "application/json; charset=utf-8";

                request.Headers.Add("authorization", "Basic YjI0ZmM4NWUtMDYxNi00ZjhmLWIxYTgtMzBjOGNhZGI3ODAw");

                var serializer = new JavaScriptSerializer();
                var obj = new
                {
                    app_id = "2db1f7fd-d78c-4cf2-986b-c1b505665cf8",
                    contents = new { en = message },
                    included_segments = new string[] { "All" }
                };
                var param = serializer.Serialize(obj);
                byte[] byteArray = Encoding.UTF8.GetBytes(param);

                string responseContent = null;

                try
                {
                    using (var writer = request.GetRequestStream())
                    {
                        writer.Write(byteArray, 0, byteArray.Length);
                    }

                    using (var response = request.GetResponse() as HttpWebResponse)
                    {
                        using (var reader = new StreamReader(response.GetResponseStream()))
                        {
                            responseContent = reader.ReadToEnd();
                        }
                    }
                }
                catch (WebException ex)
                {
                    System.Diagnostics.Debug.WriteLine(ex.Message);
                    System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
                }

                System.Diagnostics.Debug.WriteLine(responseContent);

            }
            catch { }
        }
        // code hùng
        [Route("UpdateTinhTrangTrueThongBao")]
        [HttpPost]
        public object UpdateTinhTrangTrueThongBao(int id_thongbao)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {





                    val.Add("TinhTrang", true);
                    Conds.Add("ID_THONGBAO", id_thongbao);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Update(val, Conds, "TBL_THONGBAO") < 0)
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

        [Route("deleteThongBao")]
        [HttpDelete]
        public object deleteThongBao(int id_thongbao)
        {

            {

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();

                Hashtable val = new Hashtable();
                DataTable dt_token = new DataTable();
                try
                {





                    Conds.Add("ID_THONGBAO", id_thongbao);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {
                        if (cnn.Delete(Conds, "TBL_THONGBAO") < 0)
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

        // GET api/<controller>
        [Route("GetDSThongBao")]
        [HttpGet]
        public object GetDSThongBao(int id_user)
        {

            {
                int status = 0;
                string Id = "";

                string Token = "";

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                DataTable dt_tb_cmt = new DataTable();

                DataRow[] dr;
                bool Visible = true;
                List<object> rs = new List<object>();
                string title = "";
                string link = Data_API_MXH.Assets.Common.getDomain();
                string sql;
                sql = @"
  
 select distinct ID_THONGBAO,TIEUDE,ID_BAIDANG,ID_COMMENT,tb.ID_USER,TimeTB,u.AVATAR,u.UserName,tb.TinhTrang from TBL_THONGBAO as tb, TBL_USER as u where tb.ID_USER=u.ID_USER and tb.ID_USER!=" + id_user + " ORDER BY ID_THONGBAO DESC  ";
                DataTable dt_token = new DataTable();
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {

                        dt = cnn.CreateDataTable(sql, Conds);

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
                        Data = from r in dt.AsEnumerable()
                               select new
                               {
                                   id_tb = r["ID_THONGBAO"],

                                   title = r["TIEUDE"],
                                   id_baidang = r["ID_BAIDANG"],
                                   id_cmt = r["ID_COMMENT"],
                                   tb_by_user = r["ID_USER"],
                                   user_name = r["UserName"],
                                   timetb = r["TimeTb"],
                                   hinhanh = r["AVATAR"],
                                   avatar = $"{link}/Avatar/{  r["AVATAR"]}",
                                   tinhtrang = r["TinhTrang"],



                               },



                    });

                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }

        }
        [Route("addThongBao_like")]
        [HttpPost]
        public object addThongBao(int id_user, int id_cmt, int id_baidang, Models.thongbao data)
        {

            {
                string link = Data_API_MXH.Assets.Common.getDomain();

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                string Id = "";
                string Idtb = "";
                string tenbaidang = "";
                Hashtable val = new Hashtable();
                Hashtable val_up = new Hashtable();
                DataTable dt_token = new DataTable();
                DataTable lastid = new DataTable();
                DataTable lastidTB = new DataTable();
                DataTable dt_tb = new DataTable();
                DataTable tbl_baidang = new DataTable();
                DataRow[] dr;
                DataRow[] dr_tb;
                DataRow[] dr_bd;
                string Id_tb = "";
                DataRow[] tb;
                int idtb = 0;


                int id_thongbao = 0;
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);






                    //Conds.Add("ID_THONGBAO", data.id_thongbao);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {



                        Thread.Sleep(500);


                        if (id_cmt == 0)
                        {


                            val.Add("TIEUDE", data.title);
                            val.Add("ID_BAIDANG", id_baidang);
                            //val.Add("ID_COMMENT", data.id_cmt);
                            val.Add("ID_USER", data.create_tb_by);
                            val.Add("TinhTrang", false);
                            val.Add("TimeTB", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));

                        }
                        else
                        {





                            val.Add("TIEUDE", data.title);
                            //val.Add("ID_BAIDANG", data.id_bd);
                            val.Add("ID_COMMENT", id_cmt);
                            val.Add("ID_USER", data.create_tb_by);
                            val.Add("TinhTrang", false);

                            val.Add("TimeTB", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                        }

                        if (cnn.Insert(val, "TBL_THONGBAO") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                        // lấy id thông báo
                        Thread.Sleep(500);


                        dt_tb = cnn.CreateDataTable(@"SELECT Max(ID_THONGBAO) as asLastID FROM TBL_THONGBAO
            ");
                        dt = cnn.CreateDataTable(@"  select distinct ID_THONGBAO,TIEUDE,ID_BAIDANG,ID_COMMENT,tb.ID_USER,TimeTB,u.AVATAR,u.UserName,tb.TinhTrang from TBL_THONGBAO as tb, TBL_USER as u where tb.ID_USER=u.ID_USER  and tb.ID_USER!=" + id_user + " ORDER BY ID_THONGBAO DESC", Conds);
                        Thread.Sleep(500);
                        dr_tb = lastidTB.Select();
                        tb = dt_tb.Select();

                        Id_tb = dt_tb.Rows[0]["asLastID"].ToString();

                        id_thongbao = Int32.Parse(Id_tb);




                        //if (cnn.Update(val_up, Conds, "TBL_THONGBAO") < 0)
                        //{
                        //    return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        //}














                        Thread.Sleep(500);
                        dr = dt.Select();



                        var dl = from r in dt.AsEnumerable()
                                 where r["ID_THONGBAO"].Equals(Idtb)
                                 select new
                                 {
                                     id_tb = r["ID_THONGBAO"],

                                     title = r["TIEUDE"],
                                     id_baidang = r["ID_BAIDANG"],
                                     id_cmt = r["ID_COMMENT"],
                                     tb_by_user = r["ID_USER"],
                                     user_name = r["UserName"],
                                     timetb = r["TimeTb"],

                                     hinhanh = r["AVATAR"],
                                     avatar = $"{link}/Avatar/{  r["AVATAR"]}",
                                     tinhtrang = r["TinhTrang"],

                                 };
                        mangxahoi.PushToAllUsers(dl, null);
                        //return dl;


                        return JsonResultCommon.ThanhCong(dl);
                    }
                }

                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }


        [Route("addThongBao")]
        [HttpPost]
        public object addThongBao(int id_user, Models.thongbao data)
        {

            {
                string link = Data_API_MXH.Assets.Common.getDomain();

                SqlConditions Conds = new SqlConditions();
                DataTable dt = new DataTable();
                string Id = "";
                string Idtb = "";
                string tenbaidang = "";
                Hashtable val = new Hashtable();
                Hashtable val_up = new Hashtable();
                DataTable dt_token = new DataTable();
                DataTable lastid = new DataTable();
                DataTable lastidTB = new DataTable();
                DataTable dt_tb = new DataTable();
                DataTable tbl_baidang = new DataTable();
                DataRow[] dr;
                DataRow[] dr_tb;
                DataRow[] dr_bd;
                string Id_tb = "";
                DataRow[] tb;
                int idtb = 0;
                int baidang = 0;
                int id_cmt = 0;
                int id_thongbao = 0;
                try
                {
                    //Conds.Add("email", Email);
                    //Conds.Add("password", Pass);






                    //Conds.Add("ID_THONGBAO", data.id_thongbao);
                    using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                    {



                        Thread.Sleep(500);


                        if (data.id_cmt == 0)
                        {
                            lastid = cnn.CreateDataTable(@"
                             SELECT Max(ID_BAIDANG) as asLastID FROM TBL_BAIDANG");
                            dr = lastid.Select();

                            Id = lastid.Rows[0]["asLastID"].ToString();

                            //foreach (DataRow r in dr[0].Table.Rows)
                            //{

                            //    Id = r["asLastID"].ToString();


                            //}
                            baidang = Int32.Parse(Id);

                            val.Add("TIEUDE", data.title);
                            val.Add("ID_BAIDANG", baidang);
                            //val.Add("ID_COMMENT", data.id_cmt);
                            val.Add("ID_USER", data.create_tb_by);
                            val.Add("TinhTrang", false);
                            val.Add("TimeTB", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));

                        }
                        else
                        {
                            lastid = cnn.CreateDataTable(@"
                SELECT Max(ID_COMMENT) as asLastID FROM TBL_COMMENT");
                            dr = lastid.Select();

                            Id = lastid.Rows[0]["asLastID"].ToString();

                            id_cmt = Int32.Parse(Id);




                            val.Add("TIEUDE", data.title);
                            //val.Add("ID_BAIDANG", data.id_bd);
                            val.Add("ID_COMMENT", id_cmt);
                            val.Add("ID_USER", data.create_tb_by);
                            val.Add("TinhTrang", false);

                            val.Add("TimeTB", DateTime.Now.ToString("MM/dd/yyyy HH:mm"));
                        }

                        if (cnn.Insert(val, "TBL_THONGBAO") < 0)
                        {
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                        // lấy id thông báo
                        Thread.Sleep(500);
                        if (id_cmt != 0)
                        {


                            dt_tb = cnn.CreateDataTable(@"
             select  tb.ID_THONGBAO from TBL_BAIDANG as bd ,TBL_THONGBAO as tb ,TBL_COMMENT as cmt where tb.ID_COMMENT=cmt.ID_COMMENT and cmt.ID_BAIDANG=bd.ID_BAIDANG and tb.ID_COMMENT=" + id_cmt);
                            Thread.Sleep(500);
                            tb = dt_tb.Select();

                            Id_tb = dt_tb.Rows[0]["ID_THONGBAO"].ToString();

                            id_thongbao = Int32.Parse(Id_tb);

                        }
                        else
                        {

                            dt_tb = cnn.CreateDataTable(@"SELECT Max(ID_THONGBAO) as asLastID FROM TBL_THONGBAO
            ");
                            Thread.Sleep(500);
                            tb = dt_tb.Select();

                            Id_tb = dt_tb.Rows[0]["asLastID"].ToString();

                            id_thongbao = Int32.Parse(Id_tb);
                        }


                        if (id_cmt != 0)
                        {



                            // lấy  tiêu đề bài  đăng
                            tbl_baidang = cnn.CreateDataTable(@"
             select  bd.TIEUDE from TBL_BAIDANG as bd ,TBL_THONGBAO as tb ,TBL_COMMENT as cmt where tb.ID_COMMENT=cmt.ID_COMMENT and cmt.ID_BAIDANG=bd.ID_BAIDANG and tb.ID_COMMENT=" + id_cmt);
                            Thread.Sleep(500);
                            dr_bd = tbl_baidang.Select();

                            tenbaidang = tbl_baidang.Rows[0]["TIEUDE"].ToString();


                            val_up.Add("TIEUDE", data.title + " " + tenbaidang);
                            Conds.Add("ID_THONGBAO", id_thongbao);


                            if (cnn.Update(val_up, Conds, "TBL_THONGBAO") < 0)
                            {
                                return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                            }
                        }




                        dt = cnn.CreateDataTable(@"  select distinct ID_THONGBAO,TIEUDE,ID_BAIDANG,ID_COMMENT,tb.ID_USER,TimeTB,u.AVATAR,u.UserName,tb.TinhTrang from TBL_THONGBAO as tb, TBL_USER as u where tb.ID_USER=u.ID_USER  and tb.ID_USER!=" + id_user + " ORDER BY ID_THONGBAO DESC", Conds);
                        lastidTB = cnn.CreateDataTable(@"SELECT Max(ID_THONGBAO) as asLastTB FROM TBL_THONGBAO");
                    }

                    dr_tb = lastidTB.Select();

                    Idtb = lastidTB.Rows[0]["asLastTB"].ToString();

                    idtb = Int32.Parse(Idtb);

                    Thread.Sleep(500);
                    dr = dt.Select();



                    var dl = from r in dt.AsEnumerable()
                             where r["ID_THONGBAO"].Equals(Idtb)
                             select new
                             {
                                 id_tb = r["ID_THONGBAO"],

                                 title = r["TIEUDE"],
                                 id_baidang = r["ID_BAIDANG"],
                                 id_cmt = r["ID_COMMENT"],
                                 tb_by_user = r["ID_USER"],
                                 user_name = r["UserName"],
                                 timetb = r["TimeTb"],

                                 hinhanh = r["AVATAR"],
                                 avatar = $"{link}/Avatar/{  r["AVATAR"]}",
                                 tinhtrang = r["TinhTrang"],

                             };
                    mangxahoi.PushToAllUsers(dl, null);
                    //return dl;
                    return JsonResultCommon.ThanhCong(dl);
                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }
            }


        }

        [Route("getDSBaiDang_ThongBao")]
        [HttpGet]
        public object getDSBaiDang_ThongBao([FromUri] QueryParams query)
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

 where ID_LOAIBAIDANG=3 and bd.CreatedBy=u.ID_USER
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