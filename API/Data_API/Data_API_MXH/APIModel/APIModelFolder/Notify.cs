using APIModel.BLayer;
using DpsLibs.Data;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace APIModel.Models
{
    public class Notify
    {
        public string LastErrorMgs;
        public Exception LastError;
        public Notify()
        {
            LastErrorMgs = "";
            LastError = null;
        }
        /// <summary>
        /// Push Notify
        /// </summary>
        /// <param name="From_IDNV">Notify phát sinh từ ai, để trống nếu không phát sinh từ hành động của ai</param>
        /// <param name="To_IDNV">Notify to: bắt buộc</param>
        /// <param name="AppCode">Link dẩn tới app nào thì nhập appcode của app đó</param>
        /// <param name="TitleLangueKey">LangueKey của thông báo, phải khai báo trong resource của API_LandingPade</param>
        /// <param name="ReplaceData">Danh sách dữ liệu sẽ replace vào title lấy từ resource theo LangueKey</param>
        /// <param name="To_Link_WebApp">Đường dẩn routing đến trang khi user click vào</param>
        /// <param name="To_Link_MobileApp">Đường dẩn deeplink khi user click vào trên mobile app</param>
        /// <param name="ComponentName">Trường hợp popup thì khai báo component ở đây</param>
        /// <param name="Component">Dữ liệu truyền qua Component</param>
        /// <returns></returns>
        public bool PushNotify(string From_IDNV, string To_IDNV, string AppCode, string TitleLangueKey, Hashtable ReplaceData, string To_Link_WebApp, string To_Link_MobileApp, string ComponentName, string Component)
        {
            string replacedata = "", component = "", domain = "", custemerid = "", image = "", path = "", title = General.getErrorMessageFromBackend(TitleLangueKey);
            //ReplaceData
            foreach (DictionaryEntry h in ReplaceData)
            {
                title = title.Replace($"${h.Key}$", h.Value.ToString());
                replacedata += $"$;${h.Key}$:${h.Value}";
            }
            if (!string.IsNullOrEmpty(replacedata)) replacedata = replacedata.Substring(3);

            //Component
            //foreach (DictionaryEntry h in Component)
            //{
            //    component += $"$;${h.Key}$:${h.Value}";
            //}
            component = Component;
            //if (!string.IsNullOrEmpty(component)) component = component.Substring(3);
            using (DpsConnection cnn = new DpsConnection("ConnectionString_JeeGlobal", true))
            {
                custemerid = General.GetCustemerID(To_IDNV, cnn);
                domain = General.GetThamSo(cnn, custemerid, 554);
                //Lấy hình nhân viên
                image = $"{domain}Images/Noimage.jpg";
                path = $"{domain}images/nhanvien/{custemerid}/{From_IDNV}.jpg";
                if (File.Exists(path))
                {
                    image = path;
                }

                //Insert Notify
                Hashtable val = new Hashtable();
                val.Add("Title", title);
                val.Add("Link", To_Link_WebApp);
                val.Add("NotifyTo", To_IDNV);
                val.Add("NotifyTime", DateTime.Now);
                val.Add("AppCode", AppCode);
                val.Add("Langkey", TitleLangueKey);
                val.Add("Icon", image);
                if (!string.IsNullOrEmpty(To_Link_MobileApp)) val.Add("AppLink", To_Link_MobileApp);
                val.Add("AppIcon", image);
                if (!string.IsNullOrEmpty(From_IDNV)) val.Add("ActionFrom", From_IDNV);
                if (!string.IsNullOrEmpty(ComponentName)) val.Add("ComponentName", ComponentName);
                if (!string.IsNullOrEmpty(component)) val.Add("Component", component);
                if (!string.IsNullOrEmpty(replacedata)) val.Add("ReplaceData", replacedata);
                if (cnn.Insert(val, "UserNotify") != 1)
                {
                    LastErrorMgs = "Lưu thông báo thất bại";
                    LastError = cnn.LastError;
                    return false;
                }
                //Push Notify lên: webapp, mobile app
                NofModel notifyFCM = new NofModel();
                notifyFCM.title = title;
                notifyFCM.message = title;
                notifyFCM.icon = image;
                notifyFCM.link = $"{domain = General.GetDomainByAppCode(AppCode, cnn)}/{To_Link_WebApp}";
                if (!pushMessageById(To_IDNV, notifyFCM))
                {
                    return false;
                }
                return true;
            }
        }

        public bool PushNotify(string From_IDNV, string To_IDNV, string AppCode, string TitleLangueKey, Hashtable ReplaceData, string To_Link_WebApp, string To_Link_MobileApp, string ComponentName, string Component, DpsConnection cnn, DpsConnection cnnJeeHR)
        {
            string replacedata = "", component = "", domain = "", custemerid = "", image = "", path = "", title = General.getErrorMessageFromBackend(TitleLangueKey);
            //ReplaceData
            foreach (DictionaryEntry h in ReplaceData)
            {
                title = title.Replace($"${h.Key}$", h.Value.ToString());
                replacedata += $"$;${h.Key}$:${h.Value}";
            }
            if (!string.IsNullOrEmpty(replacedata)) replacedata = replacedata.Substring(3);

            //Component
            //foreach (DictionaryEntry h in Component)
            //{
            //    component += $"$;${h.Key}$:${h.Value}";
            //}
            component = Component;
            //if (!string.IsNullOrEmpty(component)) component = component.Substring(3);
            //using (DpsConnection cnn = new DpsConnection("ConnectionString_JeeGlobal", true))
            //{
            custemerid = General.GetCustemerID(To_IDNV, cnn);
            domain = General.GetThamSo(cnn, custemerid, 554);
            //Lấy hình nhân viên
            image = $"{domain}Images/Noimage.jpg";
            path = $"{domain}images/nhanvien/{custemerid}/{From_IDNV}.jpg";
            if (File.Exists(path))
            {
                image = path;
            }

            //Insert Notify
            Hashtable val = new Hashtable();
            val.Add("Title", title);
            val.Add("Link", To_Link_WebApp);
            val.Add("NotifyTo", To_IDNV);
            val.Add("NotifyTime", DateTime.Now);
            val.Add("AppCode", AppCode);
            val.Add("Langkey", TitleLangueKey);
            val.Add("Icon", image);
            if (!string.IsNullOrEmpty(To_Link_MobileApp)) val.Add("AppLink", To_Link_MobileApp);
            val.Add("AppIcon", image);
            if (!string.IsNullOrEmpty(From_IDNV)) val.Add("ActionFrom", From_IDNV);
            if (!string.IsNullOrEmpty(ComponentName)) val.Add("ComponentName", ComponentName);
            if (!string.IsNullOrEmpty(component)) val.Add("Component", component);
            if (!string.IsNullOrEmpty(replacedata)) val.Add("ReplaceData", replacedata);
            if (cnn.Insert(val, "UserNotify") != 1)
            {
                LastErrorMgs = "Lưu thông báo thất bại";
                LastError = cnn.LastError;
                return false;
            }
            //Push Notify lên: webapp, mobile app
            NofModel notifyFCM = new NofModel();
            notifyFCM.title = title;
            notifyFCM.message = title;
            notifyFCM.icon = image;
            notifyFCM.link = $"{domain = General.GetDomainByAppCode(AppCode, cnn)}/{To_Link_WebApp}";
            if (!pushMessageById(To_IDNV, notifyFCM, cnnJeeHR))
            {
                return false;
            }
            return true;
            //}
        }

        /// <summary>
        /// Push thông báo bằng id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public bool pushMessageById(string id, NofModel data)
        {
            DataTable dt = null;
            using (DpsConnection cnn = new DpsConnection())
            {
                string sql = "select fcm.* from fcm join LoginSection sec on fcm.IdUser=Id and sec.Token=fcm.Token where IdUser=@Id and EndPoint is not null";
                dt = cnn.CreateDataTable(sql, new SqlConditions { { "Id", id } });
                if (dt == null || dt.Rows.Count == 0)
                    return false;
                cnn.Disconnect();
            }
            foreach (DataRow dr in dt.Rows)
            {
                NofUserDevice dev = new NofUserDevice()
                {
                    IdRow = long.Parse(dr["IdRow"].ToString()),
                    IdUser = long.Parse(dr["IdUser"].ToString()),
                    Token = dr["Token"].ToString(),
                    Auth = dr["auth"].ToString(),
                    EndPoint = dr["endpoint"].ToString(),
                    P256dh = dr["p256dh"].ToString(),
                    PrivateKey = dr["PrivateKey"].ToString(),
                    PublicKey = dr["PublicKey"].ToString()
                };
                Task.Run(() => pushFCM(dev, data));
            }
            return true;
        }
        public bool pushMessageById(string id, NofModel data, DpsConnection cnn)
        {
            DataTable dt = null;
            //using (DpsConnection cnn = new DpsConnection())
            //{
            string sql = "select fcm.* from fcm join LoginSection sec on fcm.IdUser=Id and sec.Token=fcm.Token where IdUser=@Id and EndPoint is not null";
            dt = cnn.CreateDataTable(sql, new SqlConditions { { "Id", id } });
            if (dt == null || dt.Rows.Count == 0)
                return false;
            cnn.Disconnect();
            //}
            foreach (DataRow dr in dt.Rows)
            {
                NofUserDevice dev = new NofUserDevice()
                {
                    IdRow = long.Parse(dr["IdRow"].ToString()),
                    IdUser = long.Parse(dr["IdUser"].ToString()),
                    Token = dr["Token"].ToString(),
                    Auth = dr["auth"].ToString(),
                    EndPoint = dr["endpoint"].ToString(),
                    P256dh = dr["p256dh"].ToString(),
                    PrivateKey = dr["PrivateKey"].ToString(),
                    PublicKey = dr["PublicKey"].ToString()
                };
                Task.Run(() => pushFCM(dev, data));
            }
            return true;
        }
        /// <summary>
        /// Push thông báo bằng token
        /// </summary>
        /// <param name="token"></param>
        /// <param name="data"></param>
        /// <returns></returns> 
        public bool pushFCM(NofUserDevice device, NofModel data)
        {
            var pushEndpoint = device.EndPoint;
            var p256dh = device.P256dh;
            var auth = device.Auth;

            var subject = "mailto: example@example.com";
            var publicKey = device.PublicKey;
            var privateKey = device.PrivateKey;

            var subscription = new WebPush.PushSubscription(pushEndpoint, p256dh, auth);
            var vapidDetails = new WebPush.VapidDetails(subject, publicKey, privateKey);

            var webPushClient = new WebPush.WebPushClient();
            string text = JsonConvert.SerializeObject(data);
            try
            {
                webPushClient.SendNotificationAsync(subscription, text, vapidDetails);
                return true;
            }
            catch (WebPush.WebPushException exception)
            {
                LastErrorMgs = "Push thông báo thất bại";
                LastError = exception;
                return false;
            }
        }
        public class NofModel
        {
            public NofModel() { }
            public NofModel(string _title)
            {
                title = _title;
                message = "";
            }
            public NofModel(string _title, string _message, string _link)
            {
                title = _title;
                message = _message;
                link = _link;
            }
            public NofModel(string _title, string _message, string _link, string _icon)
            {
                title = _title;
                message = _message;
                link = _link;
                icon = _icon;
            }
            public string message { get; set; }
            public string link { get; set; }
            public string title { get; set; }
            public string icon { get; set; }
        }
        public partial class NofUserDevice
        {
            public long IdRow { get; set; }
            public decimal IdUser { get; set; }
            public string Token { get; set; }
            public string PublicKey { get; set; }
            public string PrivateKey { get; set; }
            public string EndPoint { get; set; }
            public string Auth { get; set; }
            public string P256dh { get; set; }
            public DateTime CreatedDate { get; set; }
        }
    }
    public class Reminder
    {
        public string LastErrorMgs;
        public Exception LastError;
        public Reminder()
        {

        }
        /// <summary>
        /// Cập nhật nhắc nhở
        /// </summary>
        /// <param name="IDNV"></param>
        /// <param name="TypeID"></param>
        /// <returns></returns>
        public bool UpdateReminder(string IDNV, int TypeID)
        {
            int Soluongmoi = 0;
            switch (TypeID)
            {
                case 100: Soluongmoi = CountHRNotification(IDNV); break;

                //Mổi người tự thêm vô hàm đế riêng của mình hình nhắc nhỡ vào viết thêm case ... ở đây
                default:
                    break;
            }
            using (DpsConnection cnn = new DpsConnection("ConnectionString_JeeGlobal", true))
            {
                object value = cnn.ExecuteScalar("select rowid from Reminders where Loai=@TypeID and id_nv=@IDNV", new SqlConditions() { { "TypeID", TypeID }, { "IDNV", IDNV } });
                //Insert
                if (value == null)
                {
                    if (cnn.ExecuteNonQuery(@"insert into Reminders select Title, WebAppLink, @IDNV, GETDATE(), WebAppTarget, @TypeID , TitleLangueKey, @SL, WebAppIcon, MobileAppLink, MobileAppIcon, ComponentName,Component
                    from ReminderTypes where TypeID=@TypeID", new SqlConditions() { { "TypeID", TypeID }, { "IDNV", IDNV }, { "SL", Soluongmoi } }) != 1)
                    {
                        LastErrorMgs = "Lưu nhắc nhở thất bại";
                        LastError = cnn.LastError;
                        return false;
                    }
                }
                //Update
                else
                {
                    if (cnn.ExecuteNonQuery(@"update Reminders set Soluong=@SL, LastUpdate=GETDATE()
                    where RowID=@RowID", new SqlConditions() { { "RowID", value }, { "SL", Soluongmoi } }) != 1)
                    {
                        LastErrorMgs = "Lưu nhắc nhở thất bại";
                        LastError = cnn.LastError;
                        return false;
                    }

                }
                return true;
            }
        }
        private int CountLeavePending(string id_nv, int id_loai)
        {
            //Đếm số đơn xin phép đang chờ duyệt
            int result = 0;
            //Người làm module này sẽ tự viết hàm này để trả về được số lượng cần đếm để nhắc nhỡ

            return result;
        }
        private int CountRecruitmentRequest(string id_nv, int id_loai)
        {
            //Đếm số đơn yêu cầu tuyển dụng đang chờ duyệt
            int result = 0;
            //Người làm module này sẽ tự viết hàm này để trả về được số lượng cần đếm để nhắc nhỡ

            return result;
        }
        /// <summary>
        /// Đếm thông báo nhân sự
        /// </summary>
        /// <param name="IDNV"></param>
        /// <returns></returns>
        private int CountHRNotification(string IDNV)
        {
            //Đếm số đơn xin phép đang chờ duyệt
            SqlConditions conds = new SqlConditions();
            conds.Add("CustemerID", General.GetCustemerID(IDNV));
            conds.Add("id_nv", IDNV);
            DataTable dt = new DataTable();
            using (DpsConnection cnn = new DpsConnection())
            {
                dt = cnn.CreateDataTable(@"SELECT Tbl_Nhanvien.id_nv
                FROM Tbl_Quydinh left join Tbl_Nhanvien on id_nv=@id_nv
                left join Tbl_QuyDinh_NguoiNhan on ID_ThongBao = ID_Quydinh and (Tbl_QuyDinh_NguoiNhan.ID_NV is null or Tbl_QuyDinh_NguoiNhan.ID_NV=@id_nv)
                left join tbl_nhanvien nv on nv.Id_NV = Tbl_Quydinh.ModifiedBy 
                where CustemerID=@CustemerID and hienthi=1 and (Is_Read=0 or Is_Read is null)", conds);
            }
            return dt.Rows.Count;
        }
    }
}