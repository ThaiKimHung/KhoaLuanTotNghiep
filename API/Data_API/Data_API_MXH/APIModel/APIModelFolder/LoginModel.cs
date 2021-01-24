using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APIModel
{
    public class LoginModel : BaseModel<LoginData>
    {
    }
    public class LoginData
    {
        public long Id { get; set; }
        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// Họ
        /// </summary>
        public string FirstName { get; set; } = "";
        /// <summary>
        /// Tên
        /// </summary>
        public string LastName { get; set; } = "";
        /// <summary>
        /// Trạng thái (0 là khoá, 1 là kích hoạt,2:Kích hoạt để gia hạn gói, 4: Kích hoạt để nâng cấp gói)
        /// </summary>
        public int Status { get; set; } = 0;
        /// <summary>
        /// Mảng quyền của người dùng
        /// </summary>
        public List<int> Rules { get; set; }
        /// <summary>
        /// ID khách hàng dps (id nhóm đa người dùng)
        /// </summary>
        public long IDKHDPS { get; set; }
        /// <summary>
        /// ID khách hàng dps (Đã mã hóa)
        /// </summary>
        public string IDKHDPS_Encode { get; set; }
        /// <summary>
        /// Loại người dùng (-1: admin dps; 0: user gốc; 1: user thường)
        /// </summary>
        public int UserType { get; set; } = 0;
        public string FullName { get { return FirstName + " " + LastName; } }
        public string Token { get; set; }
        public string SecurityStamp { get; set; } = "dps";
        /// <summary>
        /// Số lần nhập sai mật khẩu
        /// </summary>
        public int SoLuong { get; set; } = 0;
        public string Logo { get; set; }
        public string Domain { get; set; }
        /// <summary>
        /// Cho phép nhân viên lấy mẫu khuôn mặt
        /// </summary>
        public bool allowRegister { get; set; }
        /// <summary>
        /// Cho phép xác thực chấm công GPS
        /// </summary>
        public bool isCheckCapcha { get; set; }
        public int LoaiHinh { get; set; }
    }
    public class LoginViewModel
    {
        public LoginViewModel() { }
        [Required(ErrorMessage = "Vui nhập tên đăng nhập.")]
        [MaxLength(99, ErrorMessage = "Tài khoản tối đa 99 ký tự.")]
        [DisplayName("Tài khoản")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Mật khẩu không được để trống.")]
        [DisplayName("Mật khẩu")]
        public string Password { get; set; }
        [DisplayName("Ghi nhớ")]
        public bool isPersistent { get; set; }
        public string ReturnUrl { get; set; }
        public string macaddress { get; set; }
        public string computername { get; set; }
        public string GCCode { get; set; }
        public string LangCode { get; set; } = "vi";
    }
    public class LoginAPIModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
    public class RecapchaModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}