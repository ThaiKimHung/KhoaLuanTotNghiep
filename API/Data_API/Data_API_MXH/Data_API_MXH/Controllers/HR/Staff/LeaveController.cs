using APIModel;
using APIModel.BLayer;
using DpsLibs.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using APIModel.Classes;
using System.Collections;
using Data_API_MXH.BLayer;
using System.Threading.Tasks;

namespace Data_API_MXH.Controllers.HR.Staff
{
    [RoutePrefix("api/leave")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LeaveController : ApiController
    {
        #region Load danh sách đơn xin nghỉ phép theo thời gian và tình trạng
        /// <summary>
        /// Load danh sách đơn xin nghỉ phép theo thời gian và tình trạng.
        /// Dropdown Tình trạng: 1:Đã duyệt; 0:Không duyệt; "":Tất cả; 2:Chưa duyệt.
        /// Valid != null: Đã duyệt, ẩn nút xóa
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Route("getDSNghiPhep")]
        [HttpGet]
        public object getDSNghiPhep([FromUri]QueryParams query)
        {
            query = query == null ? new QueryParams() : query;
            PageModel pageModel = new PageModel();
            string sql = "";
            SqlConditions Conds = new SqlConditions();
            string orderByStr = "Xnp_Requests.StartDate DESC, Xnp_Requests.CreatedDate DESC", whereStr = " (Xnp_Requests.Ngayhuy IS NULL) and (Xnp_Requests.disable=0) and (Xnp_Requests.id_nv=@id_nv)";
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            DataTable dt = new DataTable();
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                //Sort
                Dictionary<string, string> sortableFields = new Dictionary<string, string>
                        {
                            { "LoaiPhep", "Xnp_Types.Title"},
                            { "NgayGui", "Xnp_Requests.CreatedDate"},
                            { "NgayDuyet", "Xnp_Requests.CheckDate"},
                            { "ThoiGian", "Tungay_thoigian"},
                            { "SoNgay", "Xnp_Requests.DayNum"},
                            { "DiaDiem", "Xnp_Requests.DiaDiem"},
                        };
                if (!string.IsNullOrEmpty(query.sortField) && sortableFields.ContainsKey(query.sortField))
                {
                    orderByStr = sortableFields[query.sortField] + ("desc".Equals(query.sortOrder) ? " desc" : " asc");
                }

                Conds.Add("id_nv", loginData.Id);
                sql = $@"SELECT top(5) Xnp_Types.Title, Xnp_Requests.Id_Rq,xnp_types.resourcekey, Xnp_Requests.Id_nv, Xnp_Requests.StartDate, Xnp_Requests.DayNum, ngayvaolam,IsNghiDiDuLich, Xnp_Requests.DiaDiem,
                    Xnp_Requests.Valid, Xnp_Requests.Checker, Tbl_Nhanvien.Holot + ' ' + Tbl_Nhanvien.Ten AS HoTen, Xnp_Requests.AllowDelete, Xnp_Requests.Type, 
                    iif(Tungay_thoigian is NULL,startdate,Tungay_thoigian) as Tungay_thoigian, iif(Denngay_thoigian is NULL,ngayvaolam,Denngay_thoigian) as Denngay_thoigian,
                    iif(Tungay_thoigian is NULL,(iif(buoinghi='PM',(iif(loaihinh=2,N'Chiều',N'Cuối buổi')),(iif(loaihinh=2,N'Sáng',N'Đầu buổi')))),FORMAT(Tungay_thoigian, 'HH:mm')) as tugio, Xnp_Requests.Checker,
                    iif(Denngay_thoigian is NULL,(iif(buoivaolam='PM',(iif(loaihinh=2,N'Chiều',N'Cuối buổi')),(iif(loaihinh=2,N'Sáng',N'Đầu buổi')))),FORMAT(Denngay_thoigian, 'HH:mm')) as dengio, '' as Image,
                    Xnp_Requests.Sophut, convert(varchar(10), Xnp_Requests.CreatedDate, 103) as CreatedDate, convert(varchar(10), Xnp_Requests.CheckDate, 103) as CheckDate, Xnp_Requests.Note, outofstock,Xnp_Types.Id_Type 
                    FROM Xnp_Requests INNER JOIN Xnp_Types ON Xnp_Requests.Type = Xnp_Types.Id_Type
					join Tbl_Custemers on  CustemerID = Tbl_Custemers.rowid
                    LEFT OUTER JOIN Tbl_Nhanvien ON Xnp_Requests.Checker = Tbl_Nhanvien.Id_NV
                    WHERE {whereStr} ORDER BY {orderByStr}";

                using (DpsConnection cnn = new DpsConnection())
                {
                    dt = cnn.CreateDataTable(sql, Conds);
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
                string link = General.GetDomainByAppCode("HR");
                string Image = link + "Images/Noimage.jpg";
                foreach (DataRow r in dt.Rows)
                {
                    r["Image"] = link + "Images/Noimage.jpg";
                    if (File.Exists(HttpContext.Current.Server.MapPath("~/images/nhanvien/" + loginData.IDKHDPS.ToString() + "/" + r["Checker"].ToString() + ".jpg")))
                    {
                        r["Image"] = link + "images/nhanvien/" + loginData.IDKHDPS.ToString() + "/" + r["Checker"].ToString() + ".jpg";
                    }
                }

                return Json(new
                {
                    status = 1,
                    data = from r in dt.AsEnumerable()
                           select new
                           {
                               ID_Row = r["Id_Rq"],
                               LoaiPhep = r["title"],
                               ThoiGian = General.GetFormatDate(Convert.ToDateTime(r["Tungay_thoigian"]), Convert.ToDateTime(r["Denngay_thoigian"]), r["tugio"].ToString(), r["dengio"].ToString()) + " (" + r["DayNum"] + " ngày)",
                               TinhTrang = r["Valid"] == DBNull.Value ? "Chờ duyệt" : (((bool)r["Valid"]) ? "Duyệt" : "Không duyệt"),
                               NgayGui = r["CreatedDate"],
                               NguoiDuyet = r["HoTen"],
                               NgayDuyet = r["CheckDate"],
                               NH2 = r["outofstock"],
                               LyDo = r["Note"],
                               Valid = r["Valid"],
                               ID_HinhThuc = r["id_type"],
                               SoNgay = r["DayNum"],
                               GioBatDau = r["StartDate"],
                               GioKetThuc = r["ngayvaolam"],
                               Image = r["Image"],
                               IsNghiDiDuLich = r["IsNghiDiDuLich"],
                               DiaDiem = r["DiaDiem"],
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

        #region Load danh sách hạn mức phép theo năm
        /// <summary>
        /// Load danh sách hạn mức phép theo năm
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Route("getDSHanMucPhep")]
        [HttpGet]
        public object getDSHanMucPhep([FromUri]QueryParams query)
        {
            query = query == null ? new QueryParams() : query;
            PageModel pageModel = new PageModel();
            string sql = "";
            SqlConditions Conds = new SqlConditions();
            string orderByStr = "Title", whereStr = " ((Xnp_Types.IsShow=1) or (Sys_QuotaLeave.Hanmuc>0)) and ((Xnp_Types.IsHide=0) or (Xnp_Types.IsHide is null)) and CustemerID=@CustemerID and Sys_QuotaLeave.id_nv=@id_nv and Sys_QuotaLeave.nam=@nam and dbo.Xnp_Types.disable=0";
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            int nam = 0, total=0;
            DataTable dt = new DataTable();
            string tongngayphepnam = "";
            string sophepthamnien = "";
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                string id_nv = query.filter["ID_NV"].ToString();
                if (!int.TryParse(query.filter["Nam"], out nam))
                {
                    return JsonResultCommon.KhongHopLe("Năm");
                }

                //Điều kiện
                Conds.Add("id_nv", query.filter["ID_NV"].ToString());
                Conds.Add("CustemerID", loginData.IDKHDPS);
                Conds.Add("nam", nam);

                //sort
                Dictionary<string, string> sortableFields = new Dictionary<string, string>
                        {
                            { "LoaiPhep", "Title"},
                            { "PhepTon", "Tonnamtruoc"},
                            { "NgayHetHan", " Baoluuden"},
                            { "PhepDuocHuong", "Hanmuc"},
                            { "NghiTruPhepTon", "Danghi_ton"},
                            { "NghiTruPhepNam", "Danghi_chinh"},
                        };
                if (!string.IsNullOrEmpty(query.sortField) && sortableFields.ContainsKey(query.sortField))
                {
                    orderByStr = sortableFields[query.sortField] + ("desc".Equals(query.sortOrder) ? " desc" : " asc");
                }

                sql = $@"SELECT dbo.Xnp_Types.Id_Type,Xnp_Types.Title, dbo.Xnp_Types.Loaicong, dbo.Sys_QuotaLeave.Nam, dbo.Sys_QuotaLeave.Id_nv
                    , dbo.Xnp_Types.CustemerID, iif(IsAnnualLeave=1,dbo.Tbl_Songayphepnam.tongcong + dbo.Sys_QuotaLeave.Songay_ext+songayphepthamnien,dbo.Sys_QuotaLeave.Hanmuc + dbo.Sys_QuotaLeave.Songay_ext) as Hanmuc,'' as songaydanghi,
                    Sys_QuotaLeave.Tonnamtruoc,ISNULL(Sys_QuotaLeave.Danghi_ton,0) + ISNULL(Sys_QuotaLeave.Danghiton_ext,0) as Danghi_ton, ISNULL(Sys_QuotaLeave.Danghi_chinh,0) + ISNULL(Sys_QuotaLeave.Danghichinh_ext,0) as Danghi_chinh, convert(varchar(10), Sys_QuotaLeave.Baoluuden, 103) as Baoluuden,Xnp_Types.IsAnnualLeave
                    FROM  dbo.Xnp_Types INNER JOIN dbo.Sys_QuotaLeave ON dbo.Xnp_Types.Id_Type = dbo.Sys_QuotaLeave.Id_type
                    INNER JOIN dbo.Tbl_Songayphepnam ON Sys_QuotaLeave.id_nv = dbo.Tbl_Songayphepnam.id_nv and Tbl_Songayphepnam.nam=@Nam
                    WHERE {whereStr}";

                using (DpsConnection cnn = new DpsConnection())
                {
                    dt = cnn.CreateDataTable(sql, Conds);
                    total = dt.Rows.Count;
                    if (total == 0)
                    {
                        return JsonResultCommon.ThanhCong(string.Empty, pageModel);
                    }
                    dt.Columns.Add("Tong", typeof(double));
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        DateTime denngay = DateTime.Today;
                        if (denngay.Year > nam)
                            denngay = General.GetEndDateInMonth(12, nam);
                        if ((bool)dt.Rows[i]["IsAnnualLeave"] == true)
                        {
                            double songayconlai = Phepnam.Songayphepconlai(denngay, id_nv, cnn, false);
                            dt.Rows[i]["Tong"] = songayconlai;
                        }
                        else
                        {
                            dt.Rows[i]["Tong"] = Phepnam.Songayphepconlai(denngay, id_nv, cnn, dt.Rows[i]["Id_Type"].ToString(), false);
                        }
                    }
                    string select = "select Songayphepduochuong, Songayphep, Songayphepthamnien from tbl_songayphepnam inner join tbl_nhanvien on tbl_songayphepnam.id_nv=tbl_nhanvien.id_nv and tbl_songayphepnam.nam=@Nam where tbl_nhanvien.id_nv=@id_nv";
                    DataTable phepnam = cnn.CreateDataTable(select, Conds);
                    if (phepnam.Rows.Count > 0)
                    {
                        string songay = phepnam.Rows[0][1].ToString();
                        if ("".Equals(phepnam.Rows[0][0].ToString()))
                        {
                            if (nam == DateTime.Today.Year)
                            {
                                //Cập nhật số ngày phép năm
                                Hashtable val = new Hashtable();
                                val.Add("Songayphepduochuong", phepnam.Rows[0][1]);
                                SqlConditions cond1 = new SqlConditions();
                                cond1.Add("Nam", nam);
                                cond1.Add("Id_nv", id_nv);
                                cnn.Update(val, cond1, "tbl_songayphepnam");
                            }
                            songay = phepnam.Rows[0][1].ToString();
                        }
                        tongngayphepnam = string.Format("{0:###,##0.##}", songay);
                        sophepthamnien = string.Format("{0:###,##0.##}", phepnam.Rows[0][2]);
                    }
                }
                
                //sort dữ liệu đã xử lý
                dt.DefaultView.Sort = orderByStr + ("desc".Equals(query.sortOrder) ? " desc" : " asc");
                dt = dt.DefaultView.ToTable();

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

                return Json(new
                {
                    status = 1,
                    data = from r in dt.AsEnumerable()
                           select new
                           {
                               LoaiPhep = r["title"],
                               PhepTon = r["Tonnamtruoc"],
                               NgayHetHan = r["Baoluuden"],
                               PhepDuocHuong = r["Hanmuc"],
                               NghiTruPhepTon = r["Danghi_ton"],
                               NghiTruPhepNam = r["Danghi_chinh"],
                               TongNghiPhep = double.Parse(r["Danghi_ton"].ToString()) + double.Parse(r["Danghi_chinh"].ToString()),
                               Tong = string.Format("{0:###,##0.##}", r["Tong"]),
                               IsPhepNam = r["IsAnnualLeave"]
                           },
                    TongNgayPhepNam = tongngayphepnam,
                    SoNgayPhepThamNien = sophepthamnien,
                    page = pageModel
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion

        #region Danh sách phép còn lại
        /// <summary>
        /// Danh sách phép còn lại
        /// </summary>
        /// <returns></returns>
        [Route("getDSPhep")]
        [HttpGet]
        public object getDSPhep()
        {
            PageModel pageModel = new PageModel();
            SqlConditions Conds = new SqlConditions();
            DataTable dt = new DataTable();
            string orderByStr = "Title asc";
            string sql = "";
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            List<object> data = new List<object>();
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                Conds.Add("CustemerID", loginData.IDKHDPS);
                Conds.Add("Disable", 0);
                Conds.Add("Nhom", DBNull.Value, SqlOperator.Is);
                using (DpsConnection cnn = new DpsConnection())
                {
                    sql = @"select IsAnnualLeave, Isnghibu, id_type, title,id_type from Xnp_Types where (where) order by " + orderByStr;
                    dt = cnn.CreateDataTable(sql, "(where)", Conds);

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (bool.TrueString.Equals(dt.Rows[i]["IsAnnualLeave"].ToString()) || bool.TrueString.Equals(dt.Rows[i]["Isnghibu"].ToString()))
                        {
                            double songayconlai = Phepnam.RemainLeave(dt.Rows[i]["id_type"].ToString(), DateTime.Today.Year, loginData.Id.ToString(), DateTime.Today, cnn);
                            data.Add(new
                            {
                                Loaiphep = dt.Rows[i]["title"].ToString(),
                                NgayPhep = songayconlai.ToString("###,##0.##"),
                            });
                        }
                    }
                }
                return JsonResultCommon.ThanhCong(data);
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion

        #region Hủy đơn xin phép 
        /// <summary>
        /// Hủy đơn xin phép 
        /// </summary>
        /// <returns></returns>
        [Route("deleteDonXinPhep")]
        [HttpGet]
        public object deleteDonXinPhep(string id)
        {
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            //string Langcode = Request.Headers.GetValues("Langcode").FirstOrDefault();
            Phepnam phep = new Phepnam();
            Hashtable val = new Hashtable();
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                string nguoixoa = loginData.Id.ToString();
                string CustemerID = loginData.IDKHDPS.ToString();
                val.Add("Ngayhuy", DateTime.Now);
                val.Add("Disable", 1);
                Conds.Add("Id_Rq", id);

                using (DpsConnection cnn = new DpsConnection())
                {
                    DataTable dt = cnn.CreateDataTable("select * from quytrinh_quatrinhduyet where id_phieu=@Id_Rq and loai=1 and valid is not null", Conds);
                    if (dt.Rows.Count > 0)
                    {
                        return JsonResultCommon.ThatBai("Đơn xin phép đã duyệt không được hủy");
                    }
                    dt = cnn.CreateDataTable("select id_nv, type, StartDate, valid from xnp_requests where id_rq=@Id_Rq", Conds);
                    if (dt.Rows.Count <= 0)
                    {
                        return JsonResultCommon.ThatBai("Không tìm thấy dữ liệu");
                    }
                    if (string.IsNullOrEmpty(dt.Rows[0]["valid"].ToString()))
                    {
                        cnn.BeginTransaction();
                        if (!phep.Delete(id, nguoixoa, cnn))
                        {
                            cnn.RollbackTransaction();
                            cnn.EndTransaction();
                            return JsonResultCommon.ThatBai("Hủy đơn xin phép không thành công", cnn.LastError);
                        }
                        cnn.EndTransaction();
                    }
                }
                return JsonResultCommon.ThanhCong();
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion

        #region Lấy chi tiết duyệt đăng ký phép
        /// <summary>
        /// Lấy chi tiết duyệt đăng ký phép
        /// </summary>
        /// <param name="ID">id nhân viên</param>
        /// <returns></returns>
        [Route("getChiTietDuyetPhep")]
        [HttpGet]
        public object getChiTietDuyetPhep(int ID)
        {
            BaseModel<object> model = new BaseModel<object>();
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            object[] data_phep = new object[14];
            string Image = "", link = "";
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                string CustemerID = loginData.IDKHDPS.ToString();
                string id_nv = loginData.Id.ToString();
                Phepnam nghiphep = new Phepnam();
                Donxinphep donxin = nghiphep.GetByID(ID.ToString());
                string[] file = File.ReadAllText(HttpContext.Current.Server.MapPath("~/MailTemplate/DonXinPhep.html")).Split('$');
                //Data đăng ký phép
                data_phep[0] = "Ban giám đốc công ty";
                data_phep[1] = donxin.Nhanvien.holot + " " + donxin.Nhanvien.ten;
                data_phep[2] = donxin.Nhanvien.manv;
                data_phep[3] = donxin.Nhanvien.tenchucdanh;
                data_phep[4] = donxin.Nhanvien.Structure;
                data_phep[5] = donxin.Songay;
                data_phep[6] = donxin.Tungaygio != DateTime.MinValue ? donxin.Tungaygio.ToString("HH:mm dd/MM/yyyy") : donxin.Tungay.Ngay.ToString("dd/MM/yyyy") + ("AM".Equals(donxin.Tungay.Buoi) ? (donxin.LoaiHinhKhachHang.Equals("2") ? " Sáng" : " Đầu buổi") : (donxin.LoaiHinhKhachHang.Equals("2") ? " Chiều" : " Cuối buổi"));
                data_phep[7] = donxin.Denngaygio != DateTime.MinValue ? donxin.Denngaygio.ToString("HH:mm dd/MM/yyyy") : donxin.Ngayvaolam.Ngay.ToString("dd/MM/yyyy") + ("AM".Equals(donxin.Ngayvaolam.Buoi) ? (donxin.LoaiHinhKhachHang.Equals("2") ? " Sáng" : " Đầu buổi") : (donxin.LoaiHinhKhachHang.Equals("2") ? " Chiều" : " Cuối buổi"));
                data_phep[8] = donxin.tenhinhthuc;
                data_phep[9] = donxin.ghichu;
                data_phep[10] = "";
                data_phep[11] = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                data_phep[12] = donxin.IsCongTac ? "ĐĂNG KÝ CÔNG TÁC" : "ĐƠN XIN NGHỈ PHÉP";
                data_phep[13] = "";

                //Lấy avatar của nhân viên
                link = General.GetDomainByAppCode("HR");
                Image = $"{link}Images/Noimage.jpg";
                if (File.Exists(HttpContext.Current.Server.MapPath($"~/images/nhanvien/{loginData.IDKHDPS}/{donxin.Id_nv}.jpg")))
                {
                    Image = $"{link}images/nhanvien/{loginData.IDKHDPS}/{donxin.Id_nv}.jpg";
                }

                return Json(new
                {
                    status = 1,
                    data = string.Format(file[0], data_phep),
                    HinhThuc = donxin.tenhinhthuc,
                    HoTen = donxin.Nhanvien.holot + " " + donxin.Nhanvien.ten,
                    TenChucDanh = donxin.Nhanvien.tenchucdanh,
                    MaNV = donxin.Nhanvien.manv,
                    BoPhan = donxin.Nhanvien.Structure,
                    BatDauTu = donxin.Tungaygio != DateTime.MinValue ? donxin.Tungaygio.ToString("HH:mm dd/MM/yyyy") : donxin.Tungay.Ngay.ToString("dd/MM/yyyyy") + ("AM".Equals(donxin.Tungay.Buoi) ? (donxin.LoaiHinhKhachHang.Equals("2") ? " Sáng" : " Đầu buổi") : (donxin.LoaiHinhKhachHang.Equals("2") ? " Chiều" : " Cuối buổi")),
                    Den = donxin.Denngaygio != DateTime.MinValue ? donxin.Denngaygio.ToString("HH:mm dd/MM/yyyy") : donxin.Ngayvaolam.Ngay.ToString("dd/MM/yyyyy") + ("AM".Equals(donxin.Ngayvaolam.Buoi) ? (donxin.LoaiHinhKhachHang.Equals("2") ? " Sáng" : " Đầu buổi") : (donxin.LoaiHinhKhachHang.Equals("2") ? " Chiều" : " Cuối buổi")),
                    SoGio = donxin.Songay,
                    LyDo = donxin.ghichu,
                    NgayGui = donxin.Ngaynhap,
                    Avatar = Image,
                    ChucVu = donxin.ChucVuNguoiGui,
                    IsNghiDiDuLich = donxin.IsNghiDiDuLich,
                    DiaDiem = donxin.DiaDiem,
                    GhiChu = donxin.ghichu,
                });
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        #endregion

        #region Sửa đơn xin phép
        /// <summary>
        /// Sửa đơn xin phép
        /// </summary>
        /// <returns></returns>
        [Route("Update_DonXinPhep")]
        [HttpPost]
        public async Task<object> Update_DonXinPhep(Models.LeaveAddData data)
        {
            ErrorModel error = new ErrorModel();
            SqlConditions Conds = new SqlConditions();
            string Token = Request.Headers.GetValues("Token").FirstOrDefault();
            Hashtable val = new Hashtable();
            try
            {
                LoginData loginData = Data_API_MXH.Assets.Common.GetUserByToken(Token);
                if (loginData == null)
                    return JsonResultCommon.DangNhap();

                val.Add("Note", data.GhiChu);
                Conds.Add("id_rq", data.ID_Row);
                using (DpsConnection cnn = new DpsConnection())
                {
                    if (cnn.Update(val, Conds, "Xnp_Requests") < 0)
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
        #endregion
    }
}