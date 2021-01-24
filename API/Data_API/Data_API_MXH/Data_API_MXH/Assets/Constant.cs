namespace Data_API_MXH.Assets
{
    public class Constant
    {
        public const string ERRORCODE = "101";//lỗi token
        public const string ERRORDATA = "106";//lỗi token
        public const string ERRORCODETIME = "102";//lỗi về time
        public const string ERRORCODE_SQL = "103";//lỗi sql
        public const string ERRORCODE_FORM = "104";//lỗi về dữ liệu khi post thiếu dl
        public const string ERRORCODE_ROLE = "105";//lỗi về quyền truy cập chức năng
        public const string ERRORCODE_NOTEXISTS = "107";//Lỗi dữ liệu truyền vào không tồn tại
        public const string ERRORCODE_EXCEPTION = "0000";//EXCEPTION
        public const string ERROR_NODATA = "108";//lỗi không có dữ liệu

        public const string BASE_URL_Img = "https://gateway.webcore.vn/";
        public const string BASE_URL_ImgLoaiHang = "http://sales.webcore.vn";
        public const string BASE_URL_ImgNhanVien = "http://hrm.webcore.vn/";
        public static string RootUpload { get { return "/dulieu"; } }
        public static string HinhAnh { get { return "/hinhanh"; } }
        public static string HinhAnh_MatHang { get { return "/hinhanh/mathang"; } }
        public static string HinhAnh_Logo { get { return "/hinhanh/logo"; } }
        public static string HinhAnh_LoaiHang { get { return "/hinhanh/loaihang"; } }
        public static string HinhAnh_NhanVien { get { return "/images/nhanvien"; } }
        public const string linklogin = "http://apptest.jeehr.com";
        public const string linkAPI = "http://apitest.jeehr.com";
        public const string PASSWORD_ED = "JeeHR_DPSSecurity435";
        public const string linkAI = "http://115.79.28.221";
        public const string Authorization = "Token 78c30d151382c93ae3e216acdff4e614d8032aeb";
        public const string PassEnDecSalary = "Sa_ABB__~!12DPS";
        public static int MaxSize { get { return 30000000; } }//maximum file size 30MB

        public const string LinkWework = "http://localhost:4010";
    }
    public enum StateCode
    {
        NoPermit,
        CannotGetData
    }
}
