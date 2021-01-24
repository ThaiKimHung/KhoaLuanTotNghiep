//using System;
//using System.Data;
//using System.Configuration;
//using System.Web;
//using System.Globalization;
//using System.Threading;
//using System.Collections.Generic;
//using DpsLibs.Data;
//using System.Collections.Specialized;
//using System.Net.Mail;
//using System.Net;
//using System.Collections;
//using System.IO;
//using System.Text;

//namespace DpsLibs.Controls
//{
//    /// <summary>
//    /// Summary description for DpsPage
//    /// </summary>
//    public class DpsPage : System.Web.UI.Page
//    {
//        private static string _basePath;
//        public static string BasePath
//        {
//            get
//            {
//                return _basePath;
//            }
//            set
//            {
//                _basePath = value;
//            }
//        }
//        public static string module = "";
//        public static string Pagename = "";
//        public DpsPage()
//        {
//            try
//            {
//            }
//            catch { }
//        }
//        public static DataTable Getmenu(string url, DpsConnection cnn)
//        {
//            DataTable data = new DataTable();
//            try
//            {
//                int vitri = url.LastIndexOf('/');
//                string page = url.Substring(vitri + 1);
//                string rq = page.Split('?')[0];
//                url = url.Substring(0, vitri);
//                vitri = url.LastIndexOf('/');
//                string module = url.Substring(vitri + 1);
//                SqlConditions cond = new SqlConditions();
//                cond.Add("page", page);
//                cond.Add("module", module);
//                string dk = " and module=@module";
//                string s = "select * from tbl_submenu where page=@page";
//                data = cnn.CreateDataTable(s + dk, cond);
//                if (data.Rows.Count <= 0)
//                {
//                    cond["page"].Value = rq;
//                    data = cnn.CreateDataTable(s + dk, cond);
//                    if (data.Rows.Count <= 0)
//                    {
//                        cond["page"].Value = "../" + module + "/" + page;
//                        cond.Remove(cond["module"]);
//                        data = cnn.CreateDataTable(s, cond);
//                    }
//                }
//            }
//            catch
//            {
//            }
//            return data;
//        }
//        public static void WriteLog(string page, string content, string UserName)
//        {
//            string pathdir = HttpContext.Current.Server.MapPath("~/Logs/");
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string filename = DateTime.Today.ToString("yyyyMMdd") + ".txt";
//            string path = pathdir + filename;
//            StreamWriter w;
//            if (!File.Exists(path))
//            {
//                w = File.CreateText(path);
//            }
//            else w = File.AppendText(path);
//            w.WriteLine(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " | " + page + " | " + UserName + " | " + content);
//            w.Flush();
//            w.Close();
//        }
//        public static void Writelogfile(string CustemerID, string LogEditcontent, string LogContent, string username)
//        {
//            if (!"".Equals(LogEditcontent))
//            {
//                WriteLogByFunction(module + "_" + Pagename, LogEditcontent, CustemerID, username);
//            }
//            if (!"".Equals(LogContent))
//            {
//                WriteLogByDay_JeeHR(module + "_" + Pagename, LogContent, CustemerID, username);
//                WriteLogByUser_JeeHR(module + "_" + Pagename, LogContent, CustemerID, username);
//            }
//        }
//        public static void WriteLogByDay_JeeHR(string page, string content, string CustemerID, string username)
//        {
//            if (HttpContext.Current != null) _basePath = HttpContext.Current.Server.MapPath("~/");
//            string pathdir = _basePath + "/Logs/" + CustemerID + "/theongay/";
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string fullpath_filename = pathdir + DateTime.Today.ToString("yyyyMMdd") + ".txt";
//            StreamWriter w;
//            if (!File.Exists(fullpath_filename))
//            {
//                w = File.CreateText(fullpath_filename);
//            }
//            else w = File.AppendText(fullpath_filename);
//            w.WriteLine(username + " - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " - " + content);
//            w.Flush();
//            w.Close();
//        }
//        public static void WriteLogByUser_JeeHR(string page, string content, string CustemerID, string id_nv)
//        {
//            if (HttpContext.Current != null) _basePath = HttpContext.Current.Server.MapPath("~/");
//            string pathdir = _basePath + "/Logs/" + CustemerID + "/theonguoidung/";
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string fullpath_filename = pathdir + id_nv + ".txt";
//            StreamWriter w;
//            if (!File.Exists(fullpath_filename))
//            {
//                w = File.CreateText(fullpath_filename);
//            }
//            else w = File.AppendText(fullpath_filename);
//            w.WriteLine(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " - " + content);
//            w.Flush();
//            w.Close();
//        }
//        public static void WriteLogByFunction(string Pagename, string content, string CustemerID, string username)
//        {
//            if (HttpContext.Current != null) _basePath = HttpContext.Current.Server.MapPath("~/");
//            StreamWriter w;
//            string pathdir = _basePath + "/Logs/" + CustemerID + "/theochucnang/";
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string fullpath_filename = pathdir + Pagename + ".txt";

