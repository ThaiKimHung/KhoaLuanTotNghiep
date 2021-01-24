using APIModel;
using DpsLibs.Data;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Assets
{
    public class Common
    {
        /// <summary>
        /// Kiểm tra người dùng bằng token. Dùng bảng LoginSection và  Tbl_Account
        /// </summary>
        /// <param name="token"></param>
        /// <returns>null nếu người dùng không tồn tại hoặc phiên đăng nhập của token đã hết hiệu lực</returns>
        /// 

        public static string getDomain()
        {
           string link = "https://localhost:44340/";

           // string link = "http://192.168.1.99/";



            return link;

        }
        public static LoginData GetUserByToken(string token)
        {
            LoginData user = new LoginData();
            DataTable Tb = new DataTable();
            SqlConditions conds = new SqlConditions();
            if (string.IsNullOrEmpty(token))
                return null;
            try
            {
                conds.Add("Token", token);
                using (DpsConnection cnn = new DpsConnection())
                {
                    //Trường hợp đăng nhập thiết bị khác, đăng xuất tất cả các thiết bị
                    string sqlq = "select ISNULL((select count(*) from LoginSection where Token = @Token),0)";
                        if (long.Parse(cnn.ExecuteScalar(sqlq, conds).ToString()) == 0)
                    {
                        user.Status = 5;
                    }
                    sqlq = @"select cus.Ngayhethan, nv.thoiviec, cus.LDAP, cus.LDAPType, cus.LDAPUsernameFormat, cus.RowID as CustemerID, acc.*, nv.holot, nv.ten, Locked, IsTrial,ExpireTrial,cus.Loaihinh
                    from Tbl_Account acc inner join tbl_nhanvien nv on acc.id_nv=nv.id_nv join tbl_cocautochuc on nv.cocauid = tbl_cocautochuc.rowid inner join tbl_custemers cus on CustemerID=cus.RowID
				    inner join sys_package on sys_package.RowID=PackID where nv.id_nv = isnull(( select Id from LoginSection where Locked = 0 and (ExpiryDate is NULL or ExpiryDate >= GETDATE()) and Token='" + token + "'),0)";
                    Tb = cnn.CreateDataTable(sqlq);
                    if (Tb == null || Tb.Rows.Count == 0)
                        return null;
                    user.Status = 1;
                    //Kiểm tra khách hàng lock
                    if (bool.TrueString.Equals(Tb.Rows[0]["Locked"].ToString())) user.Status = 0;

                    //Kiểm tra nhân viên thôi việc
                    if (bool.TrueString.Equals(Tb.Rows[0]["thoiviec"].ToString())) user.Status = 0;

                    //Kiểm tra tài khoản lock
                    if (bool.TrueString.Equals(Tb.Rows[0]["Lock"].ToString())) user.Status = 0;

                    //Kiểm tra ngày hết hạn của khách hàng
                    if (bool.TrueString.Equals(Tb.Rows[0]["istrial"].ToString()))
                    {
                        if (!Tb.Rows[0]["ExpireTrial"].Equals(DBNull.Value) && ((DateTime)Tb.Rows[0]["ExpireTrial"]).Date < DateTime.Now.Date) user.Status = 4;
                    }
                    else
                    {
                        if (Tb.Rows[0]["ngayhethan"] != DBNull.Value)
                        {
                            DateTime ngayhethan = (DateTime)Tb.Rows[0]["ngayhethan"];
                            if (ngayhethan < DateTime.Today) user.Status = 2;
                        }
                    }
                }
                user.FirstName = Tb.Rows[0]["ten"].ToString();
                user.LastName = Tb.Rows[0]["holot"].ToString();
                user.Id = Convert.ToInt64(Tb.Rows[0]["Id_nv"].ToString());
                user.UserName = Tb.Rows[0]["Username"].ToString();
                user.IDKHDPS = Convert.ToInt64(Tb.Rows[0]["CustemerID"].ToString());
                user.UserType = 1;
                user.LoaiHinh = int.Parse(Tb.Rows[0]["Loaihinh"].ToString());
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Kiểm tra loại người dùng  Lấy loại người dùng (UserType gồm: -1: admin dps; 0: user gốc; 1: user thường)
        /// </summary>
        /// <param name="id">là id của user</param>
        /// <returns></returns>
        public static string LoaiUser(long id)
        {
            string kq = "";
            using (DpsConnection cnn = new DpsConnection())
            {
                string sqlq = @"SELECT Id, [UserName],[FirstName],[LastName],[FullName],Avatar,UserType,Icon,Email,PhoneNumber
                                FROM [dbo].[Vb_NguoiDung] where Id = @Id";
                DataTable dt = cnn.CreateDataTable(sqlq, new SqlConditions { { "Id", id } });
                if (dt.Rows.Count > 0 || cnn.LastError == null)
                {
                    kq = dt.Rows[0]["UserType"].ToString();
                }
            }
            return kq;

        }

        /// <summary>
        /// Kiểm tra người dùng có phải người dùng gốc ko (dùng để kiểm tra quyền, người dùng gốc có toàn quyền)
        /// </summary>
        /// <param name="userId">iduser</param>
        /// <returns>Chuỗi true nếu là user gốc, false là user thường</returns>
        public static string QueryCheckUserGoc(long userId)
        {
            if (string.IsNullOrEmpty(userId.ToString()))
                return "0=1";
            return " (isnull(( select top 1 UserType from Vb_NguoiDung where id=" + userId + @"),-1) = 0)";
        }

        /// <summary>
        /// Hàm này phục vụ cho lúc lấy menu, lấy quyền của User
        /// Hàm này được kế thừa từ EHR trước đó
        /// Create: 26/03/2019
        /// </summary>
        /// <param name="username">Username có thể được lấy từ LoginData</param>
        /// <returns></returns>
        public static string[] GetRolesForUser(string username)
        {
            SqlConditions Conds = new SqlConditions();
            Conds.Add("Username", username);
            using (DpsConnection Conn = new DpsConnection())
            {
                DataTable Tb = Conn.CreateDataTable("select * from Tbl_Account_Permit where (where)", "(where)", Conds);
                DataTable quyennhom = Conn.CreateDataTable("select Id_permit from tbl_group_permit gp inner join tbl_group_account gu on gp.id_group=gu.id_group where (where)", "(where)", Conds);
                DataTable Quyenmacdinh = Conn.CreateDataTable("select chucvu.IsManager, chucvu.Yeucautuyendung, chucvu.Capnhatkehoach, chucvu.Taoquytrinh from tbl_nhanvien nv inner join tbl_account acc on nv.id_nv=acc.id_nv inner join tbl_chucdanh on nv.id_chucdanh=tbl_chucdanh.id_row inner join chucvu on tbl_chucdanh.id_cv=chucvu.id_cv where (where)", "(where)", Conds);
                int soquyenmacdinh = 0;
                bool ismanager = false;
                bool yeucautuyendung = false;
                bool capnhatkehoach = false;
                bool taoquytrinh = false;
                if (Quyenmacdinh.Rows.Count > 0)
                {
                    if (Quyenmacdinh.Rows[0][0] != null)
                        ismanager = (bool)Quyenmacdinh.Rows[0][0];
                    if (Quyenmacdinh.Rows[0][1] != DBNull.Value)
                        yeucautuyendung = (bool)Quyenmacdinh.Rows[0][1];
                    if (Quyenmacdinh.Rows[0][2] != DBNull.Value)
                        capnhatkehoach = (bool)Quyenmacdinh.Rows[0][2];
                    if (Quyenmacdinh.Rows[0][3] != DBNull.Value)
                        taoquytrinh = (bool)Quyenmacdinh.Rows[0][3];
                    if (ismanager) soquyenmacdinh++;
                    if (yeucautuyendung) soquyenmacdinh++;
                    if (capnhatkehoach) soquyenmacdinh++;
                    if (taoquytrinh) soquyenmacdinh++;
                }
                StringCollection colroles = new StringCollection();
                if (ismanager)
                {
                    colroles.Add("4");
                }
                if (yeucautuyendung)
                {
                    colroles.Add("7");
                }
                if (capnhatkehoach)
                {
                    colroles.Add("8");
                }
                if (taoquytrinh)
                {
                    colroles.Add("6");
                }
                for (int i = 0; i < Tb.Rows.Count; i++)
                {
                    if (!colroles.Contains(Tb.Rows[i]["Id_permit"].ToString()))
                        colroles.Add(Tb.Rows[i]["Id_permit"].ToString());
                }
                for (int i = 0; i < quyennhom.Rows.Count; i++)
                {
                    if (!colroles.Contains(quyennhom.Rows[i]["Id_permit"].ToString()))
                        colroles.Add(quyennhom.Rows[i]["Id_permit"].ToString());
                }
                string[] roles = new string[colroles.Count];
                for (int i = 0; i < colroles.Count; i++)
                {
                    roles[i] = colroles[i];
                }
                return roles;
            }

        }

        /// <summary>
        /// Hàm này phục vụ cho lúc lấy menu, lấy quyền của User
        /// Hàm này được kế thừa từ EHR trước đó
        /// Create: 26/03/2019
        /// </summary>
        /// <param name="username">Username có thể được lấy từ LoginData</param>
        /// <returns></returns>
        public static List<int> GetListRolesForUser(string username)
        {
            List<int> roles = new List<int>();
            SqlConditions Conds = new SqlConditions();
            Conds.Add("Username", username);
            using (DpsConnection Conn = new DpsConnection())
            {
                DataTable Tb = Conn.CreateDataTable("select * from Tbl_Account_Permit where (where)", "(where)", Conds);
                DataTable quyennhom = Conn.CreateDataTable("select Id_permit from tbl_group_permit gp inner join tbl_group_account gu on gp.id_group=gu.id_group where (where)", "(where)", Conds);
                DataTable Quyenmacdinh = Conn.CreateDataTable("select chucvu.IsManager, chucvu.Yeucautuyendung, chucvu.Capnhatkehoach, chucvu.Taoquytrinh from tbl_nhanvien nv inner join tbl_account acc on nv.id_nv=acc.id_nv inner join tbl_chucdanh on nv.id_chucdanh=tbl_chucdanh.id_row inner join chucvu on tbl_chucdanh.id_cv=chucvu.id_cv where (where)", "(where)", Conds);
                int soquyenmacdinh = 0;
                bool ismanager = false;
                bool yeucautuyendung = false;
                bool capnhatkehoach = false;
                bool taoquytrinh = false;
                if (Quyenmacdinh.Rows.Count > 0)
                {
                    if (Quyenmacdinh.Rows[0][0] != null)
                        ismanager = (bool)Quyenmacdinh.Rows[0][0];
                    if (Quyenmacdinh.Rows[0][1] != DBNull.Value)
                        yeucautuyendung = (bool)Quyenmacdinh.Rows[0][1];
                    if (Quyenmacdinh.Rows[0][2] != DBNull.Value)
                        capnhatkehoach = (bool)Quyenmacdinh.Rows[0][2];
                    if (Quyenmacdinh.Rows[0][3] != DBNull.Value)
                        taoquytrinh = (bool)Quyenmacdinh.Rows[0][3];
                    if (ismanager) soquyenmacdinh++;
                    if (yeucautuyendung) soquyenmacdinh++;
                    if (capnhatkehoach) soquyenmacdinh++;
                    if (taoquytrinh) soquyenmacdinh++;
                }
                if (ismanager)
                {
                    roles.Add(4);
                }
                if (yeucautuyendung)
                {
                    roles.Add(7);
                }
                if (capnhatkehoach)
                {
                    roles.Add(8);
                }
                if (taoquytrinh)
                {
                    roles.Add(6);
                }
                for (int i = 0; i < Tb.Rows.Count; i++)
                {
                    if (!roles.ToString().Contains(Tb.Rows[i]["Id_permit"].ToString()))
                        roles.Add(int.Parse(Tb.Rows[i]["Id_permit"].ToString()));
                }
                for (int i = 0; i < quyennhom.Rows.Count; i++)
                {
                    if (!roles.ToString().Contains(quyennhom.Rows[i]["Id_permit"].ToString()))
                        roles.Add(int.Parse(quyennhom.Rows[i]["Id_permit"].ToString()));
                }
                return roles;
            }
        }

        public static string GetCustemerIDByToken(string token)
        {
            SqlConditions conds = new SqlConditions();
            DataTable Tb = new DataTable();
            if (string.IsNullOrEmpty(token))
                return null;
            try
            {
                conds.Add("token", token);
                using (DpsConnection cnn = new DpsConnection())
                {
                    string sqlq = @"select CustemerID from LoginSection join tbl_nhanvien on id_nv=id join tbl_cocautochuc on cocauid=tbl_cocautochuc.RowID where token=@token";
                    Tb = cnn.CreateDataTable(sqlq,conds);
                    if (Tb.Rows.Count > 0) return Tb.Rows[0][0].ToString();
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}