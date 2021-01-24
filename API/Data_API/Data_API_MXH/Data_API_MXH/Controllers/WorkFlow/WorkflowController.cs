using APIModel;
using APIModel.BLayer;
using APIModel.Classes;
using DpsLibs.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Data_API_MXH.Controllers.HR.Staff
{
    [RoutePrefix("api/workflow")]
    public class WorkflowController : ApiController
    {
        #region Load danh sách thành viên theo quy trình
        /// <summary>
        /// Lấy danh sách thành viên theo quy trình
        /// Image="" => Lấy tên viết tắt (VietTat) làm thành avatar có màu nền (Background) màu chữ (Color), ngược lại lấy avatar là Image
        /// </summary>
        /// <param name="processid"></param>
        /// <returns></returns>
        [Route("getDSThanhVien")]
        [HttpGet]
        public object getDSThanhVien(long processid= 10004)
            {
            PageModel pageModel = new PageModel();
            ErrorModel error = new ErrorModel();
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            bool Visible = true;
            DataTable dt = new DataTable();
            DataTable dt_nv = new DataTable();
            DataRow[] dr;
            List<object> rs = new List<object>();
            string title = "", link="";
            List<string> listnv = new List<string>();
            BLayer.Process p = new BLayer.Process();
            int[] list = new int[4] { 3, 4, 2, 1 };
            try
            {
                LoginData loginData = Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();
                Conds.Add("processid", processid);
                using (DpsConnection cnn = new DpsConnection("ConnectionStringLandingPage",true))
                {
                    link = General.GetThamSo(cnn,loginData.IDKHDPS.ToString(), 554);
                   
                }
                using (DpsConnection cnn = new DpsConnection())
                {
                    dt = cnn.CreateDataTable("select * from W_List_Follower where processid=@processid order by type", Conds);
                    dt_nv = cnn.CreateDataTable($@"select id_nv, holot+' '+ten as hoten, tbl_chucdanh.tenchucdanh, '' as Image, SUBSTRING(holot,1,1)+SUBSTRING(ten,1,1) as viettat
                    from tbl_nhanvien join tbl_chucdanh on id_chucdanh = tbl_chucdanh.id_row where tbl_nhanvien.disable=0 and thoiviec=0", Conds);

                    for (int i = 0; i < list.Length; i++)
                    {
                        switch (list[i])
                        {
                            case 1: title = "DANH SÁCH THÀNH VIÊN ÁP DỤNG"; break;
                            case 2: title = "DANH SÁCH THÀNH VIÊN THEO DÕI"; break;
                            case 3: title = "DANH SÁCH THÀNH VIÊN QUẢN TRỊ"; break;
                            case 4: title = "DANH SÁCH THÀNH QUYÊN ĐƯỢC TẠO NHIỆM VỤ"; break;
                        }
                        listnv = new List<string>();
                        dr = dt.Select("type=" + list[i]);
                        foreach (DataRow r in dr)
                        {
                            p.GetEmpList(r["ObjectID"], r["ObjectType"], listnv, cnn);
                        }
                        dr = dt_nv.Select($"id_nv in ({string.Join(",", (listnv.Count > 0 ? listnv : new List<string> { "0" }))})");
                        foreach (DataRow r in dr)
                        {
                            if (File.Exists(HttpContext.Current.Server.MapPath("~/images/nhanvien/" + loginData.IDKHDPS.ToString() + "/" + r["id_nv"].ToString() + ".jpg")))
                            {
                                r["Image"] = link + "images/nhanvien/" + loginData.IDKHDPS.ToString() + "/" + r["id_nv"].ToString() + ".jpg";
                            }
                        }
                        rs.Add(new
                        {
                            Title = title,
                            Data = from r in dr.AsEnumerable()
                                   select new
                                   {
                                       NVID = r["id_nv"],
                                       HoTen = r["hoten"].ToString().ToUpper(),
                                       ChucVu = r["Tenchucdanh"],
                                       Image = r["Image"],
                                       VietTat= r["viettat"],
                                       Background= "#C9F7F5",
                                       Color= "#1BC5BD"
                                   },
                        });
                    }
                }
                return JsonResultCommon.ThanhCong(rs,new PageModel(), Visible);
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion

        #region Load danh sách quy trình theo tình trạng
        /// <summary>
        /// Load danh sách quy trình theo tình trạng
        /// Tình trạng (TinhTrangID): 1: Đang khả dụng, 2: Đã đóng, 3: Tạo bởi tôi
        /// Image="" => Lấy tên viết tắt (VietTat) làm thành avatar có màu nền (Background) màu chữ (Color), ngược lại lấy avatar là Image
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Route("getDSQuyTrinh")]
        [HttpGet]
        public object getDSQuyTrinh([FromUri]QueryParams query)
        {
            query = query == null ? new QueryParams() : query;
            PageModel pageModel = new PageModel();
            string sql = "";
            SqlConditions Conds = new SqlConditions();
            string orderByStr = "ProcessName ", whereStr = " W_List_Process.Disable=0 and CustemerID=@CustemerID";
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            DataTable dt = new DataTable();
            DataTable dt_nguoiquantri = new DataTable();
            string link = General.GetDomainByAppCode("HR");
            List<object> nguoiquantrilist = new List<object>();
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                if (!string.IsNullOrEmpty(query.filter["TinhTrangID"]))
                {
                    if(query.filter["TinhTrangID"].Equals("1"))
                    {
                        whereStr += " and (IsFinish is null or IsFinish=0)";
                    }
                    if (query.filter["TinhTrangID"].Equals("2"))
                    {
                        whereStr += " and (IsFinish =1)";
                    }
                    if (query.filter["TinhTrangID"].Equals("3"))
                    {
                        whereStr += " and (CreatedBy =@CreatedBy)";
                        Conds.Add("CreatedBy", loginData.Id);
                    }
                }
                Conds.Add("CustemerID", loginData.IDKHDPS);
                sql = $@"select RowID, ProcessName, isnull(slhoanthanh,0) as slhoanthanh, isnull(slthatbai,0) as slthatbai, isnull(sltatca,0) as sltatca
                from W_List_Process left join (select count(RowID) as slhoanthanh, ProcessListID from W_Process where Disable= 0 and IsFinish = 1 group by ProcessListID) hoanthanh on hoanthanh.ProcessListID =W_List_Process.RowID
                left join(select count(RowID) as slthatbai, ProcessListID from W_Process where Disable= 0 and IsFinish = 0 group by ProcessListID) thatbai on thatbai.ProcessListID =W_List_Process.RowID
                left join(select count(RowID) as sltatca, ProcessListID from W_Process where Disable= 0 group by ProcessListID) tatca on tatca.ProcessListID =W_List_Process.RowID
                WHERE {whereStr} ORDER BY {orderByStr}";

                using (DpsConnection cnn = new DpsConnection())
                {
                    dt = cnn.CreateDataTable(sql, Conds);
                    dt_nguoiquantri = cnn.CreateDataTable(@"select id_nv, manv, holot+' '+ten as hoten, tbl_chucdanh.Tenchucdanh, '' as Image, ProcessID, SUBSTRING(holot,1,1)+SUBSTRING(ten,1,1) as viettat from W_List_Follower inner join Tbl_Nhanvien on id_nv= objectid 
                    inner join tbl_chucdanh on tbl_chucdanh.Id_row = Tbl_Nhanvien.id_chucdanh where W_List_Follower.Type=3");
                }

                var total = dt.Rows.Count;
                if (total == 0)
                {
                    return JsonResultCommon.ThanhCong(string.Empty, pageModel);
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

                //Lấy hình nhân viên
                foreach (DataRow r in dt_nguoiquantri.Rows)
                {
                    if (File.Exists(HttpContext.Current.Server.MapPath($"~/images/nhanvien/{loginData.IDKHDPS}/{r["id_nv"]}.jpg")))
                    {
                        r["Image"] = link + $"images/nhanvien/{loginData.IDKHDPS}/{r["id_nv"]}.jpg";
                    }
                }

                return Json(new
                {
                    status = 1,
                    data = from r in dt.AsEnumerable()
                           select new
                           {
                               RowID = r["RowID"],//ID quy trình
                               ProcessName = r["ProcessName"],
                               SLHoanThanh = r["slhoanthanh"],
                               SLThatBai = r["slthatbai"],
                               SLTatCa = r["sltatca"],
                               NguoiQuanTri = from h in dt_nguoiquantri.AsEnumerable()
                                              where h["ProcessID"].ToString().Equals(r["RowID"].ToString()) 
                                             select new
                                             {
                                                 NVID = h["id_nv"],
                                                 HoTen = h["hoten"].ToString().ToUpper(),
                                                 ChucVu = h["Tenchucdanh"],
                                                 Image = h["Image"],
                                                 VietTat= h["viettat"],
                                                 Background = "#C9F7F5",
                                                 Color = "#1BC5BD"
                                             },
                           },
                    CustemerID = loginData.IDKHDPS,
                    page = pageModel
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion
    }
}