//            if (!File.Exists(fullpath_filename))
//            {
//                w = File.CreateText(fullpath_filename);
//            }
//            else w = File.AppendText(fullpath_filename);
//            try
//            {

//                w.WriteLine(username + " - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " - " + content);
//                w.Flush();
//                w.Close();
//            }
//            catch (Exception ex)
//            {
//                w.Flush();
//                w.Close();
//            }

//        }
//        /// <summary>
//        /// Ghi log thay đổi thông tin nhân viên (thông tin cá nhân, thông tin bảo hiểm, thông tin nhân thân....)
//        /// </summary>
//        /// <param name="Pagename"></param>
//        /// <param name="CustemerID"></param>
//        /// <param name="Old_data">dữ liệu cũ. Số cột và thứ tự cột phải đồng nhất với new_data</param>
//        /// <param name="New_Data">dữ liệu mới. Số cột và thứ tự cột phải đồng nhất với old_data</param>
//        /// <param name="Id_nv"></param>
//        public static void WriteLogChangeThongtinhanvien(string Pagename, string CustemerID, DataTable Old_data, DataTable New_Data, string Id_nv)
//        {
//            string pathdir = HttpContext.Current.Server.MapPath("~/Logs/" + CustemerID + "/Pagename/");
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string fullpath_filename = pathdir + Pagename + ".txt";
//            StreamWriter wr;
//            if (!File.Exists(fullpath_filename))
//            {
//                wr = File.CreateText(fullpath_filename);
//            }
//            else wr = File.AppendText(fullpath_filename);
//            wr.WriteLine(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"));
//            for (int i = 0; i < Old_data.Columns.Count; i++)
//            {
//                if (Old_data.Rows[0][i] != New_Data.Rows[0][i])
//                {
//                    wr.WriteLine(Old_data.Columns[i].ColumnName + " " + Old_data.Rows[0][i].ToString() + "-^-" + New_Data.Rows[0][i].ToString());
//                }
//            }
//            wr.WriteLine();
//            wr.Flush();
//            wr.Close();
//        }
//        public static void WriteLogChangeEmployee(string Pagename, string CustemerID, string Content, string Id_nv, string username)
//        {
//            string pathdir = HttpContext.Current.Server.MapPath("~/Logs/" + CustemerID + "/nhanvien/" + Pagename + "/");
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string fullpath_filename = pathdir + Id_nv + DateTime.Now.ToString("") + ".txt";
//            StreamWriter w;
//            if (!File.Exists(fullpath_filename))
//            {
//                w = File.CreateText(fullpath_filename);
//            }
//            else
//                w = File.AppendText(fullpath_filename);
//            w.WriteLine(username + " - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " - " + Content);
//            w.Flush();
//            w.Close();
//        }
//        public static void WriteLogChangeThongtinnhanvien_JeeHR(string Pagename, string CustemerID, string Content, string Id_nv, string username)
//        {
//            string pathdir = HttpContext.Current.Server.MapPath("~/Logs/" + CustemerID + "/nhanvien/" + Pagename + "/");
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string fullpath_filename = pathdir + Id_nv + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".txt";
//            StreamWriter w;
//            if (!File.Exists(fullpath_filename))
//            {
//                w = File.CreateText(fullpath_filename);
//            }
//            else
//                w = File.AppendText(fullpath_filename);
//            w.WriteLine(username + " - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " - " + Content);
//            w.Flush();
//            w.Close();
//        }
//        public static string GetEditLogContent(DataTable Old_Data, DataTable New_Data)
//        {
//            string result = "";
//            if ((Old_Data.Rows.Count > 0) && (New_Data.Rows.Count > 0))
//            {
//                for (int i = 0; i < Old_Data.Columns.Count; i++)
//                {
//                    if (Old_Data.Rows[0][i].ToString() != New_Data.Rows[0][i].ToString())
//                        result += " | " + Old_Data.Columns[i].ColumnName + ": " + Old_Data.Rows[0][i].ToString() + " ^ " + New_Data.Rows[0][i].ToString();
//                }
//            }
//            if (!"".Equals(result)) result = result.Substring(3);
//            return result;
//        }
//        public static string GetFullName(string id_nv, DpsConnection cnn, bool IsIncludeCode)
//        {
//            SqlConditions cond = new SqlConditions();
//            cond.Add("id_nv", id_nv);
//            DataTable dt = cnn.CreateDataTable("select holot + ' ' + ten as hoten, manv from tbl_nhanvien where (where)", "(where)", cond);
//            if (dt.Rows.Count <= 0) return "";
//            string result = dt.Rows[0][0].ToString();
//            if (IsIncludeCode) result += " - " + dt.Rows[0][1].ToString();
//            return result;
//        }
//        public static void WriteLogStaffJeeHR(string CustemerID, string LogEditcontent, string LogContent, string id_nv, string username, string nv_login)
//        {
//            if (!"".Equals(LogEditcontent))
//            {
//                WriteLogChangeThongtinnhanvien_JeeHR(module + "_" + Pagename, CustemerID, LogEditcontent, id_nv, username);
//            }
//            if (!"".Equals(LogContent))
//            {
//                WriteLogByDay_JeeHR(module + "_" + Pagename, LogContent, CustemerID, username);
//                WriteLogByUser_JeeHR(module + "_" + Pagename, LogContent, CustemerID, nv_login);
//            }
//        }
//        public static bool ChuyenloaiphepCustemer(DpsConnection cnn, string CustemerID)
//        {
//            //Lấy danh sách từ bảng temp
//            DataTable danhsach = cnn.CreateDataTable("select * from Temp_LeaveTypes");
//            for (int j = 0; j < danhsach.Rows.Count; j++)
//            {
//                string ID_cu = danhsach.Rows[j]["Id_row"].ToString();
//                Hashtable val = new Hashtable();
//                val.Add("Title", danhsach.Rows[j]["Title"]);
//                val.Add("Description", danhsach.Rows[j]["Description"]);
//                val.Add("IsAnnualLeave", danhsach.Rows[j]["IsAnnualLeave"]);
//                val.Add("Nhom", danhsach.Rows[j]["Nhom"]);
//                val.Add("Resourcekey", danhsach.Rows[j]["Resourcekey"]);
//                val.Add("CustemerID", CustemerID);
//                val.Add("TempID", ID_cu);
//                val.Add("IsThaisan", danhsach.Rows[j]["Isthaisan"]);
//                int rs = cnn.Insert(val, "Xnp_Types");
//                if (rs > 0)
//                {
//                    SqlConditions cond = new SqlConditions();
//                    cond.Add("CustemerID", CustemerID);
//                    DataTable dt = cnn.CreateDataTable("select max(Id_Type) as id from Xnp_Types where (CustemerID=@CustemerID)", cond);
//                    if (dt.Rows.Count <= 0)
//                    {
//                        return false;
//                    }
//                    string ID_moi = dt.Rows[0][0].ToString();
//                    string sqlcommand = "update xnp_requests set Type=" + ID_moi + " where (Type=" + ID_cu + ") and (id_nv in (select id_nv from tbl_nhanvien inner join bophan on tbl_nhanvien.id_bp=bophan.id_bp inner join donvi on bophan.madv=donvi.id_dv where CustemerID=@CustemerID))";
//                    rs = cnn.ExecuteNonQuery(sqlcommand, cond);
//                    if (rs < 0)
//                    {
//                        return false;
//                    }
//                    //Cập nhật config quy trình duyệt phép
//                    sqlcommand = "update PA_ConfigQuytrinhduyetphep set TypeID=" + ID_moi + " where (TypeID=" + ID_cu + ") and (CustemerID=@CustemerID)";
//                    rs = cnn.ExecuteNonQuery(sqlcommand, cond);
//                    if (rs < 0)
//                    {
//                        return false;
//                    }
//                    //Cập nhật cấu hình xin nghỉ phép
//                    sqlcommand = "update PA_ConfigLeave set Id_type=" + ID_moi + " where (Id_type=" + ID_cu + ") and (CustemerID=@CustemerID)";
//                    rs = cnn.ExecuteNonQuery(sqlcommand, cond);
//                    if (rs < 0)
//                    {
//                        return false;
//                    }
//                    //Cập nhật chấm công ngày
//                    sqlcommand = "update Chamcongngay set Loainghiphep=" + ID_moi + " where (Loainghiphep=" + ID_cu + ") and (id_nv in (select id_nv from tbl_nhanvien inner join bophan on tbl_nhanvien.id_bp=bophan.id_bp inner join donvi on bophan.madv=donvi.id_dv where CustemerID=@CustemerID))";
//                    rs = cnn.ExecuteNonQuery(sqlcommand, cond);
//                    if (rs < 0)
//                    {
//                        return false;
//                    }
//                    sqlcommand = "update tbl_phepnam Hinhthuc=" + ID_moi + " where (Hinhthuc=" + ID_cu + ") and (id_nv in (select id_nv from tbl_nhanvien inner join bophan on tbl_nhanvien.id_bp=bophan.id_bp inner join donvi on bophan.madv=donvi.id_dv where CustemerID=@CustemerID))";
//                    rs = cnn.ExecuteNonQuery(sqlcommand, cond);
//                    if (rs < 0)
//                    {
//                        return false;
//                    }
//                }
//            }
//            return true;
//        }
//        public static void WriteLog(DateTime dateTime, CDTO contract, CDTO contract_old, int id_emp)
//        {
//            //thong tin hop dong moi
//            Hashtable val_new = new Hashtable();
//            val_new.Add("ngaylap", contract.ngaylap); val_new.Add("ngaybatdau", contract.ngaybatdau);
//            val_new.Add("ngayhethan", contract.ngayhethan); val_new.Add("Luongthuviec", contract.Luongthuviec);
//            val_new.Add("Luongchinhthuc", contract.luongchinh); val_new.Add("loaihopdong", contract.loaihopdong);
//            val_new.Add("Id_nv", contract.Id_nv); val_new.Add("Sohd", contract.Sohd);
//            val_new.Add("tenchucdanh", contract.tenchucdanh);
//            val_new.Add("ghichu", contract.ghichu); val_new.Add("CreatedBy", contract.CreatedBy);
//            val_new.Add("Baotruockhiketthuchopdong", contract.thoigianbaotruoc);
//            //thong tin hop dong cu~
//            Hashtable val_old = new Hashtable();
//            val_old.Add("ngaylap", contract_old.ngaylap); val_old.Add("ngaybatdau", contract_old.ngaybatdau);
//            val_old.Add("ngayhethan", contract_old.ngayhethan); val_old.Add("Luongthuviec", contract_old.Luongthuviec);
//            val_old.Add("Luongchinhthuc", contract_old.luongchinh); val_old.Add("loaihopdong", contract_old.loaihopdong);
//            val_old.Add("Id_nv", contract_old.Id_nv); val_old.Add("Sohd", contract_old.Sohd);
//            val_old.Add("tenchucdanh", contract_old.tenchucdanh);
//            val_old.Add("ghichu", contract_old.ghichu); val_old.Add("CreatedBy", contract_old.CreatedBy);
//            val_old.Add("Baotruockhiketthuchopdong", contract_old.thoigianbaotruoc);
//            Log l = new Log();
//            Hashtable val = l.Equals(val_old, val_new);//thong tin moi(val)
//            Hashtable val_ = new Hashtable();//thong tin cu(val_)
//                                             //cap nhat lai cho thong tin cu~ chi lay nhung thuoc tinh bi thay doi
//            foreach (string key in val.Keys)
//            {
//                val_.Add(key, val_old[key]);
//            }
//            val_new.Clear(); val_old.Clear();
//            string path = HttpContext.Current.Server.MapPath("~/Log/hopdong/" + id_emp + ".txt");
//            bool kq = l.writefile(DateTime.Now, val, val_, path);
//        }
//        public static void Ghilogfile(string CustemerID, string LogEditcontent, string LogContent, string username)
//        {
//            if (!"".Equals(LogEditcontent))
//            {
//                WriteLogByFunction(module + "_" + Pagename, LogEditcontent, CustemerID, username);
//            }
//            if (!"".Equals(LogContent))
//            {
//                WriteLogByDay_JeeHR(module + "_" + Pagename, LogContent, CustemerID, username);
//                WriteLogByUser_JeeHR(module + "_" + Pagename, LogContent, CustemerID, username);
//            }
//        }
//        public static void WriteLogChangeThongtinhanvien(string Pagename, string CustemerID, string Content, string Id_nv, string Username)
//        {
//            string pathdir = HttpContext.Current.Server.MapPath("~/Logs/" + CustemerID + "/nhanvien/" + Pagename + "/");
//            if (!Directory.Exists(pathdir))
//            {
//                Directory.CreateDirectory(pathdir);
//            }
//            string fullpath_filename = pathdir + Id_nv + ".txt";
//            StreamWriter w;
//            if (!File.Exists(fullpath_filename))
//            {
//                w = File.CreateText(fullpath_filename);
//            }
//            else w = File.AppendText(fullpath_filename);
//            string user = Username;
//            w.WriteLine(user + " - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " - " + Content);
//            w.Flush();
//            w.Close();
//        }
//        public static void Ghilognhanvien(string CustemerID, string LogEditcontent, string LogContent, string id_nv, string Username)
//        {
//            if (!"".Equals(LogEditcontent))
//            {
//                WriteLogChangeThongtinhanvien(module + "_" + Pagename, CustemerID, LogEditcontent, id_nv, Username);
//            }
//            if (!"".Equals(LogContent))
//            {
//                WriteLogByDay_JeeHR(module + "_" + Pagename, LogContent, CustemerID, Username);
//                WriteLogByUser_JeeHR(module + "_" + Pagename, LogContent, CustemerID, Username);
//            }
//        }
//    }
//}