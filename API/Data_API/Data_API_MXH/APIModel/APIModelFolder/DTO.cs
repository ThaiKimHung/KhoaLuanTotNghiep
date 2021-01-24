using DpsLibs.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModel.DTO
{
    /// <summary>
    /// Cac thuoc tinh cua nhan vien
    /// </summary>
    [Serializable]
    public class EDTO
    {
        public EDTO()
        {
            //
            // TODO: Add constructor logic here
            //
            thamgiacongdoan = false;
            KinhnghiemLVNH = new KNLVNH();
            Mucluong = new Collection<Luongthang>();
            Luongthuviec = 0;
            Mucluongthuviec = new Collection<Luongthang>();
            IsForeigner = false;
            IsKycamketthue = true;
            CachtinhthueTNCN = "";
            Languoikhuyettat = false;
            IsCutrutu180ngay = false;
            IsPhobienoiquy = false;
        }
        public Int32 id_nv;
        public string manv;
        public string holot;
        public string ten;
        public DateTime ngaysinh;
        public string gioitinh;
        public string diachithuongtru;
        public string Full_Diachithuongtru;
        public Int32 id_tinh_thuongtru;
        public string tentinh_thuongtru;
        public Int32 id_huyen_thuongtru;
        public string tenhuyen_thuongtru;
        public int Thuongtru_Xa;
        public string Thuongtru_Xa_ten;
        public string phone_thuongtru;
        public string diachitamtru;
        public string Full_Diachitamtru;
        public Int32 id_tinh_tamtru;
        public string tentinh_tamtru;
        public Int32 id_huyen_tamtru;
        public string tenhuyen_tamtru;
        public int Tamtru_Xa;
        public string Tamtru_Xa_ten;
        public string phone_tamtru;
        public string mobile;
        public string email;
        public Int32 id_dantoc;
        public string tendantoc;
        public Int32 id_tongiao;
        public string tentongiao;
        public Int32 id_tinh;
        public string tentinh;
        public string cmnd;
        public DateTime ngaycapcmnd;
        public string noicapcmnd;
        public string id_noicapcmnd;
        public string sopassport;
        public DateTime ngaycappassport;
        public string noicappassport;
        public Int32 id_chucdanh;
        public string tenchucdanh;
        public Int32 id_cv;
        public string tenchucvu;
        public Int32 id_tthn;
        public string tinhtranghn;
        public DateTime ngayvaodoan;
        public DateTime ngayvaodang;
        public string quanhegiadinh;
        public string kynangngonngu;
        public string quatrinhhoctap;
        public string quatrinhcongtac;
        public string mataikhoan;
        public string masothue;
        public string sotaikhoan;
        public Int32 id_nganhang;
        public string tennganhang;
        public Int32 id_bangcap;
        public string trinhdo = "";
        public string chuyenmon;
        public string bangcapkhac;
        public bool dongbhxh;
        public string sosobhxh;
        public DateTime ngaycapsobhxh;
        public DateTime ngayhethanbhxh;
        public bool dongbhyt;
        public string sothebhyt;
        public DateTime ngaycapthebhyt;
        public DateTime ngayhethanbhyt;
        public string noidangkykcb;
        public string thangthamgiabhxh;
        public int namthamgiabhxh;
        public DateTime ngayvaocongty;
        public DateTime ngayvaobienche;
        public Int32 id_loainv;
        public string tenloainv;
        public Int32 sogiolv;
        public bool thoiviec = false;
        public string soqdtv;
        public Int32 id_loaitv;
        public string tenloaithoiviec;
        public DateTime ngaythoiviec;
        public DateTime ngaykyqdtv;
        public string nguoikyqdtv;
        public string lydothoiviec;
        public string trocapthoiviec;
        public string boithuongthoiviec;
        public bool trathe = false;
        public DateTime ngaytrathe;
        public bool tamnghi = false;
        public Int32 id_to;
        public Int32 id_bp;
        public Int32 id_dv;
        public string tento;
        public string tenbp;
        public string tendonvi;
        public int songayphep;
        public int id_loaihopdong;
        public string macd;
        //public Int32 id_quanly;
        public string sosolaodong;
        public DateTime ngaycapsolaodong;
        public string hocham;
        public string quoctich = "";
        public Int32 id_hinhthuctv;
        public string tenhinhthucthoiviec;
        //public string Tenquanly;
        public bool thamgiacongdoan;
        public string tentinhtranghonnhan;
        public string namsinh;
        public int cap;
        public string tinhdangkykcb;
        public string id_noikcb;
        public string tenbangcap;
        public KNLVNH KinhnghiemLVNH;
        public bool Alloweditchucdanh;
        public int id_hs;
        public int id_cvtd;
        public string sohdld;
        public DateTime ngaykyHD;
        public DateTime ngaybatdauHD;
        public DateTime ngayketthucHD;
        public string Sothe;
        public bool DongBHTN;
        public DateTime Ngayhethanthuviec;
        public Collection<Luongthang> Mucluong;
        public bool DongPCD = false;
        public int chieucao;
        public double cannang;
        public int nhommau;
        public string Tinhtrangsuckhoe;
        public DateTime NgayvaoDangchinhthuc;
        public DateTime Ngaynhapngu;
        public int Quanham;
        public DateTime Ngayxuatngu;
        public int Giadinhchinhsach;
        public string Ghichuquansu;
        public int Hangthuongbinh;
        public int Trinhdochinhtri;
        public int Trinhdotinhoc;
        public string Tentrinhdovitinh;
        public string Tentrinhdochinhtri;
        public string Tentrinhdongoaingu;
        public string TenloaiHD;
        //public string SoGPLX;
        //public DateTime NgaycapGPLX;
        //public DateTime NgayhethanGPLX;
        //public int NoicapGPLX;
        public int Diadiemlamviec;
        public int Luongthuviec;
        public string Nickname;
        public string ChucvutrongDoan;
        public string NoivaoDang;
        public string Nguoigioithieu1;
        public string Congviecnoio1;
        public string Nguoigioithieu2;
        public string Congviecnoio2;
        public string NoivaoDangchinhthuc;
        public string SotheDang;
        public DateTime NgaycaptheDang;
        public string NoicaptheDang;
        public string ChucvutrongDang;
        public int Hangbenhbinh;
        public string Hoancanhnhao;
        public DateTime Ngaythamgiacongdoan;
        public string Chucvutrongcongdoan;
        public string Tenquanham;
        public string Tengiadinhchinhsach;
        public string Tenhangthuongbinh;
        public string Tenhangbenhbinh;
        public decimal Nguyenquan;
        public string Tennguyenquan;
        public Collection<Luongthang> Mucluongthuviec;
        public DateTime Ngaybatdaudongbhxh;
        public DateTime Ngaybatdaudongbhtn;
        public DateTime Ngaytrasobhxh;
        public bool Datrasobhxh;
        public string Diemmanh;
        public string Diemyeu;
        public string Ghichuthoiviec;
        public string Toadodiachitamtru;
        public string Tentruongtotnghiep;
        public int truongtotnghiep;
        public string filethoiviec;
        //Field dành cho tuyển dụng
        public string Keyword;
        public int Status;
        //Field dành cho thông tin tạm trú (Thành Bưởi)
        public string tenchuho;
        public string quanhevoichuho;
        public string sosohokhau;
        public string ghichu;
        public string namsinhchuho;
        /// <summary>
        /// Kinh nghiệm làm việc tính bằng tháng
        /// </summary>
        public int Kinhnghiemlamviec;
        #region thông tin giảng viên Bách Việt
        public string mongiangday;
        public string chuyennganh;
        public string totnghiepnganh;
        public string noinamtotnghiep;
        public int tinhtrang;
        public string tentinhtrang;
        public decimal loaigiangvien;
        public string tenloaigiangvien;
        public decimal id_khoa;
        public string tenkhoa;
        public decimal id_kiemnhiem;
        public string tenkiemnhiem;
        #endregion
        public DateTime Ngayvaongachvienchuc;
        public decimal Hangchucdanh;
        public string Tenhangchucdanh;
        public ThangNam Truvaoluongthang;
        public bool Dongpcd_dn;
        public decimal Id_Nvcu;
        public string Id_chedonghi;
        public string Emailcanhan;
        public DateTime Ngayketthucdaotao;
        public DateTime Ngaybatdauthuviec;
        public string Chutaikhoan;
        public DateTime NgayhethanPassport;
        public string Id_nganhhoc;
        public string namtotnghiep;
        public string project;
        public string trinhdobangcap;
        public string Ghichubhxh;
        public string Tendiadiemlamviec;
        public string nguoilienhe;
        public string Sodienthoai_nguoilienhe;
        public string Quanhe_nguoilienhe;
        public string chinhanhnganhang;
        public bool IsForeigner;
        public bool IsKycamketthue;
        public string CachtinhthueTNCN;
        public bool IsCutrutu180ngay;
        public bool Languoikhuyettat;
        public string biensoxemay;
        public string loaixemay;
        public DateTime Ngaybatdaudaotao;
        public DateTime Ngayketthucthuviec;
        public DateTime Ngaybatdauhdlan1;
        public DateTime Ngaybatdauhdlan2;
        public DateTime Ngayketthuchdlan1;
        public DateTime Ngayketthuchdlan2;
        public DateTime Ngayhdkxacdinh;
        public DateTime Ngaybatdauhddichvu;
        public DateTime Ngayketthuchddichvu;
        public DateTime Ngaybatdauthoathuanhoctap;
        public DateTime Ngayketthucthoathuanhoctap;
        public DateTime ngaysinhchuho;
        public string bips_truonghopthoiviec;
        /// <summary>
        /// Mã chấm công dạng số
        /// </summary>
        public int UserID;
        public string Username;
        public string tenbv;
        public string mabv;
        public DateTime ngaycapbhyt;
        public bool IsPhobienoiquy;
        public int Nguontuyendung;
        public int EnrollNumber;
        public bool Cohopdongthuviec;
        public bool Cohopdonglan1;
        public DateTime Thoiviec_Ngaynopdon;
        public string sotaikhoan1;
        public DateTime Thoiviec_Ngaythoiviectheodon;
        public DateTime NgaycapMST;

        public string MauinID_ThoiViec;
        public int StructureID;
        public string Structure;

        //Field riêng cán bộ công chức
        public DateTime Ngaytuyendung;
        public string Nghenghieptruoctuyendung;
        public string Coquantuyendung;
        public string Vitrituyendung;
        public int id_thanhphangd;
        public int DaibieuquochoiID;
        public string Khoa;
        public int Trinhdoquanlynhanuoc;
        public string HH_namphong;
        public string Hocvi;
        public string HV_namphong;
        public string ChucDanhKhoaHoc;
        public string CDKH_namphong;
        public int Trinhdoquanlygiaoduc;
        public string Trinhdonghiepvutheochuyennganh;
        public string Congviecchinhduocgiao;
        public string Sotruongcongtac;
        public int Noisinh_Xa;
        public int Noisinh_Huyen;
        public int Noisinh_Tinh;
        public string Tennoisinh_xa;
        public string Tennoisinh_huyen;
        public string Tennoisinh_tinh;
        public string Noisinh_diachi;
        public int LoaiCongChucID;
        public int NgachID;
        public int Ngach_DetailID;
        public int Bac;
        public double HeSo;
        public Int32 SoTien;
        public DateTime Ngayvaongach;
        public DateTime NgayHuong;
        public DateTime Ngaytaingu;
        public string DanhHieuCaoNhat;
        public string DHCC_Namphong;
        public string Nghihuu_noicutru;
        public Collection<Phucap> PhuCap;
        public string thanhphangiaidinh;
        public string tentrinhdoquanlynhannuoc;
        public string tentrinhdoquanlygiaoduc;
        public string tenhocham;
        public string tendaibieuquochoi;
        public string tendanhhieuduocphongcaonhat;
        public string full_noisinh;
        public string tenloaicongchuc;
        public string tenngach;
        public string tenngachdetail;
        public string tenmauinthoiviec;
        public string tennhommau;
        public Int32 Thangluongid;
        public string mangachdetail;
    }
    public class ThangNam
    {
        public ThangNam()
        {
            thang = 0;
            nam = 0;
        }
        public int thang;
        public int nam;
    }
    /// <summary>
    /// Thuoc tinh hop dong
    /// </summary>
    public class CDTO
    {
        public CDTO()
        {

        }
        public Int32 id_hopdong;
        public Int32 Id_nv;
        public string Sohd;
        public string thoigian;
        public DateTime ngayky;
        public DateTime ngaybatdau;
        public DateTime ngayhethan;
        public string nguoiky;
        public Int32 id_cv;
        public string tenchucvu;
        public string tenchucdanh;
        public string noilamviec;
        public string phuongtien;
        public string giailao;
        public string chedoluong;
        public Int32 luongchinh;
        public Int32 luonggross;
        public string ngaytraluong;
        public string chedothuong;
        public string giolamviec;
        public string congviecchinh;
        public string congculamviec;
        public string antoanlaodong;
        public string khamsuckhoe;
        public string chedodaotao;
        public string ghichu;
        public bool active;
        public Int32 loaihopdong;
        public string filehopdong;
        public string CreatedBy;
        public double bhxh;
        public double bhyt;
        public double bhtn;
        public double congdoan;
        public double bhxh_dn;
        public double bhyt_dn;
        public double bhtn_dn;
        public double congdoan_dn;
        public double tongbh;
        public double tongbh_dn;
        public string phucap;
        public string bac;
        public string ngach;
        public double hesoluong;
        public decimal luonghieuqua;
        public string mucluongnhanvien;
        public string chiphidenbu;
        public string diadiemlamviec;
        public string chitietluongnhanvien;
        public string uyquyen;
        public string dienthoaiky;
        public string daidiencho;
        public string diachicty;
        public string noiky;
        public string quoctichquanly;
        public string luongnangsuat;
        public Int32 Id_chucdanh;
        public string mau;
        public string ChedoBHXH;
        public decimal canteen;
        public string tencanteen;
        public decimal id_dv;
        public DateTime ngaylap;
        public int Luongthuviec;
        public string thoigianbaotruoc;
        public string luongthuviecchu;
        public string luongthuviecchu_en;
        public string luongchinhthucchu;
        public string luongchinhthucchu_en;
        public string tenchucdanh_en;
        public decimal fileinhopdong;
        public string phaiquanly;
        public string Nguoiky_en;
        public string Chucvunguoiky_en;
        public string Quoctichnguoiky;
        public string Quoctichnguoiky_en;
        public DateTime Nguoiky_Ngaysinh;
        public DateTime Nguoiky_CMND_Ngaycap;
        public string Nguoiky_CMND;
        public string Nguoiky_CMND_Noicap;
        public string Nguoiky_Diachithuongtru;
        public decimal MauinID;
        public string Nguoiky_chucvu;
        public string Nguoiky_danhxung;
        public string Nguoiky_quoctich;
        public string tenchucdanhchuyenmon;
    }
    public class SalaryHis
    {
        public SalaryHis()
        {
            Luongmoi = new Collection<Luongthang>();
            Luongcu = new Collection<Luongthang>();
            IsTaophuluc = false;
        }
        public Int32 id_his;
        public string SoQD;
        public DateTime Ngaythaydoi;
        public string Nguoiky;
        public Collection<Luongthang> Luongmoi;
        public Collection<Luongthang> Luongcu;
        public Int32 Id_NV;
        public string ghichu;
        public string filequyetdinh;
        public DateTime Ngayky;
        public bool active;
        public string nguoinhap;
        public decimal NgachId;
        public int Bac;
        public double Hesoluong;
        public Int32 LuongCB;
        public Int32 LuongKD;
        public string dgcv_tungay;
        public string dgcv_denngay;
        public Int32 TCMohinh;
        public string Bophandexuat;
        public string trachnhiem;
        public int bac;
        public int Id_ngach;
        public Int32 tongmucmoi;
        public Int32 tongmuccu;
        public string ID_HD;
        public string ID_PL;
        public string noidungcancu;
        public string noidungnoinhan;
        public string Chucvunguoiky;
        public string MauinID;
        public string Noidungthaydoi;
        public DateTime Ngaylap;
        public string Mucluongbangchu;
        public string MucluongbangchuEN;
        public string NoidungthaydoiEn;
        public bool IsTaophuluc;
        public string Nguoiky_en;
        public string Quoctich;
        public string Quoctich_en;
        public string Chucvunguoiky_en;
        public int NFC_Muc;
        public string DonViQD;
        /// <summary>
        /// 0:tỷ lệ, 1: hệ số
        /// </summary>
        public int CachNhapPhuCap;
        public DateTime NgayVaoNgach;
        public int IDDM;
        public decimal Ngach_detailId;
        public int muchuong;
        public Int32 Thangluongid;
    }
    public class WorkHis
    {
        public WorkHis()
        {
            ID = 0;
            Id_nv = 0;
            Id_chudanh = 0;
            Id_bp = 0;
            Id_dv = 0;
            Id_to = 0;
            Old_Id_bp = 0;
            Old_Id_to = 0;
            InsertBCC = false;
            Noilamviec = 0;
            IsTaoPhuluc = false;
            IsDatthuviec = -1;
            IsTuyendungnhap = false;
        }
        public Int32 ID;
        public Int32 Id_nv;
        public string SoQD;
        public DateTime ngayky;
        public string nguoiky;
        public DateTime tungay;
        public Int32 Id_chudanh;
        public Int32 Id_dv;
        public Int32 Id_bp;
        public Int32 Id_to;
        public int Hinhthuc; //0: điều động, 1: bổ nhiệm, 2: Miển nhiệm
        public string filequyetdinh;
        public string motacv;
        public string ghichu;
        public string chucvunguoiky;
        public string cancu;
        //public string QDCua;
        public string Baocao;
        public string Mau;
        public DateTime CreatedDate;
        public Int32 CreatedBy;
        public bool disbale;
        public DateTime DeletedDate;
        public Int32 DeletedBy;
        public DateTime Ngayhethan;
        public bool InsertBCC;
        public decimal Old_Id_bp;
        public decimal Old_Id_to;
        /// <summary>
        /// Mals quyết định được gia hạn
        /// </summary>
        public string id_giahan;
        public string thamquyen;
        public string bpdexuat;
        public string quanlytt;
        public string trachnhiem;
        public int Noilamviec;
        public string Id_quanly;
        public string Old_Id_quanly;
        public string Noidungcancu;
        public string noidungnoinhan;
        public string ID_PLHD;
        public string Id_hd;
        public string Chucvunguoiky;
        public string MauinID;
        public string Noidungthaydoi;
        public DateTime Ngaylap;
        public string NoidungthaydoiEn;
        public bool IsTaoPhuluc;
        public string Nguoiky_en;
        public string Quoctich;
        public string Quoctich_en;
        public string Chucvunguoiky_en;
        public string Id_cvtd;
        public int IsDatthuviec;
        public bool IsTuyendungnhap;
        public int StructureID;
        public bool IsChuyenrangoai;
        public string DonViCD;
        public string ChucVuCD;
    }
    public class KTKL
    {
        public KTKL()
        {
            ID = 0;
            Id_nv = 0;
            mucthuong = 0;
            LastModifiedUser = 0;
        }
        public Int32 ID;
        public string SoQD;
        public Int32 Id_nv;
        public DateTime ngayky;
        public string nguoiky;
        public DateTime ngaykt;
        public string lydo;
        public Int32 mucthuong;
        public int loai;
        public string hinhthuc;
        public string filequyetdinh;
        public DateTime ngaynhap;
        public string ghichu;
        public DateTime LastModified;
        public Int32 LastModifiedUser;
        public DateTime Tungay;
        public DateTime Denngay;
        public double sonam;
        public string chucdanhky;
        public DateTime ngayhopkyluat;
        public string hinhthucta;
        public string noidung;
        public string noidungta;
        public string dieukhoan;
        public string chucdanhky_en;
        public int MauInID;
    }
    public class Reward_Discipline_CBCC
    {
        public Reward_Discipline_CBCC()
        {
            ID = 0;
            Id_nv = 0;
            //mucthuong = 0;
            //LastModifiedUser = 0;
        }
        public Int32 ID;
        public string SoQD;
        public DateTime NgayRaQD;
        public string CoQuanRaQD;
        public string DanhHieuID;
        public string ThanhTich;
        public Int32 Id_nv;
        public int loai;
        public string hinhthuc;
        public DateTime ngaynhap;
        public DateTime LastModified;
        public Int32 LastModifiedUser;
        public DateTime Tungay;
        public DateTime Denngay;
        public string LyDo;
        public DateTime ngayvipham;
    }
    public class Healthy
    {
        public Healthy()
        {

        }
        public Int32 ID;
        public Int32 Id_nv;
        public Int32 Id_user;
        public DateTime Ngaykham;
        public Int32 chiphi;
        public bool Cothuphi;
        public DateTime Ngayhethan;
        public string Ghichu;
        public string Summary;
        public string AttFile;
        public DataTable ListTruluong;
    }
    public class Vacation
    {
        public Vacation()
        {
        }
        public Int32 ID;
        public Int32 Id_nv;
        public DateTime Ngaynghi;
        public int nam;
        public int songay;
        public bool Lock;
        public DateTime ngaynhap;
        public DateTime LastModified;
        public Int32 Nguoinhap;
        public Int32 Nguoisuacuoi;
        public DateTime Ngayvaolam;
    }
    public class Evaluate
    {
        public Evaluate()
        {
            NS_IDNguoixacnhan = 0;
            GN_Diemtrungbinh = 0;
            CN_Diemtrungbinh = 0;
        }
        public Int32 ID;
        public int nam;
        public Int32 ID_nv;
        public int status;
        public DateTime ngaygui;
        public DateTime ngayduyet;
        public DateTime DateCreated;
        public DateTime LastModified;
        public DateTime NS_Ngayxacnhan;
        public Int32 NS_IDNguoixacnhan;
        public string NS_TenNguoixacnhan;
        public string GN_nhanxetchung;
        public string CN_nhanxetchung;
        public string GN_ykiennhanvien;
        public string CN_ykiennhanvien;
        public double Danhgiagiuanam;
        public double Danhgiacuoinam;
        public int Id_xeploaicuoinam;
        public string Tenxeploaicuoinam;
        public int Id_xeploaigiuanam;
        public string Tenxeploaigiuanam;
        public DateTime Ngayxacnhan_NV_GN;
        public DateTime Ngayxacnhan_NS_GN;
        public DateTime Ngayxacnhan_NV_CN;
        public DateTime Ngayxacnhan_NS_CN;
        public Int32 Id_nguoixacnhangiuanam;
        public string Tennguoixacnhangiuanam;
        public Int32 Id_nguoixacnhancuoinam;
        public string Tennguoixacnhancuoinam;
        public bool dadanhgiagiuanam;
        public bool dadanhgiacuoinam;
        public Int32 GN_ID_Nguoidanhgia;
        public string GN_Tennguoidanhgia;
        public Int32 CN_ID_Nguoidanhgia;
        public string CN_Tennguoidanhgia;
        public string Tennhanvien;
        public string Bophan;
        public string CoCauToChuc;
        public string Chucdanh;
        public string Emailnhanvien;
        public string Tenquanly;
        public string Emailquanly;
        public bool nv_dadanhgiagiuanam;
        public bool nv_dadanhgiacuoinam;
        public bool GN_EmpViewable;
        public bool CN_EmpViewable;
        public double GN_Diemtrungbinh;
        public double CN_Diemtrungbinh;
        public Int32 Nguoiduyet;
        public string Diemmanh;
        public string Diemyeu;
        public string Congviecphatsinh;
    }
    public class Norm
    {
        public Norm()
        {

        }
        public Int32 ID;
        public int Id_loai;
        public string tenchitieu;
        public double tyle;
        public DateTime DateCreated;
        public DateTime LastModified;
        public Int32 Id_nguoisua;
        public double Danhgiagiuanam;
        public double Danhgiacuoinam;
        public Int32 Id_Danhgia;
    }
    public class Plan
    {
        public Plan()
        { }
        public Int32 ID;
        public string Dinhhuong;
        public string Kehoachcuthe;
        public int danhgiagiuanam;
        public int danhgiacuoinam;
        public Int32 Id_danhgia;
        public DateTime DateCreated;
        public DateTime LastModified;
        public bool disable;
    }
    public class Mucthuong
    {
        public Mucthuong()
        { }
        public int nam;
        public int id_cv;
        public double mucthuong;
        public int donvi;
        public DateTime DateCreated;
        public DateTime LastModified;
        public Int32 CreatedUser;
        public Int32 LastModifiedUser;
    }

    /// <summary>
    /// Node chuẩn
    /// </summary>
    public class StandardNode
    {
        public StandardNode()
        { }
        public Int32 ID;
        public Int32 NextNode;
        public string NodeName;
        public int Id_loai;
        public Int32 Id_chucdanh;
        public int Id_Process;
        public Int32 AlternateNode;
        public DateTime DateCreated;
        public DateTime LastModified;
        public int vitri;
        public string tenchucdanh;
        public Int32 Vitriphanbocongviec;
        public string tenvitriphanbocongviec;
    }
    public class StandardTask
    {
        public StandardTask()
        { }
        public Int32 ID;
        public Int32 Id_node;
        public Int32 Id_Phongban;
        public Int32 Id_chucdanh;
        public Int32 Id_Node;
        public string Description;
        public DateTime DateCreated;
        public DateTime LastModified;
        public Int32 Nguoisuacuoi;
        public int thututhuchien;
        public float thoigianthuchien;
        public string filename;
    }
    public class StandarProcess
    {
        public StandarProcess()
        { }
        public Int32 ID;
        public string ProcessName;
        public int Id_phongban;
        public Int32 UserStartProcess;
        public DateTime DateCreated;
        public DateTime LastModified;
        public Int32 IdParentNode;
        public Int32 UserCreated;
        public string Description;
        public Int32 nguoibatdau_donvi;
        public Int32 nguoibatdau_phongban;
    }
    public class DTProcess
    {
        public DTProcess()
        { }
        public Int32 ID;
        public Int32 Id_ProcessList;
        public string title;
        public DateTime BeginDate;
        public DateTime EndDate;
        public int Status;
        public Int32 ID_NodeProcess;
        public Int32 UserBengin;
    }
    public class Node
    {
        public Node()
        {

        }
        public Int32 ID;
        public Int32 Id_node;
        public Int32 Id_Process;
        public Int32 Id_emp;
        public DateTime DateAccept;
        public int Status;
        public Int32 Id_chucdanh;
        public DateTime BeginDate;
        public DateTime EndDate;
        public Int32 NextNode;
        public Int32 AlternateNode;
        public string title;
        public int Id_loai;
        public int Id_nguoiphanbo;
        public int Vitriphanbo;
    }
    public class Congviec
    {
        public Congviec()
        {

        }
        public Int32 ID;
        public Int32 Id_NodeProcess;
        public string TaskName;
        public string Description;
        public Int32 Employee_ID;
        public string Employee_Name;
        public int status;
        public DateTime BeginDate;
        public DateTime EndDate;
        public string Template_FileName;
        public string Result_Filename;
        public int Action_No;
        public double WorkTime;
        public double DifferenceTime;
        public DateTime ReceiveTime;
        public bool Received;
        public DateTime CompleteExpected;
        public string Employee_Email;
        public string ProcessName;
        public string Note;
        public string NodeName;
        public string Id_Process;
        public double Baonhancongviecsau;
        public double Baolainhancongviecsau;
        public double Baotruoc;
        public double Baolaisau;
    }
    public class CandidateProfile
    {
        public string Id_hoso;
        public string Holot;
        public string Ten;
        public string Id_chucdanh;
        public string Tenvitri;
        public string Id_pb;
        public string Tenphongban;
        public string Id_dv;
        public string Tendonvi;
        public string Gioitinh;
        public DateTime Ngaysinh;
        public string CMND;
        public DateTime Ngaycap;
        public string id_noicap;
        public string Noicap;
        public string Sodienthoai;
        public string Id_dantoc;
        public string Id_tongiao;
        public string Dantoc;
        public string Tongiao;
        public string Id_TinhtrangHN;
        public string Tinhtranghonnhan;
        public string Email;
        public string Diachithuongtru;
        public string Diachilienlac;
        public string Id_bangcap;
        public string Chuyenmon;
        public string Hocvan;
        public string Trinhdongoaingu;
        public string Bangcapkhac;
        public string Kynanglamviec;
        public string Kinhnghiemlamviec;
        public string Kynangkhac;
        public string Quatrinhhoctap;
        public string Quatrinhcongtac;
        public string Muctieunghenghiep;
        public string Ghichu;
        public string Tenbangcap;
        public string Coquanlamviec;
        public int dexuat;
        public string ghichu;
        public string Mahoso;
        public string namsinh;
        public string sosolaodong;
        public DateTime ngaycapsolaodong;
        public string noicapsolaodong;
        public string sopassport;
        public DateTime ngaycappassport;
        public string noicappassport;
        public DateTime ngayvaodoan;
        public DateTime ngayvaodang;
        public string quoctich;
        public string Id_cvtd;
        public string Id_dottuyendung;
        public int KNLVNganhang;
        public int SonamKN;
        public string RecentJob;
        public int Id_Noisinh;
        public string Masothue;
        public string SosoBHXH;
        public DateTime NgaycapsoBHXH;
        public string Mobile;
        public Int32 Luongmongmuon;
        public string hocham;
        public string username;
        public string password;
        public string keyword;
        public string Tennoisinh;
        public string Benhsu;
        public DateTime Thoigiandilam;
        public int Id_Didiemlamviec;
        public string Truongdaotao;
        public string Namtotnghiep;
        public string Bangcapkhac_Truongdaotao;
        public string Bangcapkhac_Namtotnghiep;
        public string Bangcapkhac_chuyennganh;
        public string Lydotimviec;
        public string Phuongtiendilai;
        public string Nguoilienhe_Hoten;
        public string Nguoilienhe_Quanhe;
        public string Nguoilienhe_Diachi;
        public string Nguoilienhe_Sodienthoai;
        public int ID_Kenhthongtin;
        public string vitinh;
        public int tunhadencty;
        public string chuyennganh;
        public string Kenhthongtintuyendung;
        public string filecv;

        public string tentruongtotnghiep;
        public string bangcapkhac_tentruongtotnghiep;
    }
    public class Phieuphongvan
    {
        public Int32 Id_phongvan;
        public Int32 Id_hoso;
        public Int32 Id_cvtd;
        public string Hoten;
        public string Id_chucdanh;
        public string Tenvitri;
        public string Id_pb;
        public string Tenphongban;
        public string Gioitinh;
        public DateTime Ngaysinh;
        public string Sodienthoai;
        public string Id_bangcap;
        public string Chuyenmon;
        public string Hocvan;
        public string Ghichu;
        public string Tenbangcap;
        public string Coquanlamviec;
        public int dexuat;
        public int lan;
        public Int32 Id_dotphongvan;
        public DateTime Giophongvandukien;
        public string Noiphongvan;
        public DateTime Gioxacnhan;
        public Int32 danhgiatongthe;
        public string Nhanxettongthe;
        public Int32 Nguoiphongvan;
        public DateTime Giocapnhat;
        public int ketqua;
        public string ketluan;
        public Int32 Id_lanhdao;
        public DateTime ngayduyet;
        public string tennguoiphongvan;
        public string chucdanhnguoiphongvan;
        public bool dahoantat;
    }
    public class PhieuDGKynangKinhnghiem
    {
        public Int32 ID;
        public Int32 Id_nv;
        public int nam;
        public int Cap_KNCM;
        public int Cap_KNLV_AB;
        public int Cap_KNLV_NH;
        public string Chungcu_KNCM;
        public string Chungcu_KNLV_NH;
        public bool AllowEdit;
        public Int32 Nguoidanhgia;
        public DateTime LastModified;
        public DateTime Ngaynhap;
        public string Tendonvi;
        public string TenPhongban;
        public string Tenchucdanh;
        public Int32 Id_dv;
        public Int32 Id_bp;
        public Int32 Id_chucdanh;
        public DateTime ngaybatdau;
    }
    public class KNLVNH
    {
        public KNLVNH()
        {
            sonam = 0;
            sothang = 0;
        }
        public KNLVNH(int totalmonth)
        {
            sonam = (int)(totalmonth / 12);
            sothang = totalmonth % 12;
        }
        public int sonam;
        public int sothang;
        public int TotalMonth
        {
            get
            {
                return (sonam * 12 + sothang);
            }
        }
    }
    public class BuoiNghi
    {
        public BuoiNghi()
        {
            Buoi = "AM";
        }
        public string Buoi;
        public DateTime Ngay;
        public string TenBuoi
        {
            get
            {
                if ("AM".Equals(Buoi)) return "Sáng";
                return "Chiều";
            }
        }
        public string ToString(string dateformat)
        {
            return (TenBuoi + " " + Ngay.ToString(dateformat));
        }
    }
    public class Thoigian
    {
        public Thoigian()
        {
            sonam = 0;
            sothang = 0;
            songay = 0;
        }
        public int sonam;
        public int sothang;
        public int songay;
    }
    public class TonghopBH
    {
        public TonghopBH()
        {
            Tang_BHTN = 0;
            Tang_BHXH = 0;
            Tang_BHYT = 0;
            Giam_BHTN = 0;
            Giam_BHXH = 0;
            Giam_BHYT = 0;
        }
        public Int32 Tang_BHXH;
        public Int32 Tang_BHYT;
        public Int32 Tang_BHTN;
        public Int32 Giam_BHXH;
        public Int32 Giam_BHYT;
        public Int32 Giam_BHTN;
    }
    public class Tonghochung
    {
        public Tonghochung(double tylebhxh, double tylebhyt, double tylebhtn)
        {
            Solaodong = new TonghopBH();
            Quyluong = new TonghopBH();
            Dieuchinhsophaidong = new TonghopBH();
            tyledongbhtn = tylebhtn;
            tyledongbhxh = tylebhxh;
            tyledongbhyt = tylebhyt;
        }
        private double tyledongbhxh;
        private double tyledongbhyt;
        private double tyledongbhtn;
        public TonghopBH Solaodong;
        public TonghopBH Quyluong;
        public TonghopBH Sophaidong
        {
            get
            {
                TonghopBH result = new TonghopBH();
                result.Giam_BHTN = (Int32)(Quyluong.Giam_BHTN * tyledongbhtn);
                result.Giam_BHXH = (Int32)(Quyluong.Giam_BHXH * tyledongbhxh);
                result.Giam_BHYT = (Int32)(Quyluong.Giam_BHYT * tyledongbhyt);
                result.Tang_BHTN = (Int32)(Quyluong.Tang_BHTN * tyledongbhtn);
                result.Tang_BHXH = (Int32)(Quyluong.Tang_BHXH * tyledongbhxh);
                result.Tang_BHYT = (Int32)(Quyluong.Tang_BHYT * tyledongbhyt);
                return result;
            }
        }
        public TonghopBH Dieuchinhsophaidong;
    }
    [Serializable]
    public class Cuoiky
    {
        public Cuoiky()
        {
            Kytruoc_BHTN = 0;
            Kytruoc_BHXH = 0;
            Kytruoc_BHYT = 0;
            Kynay_BHTN = 0;
            Kynay_BHXH = 0;
            Kynay_BHYT = 0;
        }
        public Int64 Kytruoc_BHTN;
        public Int64 Kytruoc_BHXH;
        public Int64 Kytruoc_BHYT;
        public Int64 Kynay_BHTN;
        public Int64 Kynay_BHXH;
        public Int64 Kynay_BHYT;
    }
    [Serializable]
    public class Tonghopcuoiky
    {
        private int _thang;
        private int _nam;
        public Tonghopcuoiky(int thang, int nam, int lan)
        {
            int thangtruoc = thang;
            int namtruoc = nam;
            SqlConditions cond = new SqlConditions();
            if (lan == 1)
            {
                thangtruoc = thang - 1;
                if (thangtruoc <= 0)
                {
                    thangtruoc = 12;
                    namtruoc = nam - 1;
                }
            }
            else cond.Add("LanbaocaoBHXH", lan, SqlOperator.Lessthan);
            cond.Add("thang", thangtruoc);
            cond.Add("nam", namtruoc);
            string select = "select * from BHXH3a where (where) order by LanbaocaoBHXH desc";
            using (DpsConnection cnn = new DpsConnection())
            {
                DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
                if (dt.Rows.Count > 0)
                {
                    Int32 so = 0;
                    Int32.TryParse(dt.Rows[0]["BHXH_Solaodong"].ToString(), out so);
                    Solaodong.Kytruoc_BHXH = so;
                    Int32.TryParse(dt.Rows[0]["BHTN_Solaodong"].ToString(), out so);
                    Solaodong.Kytruoc_BHTN = so;
                    Int32.TryParse(dt.Rows[0]["BHYT_Solaodong"].ToString(), out so);
                    Solaodong.Kytruoc_BHYT = so;

                    Int32.TryParse(dt.Rows[0]["BHXH_Tongquyluong"].ToString(), out so);
                    Tongquyluong.Kytruoc_BHXH = so;
                    Int32.TryParse(dt.Rows[0]["BHTN_Tongquyluong"].ToString(), out so);
                    Tongquyluong.Kytruoc_BHTN = so;
                    Int32.TryParse(dt.Rows[0]["BHYT_Tongquyluong"].ToString(), out so);
                    Tongquyluong.Kytruoc_BHYT = so;

                    Int32.TryParse(dt.Rows[0]["BHXH_Sophaidong"].ToString(), out so);
                    Sophaidong.Kytruoc_BHXH = so;
                    Int32.TryParse(dt.Rows[0]["BHTN_Sophaidong"].ToString(), out so);
                    Sophaidong.Kytruoc_BHTN = so;
                    Int32.TryParse(dt.Rows[0]["BHYT_Sophaidong"].ToString(), out so);
                    Sophaidong.Kytruoc_BHYT = so;
                }
                _thang = thang;
                _nam = nam;
            }
        }
        public Cuoiky Solaodong = new Cuoiky();
        public Cuoiky Tongquyluong = new Cuoiky();
        public Cuoiky Sophaidong = new Cuoiky();
        public int Thang
        {
            get { return _thang; }
        }
        public int Nam
        {
            get { return _nam; }
        }
    }
    public class ThoigianthamgiaBHXH
    {
        public ThoigianthamgiaBHXH()
        {
            BHTN_sonam = 0;
            BHTN_sothang = 0;
            BHXH_sonam = 0;
            BHXH_sothang = 0;
        }
        public int BHXH_sothang;
        public int BHXH_sonam;
        public int BHTN_sothang;
        public int BHTN_sonam;
    }
    public class Congthang
    {
        public Congthang()
        {
            Soconglam = 0;
            Phepnam = 0;
            Nghicohuongluong = 0;
            Nghikhongluong = 0;
            Nghithaisan = 0;
            Nghibenh = 0;
            CongOF = 0;
            Congcom = 0;
            Overtime = new Tangcathang();
            Congnuangay = 0;
            Nghile = 0;
            Tinhbanggio = true;
            Congdu = 24;
            HV_Soconglam = 0;
            //Sophutditrebitru = 0;
            Songaynghikhongphep = 0;
            Tongsogiolamviec = 0;
            Nghiphepkhongtinhducong = 0;
            Nghikhamthai = 0;
            Phepcongtac = 0;
            Phepnghibucohuongluong = 0;
            Congcacbiet = 0;
            HV_Tongcong = 0;
            CT_Tongcong = 0;

            Phepnamnhaptay = 0;
            Nghiduongsuc = 0;
            Nghicoluong_khac = 0;
            Dulieuchamtay = new string[31];
            Congthieu = 0;
        }
        /// <summary>
        /// Số ngày đi làm
        /// </summary>
        public double Soconglam;
        /// <summary>
        /// Số ngày nghỉ phép năm
        /// </summary>
        public double Phepnam;
        /// <summary>
        /// Số ngày nghỉ có hưởng lương
        /// </summary>
        public double Nghicohuongluong;
        /// <summary>
        /// Số ngày nghỉ không lương
        /// </summary>
        public double Nghikhongluong;
        /// <summary>
        /// Số ngày nghỉ thai sản
        /// </summary>
        public double Nghithaisan;
        /// <summary>
        /// Số ngày nghỉ bệnh
        /// </summary>
        public double Nghibenh;
        /// <summary>
        /// Số ngày nghỉ hết việc
        /// </summary>
        public double CongOF;
        /// <summary>
        /// Số ngày được hưởng tiền cơm
        /// </summary>
        public double Congcom;
        /// <summary>
        /// Số ngày nghỉ không được tính lương bao gồm nghỉ ko lương, nghỉ ốm, nghỉ thai sản
        /// </summary>
        public double Songaykhongluong
        {
            get
            {
                return (Nghikhongluong + Nghibenh + Nghithaisan);
            }
        }
        public Tangcathang Overtime;
        /// <summary>
        /// Tổng số công trong tháng bao gồm đi làm và nghỉ phép năm, phép có hưởng lương
        /// </summary>
        public double Tongcong
        {
            get
            {
                return (Soconglam + Phepnam + Nghicohuongluong + Nghile);
            }
        }
        public double Congnuangay;
        public double Nghile;
        public double Nghikhongphep;
        public double Tongsogiolamviec;
        //public double Songayle;
        /// <summary>
        /// Đổi số công, nghỉ phép từ số giờ thành số ngày
        /// </summary>
        public void ChangeToDay()
        {
            if (Tinhbanggio)
            {
                Soconglam = Math.Round(Soconglam / 8, 2, MidpointRounding.AwayFromZero);
                Phepnam = Phepnam / 8;
                Nghicohuongluong = Nghicohuongluong / 8;
                Nghikhongluong = Nghikhongluong / 8;
                Nghikhongphep = Nghikhongphep / 8;
                Tinhbanggio = false;
            }

        }
        private bool Tinhbanggio;
        /// <summary>
        /// Số công đủ
        /// </summary>
        public double Congdu;
        /*
        /// <summary>
        /// Số phút đi trễ bị trừ
        /// </summary>
        public double Sophutditrebitru;
         */
        public double HV_Soconglam;
        public int Songaydilamcangay;
        public int Songaydilamnuangay;
        /// <summary>
        /// Tổng số ngày nghỉ không xin phép (chỉ tính những ngày không đi làm) không tính ngày có đi làm mà đi trễ
        /// </summary>
        public int Songaynghikhongphep;
        /// <summary>
        /// Số ngày đi làm ca đêm (đếm số ngày không quan tâm đi làm ngày đó bao nhiêu giờ)
        /// </summary>
        public int Songaylamdem;
        public double Congchuyencan;
        public double Phutroi;
        /// <summary>
        /// Số công chênh lệch so với công chuẩn của tháng
        /// </summary>
        public double Congchenhlech;
        /// <summary>
        /// Số ngày nghỉ phép không tính đủ công (và cũng không trừ truy thu) áp dụng SKHD
        /// </summary>
        public double Nghiphepkhongtinhducong;
        /// <summary>
        /// Số công đi làm ca đêm
        /// </summary>
        public double Socongcadem;
        public double Sophutditrebitru;
        /// <summary>
        /// Số ngày nghỉ phép hưởng lương BHXH: nghỉ ốm, con ốm
        /// </summary>
        public double NghihuongluongBHXH;
        /// <summary>
        /// Số ngày nghỉ khám thai
        /// </summary>
        public double Nghikhamthai;
        public double Tongthoigiantre;
        public double Tongthoigianvesom;
        public double Phepcongtac;
        public double Phepnghibucohuongluong;
        public double NghiPheptinhchuyencan;
        public double Congcacbiet;
        public double HV_Tongcong;
        public double CT_Tongcong;

        public double Phepnamnhaptay;
        public double Nghiduongsuc;
        public double Nghicoluong_khac;
        public string[] Dulieuchamtay;
        /// <summary>
        /// Tổng công thiếu của từng ngày (đi làm + phép không đủ số giờ quy định và không quá số phút quy tịnh tính nghỉ không phép). Công thiếu không bao gồm nghỉ ko phép
        /// </summary>
        public double Congthieu;
    }

    public class Tangcathang
    {
        public Tangcathang()
        {
            SogiotangcaCN = 0;
            Sogiotangcale300 = 0;
            Sogiotangcathuong = 0;
            Cadem = 0;
            TangcademCN = 0;
            TangcademLe = 0;
            Tangcademthuong = 0;
            Sogiotangcale200 = 0;
        }
        /// <summary>
        /// Số giờ tăng ca ngày thường
        /// </summary>
        public double Sogiotangcathuong;
        /// <summary>
        /// Số giờ tăng chủ nhật
        /// </summary>
        public double SogiotangcaCN;
        /// <summary>
        /// Số giờ tăng ca lể
        /// </summary>
        public double Sogiotangcale300;
        /// <summary>
        /// Tổng số giờ tăng ca chưa nhân hệ số
        /// </summary>
        public double Sogiotangcale200;
        public double Tongsogiotangca
        {
            get { return (SogiotangcaCN + Sogiotangcale300 + Sogiotangcathuong + Sogiotangcale200); }
        }
        /// <summary>
        /// Số giờ làm ca đêm
        /// </summary>
        public double Cadem;
        /// <summary>
        /// Số giờ tăng ca đêm ngày thường (chưa tăng ca trước đó) (hệ số 200%)
        /// </summary>
        public double Tangcademthuong;
        /// <summary>
        /// Số giờ tăng ca đêm ngày thường (đã tăng ca ban ngày trước đó) (hệ số 210%)
        /// </summary>
        public double Tangcademthuong_datangcangay;
        /// <summary>
        /// Số giờ tăng ca đêm chủ nhật
        /// </summary>
        public double TangcademCN;
        /// <summary>
        /// Số giờ tăng ca đêm lể
        /// </summary>
        public double TangcademLe;
        /// <summary>
        /// Số giờ tăng ca ngày thường dư ra sau khi chỉnh sửa dữ liệu
        /// </summary>
        public double Ex_TangcaThuong;
        /// <summary>
        /// Số giờ tăng ca CN dư ra sau khi chỉnh sửa dữ liệu
        /// </summary>
        public double Ex_TangcaCN;
        /// <summary>
        /// Số giờ tăng ca lễ dư ra sau khi chỉnh sửa dữ liệu
        /// </summary>
        public double Ex_TangcaLe;
        /// <summary>
        /// Số giờ tăng ca đêm ngày thường dư ra sau khi chỉnh sửa dữ liệu
        /// </summary>
        public double Ex_TangcademThuong;
        /// <summary>
        /// Số giờ tăng ca đêm CN dư ra sau khi chỉnh sửa dữ liệu
        /// </summary>
        public double Ex_TangcademCN;
        /// <summary>
        /// Số giờ tăng ca đêm lễ dư ra sau khi chỉnh sửa dữ liệu
        /// </summary>
        public double Ex_TangcademLe;
        public void Add(Tangcathang data)
        {
            Sogiotangcathuong += data.Sogiotangcathuong;
            SogiotangcaCN += data.SogiotangcaCN;
            Sogiotangcale300 += data.Sogiotangcale300;
            Cadem += data.Cadem;
            Tangcademthuong += data.Tangcademthuong;
            TangcademCN += data.TangcademCN;
            TangcademLe += data.TangcademLe;
            Ex_TangcaThuong += data.Ex_TangcaThuong;
            Ex_TangcaCN += data.Ex_TangcaCN;
            Ex_TangcademCN += data.Ex_TangcademCN;
            Ex_TangcademLe += data.Ex_TangcademLe;
            Ex_TangcademThuong += data.Ex_TangcademThuong;
            Ex_TangcaLe += data.Ex_TangcaLe;
            Vuot200_Chunhat += data.Vuot200_Chunhat;
            Vuot200_Chunhat_Dem += data.Vuot200_Chunhat_Dem;
            Vuot200_Le += data.Vuot200_Le;
            Vuot200_Le_Dem += data.Vuot200_Le_Dem;
            Vuot200_Ngaythuong += data.Vuot200_Ngaythuong;
            Vuot200_Ngaythuong_Dem += data.Vuot200_Ngaythuong_Dem;
            Tangcademthuong_datangcangay += data.Tangcademthuong_datangcangay;
        }
        /// <summary>
        /// Tổng số giờ tăng ca đêm chưa nhân hệ số
        /// </summary>
        public double Tongsogiotangcadem
        {
            get { return (TangcademCN + TangcademLe + Tangcademthuong + Tangcademthuong_datangcangay); }
        }
        public double Vuot200_Ngaythuong;
        public double Vuot200_Chunhat;
        public double Vuot200_Le;
        public double Vuot200_Ngaythuong_Dem;
        public double Vuot200_Chunhat_Dem;
        public double Vuot200_Le_Dem;

    }
    //public class Hesotangca
    //{
    //    public Hesotangca(DpsConnection cnn, string CustemerID, int thang, int nam)
    //    {
    //        SqlConditions cond = new SqlConditions();
    //        DateTime ngaydauthang = General.GetBeginDateInMonth(thang, nam);
    //        cond.Add("ngaydauthang", ngaydauthang);
    //        cond.Add("CustemerID", CustemerID);
    //        DataTable dt = cnn.CreateDataTable("select * from PA_Thaydoihesotangca where (Ngayapdung<=@ngaydauthang) and (CustemerID=@CustemerID) order by Ngayapdung Desc", cond);
    //        if (dt.Rows.Count > 0)
    //        {
    //            DataRow row = dt.Rows[0];
    //            double.TryParse(row["Ngaythuong"].ToString(), out Ngaythuong);
    //            double.TryParse(row["Ngaynghi"].ToString(), out Chunhat);
    //            double.TryParse(row["Ngayle"].ToString(), out Ngayle);
    //            double.TryParse(row["Demngaythuong"].ToString(), out Demngaythuong);
    //            double.TryParse(row["Demchunhat"].ToString(), out Demchunhat);
    //            double.TryParse(row["DemLe"].ToString(), out Demle);
    //            double.TryParse(row["Congthemlamdem"].ToString(), out Hesocadem);
    //        }
    //        //Ngaythuong = Ngaythuong / 10;
    //        //Chunhat = Chunhat / 10;
    //        //Ngayle = Ngayle / 10;
    //        //Demngaythuong = Demngaythuong / 10;
    //        //Demle = Demle / 10;
    //        //Demchunhat = Demchunhat / 10;
    //        Hesocadem = Hesocadem / 100;
    //    }
    //    public double Ngaythuong;
    //    public double Chunhat;
    //    public double Ngayle;
    //    public double Demngaythuong;
    //    public double Demchunhat;
    //    public double Demle;
    //    public double Hesocadem;
    //}
    //public class TinhCongParameter
    //{
    //    public TinhCongParameter(DpsConnection cnn, string CustemerID)
    //    {
    //        DateTime denngay = DateTime.Today;
    //        Khoitaodulieu(cnn, CustemerID, denngay);
    //    }
    //    public TinhCongParameter(DpsConnection cnn, string CustemerID, DateTime denngay)
    //    {
    //        Khoitaodulieu(cnn, CustemerID, denngay);
    //    }
    //    private void Khoitaodulieu(DpsConnection cnn, string CustemerID, DateTime denngay)
    //    {
    //        //Tinhtangcavaosom = true;
    //        Thoigiantrechophep = 15;
    //        Thoigianchuyenca = 0;
    //        Thoigianrasomchophep = 15;
    //        Batdaucadem = "22:00:00";
    //        Ketthuccadem = "06:00:00";
    //        Sophuttreduoctinhnghikhongphep = 180;
    //        int RequireRegOT = 1;
    //        block = 5;
    //        Sophuttangcatoithieu = 20;
    //        Phuongphaptrugio = 1;
    //        Cachxacdinhngaycong = 1;
    //        Cachtinhtangcachunhat = 1;
    //        GioihantangcaKhongmienthue = 3000;
    //        IsTachtangca = false;
    //        if ("105".Equals(CustemerID)) Congtongtangcatruockhilamtron = false;
    //        else Congtongtangcatruockhilamtron = true;
    //        //Lấy các tham số
    //        string str = "select giatri, id_row from tbl_thamso where id_row in (1, 2, 4, 5, 7, 8, 6, 13, 14, 58, 59,511, 512, 513, 521, 522,531,532,551) and CustemerID=@CustemerID order by id_row ";
    //        SqlConditions cond = new SqlConditions();
    //        cond.Add("CustemerID", CustemerID);
    //        DataTable dt = cnn.CreateDataTable(str, cond);
    //        for (int i = 0; i < dt.Rows.Count; i++)
    //        {
    //            switch (dt.Rows[i][1].ToString())
    //            {
    //                case "1": int.TryParse(dt.Rows[i][0].ToString(), out Hinhthucchamcong); break;
    //                case "2": int.TryParse(dt.Rows[i][0].ToString(), out RequireRegOT); break;
    //                case "4": int.TryParse(dt.Rows[i][0].ToString(), out block); sophutduoctinhtron = block / 2; BlockTangca = block; break;
    //                case "7": double.TryParse(dt.Rows[i][0].ToString(), out sophutduoctinhtron); Sophutduoctinhtrong1BlockTangca = sophutduoctinhtron; break;
    //                case "58": double.TryParse(dt.Rows[i][0].ToString(), out Thoigianrasomchophep); break;
    //                case "59": double.TryParse(dt.Rows[i][0].ToString(), out Thoigianchuyenca); break;
    //                case "511": double.TryParse(dt.Rows[i][0].ToString(), out Thoigiantrechophep); break;
    //                case "512": Batdaucadem = dt.Rows[i][0].ToString(); break;
    //                case "513": Ketthuccadem = dt.Rows[i][0].ToString(); break;
    //                case "521": double.TryParse(dt.Rows[i][0].ToString(), out Sophuttangcatoithieu); break;
    //                case "6": int.TryParse(dt.Rows[i][0].ToString(), out Phuongphaptrugio); break;
    //                case "522": int.TryParse(dt.Rows[i][0].ToString(), out Cachxacdinhngaycong); break;
    //                case "13": int.TryParse(dt.Rows[i][0].ToString(), out BlockTangca); Sophutduoctinhtrong1BlockTangca = BlockTangca / 2; break;
    //                case "14": double.TryParse(dt.Rows[i][0].ToString(), out Sophutduoctinhtrong1BlockTangca); break;
    //                case "5": Int32.TryParse(dt.Rows[i][0].ToString(), out Cachtinhcongdu); break;
    //                case "8":
    //                    double.TryParse(dt.Rows[i][0].ToString(), out Congdu); break;
    //                case "531": int.TryParse(dt.Rows[i][0].ToString(), out Cachtinhtangcachunhat); break;
    //                case "532": if ("1".Equals(dt.Rows[i][0].ToString())) IsTachtangca = true; break;
    //                case "551": double.TryParse(dt.Rows[i][0].ToString(), out GioihantangcaKhongmienthue); break;
    //                default:
    //                    break;
    //            }
    //        }
    //        if (RequireRegOT == 1) IsRequireRegisterOvertime = true;
    //        else IsRequireRegisterOvertime = false;
    //        Ngayle = Basic.Ngayle(CustemerID, denngay.Year, cnn);
    //        Nghibu = Basic.Nghibu(CustemerID, cnn);
    //        Loaingaycong = cnn.CreateDataTable(@"select tbl_loaingaycong.*,IsAnnualLeave, Isthaisan,Isnghibu, IsCongtac, IsPaidLeave,IsUnpaidLeave,IsNghihuongluongBHXH,IsKhamthai,IsOF 
    //        from tbl_loaingaycong left join  Xnp_Types on loaiphep = Id_Type where tbl_loaingaycong.CustemerID =@CustemerID", cond);
    //        Calamviec = cnn.CreateDataTable("select id_ca, socong from tbl_calamviec where CustemerID=@CustemerID", cond);
    //        //Cackhoantrugio = cnn.CreateDataTable("select * from tbl_cackhoantrugio where CustemerID=@CustemerID", cond);
    //        Ngayledacbiet = Basic.Ngayledacbiet(CustemerID, cnn);
    //        Cacngayle = cnn.CreateDataTable("select * from Tbl_Cacngayle where CustemerID=@CustemerID", cond);
    //        //DM_Lamtroncong = cnn.CreateDataTable("select * from DM_Lamtroncong where CustemerID=@CustemerID", cond);
    //        custemerID = CustemerID;
    //        Heso = new Hesotangca(cnn, CustemerID, denngay.Month, denngay.Year);
    //        id_phepnam = Phepnam.GetIDAnnualLeave(CustemerID, cnn);
    //        id_phepnghibu = Phepnam.GetIDCompensationLeave(CustemerID, cnn);
    //        id_phepcongtac = Phepnam.GetIDBussinessTripLeave(CustemerID, cnn);
    //        id_nghithaisan = Phepnam.GetIDMaternityLeave(CustemerID, cnn);
    //        IDnghicohuongluong = Phepnam.GetListIDPaidLeave(CustemerID, cnn);
    //        IDNghihuongluongBHXH = Phepnam.GetListIDNghihuongluongBHXH(CustemerID, cnn);
    //        IDNghiKhamthai = Phepnam.GetListIDKhamthai(CustemerID, cnn);
    //        id_nghikhongluong = Phepnam.GetIDUnPaidLeave(CustemerID, cnn);
    //        id_nghiof = Phepnam.GetIDNghiOF(CustemerID, cnn);
    //        IDnghiTinhChuyencan = Phepnam.GetListIDTinhchuyencan(CustemerID, cnn);
    //        cond = new SqlConditions();
    //        cond.Add("CustemerID", CustemerID);
    //        ListPhanbocapphepthem = cnn.CreateDataTable("select songay, SongayExt, Thang from Sys_ThangcapphepExt where (where)", "(where)", cond);
    //        Cachdangkytangca = General.GetCachdangkytangca(CustemerID, cnn);
    //        IsXacdinhgioquettheoca = false;
    //        thietlaptinhcong = new Thietlaptinhcong(custemerID, cnn);
    //    }
    //    public double Thoigiantrechophep;
    //    public double Thoigianchuyenca;
    //    public double Thoigianrasomchophep;
    //    //public bool Tinhtangcavaosom;
    //    public string Batdaucadem;
    //    public string Ketthuccadem;
    //    public DataTable Ngayle;
    //    public DataTable Nghibu;
    //    public DataTable Loaingaycong;
    //    public DataTable Calamviec;
    //    //public DataTable Cackhoantrugio;
    //    /// <summary>
    //    /// Ngày lể cụ thể đã được tạo tự động từ ngày ngayletrongnam và cho phép  người dùng tự thêm được
    //    /// </summary>
    //    public DataTable Cacngayle;
    //    public int block;
    //    public double sophutduoctinhtron;
    //    public int BlockTangca;
    //    public double Sophutduoctinhtrong1BlockTangca;
    //    /// <summary>
    //    /// Hình thức chấm công 1 chấm tay, 2 chấm máy
    //    /// </summary>
    //    public int Hinhthucchamcong;
    //    public bool IsRequireRegisterOvertime;
    //    public double Sophuttangcatoithieu;
    //    /// <summary>
    //    /// 1: tính trừ theo block, 2: Tính theo khoảng thời gian quy định trong bảng tbl_cackhoantrugio
    //    /// </summary>
    //    public int Phuongphaptrugio;
    //    /// <summary>
    //    /// Cách xác định ngày quét khi có giờ quét
    //    /// 1: Quét ngày nào là của ngày đó
    //    /// 2: Xác định ngày dựa vào tính khoảng cách giữa giờ ra hôm trước, giờ vào hôm nay, giờ ra hôm nay, giờ vào ngày mai
    //    /// </summary>
    //    public int Cachxacdinhngaycong;
    //    public DataTable Ngayledacbiet;
    //    /// <summary>
    //    /// Trước khi làm tròn theo block thì cộng tổng tăng ca vào sớm và tăng ca ra trễ lại, false là tính làm tròn riêng từng thời gian
    //    /// </summary>
    //    public bool Congtongtangcatruockhilamtron;
    //    public string custemerID;
    //    /// <summary>
    //    /// Các tính công đủ: 0: tính theo bảng xếp ca, 1: tính theo ngày nghỉ
    //    /// </summary>
    //    public int Cachtinhcongdu;
    //    public double Congdu;
    //    /// <summary>
    //    /// Cách tính tăng ca chủ nhật: 1: tính theo xếp ca chủ nhật, 2: tính theo giờ và và giờ ra trừ ra (trừ giờ nghỉ trưa tùy theo đăng ký OT)
    //    /// </summary>
    //    public int Cachtinhtangcachunhat;
    //    /// <summary>
    //    /// Nếu tách thì giờ tăng ca của ngày nào tính cho ngày đó, ngược lại tăng ca của ca ngày nào tính cho ngày đó.
    //    /// </summary>
    //    public bool IsTachtangca;
    //    //public DataTable DM_Lamtroncong;
    //    public Hesotangca Heso;
    //    public string id_phepnam;
    //    public string id_phepnghibu;
    //    public StringCollection id_phepcongtac;
    //    public StringCollection id_nghithaisan;
    //    public StringCollection id_nghikhongluong;
    //    public StringCollection id_nghiof;
    //    public StringCollection IDnghicohuongluong;
    //    public StringCollection IDNghihuongluongBHXH;
    //    public StringCollection IDNghiKhamthai;
    //    public StringCollection IDnghiTinhChuyencan;
    //    /// <summary>
    //    /// Danh mục dữ liệu cấu hình tháng cấp phép thêm. Các cột select: songay, SongayExt, Thang
    //    /// </summary>
    //    public DataTable ListPhanbocapphepthem;
    //    /// <summary>
    //    /// Giới hạn số giờ tăng ca không được miển thuế phần hệ số >1 (theo quy định là 200h)
    //    /// </summary>
    //    public double GioihantangcaKhongmienthue;
    //    public int Cachdangkytangca;
    //    /// <summary>
    //    /// true: Ca và tra trong ngày thì quét ngày nào là ca của ngày đó, ca đêm tính theo khoảng cách. false: Tính theo khoảng cách
    //    /// </summary>
    //    public bool IsXacdinhgioquettheoca;
    //    /// <summary>
    //    /// Nếu đi trễ quá thời gian này sẽ được tính là nghỉ không phép, người lại chỉ tính thời gian đi trễ
    //    /// </summary>
    //    public int Sophuttreduoctinhnghikhongphep;
    //    /// <summary>
    //    /// Thiết lập tính công chung cho toàn công ty
    //    /// </summary>
    //    public Thietlaptinhcong thietlaptinhcong = new Thietlaptinhcong();
    //}
    public class Dulieuquet
    {
        public Dulieuquet(DateTime vao, DateTime ra, bool tinhvaotre, bool tinhrasom)
        {
            InputScan = vao;
            OutputScan = ra;
            Tinhvaotre = tinhvaotre;
            Tinhrasom = tinhrasom;
            Luontinhtru = false;
        }
        public Dulieuquet()
        {
            Luontinhtru = false;
        }
        public DateTime InputScan;
        public DateTime OutputScan;
        public bool Tinhvaotre;
        public bool Tinhrasom;
        public double r_sogiongaythuong = 0;
        public double r_sogiotangca = 0;
        public double r_sogiocadem = 0;
        public double r_sogiotangcadem = 0;
        /// <summary>
        /// Số phút trễ thực tế
        /// </summary>
        public double r_sophuttre = 0;
        public double r_sophutrasom = 0;
        /// <summary>
        /// Số phút trễ bị trừ ví dụ trễ thực tế 10p nhưng bị trừ 30p
        /// </summary>
        public double r_sophuttrebitru = 0;
        public double r_Sogiotangcangaykhac = 0;
        public double r_Sogiotangcangaykhac_dem = 0;
        public double Vaosom_Sophuttangca;
        public double Giuagio_Sophuttangca;
        public double Ratre_Sophuttangca;
        public double Nghibu_Sophuttangca;
        public double Nghibu_Sophuttangcadem;
        public double Nghibu_Sophuttangcangaykhac;
        public double Nghibu_Sophuttangcangaykhac_dem;
        public double Vaosom_Sogiolambu = 0;
        public double Giuagio_Sogiolambu = 0;
        public double Ratre_Sogiolambu = 0;
        public double Ratre_Sophuttangcadem;
        public double Vaosom_Sophuttangcadem;
        public double Giuagio_Sophuttangcadem;
        //Áp dụng cho sungshin vina trường hợp nghỉ phép thì có tính trừ 10p đối với buổi sáng
        public bool Luontinhtru = false;

    }
    public class Chamcongngay
    {
        public Chamcongngay()
        {
            Quangay = false;
            Nguoisua = new EDTO();
            Modified = new string[] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            Sogiolam = 0;
            IsTangca = false;
            Sogiotangcadangky = 0;
            Sogiotangcasang = 0;
            Sogiotangcatrua = 0;
            IsCongtacdaugio = false;
            IsCongtaccuoigio = false;
            Congtacngay = 0;
            Buoinghiphep = 0;
        }
        public DateTime ngay;
        public decimal Id_row;
        public DateTime Batdau1;
        public DateTime Ketthuc1;
        public DateTime Batdau2;
        public DateTime Ketthuc2;
        public DateTime Batdau3;
        public DateTime Ketthuc3;
        public bool Quangay;
        public decimal Sogiolam;
        public decimal Tangcathuong;
        public decimal Tangcangaynghi;
        public decimal Tangcale;
        public decimal Tangcadem;
        public decimal Id_nv;
        public double Hetviec;
        public decimal Phep_Loai;
        public DateTime Phep_batdau;
        public DateTime Phep_ketthuc;
        public double Phep_Sogio;
        public decimal Phep_Songay;
        public decimal Id_phep;
        public string Ghichu;
        public bool Locked;
        public decimal Sogio1cong;
        public decimal Id_ca;
        public EDTO Nguoisua;
        public bool IsDateOff;
        public bool IsFix;
        public string[] Modified;
        public bool IsTangca;
        public DateTime Batdautangca;
        /// <summary>
        /// Số giờ tăng ca đăng ký, 0 là làm bao nhiêu tính bao nhiêu
        /// </summary>
        public double Sogiotangcadangky;
        public double Sogiotangcasang;
        public double Sogiotangcatrua;
        public string Vaosom_Tangca;
        public string Giuagio_Tangca;
        /// <summary>
        /// Nhân viên có đi công tác đầu giờ (đối với trường hợp đi công tác trong ngày)
        /// </summary>
        public bool IsCongtacdaugio;
        /// <summary>
        /// Nhân viên có đi công tác cuối giờ (đối với trường hợp đi công tác trong ngày)
        /// </summary>
        public bool IsCongtaccuoigio;
        /// <summary>
        /// Nhân viên đi công tác: 1 Công tác buổi sáng chiều vào làm; 2: buổi sáng làm, bổi chiều công tác; 3: công tác cả ngày (đối với trường hợp đăng ký công tác nhiều ngày)
        /// </summary>
        public int Congtacngay;
        public DateTime Congtac_Tugio;
        public DateTime Congtac_Dengio;
        public string Id_Donxinvaotre;
        public string Id_Donxinrasom;
        public object Dieuchinh_giovao;
        public object Dieuchinh_giora;
        /// <summary>
        /// 0: All day, 1: Morning, 2: Afternoon, 3: Giữa giờ
        /// </summary>
        public int Buoinghiphep;
        public double Sogiodabu_daubuoi;
        public double Sogiodabu_cuoibuoi;
    }
    public class Cong
    {
        public Cong()
        {
            Conglam = 0;
            Phepcohuongluong = 0;
            Phepkhongluong = 0;
            Phepnam = 0;
            Hetviec = 0;
            Nghikhongphep = 0;
        }
        public double Conglam;
        public double Phepnam;
        public double Hetviec;
        public double Phepkhongluong;
        public double Phepcohuongluong;
        /// <summary>
        /// Tổng số ngày nghỉ không phép bao gồm cả thời gian đi trễ mà không xin phép
        /// </summary>
        public double Nghikhongphep;
    }
    public class Overtime
    {
        public Overtime()
        {
            Tangcachunhat = 0;
            TangcademCN = 0;
            Tangcademle = 0;
            Tangcademthuong = 0;
            Tangcale = 0;
            Tangcangaythuong = 0;
            Cadem = 0;
        }
        public double Tangcangaythuong;
        public double Tangcachunhat;
        public double Tangcale;
        public double Cadem;
        public double Tangcademthuong;
        public double TangcademCN;
        public double Tangcademle;

    }
    //public class TinhluongParameter
    //{
    //    public TinhluongParameter(DpsConnection cnn, int thang, int nam, string CustemerID)
    //    {
    //        IsTinhthuengoaigiotatca = false;
    //        SqlConditions cond = new SqlConditions();
    //        cond.Add("CustemerID", CustemerID);
    //        Ngayle = Basic.Ngayle(CustemerID, nam, cnn);
    //        Nghibu = Basic.Nghibu(CustemerID, cnn);
    //        Ngayledacbiet = Basic.Ngayledacbiet(CustemerID, cnn);
    //        Congdu = 0;
    //        Calamviec = cnn.CreateDataTable("select * from tbl_calamviec where CustemerID=@CustemerID", cond);
    //        Loaingaycong = cnn.CreateDataTable("select * from tbl_loaingaycong where CustemerID=@CustemerID", cond);
    //        Donvilamtronthuclanh = 1;
    //        DataTable thamso = cnn.CreateDataTable("select giatri, id_row from tbl_thamso where (id_row in (52,53,1, 55, 56, 5, 8, 9, 539, 43, 540, 501, 552)) and (CustemerID=@CustemerID)", cond);
    //        Cachtinhluong = 1;
    //        int tinhthuengoaigiotatca = 0;
    //        IsTinhluongPhephuongluongBHXH = false;
    //        IsTachluongthuviec_chinhthuc = true;
    //        IsTudongxacdinhcachtinhthue = false;
    //        Phantramluonghetviec = 100;
    //        if (cnn.LastError != null)
    //        {
    //            errormsg = "Không thể kết nối cơ sở dữ liệu";
    //            return;
    //        }
    //        for (int i = 0; i < thamso.Rows.Count; i++)
    //        {
    //            switch (thamso.Rows[i][1].ToString())
    //            {
    //                case "52": Int32.TryParse(thamso.Rows[i][0].ToString(), out tinhthuengoaigiotatca); break;
    //                case "1": Int32.TryParse(thamso.Rows[i][0].ToString(), out Hinhthucchamcong); break;
    //                case "55": Int32.TryParse(thamso.Rows[i][0].ToString(), out Giamtrubanthan); break;
    //                case "56": Int32.TryParse(thamso.Rows[i][0].ToString(), out Giamtrunguoiphuthuoc); break;
    //                case "5": Int32.TryParse(thamso.Rows[i][0].ToString(), out Cachtinhcongdu); break;
    //                case "8":
    //                    double.TryParse(thamso.Rows[i][0].ToString(), out Congdu); break;
    //                case "9": int.TryParse(thamso.Rows[i][0].ToString(), out Cachtinhluong); break;
    //                case "53": int.TryParse(thamso.Rows[i][0].ToString(), out Donvilamtronthuclanh); break;
    //                case "539": IsTinhluongPhephuongluongBHXH = "1".Equals(thamso.Rows[i][0].ToString()); break;
    //                case "43": IsTachluongthuviec_chinhthuc = "1".Equals(thamso.Rows[i][0].ToString()); break;
    //                case "540": double.TryParse(thamso.Rows[i][0].ToString(), out CongdutinhtienOT); break;
    //                case "501": IsTudongxacdinhcachtinhthue = "1".Equals(thamso.Rows[i][0].ToString()); break;
    //                case "552": double.TryParse(thamso.Rows[i][0].ToString(), out Phantramluonghetviec); break;
    //                default:
    //                    break;
    //            }
    //        }
    //        if ((Congdu > 0) || (Congdu == -2))
    //        {
    //            Hinhthuctinhluong = 2;
    //        }
    //        else if (Congdu == 0)
    //        {
    //            Hinhthuctinhluong = 1;
    //        }
    //        else Hinhthuctinhluong = 3;
    //        if (tinhthuengoaigiotatca == 1) IsTinhthuengoaigiotatca = true;
    //        GetMuctruBH(cnn, thang, nam, CustemerID);
    //        GetMucgiamtruTTN(cnn, thang, nam, CustemerID);
    //        Tinhphucaptheoconglam = false;
    //        Heso = new Hesotangca(cnn, CustemerID, thang, nam);
    //        custemerID = CustemerID;
    //        Cachtinhluong1ngay = 1;
    //        if (Cachtinhluong == 1) GetMucluongCBnhanuoc(cnn, thang, nam, custemerID);
    //        else General.GetMucLuongCoSo(new DateTime(nam, thang, 1), 1, cnn);
    //        Tyleuudaithue = 0.5d;//Ưu đãi 50% thuế
    //    }
    //    public double TruBHXH;
    //    public double TruBHYT;
    //    public double TruBHTN;
    //    public double TruPCD;
    //    public double TruBHXH_DN;
    //    public double TruBHYT_DN;
    //    public double TruBHTN_DN;
    //    public double TrucPCD_DN;
    //    public DataTable Ngayle;
    //    public DataTable Nghibu;
    //    public DataTable Calamviec;
    //    public DataTable Loaingaycong;
    //    public Int32 TranBHXH;
    //    public Int32 TranBHYT;
    //    public Int32 TranBHTN;
    //    public Int32 TranPCD_NV;
    //    public Int32 Giamtrunguoiphuthuoc;
    //    public Int32 Giamtrubanthan;
    //    //public double Congdu;
    //    public double CongdutinhtienOT;
    //    public double Phantramluonghetviec;
    //    public string errormsg;
    //    public Int32 TCThamnien1nam;
    //    public bool Tinhphucaptheoconglam;
    //    /// <summary>
    //    /// Hình thức trừ phí công đoàn. 1: tính theo % lương, 2: Tính theo số tiền cố định
    //    /// </summary>
    //    public int HinhthuctruPCD;
    //    /// <summary>
    //    /// Hình thức trừ phí công đoàn DN. 1: tính theo % lương, 2: Tính theo số tiền cố định
    //    /// </summary>
    //    public int HinhthuctruPCD_DN;
    //    //private double Getcongdu(int thang, int nam)
    //    //{
    //    //    DateTime ngaydauthang = General.GetBeginDateInMonth(thang, nam);
    //    //    DateTime ngaycuoithang = General.GetEndDateInMonth(thang, nam);
    //    //    DateTime date = ngaydauthang;
    //    //    double result = 0;
    //    //    while (date <= ngaycuoithang)
    //    //    {
    //    //        if (date.DayOfWeek != DayOfWeek.Sunday) result++;
    //    //        date = date.AddDays(1);
    //    //    }
    //    //    return result;
    //    //}
    //    //private void GetMuctruBH(DpsConnection cnn, int thang, int nam, string CustemerID)
    //    //{
    //    //    SqlConditions cond = new SqlConditions();
    //    //    DateTime ngaydauthang = General.GetBeginDateInMonth(thang, nam);
    //    //    cond.Add("ngaydauthang", ngaydauthang);
    //    //    cond.Add("CustemerID", CustemerID);
    //    //    DataTable dt = cnn.CreateDataTable("select * from PA_ThaydoimucdongBHXH where (EDate<=@ngaydauthang) and (CustemerID=@CustemerID) order by EDate Desc", cond);
    //    //    if (dt.Rows.Count > 0)
    //    //    {
    //    //        DataRow row = dt.Rows[0];
    //    //        if ((!double.TryParse(row["BHYT"].ToString(), out TruBHYT)) || (!double.TryParse(row["BHXH"].ToString(), out TruBHXH)) || (!double.TryParse(row["PCD"].ToString(), out TruPCD)) || (!double.TryParse(row["BHTN"].ToString(), out TruBHTN)) || (!double.TryParse(row["DN_BHYT"].ToString(), out TruBHYT_DN)) || (!double.TryParse(row["DN_BHXH"].ToString(), out TruBHXH_DN)) || (!double.TryParse(row["DN_PCD"].ToString(), out TrucPCD_DN)) || (!double.TryParse(row["DN_BHTN"].ToString(), out TruBHTN_DN)) || (!Int32.TryParse(row["TranBHXH"].ToString(), out TranBHXH)) || (!int.TryParse(row["Hinhthuc_PCD"].ToString(), out HinhthuctruPCD)) || (!Int32.TryParse(row["TranBHYT"].ToString(), out TranBHYT)) || (!Int32.TryParse(row["TranBHTN"].ToString(), out TranBHTN)) || (!int.TryParse(row["Hinhthuc_PCDDN"].ToString(), out HinhthuctruPCD_DN)) || (!int.TryParse(row["TrandongPCD"].ToString(), out TranPCD_NV)))
    //    //        {
    //    //            errormsg = "Một số giá trị trừ bảo hiểm không hợp lệ";
    //    //            return;
    //    //        }
    //    //    }
    //    //}
    //    //private void GetMucgiamtruTTN(DpsConnection cnn, int thang, int nam, string CustemerID)
    //    //{
    //    //    SqlConditions cond = new SqlConditions();
    //    //    DateTime ngaydauthang = General.GetBeginDateInMonth(thang, nam);
    //    //    cond.Add("ngaydauthang", ngaydauthang);
    //    //    cond.Add("CustemerID", CustemerID);
    //    //    DataTable dt = cnn.CreateDataTable("select * from PA_ThaydoimucgiamtruTTNCN where (Ngayapdung<=@ngaydauthang) and (CustemerID=@CustemerID) order by Ngayapdung Desc", cond);
    //    //    if (dt.Rows.Count > 0)
    //    //    {
    //    //        DataRow row = dt.Rows[0];
    //    //        if ((!int.TryParse(row["Giamtrubanthan"].ToString(), out Giamtrubanthan)) || (!int.TryParse(row["Giamtrunguoiphuthuoc"].ToString(), out Giamtrunguoiphuthuoc)))
    //    //        {
    //    //            errormsg = "Một số giá trị giam tru gia canh không hợp lệ";
    //    //            return;
    //    //        }
    //    //        double.TryParse(row["Thuviec_tyledong"].ToString(), out TyledongthueTNCN_NVTV);
    //    //        TyledongthueTNCN_NVTV = TyledongthueTNCN_NVTV / 100;
    //    //        double.TryParse(row["Laodongnuocngoai_tyle"].ToString(), out TyledongTTNCN_LDNuocngoaikhongcutru);
    //    //        TyledongTTNCN_LDNuocngoaikhongcutru = TyledongTTNCN_LDNuocngoaikhongcutru / 100;
    //    //        int.TryParse(row["Thuviec_Muctoithieu"].ToString(), out MuctoithieudongthueTNCN_NVTV);
    //    //    }
    //    //}
    //    //private void GetMucluongCBnhanuoc(DpsConnection cnn, int thang, int nam, string CustemerID)
    //    //{
    //    //    SqlConditions cond = new SqlConditions();
    //    //    DateTime ngaydauthang = General.GetBeginDateInMonth(thang, nam);
    //    //    cond.Add("ngaydauthang", ngaydauthang);
    //    //    cond.Add("CustemerID", CustemerID);
    //    //    DataTable dt = cnn.CreateDataTable("select LuongCB from PA_ThaydoimucluongCBnhanuoc where (Ngayapdung<=@ngaydauthang) and (CustemerID=@CustemerID) order by Ngayapdung Desc", cond);
    //    //    if (dt.Rows.Count > 0)
    //    //    {
    //    //        DataRow row = dt.Rows[0];
    //    //        if (!int.TryParse(row["LuongCB"].ToString(), out MucluongCBnhanuoc))
    //    //        {
    //    //            errormsg = "Giá trị lương CB không hợp lệ";
    //    //            return;
    //    //        }
    //    //    }
    //    //}
    //    ///// <summary>
    //    /// Hình thức chấm công 1 chấm tay, 2 chấm máy
    //    /// </summary>
    //    public int Hinhthucchamcong;
    //    public Hesotangca Heso;
    //    public string custemerID;
    //    /// <summary>
    //    /// Các tính công đủ: 0: tính theo bảng xếp ca, 1: tính theo ngày nghỉ
    //    /// </summary>
    //    public int Cachtinhcongdu;
    //    public double TyledongthueTNCN_NVTV;
    //    public int MuctoithieudongthueTNCN_NVTV;
    //    public double Congdu;
    //    /// <summary>
    //    /// Cách tính luwong 1 ngày
    //    /// 1: tính theo công thức việt nam = tổng lương/số ngày công
    //    /// 2: tính theo công thức malaysia = tổng lương * 12/313
    //    /// </summary>
    //    public int Cachtinhluong1ngay;
    //    public DataTable Ngayledacbiet;
    //    public int MucluongCBnhanuoc;
    //    /// <summary>
    //    /// Cách tính lương 1: tính theo mức lương là con số, 2: tính theo hệ số của nhà nước
    //    /// </summary>
    //    public int Cachtinhluong;
    //    /// <summary>
    //    /// Đơn vị làm tròn thực lãnh (ví dụ 1000 là làm tròn đến đơn vị hàng nghìn)
    //    /// </summary>
    //    public int Donvilamtronthuclanh;
    //    /// <summary>
    //    /// Tính thuế tất cả lương ngoài giờ, false: chỉ tính thuế ngoài giờ hệ số 1, hệ quá quá 1 không tính thuế
    //    /// </summary>
    //    public bool IsTinhthuengoaigiotatca;
    //    public double TyledongTTNCN_LDNuocngoaikhongcutru;
    //    /// <summary>
    //    /// Hình thức tính lương: 1: tính lương hthuc 1 (luong/congdu*soconglam có thay đổi lương thì tính theo giai đoạn), 2: Hình thức 2 (luong - luong/congducodinh*songayngikhonghuongluong), 
    //    /// 3: tính như hthuc1 nhưng khi có thay đổi lương thì lấy lương bình quân rồi mới tính cả tháng dựa vào lương bình quân
    //    /// </summary>
    //    public double Hinhthuctinhluong;
    //    public double Tyleuudaithue;
    //    /// <summary>
    //    /// Tính lương cho các ngày phép nghỉ hưởng lương BHXH (tính trên mức chênh lệch lương thực và lương đóng bhxh)
    //    /// </summary>
    //    public bool IsTinhluongPhephuongluongBHXH;

    //    public bool IsTachluongthuviec_chinhthuc;
    //    public bool IsTudongxacdinhcachtinhthue;

    //}
    //public class Luongngaycong
    //{
    //    public Luongngaycong(string CustemerID, int thang, int nam)
    //    {
    //        using (DpsConnection cnn = new DpsConnection())
    //        {
    //            Heso = new Hesotangca(cnn, CustemerID, thang, nam);
    //            LuongTangcaCN = 0;
    //            LuongTangcaCN_Dem = 0;
    //            LuongTangcaLe = 0;
    //            LuongTangcaLe_Dem = 0;
    //            LuongTangcaNT = 0;
    //            LuongTangcaNT_Dem = 0;
    //            Truditre = 0;
    //            Dataluong = new Collection<Luongthang>();
    //            Luongphutroi = 0;
    //            Tongtangca = new Tangcathang();
    //        }
    //    }
    //    public int LuongTangcaNT;
    //    public int LuongTangcaCN;
    //    public int LuongTangcaLe;
    //    public int LuongTangcaNT_Dem;
    //    public int LuongTangcaCN_Dem;
    //    public int LuongTangcaLe_Dem;
    //    /// <summary>
    //    /// Lương được công thêm khi làm ca đêm thường là 30%
    //    /// </summary>
    //    public int Luongcadem;
    //    /// <summary>
    //    /// Tổng lương tăng ca (thường + lể + chủ nhật)
    //    /// </summary>
    //    public int Tongluongtangca
    //    {
    //        get
    //        {
    //            return (LuongTangcaCN + LuongTangcaLe + LuongTangcaNT + LuongTangcaNT_Dem + LuongTangcaLe_Dem + LuongTangcaCN_Dem + Vuot200_LuongTangcaCN + Vuot200_LuongTangcaCN_Dem + Vuot200_LuongTangcaLe + Vuot200_LuongTangcaLe_Dem + Vuot200_LuongTangcaNT + Vuot200_LuongTangcaNT_Dem);
    //        }
    //    }
    //    public int Tongluongtangcachiuthue
    //    {
    //        get
    //        {
    //            double tong = 0;
    //            if (Heso.Ngaythuong > 0)
    //                tong = LuongTangcaNT / Heso.Ngaythuong;
    //            if (Heso.Chunhat > 0)
    //                tong += LuongTangcaCN / Heso.Chunhat;
    //            if (Heso.Ngayle > 0)
    //                tong += LuongTangcaLe / Heso.Ngayle;
    //            if (Heso.Demchunhat > 0)
    //                tong += LuongTangcaCN_Dem / Heso.Demchunhat;
    //            if (Heso.Demle > 0)
    //                tong += LuongTangcaLe_Dem / Heso.Demle;
    //            if (Heso.Demngaythuong > 0)
    //                tong += LuongTangcaNT_Dem / Heso.Demngaythuong;
    //            int result = (int)Math.Round(tong, MidpointRounding.AwayFromZero);
    //            return result;
    //        }
    //    }
    //    public void Add(Luongngaycong data)
    //    {
    //        LuongTangcaCN += data.LuongTangcaCN;
    //        LuongTangcaLe += data.LuongTangcaLe;
    //        LuongTangcaNT += data.LuongTangcaNT;
    //        Luongcadem += data.Luongcadem;
    //        LuongTangcaCN_Dem += data.LuongTangcaCN_Dem;
    //        LuongTangcaLe_Dem += data.LuongTangcaLe_Dem;
    //        LuongTangcaNT_Dem += data.LuongTangcaNT_Dem;
    //        Luongphutroi += data.Luongphutroi;

    //        Ex_LuongtangcaCN += data.Ex_LuongtangcaCN;
    //        Ex_LuongtangcaCN_Dem += data.Ex_LuongtangcaCN_Dem;
    //        Ex_Luongtangcale += data.Ex_Luongtangcale;
    //        Ex_LuongtangcaLe_Dem += data.Ex_LuongtangcaLe_Dem;
    //        Ex_LuongtangcaNT += data.Ex_LuongtangcaNT;
    //        Ex_LuongtangcaNT_Dem += data.Ex_LuongtangcaNT_Dem;

    //        Truditre += data.Truditre;
    //        Trunghikhongluong += data.Trunghikhongluong;
    //        Trunghiom += data.Trunghiom;
    //        if (Dataluong.Count == 0) Dataluong = data.Dataluong;
    //        else
    //        {
    //            for (int i = 0; i < Dataluong.Count; i++)
    //            {
    //                foreach (Luongthang item in data.Dataluong)
    //                {
    //                    if (Dataluong[i].ID_DM == item.ID_DM)
    //                    {
    //                        Dataluong[i].Add(item);
    //                        Dataluong[i].Mucluong = item.Mucluong;
    //                        Dataluong[i].Mucluonggoc = item.Mucluonggoc;
    //                    }
    //                }
    //            }
    //        }
    //        Tongcong += data.Tongcong;
    //        Tongphepnam += data.Tongphepnam;
    //        TongPhutroi += data.TongPhutroi;
    //        Tongcongof += data.Tongcongof;
    //        Tongluong += data.Tongluong;
    //        Tongmucluongduocmienthue = data.Tongmucluongduocmienthue;
    //        Phucapnhao += data.Phucapnhao;
    //        Tongtangca.Add(data.Tongtangca);

    //        Vuot200_LuongTangcaCN += data.Vuot200_LuongTangcaCN;
    //        Vuot200_LuongTangcaLe += data.Vuot200_LuongTangcaLe;
    //        Vuot200_LuongTangcaNT += data.Vuot200_LuongTangcaNT;
    //        Vuot200_LuongTangcaCN_Dem += data.Vuot200_LuongTangcaCN_Dem;
    //        Vuot200_LuongTangcaLe_Dem += data.Vuot200_LuongTangcaLe_Dem;
    //        Vuot200_LuongTangcaNT_Dem += data.Vuot200_LuongTangcaNT_Dem;
    //    }
    //    public int Tongluongtangcakhongchiuthue
    //    {
    //        get
    //        {
    //            return (Tongluongtangca - Tongluongtangcachiuthue);
    //        }
    //    }
    //    public int Truditre;
    //    Hesotangca Heso;
    //    /// <summary>
    //    /// Danh sách lương tháng tương ứng với từng loại
    //    /// </summary>
    //    public Collection<Luongthang> Dataluong;
    //    /// <summary>
    //    /// Tổng lương cộng từ mức tổng của các khoản lương
    //    /// </summary>
    //    public int Tongluongmoi
    //    {
    //        get
    //        {
    //            int result = 0;
    //            foreach (Luongthang item in Dataluong)
    //            {
    //                result += item.Tongluong;
    //            }
    //            return result;
    //        }
    //    }
    //    public int Trunghikhongluong;
    //    public int Trunghiom;
    //    public int Trunghikhongphep;
    //    public int Trunghithaisan;
    //    public int Ex_LuongtangcaNT;
    //    public int Ex_LuongtangcaCN;
    //    public int Ex_Luongtangcale;
    //    public int Ex_LuongtangcaNT_Dem;
    //    public int Ex_LuongtangcaCN_Dem;
    //    public int Ex_LuongtangcaLe_Dem;
    //    public int Luongphutroi;
    //    public double Tongcong;
    //    public double Tongphepnam;
    //    public double TongPhutroi;
    //    public double Tongcongof;
    //    public Tangcathang Tongtangca;
    //    public double Congdu;
    //    /// <summary>
    //    /// Tổng lương tính tổng cộng lương lại rồi mới tính theo ngày công (để giảm sai số)
    //    /// </summary>
    //    public int Tongluong;
    //    public int Luongphepnamchuanghi;
    //    /// <summary>
    //    /// Không sử dụng cột này nữa mà sử dụng cột tongluongduocmienthue
    //    /// </summary>
    //    public int Tongmucluongduocmienthue;
    //    /// <summary>
    //    /// Phụ cấp nhà ở, đánh dấu trong danh mục lương
    //    /// </summary>
    //    public int Phucapnhao;
    //    public int Tongmuclungthuviec;
    //    public int Tongmucluongchinhthuc_DongBHXH;
    //    public int Tongmucluongchinhthuc_KhongdongBHXH;

    //    public int Vuot200_LuongTangcaNT;
    //    public int Vuot200_LuongTangcaCN;
    //    public int Vuot200_LuongTangcaLe;
    //    public int Vuot200_LuongTangcaNT_Dem;
    //    public int Vuot200_LuongTangcaCN_Dem;
    //    public int Vuot200_LuongTangcaLe_Dem;
    //    /// <summary>
    //    /// Lương được miển thuế (các trường hợp được miển thuế (trang phục, tiền ăn). phụ cấp nhà ở mà giới hạn theo mức 15% tổng thu nhập chịu thuế thì không đánh dấu miển thuế mà chỉ đánh dấu là pcnhao để tính riêng.
    //    /// </summary>
    //    public int Tongluongduocmienthue
    //    {
    //        get
    //        {
    //            int result = 0;
    //            for (int i = 0; i < Dataluong.Count; i++)
    //            {
    //                if (Dataluong[i].IsMienthue)
    //                {
    //                    if (Dataluong[i].Mucluong <= Dataluong[i].Muctoidaduocmienthue)
    //                        result += Dataluong[i].Mucluong;
    //                    else result += Dataluong[i].Muctoidaduocmienthue;
    //                }
    //            }
    //            return result;
    //        }

    //    }
    //}
    //public class Donxinphep
    //{
    //    public Donxinphep()
    //    {
    //        _id_nv = 0;
    //        Tungay = new BuoiNghi();
    //        Ngayvaolam = new BuoiNghi();
    //        hinhthuc = 0;
    //        tenhinhthuc = "";
    //        Id_rq = 0;
    //        Id_group = 0;
    //        IsApproved = false;
    //        Nhanvien = new EDTO();
    //        Hinhthucditre = 0;
    //        Sophut = 0;
    //        nguoibangiaocongviec = "";
    //        nguoilienhe = "";
    //        dienthoainguoilienhe = "";
    //        Colydochinhdang = false;
    //        IsCongTac = false;
    //    }
    //    private int _id_nv;
    //    public int Id_nv
    //    {
    //        get
    //        {
    //            return _id_nv;
    //        }
    //        set
    //        {
    //            _id_nv = value;
    //            EDTO result = new EDTO();
    //            if (_id_nv > 0)
    //            {
    //                Employee bemp = new Employee(_id_nv.ToString());
    //                result = bemp.GetById();
    //            }
    //            Nhanvien = result;
    //        }
    //    }
    //    public EDTO Nhanvien;
    //    public BuoiNghi Tungay;
    //    public BuoiNghi Ngayvaolam;
    //    public BuoiNghi Denhetngay;
    //    /// <summary>
    //    /// Loại nghỉ phép: phép năm, nghỉ không lương,...
    //    /// </summary>
    //    public int hinhthuc;
    //    /// <summary>
    //    /// Tên loại nghỉ phép
    //    /// </summary>
    //    public string tenhinhthuc;
    //    public int Id_rq;
    //    public int Id_group;//Id Quy trình duyệt
    //    public bool IsApproved;
    //    public double Songay;
    //    public int Nguoinhap;
    //    public DateTime Ngaynhap;
    //    public string ghichu;
    //    /// <summary>
    //    /// 1: Vào trễ, 2: Về sớm
    //    /// </summary>
    //    public int Hinhthucditre;
    //    /// <summary>
    //    /// Số phút đi trễ/về sớm. Áp dụng đối với đơn xin vào trễ, ra sớm
    //    /// </summary>
    //    public int Sophut;
    //    public string nguoilienhe;
    //    public string dienthoainguoilienhe;
    //    public string nguoibangiaocongviec;
    //    public DateTime Tungaygio;
    //    public DateTime Denngaygio;
    //    public bool Colydochinhdang;
    //    public bool IsCongTac;
    //}
    public class Luong
    {
        public Luong()
        {
            LCB = 0;
            LKD = 0;
        }
        public int LCB;
        public int LKD;
        public int Tongluong
        {
            get
            {
                return LCB + LKD;
            }
        }
        public void Add(Luong data)
        {
            LCB += data.LCB;
            LKD += data.LKD;
        }
    }
    public class Phep
    {
        public Phep()
        {
            loaiphep = 0;
            songayphep = 0;
            socongphep = 0;
        }
        public int loaiphep;
        public double songayphep;
        public float socongphep;
    }

    /// <summary>
    /// Lớp lưu trữ lương 1 tháng của 1 loại lương: ví dụ lcb, lkd
    /// </summary>
    public class Luongthang
    {
        public Luongthang(string CustemerID)
        {
            Mucluong = 0;
            Luongngaycong = 0;
            Luongnghichedo = 0;
            Luongnghile = 0;
            Luongphepnam = 0;
            ID_DM = 0;
            DongBHXH = false;
            Currency = "VNĐ";
            Cachtinhluong1ngay = 1;
            Tongluongtinhrieng = 0;
            Luong1gio = 0;
            Tinhvaoluongtangca = true;
            Hinhthucluong = 0;
            Cachtinh = 0;
            IsMienthue = false;
            Muctoidaduocmienthue = 0;
            IsPhucapnhao = false;
            IsTinhluongtheongaycong = true;
            //if ("105".Equals(CustemerID)) Cachtinhluong1ngay = 2;
        }
        /// <summary>
        /// id_dm của loại lương trong bảng dm_luong
        /// </summary>
        public int ID_DM;
        public int Thang;
        public int Nam;
        /// <summary>
        /// Mức lương tháng tính theo VND
        /// </summary>
        public int Mucluong;
        public int Luongngaycong;
        public int Luongphepnam;
        public int Luongnghichedo;
        public int Luongnghile;
        public int Luonghetviec;
        public int Luong1gio;
        /// <summary>
        /// Tổng lương cộng từ luongngaycong, luongnghichedo, luongnghile, luongphepnam
        /// </summary>
        public int Tongluong
        {
            get
            {
                return (Luongngaycong + Luongnghichedo + Luongnghile + Luongphepnam);
            }
        }
        /// <summary>
        /// Lương được tính riêng cộng tổng ngày công lại để tính 1 lần tránh sai số nhiều
        /// </summary>
        public int Tongluongtinhrieng;
        public void Add(Luongthang Data)
        {
            Luongngaycong += Data.Luongngaycong;
            Luongnghichedo += Data.Luongnghichedo;
            Luongnghile += Data.Luongnghile;
            Luongphepnam += Data.Luongphepnam;
        }
        public double Luong1ngay(double songay)
        {
            double result = 0;
            if (Hinhthucluong > 0) result = Mucluong;
            else
            {
                if (Cachtinhluong1ngay == 2)
                {
                    result = Mucluong * 12 / 313;
                }
                else
                {
                    if (songay <= 0) return 0;
                    result = Mucluong / songay;
                }
            }
            return result;
        }
        public bool DongBHXH;
        public string Currency;
        /// <summary>
        /// Mức lương tháng theo đơn vị gốc
        /// </summary>
        public int Mucluonggoc;
        public double RateVND;
        /// <summary>
        /// Cách tính luwong 1 ngày
        /// 1: tính theo công thức việt nam = tổng lương/số ngày công
        /// 2: tính theo công thức malaysia = tổng lương * 12/313
        /// </summary>
        public int Cachtinhluong1ngay;
        public decimal NgachID;
        public decimal NgachID_Detail;
        public int muc;
        public int Bac;
        public double Heso;
        public int Luongthuviec;
        public bool Tinhvaoluongtangca;
        /// <summary>
        /// 0: Lương tháng, 1: Lương ngày, 2: Lương giờ. Lương giờ áp dụng cho khách hàng Thiên hà
        /// </summary>
        public int Hinhthucluong;
        public int Cachtinh;
        public bool IsMienthue;
        public int Muctoidaduocmienthue;
        public bool IsPhucapnhao;
        public bool IsTinhluongtheongaycong;
    }
    public class Phucap
    {
        public Phucap()
        {
            Mucphucap = 0;
            ID_DM = 0;
            Currency = "VNĐ";
        }
        /// <summary>
        /// id_dm của loại phụ cấp trong bảng tbl_phucap
        /// </summary>
        public int ID_DM;
        public string Currency;
        public double Mucphucap;
        public float RateVND;
        public int Cachinh;
        public DateTime NgayHuong;
    }
    public class AllowanceHis
    {
        public AllowanceHis()
        {
            Phucapmoi = new Collection<Phucap>();
            Phucapcu = new Collection<Phucap>();
        }
        public Int32 id_his;
        public string SoQD;
        public DateTime Ngaythaydoi;
        public string Nguoiky;
        public Collection<Phucap> Phucapmoi;
        public Collection<Phucap> Phucapcu;
        public Int32 Id_NV;
        public string ghichu;
        public string filequyetdinh;
        public DateTime Ngayky;
        public bool active;
        public string nguoinhap;
    }
    public class NhombaocaoBHXH
    {
        public NhombaocaoBHXH(string ID)
        {
            string select = "select Luongtoithieu, Madv, Diachi, Sodt, Sotaikhoan, Tennganhang, Tennhom from Nhom_baocaoBHXH where (where)";
            SqlConditions cond = new SqlConditions();
            cond.Add("id_row", ID);
            using (DpsConnection cnn = new DpsConnection())
            {
                DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
                if (dt.Rows.Count > 0)
                {
                    DataRow row = dt.Rows[0];
                    Madv = row["madv"].ToString();
                    Tendonvi = row["Tennhom"].ToString();
                    Sodt = row["Sodt"].ToString();
                    Diachi = row["Diachi"].ToString();
                    Sotaikhoan = row["Sotaikhoan"].ToString();
                    Tennganhang = row["Tennganhang"].ToString();
                    int.TryParse(row["Luongtoithieu"].ToString(), out Luongtoithieu);
                }
            }
        }
        public string Madv;
        public string Tendonvi;
        public string Sodt;
        public string Diachi;
        public string Sotaikhoan;
        public string Tennganhang;
        public int Luongtoithieu;
    }
    public class Bangchamcongthang
    {
        public Bangchamcongthang()
        {
            id_nv = "";
        }
        public string id_nv;
        public DateTime Tungay;
        public DateTime Denngay;
        public string id_bp;
        public string id_to;
        public string id_chucdanh;
        public string CocauID;
    }
    public class TamnghiDTO
    {
        public TamnghiDTO()
        { }
        public double Songay;
        public int Id_nv;
        public DateTime Ngaynghi;
        /// <summary>
        /// Ngày vào làm thực tế
        /// </summary>
        public DateTime Ngayvaolam;
        public string Lydo;
        public string Hinhthuc;
        public string Dieukientinhhuong;
        public bool IsBaogiamBHXH;
        public bool IsDavaolam;
        public Int32 LuongCB;
        public string Nguoinhap;
        public int ID;
        public DateTime Denngay;
    }
    public class Thamso
    {
        public Thamso(string CustemerID)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("RowID", CustemerID);
            using (DpsConnection cnn = new DpsConnection())
            {
                DataTable dt = cnn.CreateDataTable("select apdungluongngachbac from Tbl_Custemers where (where)", "(where)", cond);
                if (dt.Rows.Count > 0) int.TryParse(dt.Rows[0][0].ToString(), out Cachnhapluong);
            }
        }
        public int Hinhthucchamcong;
        public bool IsRequireOvertimRegister;
        public double BlockTinhcong;
        /// <summary>
        /// 0: Tính theo ngày công trên bảng phân ca, số: tính công đủ là số
        /// </summary>
        public int Cachtinhcongdu;
        /// <summary>
        /// Cách trừ giờ 1: Trừ tính theo block, 2: Trừ tính theo khoảng trong bảng tbl_cackhoantrugio
        /// </summary>
        //public int Cachtrugio;
        public int sophutduoctinh1block;
        /// <summary>
        /// 1: Nhập theo số tiền từng khoản, 2: nhập lương theo ngạch - bậc
        /// </summary>
        public int Cachnhapluong;
        public int Songaynhachethanhopdong;
        /// <summary>
        /// Đơn vị mà cá nhân được xem lịch nghỉ phép, tăng ca. 0: cho xem toàn công ty, 1: Xem lịch nghỉ của bộ phận mình
        /// </summary>
        public int Donviduocxemlich;
        public int Sophutchopheprasom;
        public int Sophutchuyenca;
        public int Sophutchophepditre;
        public string Batdaucadem;
        public string Ketthuccadem;
        public int Sophuttangcatoithieu;
        /// <summary>
        /// Cách xác định ngày của giờ quét 1: Quét ngày nào là của ngày đó, 2: Xác định dựa vào ca làm việc (áp dụ với trường hợp có ca đêm)
        /// </summary>
        public int Cachxacdinhngayquetcong;
    }
    public class Gionghigiuaca
    {
        public Gionghigiuaca()
        {
            Sophutnghi = 0;
        }
        public DateTime Giobatdaunghi;
        public DateTime Gioketthucnghi;
        public int Sophutnghi;
        public Gionghigiuaca(DateTime Giobatdau, DateTime Gioketthuc)
        {
            Giobatdaunghi = Giobatdau;
            Gioketthucnghi = Gioketthuc;
            int Sophut = 0;
            if ((!Giobatdau.Equals(new DateTime())) && (!Gioketthuc.Equals(new DateTime())))
            {
                TimeSpan t = Gioketthuc - Giobatdau;
                Sophut = (int)t.TotalMinutes;
            }
            Sophutnghi = Sophut;
        }
    }
    public class Khoangthoigianlamtron
    {
        public Khoangthoigianlamtron()
        { }
        public DateTime Tugio;
        public DateTime Dengio;
        /// <summary>
        /// Làm tròn giờ ra hay giờ vào. 1 Làm tròn giờ vào, 2 làm tròn giờ ra
        /// </summary>
        public int Gioxet;
        /// <summary>
        /// Sẽ làm tròn thành giờ nào vd: từ 17:55 đến 18:20 thì làm tròn về 18:00
        /// </summary>
        public DateTime Giolamtron;
    }
    public class Mucluongthang
    {
        public Mucluongthang(string inp_id_nv, int inp_thang, int inp_nam, int inp_Id_ls)
        {
            id_nv = inp_id_nv;
            thang = inp_thang;
            nam = inp_nam;
            Id_Ls = inp_Id_ls;
            IsDongBHXH = true;
        }
        public Mucluongthang()
        {
            thang = 0;
            nam = 0;
        }
        public string id_nv;
        public int thang;
        public int nam;
        public int Id_Ls;
        public DateTime Tungay;
        public DateTime Denngay;
        public bool IsDongBHXH;
        public string id_bp;
        public string id_to;
        public string id_chucdanh;
    }
    public class RuleAllocationAnnualLeave
    {
        public RuleAllocationAnnualLeave(string CustemerID, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("CustemerID", CustemerID);
            string select = "select giatri, id_row from tbl_thamso where (where) and (id_row in (15, 16, 40, 41,553)) order by id_row";

            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            string ngaycapphep = "15,0,0";
            string Ngayvaotoidaduoccap = "15,0";
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                switch (dt.Rows[i]["id_row"].ToString())
                {
                    case "15": int.TryParse(dt.Rows[i][0].ToString(), out Cachcapphepnam); break;
                    case "16": int.TryParse(dt.Rows[i][0].ToString(), out Thangbatdaucapphep); break;
                    case "40": ngaycapphep = dt.Rows[i][0].ToString(); break;
                    case "41": Ngayvaotoidaduoccap = dt.Rows[i][0].ToString(); break;
                    case "553": int.TryParse(dt.Rows[i][0].ToString(), out Songayphephangthang); break;
                    default:
                        break;
                }
            }
            string[] slist = ngaycapphep.Split(',');
            if (slist.Length == 3)
            {
                int.TryParse(slist[0], out Ngaycapphep);
                int.TryParse(slist[1], out Thangcapphep);
                double.TryParse(slist[2], out Socongdu);
            }
            else
            {
                Ngaycapphep = 15;
                Thangcapphep = 0;
                Socongdu = 0;
            }
            slist = Ngayvaotoidaduoccap.Split(';');
            Ngayvaotoithieu_songayphep[] Listngayvaotoithieu_songay = new Ngayvaotoithieu_songayphep[slist.Length];
            for (int i = 0; i < slist.Length; i++)
            {
                Listngayvaotoithieu_songay[i] = new Ngayvaotoithieu_songayphep();
                int ngayvaotoida = 0;
                double songayphep = 0;
                string[] s1 = slist[i].Split(',');
                if ((s1.Length == 2) && (int.TryParse(s1[0], out ngayvaotoida)) && (double.TryParse(s1[1], out songayphep)))
                {
                    Listngayvaotoithieu_songay[i].Ngayvaotoida = ngayvaotoida;
                    Listngayvaotoithieu_songay[i].Songayduoccap = songayphep / 10;
                }
            }
            Listngayvaotoida_songay = Listngayvaotoithieu_songay;
            //Ngayvaotoithieuduoc1ngay = 15;
            //Ngayvaotoithieuduocnuangay = 20;
        }
        /// <summary>
        /// 0: Cấp từ tháng vào công ty. 1: Cấp từ tháng vào chính thức, 2: Cấp từ tháng thử việc
        /// </summary>
        public int Thangbatdaucapphep;
        /// <summary>
        /// 0: Cấp từng tháng, 1: Cấp 1 lúc 12 ngày phép
        /// </summary>
        public int Cachcapphepnam;
        /// <summary>
        /// Ngày chạy chức năng cấp phép
        /// </summary>
        public int Ngaycapphep;
        /// <summary>
        /// Tháng chạy chức năng cấp phép (ví dụ 1 tức là phép của tháng được cấp vào 1 tháng tiếp theo (VD phép tháng 1 sẽ được cấp vào tháng 2))
        /// </summary>
        public int Thangcapphep;
        /// <summary>
        /// Số công phải làm đủ để được cấp phép
        /// </summary>
        public double Socongdu;
        /*
        /// <summary>
        /// Vào làm từ ngày mấy thì được 1 ngày phép của tháng vào làm
        /// </summary>
        public int Ngayvaotoithieuduoc1ngay;
        /// <summary>
        /// Vào làm từ ngày mấy thì được 0.5 ngày phép của tháng vào làm
        /// </summary>
        public int Ngayvaotoithieuduocnuangay;
         */
        public Ngayvaotoithieu_songayphep[] Listngayvaotoida_songay;
        /// <summary>
        /// Số ngày phép sẽ được cấp từng tháng. Nếu = -1 là = tổng sổ số ngày trong năm chia cho 12.
        /// </summary>
        public int Songayphephangthang;
    }
    public class TimeParaByShift
    {
        public TimeParaByShift()
        {
            IsTinhcadem = true;
            SophutTangcaduoccongthem = 0;
            Sophuttangcatoithieudeduoccongthem = 0;
            Hesotangca = -1;
            thietlaptinhcong = new Thietlaptinhcong();
        }
        public DateTime batdaulam = new DateTime();
        /// <summary>
        /// Giờ kết thúc làm tính thời gian làm việc (có thể ko phải giờ kết thúc ca). VD ca 12 tiếng 7h-20h (làm 8h từ 7h-16h, OT 4h từ 16h-20h) thì kết thúc làm là 16h
        /// </summary>
        public DateTime ketthuclam = new DateTime();
        public List<Gionghigiuaca> Nghigiuaca = new List<Gionghigiuaca>();
        public double sogiolamviec = 0;
        /// <summary>
        /// Ca làm việc của ngày này
        /// </summary>
        public int Id_ca = 0;
        public double Sogio1cong = 0;
        public double sophutduoccongthem = 0;
        public double Sogiophailam_deduoccongthem = 1;
        /// <summary>
        /// 0: Tính bình thường lấy giờ ra trừ giờ vào, 1: Tính đủ công nếu có quét, 2: Luôn luôn tính đủ công, 3: Tính công shipper
        /// </summary>
        public int Hinhthuctinhcong = 0;
        /// <summary>
        /// Giờ kết thúc ca. VD ca 12 tiếng 7h-20h (làm 8h từ 7h-16h, OT 4h từ 16h-20h) thì kết thúc ca là 20h
        /// </summary>
        public DateTime Ketthucca = new DateTime();
        public DateTime Batdautangca = new DateTime();
        public double sogiotangca = 0;
        public int Khoangthoigian = 1;
        public bool Tinhtangcavaosom = false;
        public bool Tinhtangcaratre = true;
        public List<Khoangthoigianlamtron> Re_Khoangthoigianlamtron = new List<Khoangthoigianlamtron>();
        public bool IsKhonggioihanthoigian = false;
        public DateTime Gioihangioditre = new DateTime();
        public DateTime Gioihangiovaosom = new DateTime();
        /// <summary>
        /// Ca được xếp cho ngày này, trường hợp có đi là là ca trong bảng xếp ca, ko đi làm là ca trong bảng xếp ca ngày nghỉ
        /// </summary>
        public int Calamviec;
        /// <summary>
        /// Cách làm tròn khi tính công 1 ngày. 1: Tính làm tròn theo block, 2: Sau khi tính công sẽ làm tròn công dựa vào bảng dm_lamtroncong
        /// </summary>
        public int Cachlamtron;
        /// <summary>
        /// Khoang thoi gian tang ca. 0: Khong tang ca, 1: tang ca vao som, 2: tang ca ra tre
        /// </summary>
        public int Khoangthoigiantangca;
        /// <summary>
        /// Khi tính công sẽ tự động trừ số phút này. áp dụng shung shin vina
        /// </summary>
        public int Sophutbitrutudong = 0;
        /// <summary>
        /// 1: Có làm buổi sáng mới trừ, 2: Có làm buổi chiều mới trừ, 0: Làm cả ngày mới trừ
        /// </summary>
        public int Buoitru = 0;
        /// <summary>
        /// Ca làm việc có tính số giờ ca đêm hay không, áp dụng trường hợp không bắt buộc đúng giờ và người đi làm vào giờ ca đêm nhưng không được tính
        /// </summary>
        public bool IsTinhcadem;
        /// <summary>
        /// Áp dụng sungshin vina tăng ca sau ca đêm từ 70p trờ lên sẽ được cộng thêm 50p
        /// </summary>
        public int SophutTangcaduoccongthem;
        public int Sophuttangcatoithieudeduoccongthem;
        /// <summary>
        /// Hệ số tăng ca đối với khi tăng ca vào ngày này. -1: hệ số ngày thường, 2 hệ số ngày nghỉ
        /// </summary>
        public double Hesotangca;
        /// <summary>
        /// Số phút được hưởng chế độ về sớm hoặc đi trể khi nuôi con nhỏ
        /// </summary>
        public double Sophutduochuongchedovesom;
        /// <summary>
        /// Ca có tách giờ tăng ca của ngày nào thì tính cho ngày đó
        /// </summary>
        public bool IsTachngaytangca;
        public DateTime Giolan1 = new DateTime();
        public DateTime Giolan2 = new DateTime();
        public DateTime Giolan3 = new DateTime();
        public Thietlaptinhcong thietlaptinhcong;
    }
    public class Congcuoithang_thienha
    {
        public Congcuoithang_thienha()
        {
            conglam = 0;
            phepnam = 0;
            tangcant = 0;
            tangcale = 0;
            tangcacn = 0;
            cadem = 0;
            phutroi = 0;
            congof = 0;
            chuyencan = 0;
            congcn = 0;
        }
        public double conglam;
        public double phepnam;
        public float tangcant;
        public float tangcacn;
        public float tangcale;
        public double cadem;
        public double phutroi;
        public double congof;
        public double chuyencan;
        public double congcn;
    }
    public class Dulieudangkytangca
    {
        public Dulieudangkytangca()
        {
            Tangcavaosom = new List<OTRegInfo>();
            Tangcaratre = new List<OTRegInfo>();
            Tangcagiuagio = new List<OTRegInfo>();
        }
        private Dulieudangkytangca(string id_nv, DateTime ngay)
        {
            using (DpsConnection cnn = new DpsConnection())
            {
                SqlConditions cond = new SqlConditions();
                cond.Add("id_nv", id_nv);
                cond.Add("ngay", ngay);
                string select = "select id_nv, tangca, Batdautc, Ketthuctangca, Vaosom_Tangca, Vaosom_BatdauTC, Vaosom_Ketthuctangca, Giuagio_Tangca, Giuagio_BatdauTC, Giuagio_Ketthuctangca, IsOTinBreaktime, Vaosom_IsOTinBreaktime, Sogiotcdangky, Giuagio_SogioTC, Vaosom_SogioTC from chamcongngay where (where)";
                DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
                if (dt.Rows.Count > 0)
                {
                    Ratre_IsOvertime = false;
                    if (bool.TrueString.Equals(dt.Rows[0]["tangca"].ToString())) Ratre_IsOvertime = true;
                    Ratre_IsOvertimeInBreaktime = false;
                    if (bool.TrueString.Equals(dt.Rows[0]["IsOTinBreaktime"].ToString())) Ratre_IsOvertimeInBreaktime = true;
                    DateTime.TryParse(dt.Rows[0]["Batdautc"].ToString(), out Ratre_giobatdau);
                    DateTime.TryParse(dt.Rows[0]["Ketthuctangca"].ToString(), out Ratre_gioketthuc);
                    Vaosom_IsOvertime = false;
                    if (bool.TrueString.Equals(dt.Rows[0]["Vaosom_Tangca"].ToString())) Vaosom_IsOvertime = true;
                    Vaosom_IsOvertimeInBreaktime = false;
                    if (bool.TrueString.Equals(dt.Rows[0]["Vaosom_IsOTinBreaktime"].ToString())) Vaosom_IsOvertimeInBreaktime = true;
                    DateTime.TryParse(dt.Rows[0]["Vaosom_BatdauTC"].ToString(), out Vaosom_giobatdau);
                    DateTime.TryParse(dt.Rows[0]["Vaosom_Ketthuctangca"].ToString(), out Vaosom_gioketthuc);
                    Giuagio_IsOvertime = false;
                    if (bool.TrueString.Equals(dt.Rows[0]["Giuagio_Tangca"].ToString())) Giuagio_IsOvertime = true;
                    DateTime.TryParse(dt.Rows[0]["Giuagio_BatdauTC"].ToString(), out Giuagio_giobatdau);
                    DateTime.TryParse(dt.Rows[0]["Giuagio_Ketthuctangca"].ToString(), out Giuagio_gioketthuc);
                    Vaosom_ID_OTReg = dt.Rows[0]["Vaosom_Id_OTReg"].ToString();
                    Giuagio_ID_OTReg = dt.Rows[0]["Giuagio_Id_OTReg"].ToString();
                    Ratre_ID_OTReg = dt.Rows[0]["Ratre_Id_OTReg"].ToString();
                    if ("2".Equals(dt.Rows[0]["Vaosom_Cachtinh"].ToString()))
                        Vaosom_Cachtinh = Cachtinhtangca.Nghibu;
                    else Vaosom_Cachtinh = Cachtinhtangca.Tinhtangca;
                    if ("2".Equals(dt.Rows[0]["Giuagio_Cachtinh"].ToString()))
                        Giuagio_Cachtinh = Cachtinhtangca.Nghibu;
                    else Giuagio_Cachtinh = Cachtinhtangca.Tinhtangca;
                    if ("2".Equals(dt.Rows[0]["Ratre_Cachtinh"].ToString()))
                        Ratre_Cachtinh = Cachtinhtangca.Nghibu;
                    else Ratre_Cachtinh = Cachtinhtangca.Tinhtangca;
                }
            }
        }
        public Dulieudangkytangca(string id_nv, DateTime ngay, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            /*
            cond.Add("id_nv", id_nv);
            cond.Add("ngay", ngay);
            string select = "select id_nv, tangca, Batdautc, Ketthuctangca, Vaosom_Tangca, Vaosom_BatdauTC, Vaosom_Ketthuctangca, Giuagio_Tangca, Giuagio_BatdauTC, Giuagio_Ketthuctangca, IsOTinBreaktime, Vaosom_IsOTinBreaktime, Vaosom_Id_OTReg, Giuagio_Id_OTReg, Ratre_Id_OTReg, Vaosom_Cachtinh, Giuagio_Cachtinh, Ratre_Cachtinh, Giuagio_IsOTinBreaktime, Sogiotcdangky, Giuagio_SogioTC, Vaosom_SogioTC from chamcongngay where (where)";
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            if (dt.Rows.Count > 0)
            {
                Ratre_IsOvertime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["tangca"].ToString())) Ratre_IsOvertime = true;
                Ratre_IsOvertimeInBreaktime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["IsOTinBreaktime"].ToString())) Ratre_IsOvertimeInBreaktime = true;
                DateTime.TryParse(dt.Rows[0]["Batdautc"].ToString(), out Ratre_giobatdau);
                DateTime.TryParse(dt.Rows[0]["Ketthuctangca"].ToString(), out Ratre_gioketthuc);
                Vaosom_IsOvertime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["Vaosom_Tangca"].ToString())) Vaosom_IsOvertime = true;
                Vaosom_IsOvertimeInBreaktime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["Vaosom_IsOTinBreaktime"].ToString())) Vaosom_IsOvertimeInBreaktime = true;
                DateTime.TryParse(dt.Rows[0]["Vaosom_BatdauTC"].ToString(), out Vaosom_giobatdau);
                DateTime.TryParse(dt.Rows[0]["Vaosom_Ketthuctangca"].ToString(), out Vaosom_gioketthuc);
                Giuagio_IsOvertime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["Giuagio_Tangca"].ToString())) Giuagio_IsOvertime = true;
                Giuagio_IsOvertimeInBreaktime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["Giuagio_IsOTinBreaktime"].ToString())) Giuagio_IsOvertimeInBreaktime = true;

                DateTime.TryParse(dt.Rows[0]["Giuagio_BatdauTC"].ToString(), out Giuagio_giobatdau);
                DateTime.TryParse(dt.Rows[0]["Giuagio_Ketthuctangca"].ToString(), out Giuagio_gioketthuc);
                Vaosom_ID_OTReg = dt.Rows[0]["Vaosom_Id_OTReg"].ToString();
                Giuagio_ID_OTReg = dt.Rows[0]["Giuagio_Id_OTReg"].ToString();
                Ratre_ID_OTReg = dt.Rows[0]["Ratre_Id_OTReg"].ToString();
                if ("2".Equals(dt.Rows[0]["Vaosom_Cachtinh"].ToString()))
                    Vaosom_Cachtinh = Cachtinhtangca.Nghibu;
                else Vaosom_Cachtinh = Cachtinhtangca.Tinhtangca;
                if ("2".Equals(dt.Rows[0]["Giuagio_Cachtinh"].ToString()))
                    Giuagio_Cachtinh = Cachtinhtangca.Nghibu;
                else Giuagio_Cachtinh = Cachtinhtangca.Tinhtangca;
                if ("2".Equals(dt.Rows[0]["Ratre_Cachtinh"].ToString()))
                    Ratre_Cachtinh = Cachtinhtangca.Nghibu;
                else Ratre_Cachtinh = Cachtinhtangca.Tinhtangca;

                double.TryParse(dt.Rows[0]["Sogiotcdangky"].ToString(), out Ratre_sogiotangca);
                double.TryParse(dt.Rows[0]["Giuagio_SogioTC"].ToString(), out Giuagio_sogiotangca);
                double.TryParse(dt.Rows[0]["Vaosom_SogioTC"].ToString(), out Vaosom_sogiotangca);
            }*/
            Tangcavaosom = new List<OTRegInfo>();
            Tangcaratre = new List<OTRegInfo>();
            Tangcagiuagio = new List<OTRegInfo>();
            cond = new SqlConditions();
            cond.Add("Calamviecngay", ngay);
            cond.Add("id_nv", id_nv);
            string select = "select Date, BeginTime, Hours, Buoi, id_nv, EndTime, Calamviecngay, Detail.overtimeinbreaktime, Detail.Id_OTReg,CASE WHEN Reg.PlanID is NULL THEN Detail.Cachtinh ELSE Sa_OvertimePlan.Cachtinh END AS Cachtinh, Reg.PlanID, Detail.IsFixHours from Sa_OverTimeReg Reg inner join Sa_OTRDetails Detail on Reg.Id_row=Detail.Id_OTReg left join Sa_OvertimePlan on Reg.PlanID=Sa_OvertimePlan.RowID where Reg.Approved=1 and Reg.Disable=0 and Detail.Calamviecngay=@Calamviecngay and Id_nv=@Id_nv";
            DataTable dt = cnn.CreateDataTable(select, cond);
            IFormatProvider fm = new CultureInfo("en-US", true);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DateTime tugio = new DateTime();
                double sogio = 0;
                if (DateTime.TryParseExact(string.Format("{0:dd/MM/yyyy}", dt.Rows[i]["Date"]) + " " + dt.Rows[i]["BeginTime"].ToString(), "dd/MM/yyyy HH:mm", fm, DateTimeStyles.NoCurrentDateDefault, out tugio))
                {
                    DateTime dengio = new DateTime();
                    if (DateTime.TryParseExact(string.Format("{0:dd/MM/yyyy}", dt.Rows[i]["Date"]) + " " + dt.Rows[i]["EndTime"].ToString(), "dd/MM/yyyy HH:mm", fm, DateTimeStyles.NoCurrentDateDefault, out dengio))
                    {
                        if (dengio <= tugio) dengio = dengio.AddDays(1);
                        TimeSpan t = dengio - tugio;
                        sogio = t.TotalHours;
                    }
                    else if (double.TryParse(dt.Rows[i]["Hours"].ToString(), out sogio))
                    {
                        dengio = tugio.AddHours(sogio);
                    }
                    OTRegInfo dangkytangca = new OTRegInfo();
                    dangkytangca.IsOvertime = true;
                    dangkytangca.IsOvertimeInBreaktime = bool.TrueString.Equals(dt.Rows[i]["overtimeinbreaktime"].ToString());
                    dangkytangca.Giobatdau = tugio;
                    dangkytangca.Gioketthuc = dengio;
                    if ("2".Equals(dt.Rows[i]["Cachtinh"].ToString()))
                        dangkytangca.Cachtinh = Cachtinhtangca.Nghibu;
                    else dangkytangca.Cachtinh = Cachtinhtangca.Tinhtangca;
                    dangkytangca.Sogiotangca = sogio;
                    dangkytangca.Id_OTReg = dt.Rows[i]["Id_OTReg"].ToString();
                    dangkytangca.IsFixHours = bool.TrueString.Equals(dt.Rows[i]["IsFixHours"].ToString());

                    switch (dt.Rows[i]["Buoi"].ToString())
                    {
                        case "1":
                            {
                                Tangcavaosom.Add(dangkytangca);
                                Vaosom_IsOvertime = true;
                                Vaosom_IsOvertimeInBreaktime = bool.TrueString.Equals(dt.Rows[i]["overtimeinbreaktime"].ToString());
                                Vaosom_giobatdau = tugio;
                                Vaosom_gioketthuc = dengio;
                                if ("2".Equals(dt.Rows[i]["Cachtinh"].ToString()))
                                    Vaosom_Cachtinh = Cachtinhtangca.Nghibu;
                                else Vaosom_Cachtinh = Cachtinhtangca.Tinhtangca;
                                Vaosom_sogiotangca = sogio;
                                Vaosom_ID_OTReg = dt.Rows[i]["Id_OTReg"].ToString();
                                Vaosom_IsFixHours = bool.TrueString.Equals(dt.Rows[i]["IsFixHours"].ToString());
                                if ((Vaosom_FirstTime.Equals(new DateTime())) || (Vaosom_FirstTime > tugio)) Vaosom_FirstTime = tugio;
                                if ((Vaosom_LastTime.Equals(new DateTime())) || (Vaosom_LastTime < dengio)) Vaosom_LastTime = dengio;
                                break;//Vào sớm
                            }
                        case "0":
                            {
                                Tangcaratre.Add(dangkytangca);
                                Ratre_IsOvertime = true;
                                Ratre_IsOvertimeInBreaktime = bool.TrueString.Equals(dt.Rows[i]["overtimeinbreaktime"].ToString());
                                Ratre_giobatdau = tugio;
                                Ratre_gioketthuc = dengio;
                                if ("2".Equals(dt.Rows[i]["Cachtinh"].ToString()))
                                    Ratre_Cachtinh = Cachtinhtangca.Nghibu;
                                else Ratre_Cachtinh = Cachtinhtangca.Tinhtangca;
                                Ratre_sogiotangca = sogio;
                                Ratre_ID_OTReg = dt.Rows[i]["Id_OTReg"].ToString();
                                Ratre_IsFixHours = bool.TrueString.Equals(dt.Rows[i]["IsFixHours"].ToString());
                                if ((Ratre_FirstTime.Equals(new DateTime())) || (Ratre_FirstTime > tugio)) Ratre_FirstTime = tugio;
                                if ((Ratre_LastTime.Equals(new DateTime())) || (Ratre_LastTime < dengio)) Ratre_LastTime = dengio;
                                break; //Ra trể
                            }
                        case "2":
                            {
                                Tangcagiuagio.Add(dangkytangca);
                                Giuagio_IsOvertime = true;
                                Giuagio_IsOvertimeInBreaktime = bool.TrueString.Equals(dt.Rows[i]["overtimeinbreaktime"].ToString());
                                Giuagio_giobatdau = tugio;
                                Giuagio_gioketthuc = dengio;
                                if ("2".Equals(dt.Rows[i]["Cachtinh"].ToString()))
                                    Giuagio_Cachtinh = Cachtinhtangca.Nghibu;
                                else Giuagio_Cachtinh = Cachtinhtangca.Tinhtangca;
                                Giuagio_sogiotangca = sogio;
                                Giuagio_ID_OTReg = dt.Rows[i]["Id_OTReg"].ToString();
                                Giuagio_IsFixHours = bool.TrueString.Equals(dt.Rows[i]["IsFixHours"].ToString());
                                break; //Giữa giờ
                            }
                        default:
                            break;
                    }
                }
            }
        }
        public Dulieudangkytangca(string id_nv, DateTime ngay, DpsConnection cnn, bool IsLambu)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("id_nv", id_nv);
            cond.Add("ngay", ngay);
            string select = "select id_nv, Vaosom_Id_lambu, Giuagio_Id_lambu, Ratre_Id_lambu, Vaosom_Lambu_Giobatdau, Vaosom_Lambu_Gioketthuc, Giuagio_Lambu_Giobatdau, Giuagio_Lambu_Gioketthuc, Ratre_Lambu_Giobatdau, Ratre_Lambu_Gioketthuc, Vaosom_IsIncludeBreaktime, Ratre_IsIncludeBreaktime from chamcongngay where (where)";
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            if (dt.Rows.Count > 0)
            {
                Ratre_IsOvertime = false;
                if (!"".Equals(dt.Rows[0]["Ratre_Id_lambu"].ToString())) Ratre_IsOvertime = true;
                Ratre_IsOvertimeInBreaktime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["Ratre_IsIncludeBreaktime"].ToString())) Ratre_IsOvertimeInBreaktime = true;
                DateTime.TryParse(dt.Rows[0]["Ratre_Lambu_Giobatdau"].ToString(), out Ratre_giobatdau);
                DateTime.TryParse(dt.Rows[0]["Ratre_Lambu_Gioketthuc"].ToString(), out Ratre_gioketthuc);
                Vaosom_IsOvertime = false;
                if (!"".Equals(dt.Rows[0]["Vaosom_Id_lambu"].ToString())) Vaosom_IsOvertime = true;
                Vaosom_IsOvertimeInBreaktime = false;
                if (bool.TrueString.Equals(dt.Rows[0]["Vaosom_IsIncludeBreaktime"].ToString())) Vaosom_IsOvertimeInBreaktime = true;
                DateTime.TryParse(dt.Rows[0]["Vaosom_Lambu_Giobatdau"].ToString(), out Vaosom_giobatdau);
                DateTime.TryParse(dt.Rows[0]["Vaosom_Lambu_Gioketthuc"].ToString(), out Vaosom_gioketthuc);
                Giuagio_IsOvertime = false;
                if (!"".Equals(dt.Rows[0]["Giuagio_Id_lambu"].ToString())) Giuagio_IsOvertime = true;
                DateTime.TryParse(dt.Rows[0]["Giuagio_Lambu_Giobatdau"].ToString(), out Giuagio_giobatdau);
                DateTime.TryParse(dt.Rows[0]["Giuagio_Lambu_Gioketthuc"].ToString(), out Giuagio_gioketthuc);
                Vaosom_ID_OTReg = dt.Rows[0]["Vaosom_Id_lambu"].ToString();
                Giuagio_ID_OTReg = dt.Rows[0]["Giuagio_Id_lambu"].ToString();
                Ratre_ID_OTReg = dt.Rows[0]["Ratre_Id_lambu"].ToString();
                Vaosom_Cachtinh = Cachtinhtangca.Tinhtangca;
                Giuagio_Cachtinh = Cachtinhtangca.Tinhtangca;
                Ratre_Cachtinh = Cachtinhtangca.Tinhtangca;
            }
        }
        /// <summary>
        /// Lấy danh sách đăng ký tăng ca trong ngày
        /// </summary>
        /// <param name="id_nv"></param>
        /// <param name="ngay"></param>
        /// <param name="ListDangkytangca">Danh sách đăng ký tăng ca của tất cả nhân viên: Date, BeginTime, Hours, Buoi, id_nv, EndTime, Calamviecngay, Detail.overtimeinbreaktime, Detail.Id_OTReg,CASE WHEN Reg.PlanID is NULL THEN Detail.Cachtinh ELSE Sa_OvertimePlan.Cachtinh END AS Cachtinh, Reg.PlanID, Detail.IsFixHours</param>
        ///<param name="Cachdangky">1: Đăng ký từ giờ, đến giờ; 2: Đăng ký từ giờ, số giờ</param>
        public Dulieudangkytangca(string id_nv, DateTime ngay, DataTable ListDangkytangca, int Cachdangky, TimeParaByShift timepara)
        {
            SqlConditions cond = new SqlConditions();
            Tangcavaosom = new List<OTRegInfo>();
            Tangcaratre = new List<OTRegInfo>();
            Tangcagiuagio = new List<OTRegInfo>();
            cond = new SqlConditions();
            cond.Add("Calamviecngay", ngay);
            cond.Add("id_nv", id_nv);
            //DataTable dt = cnn.CreateDataTable(select, cond);
            DataRow[] rows = ListDangkytangca.Select("id_nv='" + id_nv + "' and textCalamviecngay='" + ngay.ToString("yyyyMMdd") + "'");
            IFormatProvider fm = new CultureInfo("en-US", true);
            for (int i = 0; i < rows.Length; i++)
            {
                DateTime tugio = new DateTime();
                double sogio = 0;
                if (DateTime.TryParseExact(string.Format("{0:dd/MM/yyyy}", rows[i]["Date"]) + " " + rows[i]["BeginTime"].ToString(), "dd/MM/yyyy HH:mm", fm, DateTimeStyles.NoCurrentDateDefault, out tugio))
                {
                    DateTime dengio = new DateTime();
                    if (DateTime.TryParseExact(string.Format("{0:dd/MM/yyyy}", rows[i]["Date"]) + " " + rows[i]["EndTime"].ToString(), "dd/MM/yyyy HH:mm", fm, DateTimeStyles.NoCurrentDateDefault, out dengio))
                    {
                        if (dengio <= tugio) dengio = dengio.AddDays(1);
                        if (Cachdangky == 2)
                        {
                            double.TryParse(rows[i]["Hours"].ToString(), out sogio);
                        }
                        else
                        {
                            TimeSpan t = dengio - tugio;
                            sogio = t.TotalHours;
                        }
                    }
                    else if (double.TryParse(rows[i]["Hours"].ToString(), out sogio))
                    {
                        dengio = tugio.AddHours(sogio);
                    }
                    OTRegInfo dangkytangca = new OTRegInfo();
                    dangkytangca.IsOvertime = true;
                    dangkytangca.IsOvertimeInBreaktime = bool.TrueString.Equals(rows[i]["overtimeinbreaktime"].ToString());
                    dangkytangca.Giobatdau = tugio;
                    dangkytangca.Gioketthuc = dengio;
                    if ("2".Equals(rows[i]["Cachtinh"].ToString()))
                        dangkytangca.Cachtinh = Cachtinhtangca.Nghibu;
                    else dangkytangca.Cachtinh = Cachtinhtangca.Tinhtangca;
                    dangkytangca.Sogiotangca = sogio;
                    dangkytangca.Id_OTReg = rows[i]["Id_OTReg"].ToString();
                    dangkytangca.Ngaytangca = (DateTime)rows[i]["Date"];
                    dangkytangca.IsFixHours = bool.TrueString.Equals(rows[i]["IsFixHours"].ToString());
                    if (timepara.Id_ca <= 0)
                    {
                        bool IsBreakTime = bool.TrueString.Equals(rows[i]["overtimeinbreaktime"].ToString());
                        if (IsBreakTime)
                        {
                            //Giữa giờ
                            Tangcagiuagio.Add(dangkytangca);
                            Giuagio_IsOvertime = true;
                            Giuagio_IsOvertimeInBreaktime = IsBreakTime;
                            Giuagio_giobatdau = tugio;
                            Giuagio_gioketthuc = dengio;
                            if ("2".Equals(rows[i]["Cachtinh"].ToString()))
                                Giuagio_Cachtinh = Cachtinhtangca.Nghibu;
                            else Giuagio_Cachtinh = Cachtinhtangca.Tinhtangca;
                            Giuagio_sogiotangca = sogio;
                            Giuagio_ID_OTReg = rows[i]["Id_OTReg"].ToString();
                            Giuagio_IsFixHours = bool.TrueString.Equals(rows[i]["IsFixHours"].ToString());
                        }
                        else
                        {
                            //Là ngày nghỉ
                            Tangcaratre.Add(dangkytangca);
                            Ratre_IsOvertime = true;
                            Ratre_IsOvertimeInBreaktime = IsBreakTime;
                            Ratre_giobatdau = tugio;
                            Ratre_gioketthuc = dengio;
                            if ("2".Equals(rows[i]["Cachtinh"].ToString()))
                                Ratre_Cachtinh = Cachtinhtangca.Nghibu;
                            else Ratre_Cachtinh = Cachtinhtangca.Tinhtangca;
                            Ratre_sogiotangca = sogio;
                            Ratre_ID_OTReg = rows[i]["Id_OTReg"].ToString();
                            Ratre_IsFixHours = bool.TrueString.Equals(rows[i]["IsFixHours"].ToString());
                            if ((Ratre_FirstTime.Equals(new DateTime())) || (Ratre_FirstTime > tugio)) Ratre_FirstTime = tugio;
                            if ((Ratre_LastTime.Equals(new DateTime())) || (Ratre_LastTime < dengio)) Ratre_LastTime = dengio;
                        }
                    }
                    else
                    {
                        if (tugio < timepara.batdaulam)
                        {
                            //Xét là tăng ca vào sớm
                            if (dengio > timepara.batdaulam) dengio = timepara.batdaulam;
                            Tangcavaosom.Add(dangkytangca);
                            Vaosom_IsOvertime = true;
                            Vaosom_IsOvertimeInBreaktime = bool.TrueString.Equals(rows[i]["overtimeinbreaktime"].ToString());
                            Vaosom_giobatdau = tugio;
                            Vaosom_gioketthuc = dengio;
                            if ("2".Equals(rows[i]["Cachtinh"].ToString()))
                                Vaosom_Cachtinh = Cachtinhtangca.Nghibu;
                            else Vaosom_Cachtinh = Cachtinhtangca.Tinhtangca;
                            Vaosom_sogiotangca = sogio;
                            Vaosom_ID_OTReg = rows[i]["Id_OTReg"].ToString();
                            Vaosom_IsFixHours = bool.TrueString.Equals(rows[i]["IsFixHours"].ToString());
                            if ((Vaosom_FirstTime.Equals(new DateTime())) || (Vaosom_FirstTime > tugio)) Vaosom_FirstTime = tugio;
                            if ((Vaosom_LastTime.Equals(new DateTime())) || (Vaosom_LastTime < dengio)) Vaosom_LastTime = dengio;
                        }
                        else
                        {
                            //Xử lý giờ kết thúc ca đối với trường hợp được cộng thêm giờ
                            DateTime Gioketthuc = timepara.ketthuclam;
                            if (timepara.Sophutduochuongchedovesom > 0)
                                Gioketthuc = Gioketthuc.AddMinutes(-1 * timepara.Sophutduochuongchedovesom);
                            if (tugio >= Gioketthuc)
                            {
                                //Xét trường hợp tăng ca sau giờ làm
                                Tangcaratre.Add(dangkytangca);
                                Ratre_IsOvertime = true;
                                Ratre_IsOvertimeInBreaktime = bool.TrueString.Equals(rows[i]["overtimeinbreaktime"].ToString());
                                Ratre_giobatdau = tugio;
                                Ratre_gioketthuc = dengio;
                                if ("2".Equals(rows[i]["Cachtinh"].ToString()))
                                    Ratre_Cachtinh = Cachtinhtangca.Nghibu;
                                else Ratre_Cachtinh = Cachtinhtangca.Tinhtangca;
                                Ratre_sogiotangca = sogio;
                                Ratre_ID_OTReg = rows[i]["Id_OTReg"].ToString();
                                Ratre_IsFixHours = bool.TrueString.Equals(rows[i]["IsFixHours"].ToString());
                                if ((Ratre_FirstTime.Equals(new DateTime())) || (Ratre_FirstTime > tugio)) Ratre_FirstTime = tugio;
                                if ((Ratre_LastTime.Equals(new DateTime())) || (Ratre_LastTime < dengio)) Ratre_LastTime = dengio;
                            }
                            else
                            {
                                //Tăng ca giữa giờ
                                DateTime ndate = new DateTime();
                                foreach (Gionghigiuaca item in timepara.Nghigiuaca)
                                {
                                    if ((!item.Giobatdaunghi.Equals(ndate)) && (!item.Gioketthucnghi.Equals(ndate)))
                                    {
                                        //Trường hợp có nghỉ giữa ca
                                        if ((tugio >= item.Giobatdaunghi) && (tugio < item.Gioketthucnghi))
                                        {
                                            if (dengio > item.Gioketthucnghi) dengio = item.Gioketthucnghi;
                                            Tangcagiuagio.Add(dangkytangca);
                                            Giuagio_IsOvertime = true;
                                            Giuagio_IsOvertimeInBreaktime = bool.TrueString.Equals(rows[i]["overtimeinbreaktime"].ToString());
                                            Giuagio_giobatdau = tugio;
                                            Giuagio_gioketthuc = dengio;
                                            if ("2".Equals(rows[i]["Cachtinh"].ToString()))
                                                Giuagio_Cachtinh = Cachtinhtangca.Nghibu;
                                            else Giuagio_Cachtinh = Cachtinhtangca.Tinhtangca;
                                            Giuagio_sogiotangca = sogio;
                                            Giuagio_ID_OTReg = rows[i]["Id_OTReg"].ToString();
                                            Giuagio_IsFixHours = bool.TrueString.Equals(rows[i]["IsFixHours"].ToString());
                                            break;
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        public Dulieudangkytangca(string id_nv, DataRow row)
        {
            //DataRow row = rows[0];
            Ratre_IsOvertime = false;
            if (!"".Equals(row["Ratre_Id_lambu"].ToString())) Ratre_IsOvertime = true;
            Ratre_IsOvertimeInBreaktime = false;
            if (bool.TrueString.Equals(row["Ratre_IsIncludeBreaktime"].ToString())) Ratre_IsOvertimeInBreaktime = true;
            DateTime.TryParse(row["Ratre_Lambu_Giobatdau"].ToString(), out Ratre_giobatdau);
            DateTime.TryParse(row["Ratre_Lambu_Gioketthuc"].ToString(), out Ratre_gioketthuc);
            Vaosom_IsOvertime = false;
            if (!"".Equals(row["Vaosom_Id_lambu"].ToString())) Vaosom_IsOvertime = true;
            Vaosom_IsOvertimeInBreaktime = false;
            if (bool.TrueString.Equals(row["Vaosom_IsIncludeBreaktime"].ToString())) Vaosom_IsOvertimeInBreaktime = true;
            DateTime.TryParse(row["Vaosom_Lambu_Giobatdau"].ToString(), out Vaosom_giobatdau);
            DateTime.TryParse(row["Vaosom_Lambu_Gioketthuc"].ToString(), out Vaosom_gioketthuc);
            Giuagio_IsOvertime = false;
            if (!"".Equals(row["Giuagio_Id_lambu"].ToString())) Giuagio_IsOvertime = true;
            DateTime.TryParse(row["Giuagio_Lambu_Giobatdau"].ToString(), out Giuagio_giobatdau);
            DateTime.TryParse(row["Giuagio_Lambu_Gioketthuc"].ToString(), out Giuagio_gioketthuc);
            Vaosom_ID_OTReg = row["Vaosom_Id_lambu"].ToString();
            Giuagio_ID_OTReg = row["Giuagio_Id_lambu"].ToString();
            Ratre_ID_OTReg = row["Ratre_Id_lambu"].ToString();
            Vaosom_Cachtinh = Cachtinhtangca.Tinhtangca;
            Giuagio_Cachtinh = Cachtinhtangca.Tinhtangca;
            Ratre_Cachtinh = Cachtinhtangca.Tinhtangca;

        }
        /// <summary>
        /// Lấy dữ liệu đăng ký làm bù của 1 ngày
        /// </summary>
        /// <param name="id_nv"></param>
        /// <param name="ngay"></param>
        /// <param name="ListDangkylambu">table dữ liệu đk làm bù gồm các cột: rowid, Hours, Begintime, Endtime, id_nv, textCalamviecngay (format yyyyMMdd), IncludeBreaktime</param>
        /// <param name="timepara"></param>
        public Dulieudangkytangca(string id_nv, DateTime ngay, DataTable ListDangkylambu, TimeParaByShift timepara)
        {
            DataRow[] rows = ListDangkylambu.Select("id_nv='" + id_nv + "' and textCalamviecngay='" + ngay.ToString("yyyyMMdd") + "'");
            for (int i = 0; i < rows.Length; i++)
            {
                try
                {
                    double sogio = (double)rows[i]["Hours"];
                    DateTime tugio = (DateTime)rows[i]["BeginTime"];
                    DateTime dengio = (DateTime)rows[i]["EndTime"];

                    OTRegInfo dangkytangca = new OTRegInfo();
                    dangkytangca.IsOvertime = true;
                    dangkytangca.IsOvertimeInBreaktime = bool.TrueString.Equals(rows[i]["IncludeBreaktime"].ToString());
                    dangkytangca.Giobatdau = tugio;
                    dangkytangca.Gioketthuc = dengio;
                    dangkytangca.Cachtinh = Cachtinhtangca.Tinhtangca;
                    dangkytangca.Sogiotangca = sogio;
                    dangkytangca.Id_OTReg = rows[i]["RowID"].ToString();
                    dangkytangca.IsFixHours = false;
                    if (timepara.Id_ca <= 0)
                    {
                        if (dangkytangca.IsOvertimeInBreaktime)
                        {
                            //Giữa giờ
                            Tangcagiuagio.Add(dangkytangca);
                        }
                        else
                        {
                            //Là ngày nghỉ
                            Tangcaratre.Add(dangkytangca);
                        }
                    }
                    else
                    {
                        if (tugio < timepara.batdaulam)
                        {
                            //Xét là tăng ca vào sớm
                            if (dangkytangca.Gioketthuc > timepara.batdaulam)
                            {
                                dangkytangca.Gioketthuc = timepara.batdaulam;
                            }
                            Tangcavaosom.Add(dangkytangca);
                        }
                        else
                        {
                            //Xử lý giờ kết thúc ca đối với trường hợp được cộng thêm giờ
                            DateTime Gioketthuc = timepara.ketthuclam;
                            if (tugio >= Gioketthuc)
                            {
                                //Xét trường hợp tăng ca sau giờ làm
                                Tangcaratre.Add(dangkytangca);
                            }
                            else
                            {
                                //Tăng ca giữa giờ
                                DateTime ndate = new DateTime();
                                foreach (Gionghigiuaca item in timepara.Nghigiuaca)
                                {
                                    if ((!item.Giobatdaunghi.Equals(ndate)) && (!item.Gioketthucnghi.Equals(ndate)))
                                    {
                                        //Trường hợp có nghỉ giữa ca
                                        if ((tugio >= item.Giobatdaunghi) && (tugio < item.Gioketthucnghi))
                                        {
                                            if (dengio > item.Gioketthucnghi)
                                            {
                                                dengio = item.Gioketthucnghi;
                                                dangkytangca.Gioketthuc = dengio;
                                            }
                                            Tangcagiuagio.Add(dangkytangca);
                                            break;
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }
        public bool Vaosom_IsOvertime;
        public bool Vaosom_IsOvertimeInBreaktime;
        public string Vaosom_ID_OTReg;
        public Cachtinhtangca Vaosom_Cachtinh = Cachtinhtangca.Tinhtangca;
        public DateTime Vaosom_giobatdau;
        public DateTime Vaosom_gioketthuc;
        public double Vaosom_sogiotangca;
        public bool Vaosom_IsFixHours;
        public bool Ratre_IsOvertime;
        public bool Ratre_IsOvertimeInBreaktime;
        public string Ratre_ID_OTReg;
        public Cachtinhtangca Ratre_Cachtinh;
        public DateTime Ratre_giobatdau;
        public DateTime Ratre_gioketthuc;
        public double Ratre_sogiotangca;
        public bool Ratre_IsFixHours;
        public bool Giuagio_IsOvertime;
        public bool Giuagio_IsOvertimeInBreaktime;
        public string Giuagio_ID_OTReg;
        public Cachtinhtangca Giuagio_Cachtinh;
        public DateTime Giuagio_giobatdau;
        public DateTime Giuagio_gioketthuc;
        public double Giuagio_sogiotangca;
        public bool Giuagio_IsFixHours;
        public List<OTRegInfo> Tangcavaosom;
        public List<OTRegInfo> Tangcaratre;
        public List<OTRegInfo> Tangcagiuagio;
        public DateTime Ratre_FirstTime;
        public DateTime Ratre_LastTime;
        public DateTime Vaosom_FirstTime;
        public DateTime Vaosom_LastTime;
        public double Dangky_Vaosom_Tongsogio
        {
            get
            {
                double result = 0;
                foreach (OTRegInfo item in Tangcavaosom)
                {
                    result += item.Sogiotangca;
                }
                return result;
            }
        }
        public double Dangky_Giuagio_Tongsogio
        {
            get
            {
                double result = 0;
                foreach (OTRegInfo item in Tangcagiuagio)
                {
                    result += item.Sogiotangca;
                }
                return result;
            }
        }
        public double Dangky_Ratre_Tongsogio
        {
            get
            {
                double result = 0;
                foreach (OTRegInfo item in Tangcaratre)
                {
                    result += item.Sogiotangca;
                }
                return result;
            }
        }
        /// <summary>
        /// Tổng số giờ tăng ca đăng ký trong ngày
        /// </summary>
        public double Tonggiotangca_dangky
        {
            get
            {
                return Dangky_Giuagio_Tongsogio + Dangky_Ratre_Tongsogio + Dangky_Vaosom_Tongsogio;
            }
        }
    }
    public enum Cachtinhtangca
    {
        Tinhtangca = 1,
        Nghibu = 2
    }
    public class Ngayvaotoithieu_songayphep
    {
        public Ngayvaotoithieu_songayphep()
        {
            Ngayvaotoida = 15;
            Songayduoccap = 1;
        }
        public int Ngayvaotoida;
        public double Songayduoccap;
    }
    public class ChangeInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Department { get; set; }
        public string UsernameManager { get; set; }
    }
    public class Dulieudangkyphep
    {
        public Dulieudangkyphep()
        {
            Daugio_Sogio = 0;
            Giuagio_sogio = 0;
            Cuoigio_Sogio = 0;
            Tongsongayngi = 0;
            Daugio_Songay = 0;
            Giuagio_songay = 0;
            Cuoigio_Songay = 0;
        }
        /// <summary>
        /// Lấy dữ liệu nghỉ phép trong bảng chamcongngay
        /// </summary>
        /// <param name="id_nv"></param>
        /// <param name="ngay"></param>
        /// <param name="cnn"></param>
        public Dulieudangkyphep(string id_nv, DateTime ngay, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("id_nv", id_nv);
            cond.Add("ngay", ngay);
            string select = "select Phep_sogio, Phep_songay, Daugio_nghiphep_sogio, Giuagio_nghiphep_sogio, Cuoigio_nghiphep_sogio from chamcongngay where (where)";
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            if (dt.Rows.Count > 0)
            {
                double.TryParse(dt.Rows[0]["Daugio_nghiphep_sogio"].ToString(), out Daugio_Sogio);
                double.TryParse(dt.Rows[0]["Giuagio_nghiphep_sogio"].ToString(), out Giuagio_sogio);
                double.TryParse(dt.Rows[0]["Cuoigio_nghiphep_sogio"].ToString(), out Cuoigio_Sogio);
                double.TryParse(dt.Rows[0]["Phep_songay"].ToString(), out Tongsongayngi);
            }
        }
        public Dulieudangkyphep(DataRow rowchamcongngay)
        {

            double.TryParse(rowchamcongngay["Daugio_nghiphep_sogio"].ToString(), out Daugio_Sogio);
            double.TryParse(rowchamcongngay["Giuagio_nghiphep_sogio"].ToString(), out Giuagio_sogio);
            double.TryParse(rowchamcongngay["Cuoigio_nghiphep_sogio"].ToString(), out Cuoigio_Sogio);
            double.TryParse(rowchamcongngay["Phep_songay"].ToString(), out Tongsongayngi);
        }
        /// <summary>
        /// Lấy dữ liệu đăng ký 1 ngày
        /// </summary>
        /// <param name="id_nv"></param>
        /// <param name="ngay"></param>
        /// <param name="ListDangkyphep">table dữ liệu đk phép gồm các cột: id_nv, Songay, Sogiomoingay, Tugio, Dengio, textngay (format yyyyMMdd), Buoinghiphep, title (tên loại phép)</param>
        /// <param name="timepara"></param>
        public Dulieudangkyphep(string id_nv, DateTime ngay, DataTable ListDangkyphep, TimeParaByShift timepara)
        {
            Tencacloaiphep = "";
            if (ListDangkyphep.Rows.Count <= 0) return;
            DataRow[] rows = ListDangkyphep.Select("id_nv='" + id_nv + "' and textngay='" + ngay.ToString("yyyyMMdd") + "'");
            for (int i = 0; i < rows.Length; i++)
            {
                try
                {
                    double songay = (double)rows[i]["Songay"];
                    double sogio = 0;
                    double.TryParse(rows[i]["Sogiomoingay"].ToString(), out sogio);
                    if ((!"".Equals(rows[i]["Tugio"].ToString())) && (!"".Equals(rows[i]["Dengio"].ToString())))
                    {
                        DateTime Tugio = (DateTime)rows[i]["Tugio"];
                        DateTime Dengio = (DateTime)rows[i]["Dengio"];
                        if (Tugio <= timepara.batdaulam)
                        {
                            if (Dengio >= timepara.Ketthucca)
                            {
                                //Nghỉ cả ngày
                                Cuoigio_Sogio = sogio; Cuoigio_Songay += songay;
                            }
                            else
                            {
                                //Nghỉ đầu giờ
                                Daugio_Sogio = sogio; Daugio_Songay += songay;
                                if (Dengio > Daugio_nghiphep_dengio) Daugio_nghiphep_dengio = Dengio;
                            }
                        }
                        else
                        {
                            if (Dengio >= timepara.Ketthucca)
                            {
                                //Cuối giờ
                                Cuoigio_Sogio = sogio; Cuoigio_Songay += songay;
                                if (Cuoigio_nghiphep_tugio.Equals(new DateTime()) || (Tugio < Cuoigio_nghiphep_tugio)) Cuoigio_nghiphep_tugio = Tugio;
                            }
                            else
                            {
                                //Giữa giờ
                                Giuagio_sogio = sogio; Giuagio_songay += songay;
                            }
                        }
                    }
                    else
                    {
                        string Buoi = rows[i]["Buoinghiphep"].ToString();
                        switch (rows[i]["Buoinghiphep"].ToString())
                        {
                            case "0":
                            case "2": Cuoigio_Sogio = sogio; Cuoigio_Songay += songay; break;
                            case "1": Daugio_Sogio = sogio; Daugio_Songay += songay; break;
                            default:
                                Giuagio_sogio = sogio; Giuagio_songay += songay;
                                break;
                        }
                    }
                }
                catch (Exception ex)
                {

                }
                Tencacloaiphep += ", " + rows[i]["Title"].ToString();
            }
            if (!"".Equals(Tencacloaiphep)) Tencacloaiphep = Tencacloaiphep.Substring(2);
        }
        public double Daugio_Sogio;
        public double Daugio_Songay;
        public double Cuoigio_Sogio;
        public double Cuoigio_Songay;
        public double Giuagio_sogio;
        public double Giuagio_songay;
        public double Tongsongayngi;
        public double Tongsogionghi
        {
            get
            {
                return Daugio_Sogio + Giuagio_sogio + Cuoigio_Sogio;
            }
        }
        public string Tencacloaiphep;
        public DateTime Daugio_nghiphep_dengio;
        public DateTime Cuoigio_nghiphep_tugio;
    }
    public class OTInfo
    {
        public string StaffCode { get; set; }
        public string UserName { get; set; }
        public string OTDate { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public string ProjectName { get; set; }
        public string Status { get; set; }
        public string OvertimePercentage { get; set; }
        public string DateType { get; set; }
    }
    public class AttendanceData
    {
        public string CustemerID { get; set; }
        public string Data { get; set; }
        public string NextGetData { get; set; }
    }
    public class TimeKeepingInfo
    {
        public string IPAddress { get; set; }
        public int Port { get; set; }
        public string Platform { get; set; }
        public string Name { get; set; }
        public string Thoigianvao { get; set; }
        public string Thoigianra { get; set; }
        public string ID { get; set; }
        public string CustemerID { get; set; }
        public string Time { get; set; }
        public string LastTimeGet { get; set; }
    }
    public class CustomerInfo
    {
        public CustomerInfo(string CustemerID)
        {
            using (DpsConnection cnn = new DpsConnection())
            {
                SqlConditions cond = new SqlConditions();
                cond.Add("RowID", CustemerID);
                string select = "select Company, Address, Deputy, Tennguoidien_en, Chucvunguoidaidien, Chucvunguoidaidien_en, Quoctichnguoidaidien, Quoctichnguoidaidien_en from tbl_custemers where (where)";
                DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
                if (dt.Rows.Count > 0)
                {
                    CompanyName = dt.Rows[0]["Company"].ToString();
                    Address = dt.Rows[0]["Address"].ToString();
                    Nguoidaidien = dt.Rows[0]["Deputy"].ToString();
                    Nguoidaidien_En = dt.Rows[0]["Tennguoidien_en"].ToString();
                    Chucvunguoidaidien = dt.Rows[0]["Chucvunguoidaidien"].ToString();
                    Chucvunguoidaidien_En = dt.Rows[0]["Chucvunguoidaidien_en"].ToString();
                    Quoctichnguoidaidien = dt.Rows[0]["Quoctichnguoidaidien"].ToString();
                    Quoctichnguoidaidien_En = dt.Rows[0]["Quoctichnguoidaidien_en"].ToString();

                }
            }
        }
        public string CompanyName;
        public string Address;
        public string Nguoidaidien;
        public string Nguoidaidien_En;
        public string Chucvunguoidaidien;
        public string Chucvunguoidaidien_En;
        public string Quoctichnguoidaidien;
        public string Quoctichnguoidaidien_En;
        public int PackageID;
        public DateTime Ngaybatdau;
        public DateTime Ngayhethan;
        public int MaxNumberofProfile;
        public string Phone;
        public string Description;
        public string Note;
        public string Mobile;
        /// <summary>
        /// Sử dụng khi khởi tạo khách hàng
        /// </summary>
        public string UsernameAdmin;
        public string PasswordAdmin;
        public int Hinhthucchamcong;
        public string Email;
    }
    public class OTRegInfo
    {
        public OTRegInfo()
        {

        }
        public bool IsOvertime;
        public bool IsOvertimeInBreaktime;
        /// <summary>
        /// Trường hợp isovertime=tru, id=0 nghĩa là giờ tăng quy định sẵn trong ca làm việc
        /// </summary>
        public string Id_OTReg;
        /// <summary>
        /// Date trong sa_otrdetail
        /// </summary>
        public DateTime Ngaytangca;
        public Cachtinhtangca Cachtinh = Cachtinhtangca.Tinhtangca;
        public DateTime Giobatdau;
        public DateTime Gioketthuc;
        public double Sogiotangca;
        public bool IsFixHours;
        public double Sogiotangcathucte_thuong;
        public double Sogiotangcathucte_dem;
    }
    public class StaffInfo
    {
        public StaffInfo()
        { }
        public string StaffCode;
        public string Username;
        public string Fullname;
        public string JobTitle;
        public string ManagerUserName;
        public string ManagerFullName;
        public string Department;
        public string Location;
        public string WorkShift;
    }
    public class ThongtincongviecNhanvien
    {
        public ThongtincongviecNhanvien()
        {
            id_bp = 0;
            id_chucdanh = 0;
            Diadiemlamviec = 0;
            Loainhanvien = 0;
        }
        int id_bp;
        int id_chucdanh;
        int Diadiemlamviec;
        int Loainhanvien;
    }
    public class WorkShift
    {
        public string Username { get; set; }
        public string Datework { get; set; }
        public string Start_work { get; set; }
        public string Start_break { get; set; }
        public string End_break { get; set; }
        public string Stop_work { get; set; }
    }
    //public class MailInfo
    //{
    //    public MailInfo(string CustemerID, DpsConnection cnn)
    //    {
    //        InitialData(CustemerID, cnn);
    //    }
    //    public MailInfo(string CustemerID)
    //    {
    //        using (DpsConnection cnn = new DpsConnection())
    //        {
    //            InitialData(CustemerID, cnn);
    //        }
    //    }
    //    private void InitialData(string CustemerID, DpsConnection cnn)
    //    {
    //        DataTable dt = new DataTable();
    //        SqlConditions cond = new SqlConditions();
    //        cond.Add("RowID", CustemerID);
    //        dt = cnn.CreateDataTable("select SmtpClient, Port, Email, Password, EnableSSL, Username from tbl_custemers where (where)", "(where)", cond);
    //        if (dt.Rows.Count <= 0)
    //        {
    //            Email = "";
    //            return;
    //        }
    //        else
    //        {
    //            int port = 0;
    //            if (!int.TryParse(dt.Rows[0]["Port"].ToString(), out port))
    //            {
    //                return;
    //            }
    //            Email = dt.Rows[0]["email"].ToString();
    //            UserName = dt.Rows[0]["username"].ToString();
    //            SmptClient = dt.Rows[0]["SmtpClient"].ToString();
    //            if (bool.TrueString.Equals(dt.Rows[0]["EnableSSL"].ToString()))
    //                EnableSSL = true;
    //            else EnableSSL = false;
    //            Port = port;
    //            try
    //            {
    //                Password = DpsLibs.Common.EncDec.Decrypt(dt.Rows[0]["Password"].ToString(), API_KD.Assets.Constant.PASSWORD_ED);
    //            }
    //            catch { }
    //        }
    //    }
    //    public string Email;
    //    public string UserName;
    //    public string SmptClient;
    //    public string Password;
    //    public bool EnableSSL;
    //    public int Port;
    //}
    public class ConfigNotify
    {
        public ConfigNotify(string CustemerID)
        {
            using (DpsConnection cnn = new DpsConnection())
            {
                InitialData(CustemerID, cnn);
            }
        }
        public ConfigNotify(string CustemerID, DpsConnection cnn)
        {
            InitialData(CustemerID, cnn);
        }
        private void InitialData(string CustemerID, DpsConnection cnn)
        {
            string select = "select ConfigNotifyByEmail, confignotifybynotify from tbl_custemers where RowID=@custemerid";
            SqlConditions cond = new SqlConditions();
            cond.Add("custemerid", CustemerID);
            DataTable dt = cnn.CreateDataTable(select, cond);
            if (dt.Rows.Count == 1)
            {
                DataRow row = dt.Rows[0];
                string sconfig = dt.Rows[0][0].ToString();
                //ghép dữ liệu cho đủ 100 ký tự
                for (int i = sconfig.Length; i <= 100; i++)
                {
                    sconfig += "0";
                }
                string Nsconfig = dt.Rows[0][1].ToString();
                //ghép dữ liệu cho đủ 100 ký tự
                for (int i = Nsconfig.Length; i <= 100; i++)
                {
                    Nsconfig += "0";
                }
                string[] arrConfig = ConvertToArray(sconfig);
                ContractExpire = "1".Equals(arrConfig[0]);
                ReminderLeaveAprovalEveryDay = "1".Equals(arrConfig[1]);
                AppointExpire = "1".Equals(arrConfig[2]);
                InterviewForCandidate = "1".Equals(arrConfig[3]);
                InterviewForInterviewer = "1".Equals(arrConfig[4]);
                ScheduleForTeacher = "1".Equals(arrConfig[5]);
                ScheduleForLearner = "1".Equals(arrConfig[6]);
                AutoRollbackToOldPosition = "1".Equals(arrConfig[7]);
                RemindNewStaff = "1".Equals(arrConfig[8]);
                RemindExitStaff = "1".Equals(arrConfig[9]);
                TimekeeperNoData = "1".Equals(arrConfig[10]);
                LeaveApplication = "1".Equals(arrConfig[11]);
                OTApplication = "1".Equals(arrConfig[12]);
                RecruitmentRequirements = "1".Equals(arrConfig[13]);
                OTAproval = "1".Equals(arrConfig[14]);
                RRAproval = "1".Equals(arrConfig[15]);
                StaffListOff = "1".Equals(arrConfig[16]);
                SendLeaveApplication = "1".Equals(arrConfig[17]);
                Dongiaitrinhchamcong = "1".Equals(arrConfig[18]);
                Nhacduyetgiaitrinhchamcong = "1".Equals(arrConfig[19]);
                Donxinthoiviec = "1".Equals(arrConfig[20]);
                Donxindoicalamviec = "1".Equals(arrConfig[21]);
                Phieudanhgiaquatrinhthuviec = "1".Equals(arrConfig[22]);
                HuyPhongHop = "1".Equals(arrConfig[23]);

                string[] NarrConfig = ConvertToArray(Nsconfig);
                NContractExpire = "1".Equals(NarrConfig[0]);
                NReminderLeaveAprovalEveryDay = "1".Equals(NarrConfig[1]);
                NAppointExpire = "1".Equals(NarrConfig[2]);
                NInterviewForCandidate = "1".Equals(NarrConfig[3]);
                NInterviewForInterviewer = "1".Equals(NarrConfig[4]);
                NScheduleForTeacher = "1".Equals(NarrConfig[5]);
                NScheduleForLearner = "1".Equals(NarrConfig[6]);
                NAutoRollbackToOldPosition = "1".Equals(NarrConfig[7]);
                NRemindNewStaff = "1".Equals(NarrConfig[8]);
                NRemindExitStaff = "1".Equals(NarrConfig[9]);
                NTimekeeperNoData = "1".Equals(NarrConfig[10]);
                NLeaveApplication = "1".Equals(NarrConfig[11]);
                NOTApplication = "1".Equals(NarrConfig[12]);
                NRecruitmentRequirements = "1".Equals(NarrConfig[13]);
                NOTAproval = "1".Equals(NarrConfig[14]);
                NRRAproval = "1".Equals(NarrConfig[15]);
                NStaffListOff = "1".Equals(NarrConfig[16]);
                NSendLeaveApplication = "1".Equals(NarrConfig[17]);
                NDongiaitrinhchamcong = "1".Equals(NarrConfig[18]);
                NNhacduyetgiaitrinhchamcong = "1".Equals(NarrConfig[19]);
                NDonxinthoiviec = "1".Equals(NarrConfig[20]);
                NDonxindoicalamviec = "1".Equals(NarrConfig[21]);
                NPhieudanhgiaquatrinhthuviec = "1".Equals(NarrConfig[22]);
                NHuyPhongHop = "1".Equals(NarrConfig[23]);
            }
            custemerID = CustemerID;
        }
        public bool SaveConfig()
        {
            string s = "";
            //ghép dữ liệu cho đủ 100 ký tự
            for (int i = 1; i <= 100; i++)
            {
                s += "0";
            }
            string[] arr = ConvertToArray(s);
            arr[0] = ContractExpire ? "1" : "0";
            arr[1] = ReminderLeaveAprovalEveryDay ? "1" : "0";
            arr[2] = AppointExpire ? "1" : "0";
            arr[3] = InterviewForCandidate ? "1" : "0";
            arr[4] = InterviewForInterviewer ? "1" : "0";
            arr[5] = ScheduleForTeacher ? "1" : "0";
            arr[6] = ScheduleForLearner ? "1" : "0";
            arr[7] = AutoRollbackToOldPosition ? "1" : "0";
            arr[8] = RemindNewStaff ? "1" : "0";
            arr[9] = RemindExitStaff ? "1" : "0";
            arr[10] = TimekeeperNoData ? "1" : "0";
            arr[11] = LeaveApplication ? "1" : "0";
            arr[12] = OTApplication ? "1" : "0";
            arr[13] = RecruitmentRequirements ? "1" : "0";
            arr[14] = OTAproval ? "1" : "0";
            arr[15] = RRAproval ? "1" : "0";
            arr[16] = StaffListOff ? "1" : "0";
            arr[17] = SendLeaveApplication ? "1" : "0";
            arr[18] = Dongiaitrinhchamcong ? "1" : "0";
            arr[19] = Nhacduyetgiaitrinhchamcong ? "1" : "0";
            arr[20] = Donxinthoiviec ? "1" : "0";
            arr[21] = Donxindoicalamviec ? "1" : "0";
            arr[22] = Phieudanhgiaquatrinhthuviec ? "1" : "0";
            arr[23] = HuyPhongHop ? "1" : "0";

            string snotify = "";
            //ghép dữ liệu cho đủ 100 ký tự
            for (int i = 1; i <= 100; i++)
            {
                snotify += "0";
            }
            string[] Narr = ConvertToArray(s);
            Narr[0] = NContractExpire ? "1" : "0";
            Narr[1] = NReminderLeaveAprovalEveryDay ? "1" : "0";
            Narr[2] = NAppointExpire ? "1" : "0";
            Narr[3] = NInterviewForCandidate ? "1" : "0";
            Narr[4] = NInterviewForInterviewer ? "1" : "0";
            Narr[5] = NScheduleForTeacher ? "1" : "0";
            Narr[6] = NScheduleForLearner ? "1" : "0";
            Narr[7] = NAutoRollbackToOldPosition ? "1" : "0";
            Narr[8] = NRemindNewStaff ? "1" : "0";
            Narr[9] = NRemindExitStaff ? "1" : "0";
            Narr[10] = NTimekeeperNoData ? "1" : "0";
            Narr[11] = NLeaveApplication ? "1" : "0";
            Narr[12] = NOTApplication ? "1" : "0";
            Narr[13] = NRecruitmentRequirements ? "1" : "0";
            Narr[14] = NOTAproval ? "1" : "0";
            Narr[15] = NRRAproval ? "1" : "0";
            Narr[16] = NStaffListOff ? "1" : "0";
            Narr[17] = NSendLeaveApplication ? "1" : "0";
            Narr[18] = NDongiaitrinhchamcong ? "1" : "0";
            Narr[19] = NNhacduyetgiaitrinhchamcong ? "1" : "0";
            Narr[20] = NDonxinthoiviec ? "1" : "0";
            Narr[21] = NDonxindoicalamviec ? "1" : "0";
            Narr[22] = NPhieudanhgiaquatrinhthuviec ? "1" : "0";
            Narr[23] = NHuyPhongHop ? "1" : "0";

            string sResult = ConvertToString(arr);
            string NsResult = ConvertToString(Narr);
            using (DpsConnection cnn = new DpsConnection())
            {
                Hashtable val = new Hashtable();
                val.Add("ConfigNotifyByEmail", sResult);
                val.Add("ConfigNotifyByNotify", NsResult);
                SqlConditions cond = new SqlConditions();
                cond.Add("RowID", custemerID);
                int rs = cnn.Update(val, cond, "tbl_custemers");
                if (rs <= 0) return false;
            }
            return true;
        }
        public string[] ConvertToArray(string inputdata)
        {
            string[] result = new string[inputdata.Length];
            for (int i = 0; i < inputdata.Length; i++)
            {
                result[i] = inputdata.Substring(i, 1);
            }
            return result;
        }
        public string ConvertToString(string[] inputdata)
        {
            string result = "";
            for (int i = 0; i < inputdata.Length; i++)
            {
                result += inputdata[i];
            }
            return result;
        }
        public string ConvertToString(string[] inputdata, string ch)
        {
            string result = "";
            for (int i = 0; i < inputdata.Length; i++)
            {
                result += ch + inputdata[i];
            }
            if (result != "") result = result.Substring(1);
            return result;
        }
        /// <summary>
        /// 0 Thông báo hết hạn hợp đồng
        /// </summary>
        public bool ContractExpire;
        public bool NContractExpire;
        /// <summary>
        /// 1 Nhắc nhỡ duyệt nghỉ phép
        /// </summary>
        public bool ReminderLeaveAprovalEveryDay;
        public bool NReminderLeaveAprovalEveryDay;
        /// <summary>
        /// 2 Hết hạn thuyên chuyển
        /// </summary>
        public bool AppointExpire;
        public bool NAppointExpire;
        /// <summary>
        /// 3 Nhắc lịch phỏng vấn cho ứng viên
        /// </summary>
        public bool InterviewForCandidate;
        public bool NInterviewForCandidate;
        /// <summary>
        /// 4 Nhắc lịch phỏng vấn cho cán bộ phỏng vấn
        /// </summary>
        public bool InterviewForInterviewer;
        public bool NInterviewForInterviewer;
        /// <summary>
        /// 5 Nhắc lịch dạy cho giảng viên
        /// </summary>
        public bool ScheduleForTeacher;
        public bool NScheduleForTeacher;
        /// <summary>
        /// 6 Nhắc lịch học cho học viên
        /// </summary>
        public bool ScheduleForLearner;
        public bool NScheduleForLearner;
        /// <summary>
        /// 7 Tự động quay lại vị trí cũ khi quyết định thuyên chuyển hết hạn
        /// </summary>
        public bool AutoRollbackToOldPosition;
        public bool NAutoRollbackToOldPosition;
        /// <summary>
        /// 8 Thông báo nhân sự mới (nhân viên mới tuyển sắp vào làm việc đã nhập hồ sơ vào phần mềm có ngày vào làm lớn hơn ngày hiện tại)
        /// </summary>
        public bool RemindNewStaff;
        public bool NRemindNewStaff;
        /// <summary>
        /// 9 Thông báo danh sách nhân sự sắp thôi việc (dựa vào đơn xin thôi việc hoặc cập nhật danh sách sắp thôi việc trong phiếu phỏng vấn thôi việc)
        /// </summary>
        public bool RemindExitStaff;
        public bool NRemindExitStaff;
        /// <summary>
        /// 10 Thông báo máy chấm công không đẩy dữ liệu lên hàng ngày 
        /// </summary>
        public bool TimekeeperNoData;
        public bool NTimekeeperNoData;
        /// <summary>
        /// 11 Thông báo có đơn xin nghỉ phép
        /// </summary>
        public bool LeaveApplication;
        public bool NLeaveApplication;
        /// <summary>
        /// 12 Thông báo có đăng ký tăng ca
        /// </summary>
        public bool OTApplication;
        public bool NOTApplication;
        /// <summary>
        /// 13 Thông báo có phiếu yêu cầu tuyển dụng
        /// </summary>
        public bool RecruitmentRequirements;
        public bool NRecruitmentRequirements;
        /// <summary>
        /// 14 Nhắc có đăng ký tăng ca chưa duyệt cho người duyệt
        /// </summary>
        public bool OTAproval;
        public bool NOTAproval;
        /// <summary>
        /// 15 Nhắc có phiếu yêu cầu tuyển dụng chưa duyệt cho người duyệt
        /// </summary>
        public bool RRAproval;
        public bool NRRAproval;
        /// <summary>
        /// 16 Thông báo danh sách vắng trong ngày cho quản lý
        /// </summary>
        public bool StaffListOff;
        public bool NStaffListOff;
        /// <summary>
        /// 17 Nhắc nhân viên gửi đơn xin phép khi vắng mặt trong ngày
        /// </summary>
        public bool SendLeaveApplication;
        public bool NSendLeaveApplication;
        /// <summary>
        /// 18 Thông báo có đơn giải trình chấm công
        /// </summary>
        public bool Dongiaitrinhchamcong;
        public bool NDongiaitrinhchamcong;
        /// <summary>
        /// 19 Nhắc có đơn giải trình chấm công chưa duyệt cho người duyệt
        /// </summary>
        public bool Nhacduyetgiaitrinhchamcong;
        public bool NNhacduyetgiaitrinhchamcong;
        /// <summary>
        /// 20 Thông báo có đơn xin thôi việc
        /// </summary>
        public bool Donxinthoiviec;
        public bool NDonxinthoiviec;
        /// <summary>
        /// 21 Thông báo có đơn đổi ca làm việc
        /// </summary>
        public bool Donxindoicalamviec;
        public bool NDonxindoicalamviec;
        /// <summary>
        /// 22 Thông báo có phiếu đánh giá quá trình thử việc
        /// </summary>
        public bool Phieudanhgiaquatrinhthuviec;
        public bool NPhieudanhgiaquatrinhthuviec;
        /// <summary>
        // 23 Thông báo khi người yêu cầu hủy đặt phòng họp 
        /// </summary>
        public bool HuyPhongHop;
        public bool NHuyPhongHop;
        private string custemerID;
        public string PcustemerID
        {
            get
            {
                return custemerID;
            }
        }
    }
    public class FieldNames
    {
        public string FieldName { get; set; }
        public string PageName { get; set; }
    }
    public class DataOvertime
    {
        public DataOvertime()
        {
            Tangca_homnay = 0;
            Tangca_ngaymai = 0;
            Tangca_dem_homnay = 0;
            Tangca_dem_ngaymai = 0;
            Vaosom_Sophuttangcadem_homnay = 0;
            Vaosom_Sophuttangcadem_homqua = 0;
        }
        /// <summary>
        /// Tổng số phút tăng ca trong ngày của ca làm việc (đã bao gồm ca đêm hôm nay)
        /// </summary>
        public double Tangca_homnay;
        /// <summary>
        /// Tổng số phút tăng ca rơi vào ngày hôm sau (đã bao gồm ca đêm ngày hôm sau)
        /// </summary>
        public double Tangca_ngaymai;
        /// <summary>
        /// Tổng số phút tăng ca đêm trong ngày của ca làm việc
        /// </summary>
        public double Tangca_dem_homnay;
        /// <summary>
        /// Tổng số phút tăng ca đêm rơi vào ngày hôm sau
        /// </summary>
        public double Tangca_dem_ngaymai;
        /// <summary>
        /// Tổng số phút tăng ca (đã bao gồm tăng ca đêm)
        /// </summary>
        public double Tongtangca
        {
            get
            {
                return (Tangca_homnay + Tangca_ngaymai);
            }
        }
        /// <summary>
        /// Tổng số phút tăng ca đêm
        /// </summary>
        public double Tongtangca_dem
        {
            get
            {
                return (Tangca_dem_homnay + Tangca_dem_ngaymai);
            }
        }
        public double Tongsogiotangca
        {
            get
            {
                return Tongtangca / 60;
            }
        }
        public double Tongsogiotangca_dem
        {
            get
            {
                return Tongtangca_dem / 60;
            }
        }
        public double Vaosom_Sophuttangcadem_homnay;
        public double Vaosom_Sophuttangcadem_homqua;
    }
    public class Dulieutinhcong
    {
        public Dulieutinhcong(DateTime Tungay, DateTime Denngay, DpsConnection cnn, string CustemerID)
        {
            //Lấy đăng ký tăng ca
            string sqldangkytangca = "select Date, BeginTime, Hours, Buoi, id_nv, EndTime, Calamviecngay, Detail.overtimeinbreaktime, Detail.Id_OTReg, Detail.Cachtinh, Detail.IsFixHours, CONVERT(nvarchar, Calamviecngay, 112) as textCalamviecngay from Sa_OverTimeReg Reg inner join Sa_OTRDetails Detail on Reg.Id_row=Detail.Id_OTReg where Reg.Approved=1 and Reg.Disable=0 and Detail.Calamviecngay>=@FromDate and Detail.Calamviecngay<=@ToDate";
            SqlConditions cond = new SqlConditions();
            cond.Add("FromDate", Tungay);
            cond.Add("ToDate", Denngay);
            cond.Add("CustemerID", CustemerID);
            Dulieutangcadangky = cnn.CreateDataTable(sqldangkytangca, cond);
            //Lấy danh sách hưởng chế độ
            DataTable huongchedo = cnn.CreateDataTable("select tbl_huongchedo.Sophut, tbl_huongchedo.id_nv, tbl_huongchedo.Tungay, tbl_huongchedo.Denngay from tbl_huongchedo inner join tbl_nhanvien on tbl_huongchedo.id_nv=tbl_nhanvien.id_nv inner join tbl_cocautochuc on tbl_nhanvien.cocauid = tbl_cocautochuc.rowid and tbl_cocautochuc.CustemerID = @CustemerID where (tungay<=@FromDate and ((denngay is null) or (denngay>=@FromDate))) or (tungay<=@ToDate and ((denngay is null) or (denngay>=@ToDate)))", cond);
            Huongchedo = new Hashtable();
            for (int i = 0; i < huongchedo.Rows.Count; i++)
            {
                DateTime fromD = (DateTime)huongchedo.Rows[i]["Tungay"];
                if (fromD < Tungay) fromD = Tungay;
                DateTime toD = Denngay;
                if (!"".Equals(huongchedo.Rows[i]["Denngay"].ToString()))
                {
                    DateTime dateTmp = (DateTime)huongchedo.Rows[i]["Denngay"];
                    if (dateTmp < toD) toD = dateTmp;
                }
                DateTime date = fromD;
                while (date <= toD)
                {
                    string key = date.ToString("yyyyMMdd") + huongchedo.Rows[i]["id_nv"].ToString();
                    if (!Huongchedo.ContainsKey(key))
                        Huongchedo.Add(key, huongchedo.Rows[i]["Sophut"]);
                    date = date.AddDays(1);
                }

            }
            //Lấy danh mục làm tròn giờ công
            string select = "select * from  DM_Cackhoanglamtrongiocong where id_ca in (select id_ca from tbl_calamviec where CustemerID=@CustemerID)";
            DM_Cackhoanlamtrongiocong = cnn.CreateDataTable(select, cond);
            //Lấy dữ liệu đang ký làm bù
            select = @"select Sa_CompensationReg.rowid, Hours, Begintime, Endtime, Sa_CompensationReg.id_nv, CONVERT(nvarchar, Calamviecngay, 112) as textCalamviecngay, IncludeBreaktime, Calamviecngay 
                from Sa_CompensationReg inner join tbl_nhanvien on Sa_CompensationReg.id_nv = tbl_nhanvien.id_nv inner join tbl_cocautochuc on tbl_nhanvien.cocauid = tbl_cocautochuc.RowID and tbl_cocautochuc.CustemerID = @CustemerID
                where Calamviecngay>= @FromDate and Calamviecngay<= @ToDate";
            Dulieulambudangky = cnn.CreateDataTable(select, cond);
            //Lấy dữ liệu xác nhận giờ công
            //select = @"select Tbl_Xindieuchinhgiocong.id_nv, CONVERT(nvarchar, Ngay, 112) as textngay, Hinhthuc, Giovao, Giora 
            //    from Tbl_Xindieuchinhgiocong inner join tbl_nhanvien on Tbl_Xindieuchinhgiocong.id_nv=tbl_nhanvien.id_nv inner join tbl_cocautochuc on tbl_nhanvien.cocauid=tbl_cocautochuc.RowID and tbl_cocautochuc.CustemerID=@CustemerID
            //    where Ngay>= @FromDate and Ngay<=@ToDate";
            //Dulieuxacnhangiocong = cnn.CreateDataTable(select, cond);
            //Lấy giải trình chấm công được duyệt
            select = "select Sa_Giaitrinhchamcong.id_nv, CONVERT(nvarchar, Ngay, 112) as textngay, Hinhthuc, Giovao, Giora from Sa_Giaitrinhchamcong inner join Sa_Giaitrinhchamcong_details detail" +
                " on Sa_Giaitrinhchamcong.RowID=detail.DonID and Sa_Giaitrinhchamcong.Approved=1 inner join tbl_nhanvien on Sa_Giaitrinhchamcong.id_nv=tbl_nhanvien.id_nv " +
                "inner join tbl_cocautochuc on tbl_nhanvien.cocauid=tbl_cocautochuc.RowID and tbl_cocautochuc.CustemerID=@CustemerID where detail.Ngay>=@FromDate and detail.Ngay<=@ToDate and detail.Disable=0";
            Dulieuxacnhangiocong = cnn.CreateDataTable(select, cond);
            //Lấy dữ liệu nghỉ phép
            select = @"select tbl_phepnam.Id_nv, Songay, Sogiomoingay, Tugio, Dengio, CONVERT(nvarchar, tbl_phepnam.Ngaynghi, 112) as textngay, Buoinghiphep, Xnp_Types.Title 
            from tbl_phepnam inner join tbl_nhanvien on tbl_phepnam.id_nv=tbl_nhanvien.id_nv inner join tbl_cocautochuc on tbl_nhanvien.cocauid=tbl_cocautochuc.RowID and tbl_cocautochuc.CustemerID=@CustemerID
            inner join Xnp_Types on tbl_phepnam.Hinhthuc=Xnp_Types.Id_Type
            where tbl_phepnam.Ngaynghi>=@FromDate and tbl_phepnam.Ngaynghi<=@ToDate";
            Dulieunghiphep = cnn.CreateDataTable(select, cond);
            //Lấy thiết lập tính công
            select = "select * from Sa_Thietlaptinhcong where CustemerID=@CustemerID and id_ca is not null";
            Thietlaptinhcong = cnn.CreateDataTable(select, cond);

        }
        public Hashtable Huongchedo;
        public DataTable DM_Cackhoanlamtrongiocong;
        public DataTable Dulieutangcadangky;
        public DataTable Dulieulambudangky;
        public DataTable Dulieuxacnhangiocong;
        public DataTable Dulieunghiphep;
        /// <summary>
        /// Danh sách thiết lập tính công riêng của từng ca cho khách hàng này
        /// </summary>
        public DataTable Thietlaptinhcong;
    }
    public class Dulieuxacnhangiocong
    {
        /// <summary>
        /// Lấy dữ liệu xác nhận giờ vào ra 1 ngày
        /// </summary>
        /// <param name="id_nv"></param>
        /// <param name="ngay"></param>
        /// <param name="Dulieuxacnhan">table data tbl_xindieuchinhgiocong gồm các cột: id_nv, textngay (format yyyyMMdd), Hinhthuc, Giovao, Giora</param>
        public Dulieuxacnhangiocong(string id_nv, DateTime ngay, DataTable Dulieuxacnhan)
        {
            Gioxacnhan_Vao = new DateTime();
            Gioxacnhan_Ra = new DateTime();
            IsCogiaitrinh = false;
            DataRow[] rows = Dulieuxacnhan.Select("id_nv='" + id_nv + "' and textngay='" + ngay.ToString("yyyyMMdd") + "'");
            for (int i = 0; i < rows.Length; i++)
            {
                if ("1".Equals(rows[i]["Hinhthuc"].ToString()))
                {
                    //Xác nhận giờ vào
                    if (!"".Equals(rows[i]["Giovao"].ToString()))
                    {
                        Gioxacnhan_Vao = (DateTime)rows[i]["Giovao"];
                        IsCogiaitrinh = true;
                    }
                }
                else if ("2".Equals(rows[i]["Hinhthuc"].ToString()))
                {
                    //Xác nhận giờ ra
                    if (!"".Equals(rows[i]["Giora"].ToString()))
                    {
                        Gioxacnhan_Ra = (DateTime)rows[i]["Giora"];
                        IsCogiaitrinh = true;
                    }
                }
                else if ("3".Equals(rows[i]["Hinhthuc"].ToString()))
                {
                    //Xác nhận giờ vào
                    if (!"".Equals(rows[i]["Giovao"].ToString()))
                    {
                        Gioxacnhan_Vao = (DateTime)rows[i]["Giovao"];
                        IsCogiaitrinh = true;
                    }
                    //Xác nhận giờ vào
                    if (!"".Equals(rows[i]["Giora"].ToString()))
                    {
                        Gioxacnhan_Ra = (DateTime)rows[i]["Giora"];
                        IsCogiaitrinh = true;
                    }
                }
            }
        }
        public DateTime Gioxacnhan_Vao;
        public DateTime Gioxacnhan_Ra;
        public bool IsCogiaitrinh;
    }
    //public class Luongthoigian
    //{
    //    public Luongthoigian(DpsConnection cnn, int thang, int nam, string id_nv)
    //    {
    //        Luongtheongaycong = 0;
    //        LuongtangcaNT = 0;
    //        LuongtangcaNN = 0;
    //        LuongtangcaLe = 0;
    //        LuongtangcaNT_Dem = 0;
    //        LuongtangcaNN_Dem = 0;
    //        LuongtangcaLe_Dem = 0;
    //        LuongtangcaChiuthue = 0;
    //        Tongluongtangca = 0;
    //        SqlConditions cond = new SqlConditions();
    //        cond.Add("Thang", thang);
    //        cond.Add("Nam", nam);
    //        cond.Add("Id_nv", id_nv);
    //        string select = "select Luongtheongaycong, LuongtangcaNT,LuongtangcaNN,LuongtangcaLe,LuongtangcaNT_Dem,LuongtangcaNN_Dem,LuongtangcaLe_Dem,LuongtangcaChiuthue,Tongluongtangca from bangluong_new where (where)";
    //        DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
    //        if (dt.Rows.Count == 1)
    //        {
    //            NewSalary tienluong = new NewSalary();
    //            DataRow data = dt.Rows[0];
    //            Luongtheongaycong = tienluong.DecryptSalary(data["Luongtheongaycong"].ToString());
    //            LuongtangcaNT = tienluong.DecryptSalary(data["LuongtangcaNT"].ToString());
    //            LuongtangcaNN = tienluong.DecryptSalary(data["LuongtangcaNN"].ToString());
    //            LuongtangcaLe = tienluong.DecryptSalary(data["LuongtangcaLe"].ToString());
    //            LuongtangcaNT_Dem = tienluong.DecryptSalary(data["LuongtangcaNT_Dem"].ToString());
    //            LuongtangcaNN_Dem = tienluong.DecryptSalary(data["LuongtangcaNN_Dem"].ToString());
    //            LuongtangcaLe_Dem = tienluong.DecryptSalary(data["LuongtangcaLe_Dem"].ToString());
    //            LuongtangcaChiuthue = tienluong.DecryptSalary(data["LuongtangcaChiuthue"].ToString());
    //            Tongluongtangca = tienluong.DecryptSalary(data["Tongluongtangca"].ToString());

    //            //int.TryParse(data["Luongtheongaycong"].ToString(), out Luongtheongaycong);
    //            //int.TryParse(data["LuongtangcaNT"].ToString(), out LuongtangcaNT);
    //            //int.TryParse(data["LuongtangcaNN"].ToString(), out LuongtangcaNN);
    //            //int.TryParse(data["LuongtangcaLe"].ToString(), out LuongtangcaLe);
    //            //int.TryParse(data["LuongtangcaNT_Dem"].ToString(), out LuongtangcaNT_Dem);
    //            //int.TryParse(data["LuongtangcaNN_Dem"].ToString(), out LuongtangcaNN_Dem);
    //            //int.TryParse(data["LuongtangcaLe_Dem"].ToString(), out LuongtangcaLe_Dem);
    //            //int.TryParse(data["LuongtangcaChiuthue"].ToString(), out LuongtangcaChiuthue);
    //            //int.TryParse(data["Tongluongtangca"].ToString(), out Tongluongtangca);
    //        }
    //    }
    //    public Luongthoigian()
    //    {
    //        Luongtheongaycong = 0;
    //        LuongtangcaNT = 0;
    //        LuongtangcaNN = 0;
    //        LuongtangcaLe = 0;
    //        LuongtangcaNT_Dem = 0;
    //        LuongtangcaNN_Dem = 0;
    //        LuongtangcaLe_Dem = 0;
    //        LuongtangcaChiuthue = 0;
    //        Tongluongtangca = 0;
    //    }
    //    public int Luongtheongaycong;
    //    public int LuongtangcaNT;
    //    public int LuongtangcaNN;
    //    public int LuongtangcaLe;
    //    public int LuongtangcaNT_Dem;
    //    public int LuongtangcaNN_Dem;
    //    public int LuongtangcaLe_Dem;
    //    public int LuongtangcaChiuthue;
    //    public int Tongluongtangca;
    //}
    /// <summary>
    /// Bao gồm các giá trị của các từ khóa chung cho toàn công ty: hệ số tăng ca, tỷ lệ đóng bhxh
    /// </summary>
    //public class Tukhoachung
    //{
    //    public string errormsg = "";
    //    public Tukhoachung(int thang, int nam, string CustemerID, DpsConnection cnn)
    //    {
    //        TyleBHTN = 0;
    //        TyleBHXH = 0;
    //        TyleBHYT = 0;
    //        hesotangca = new Hesotangca(cnn, CustemerID, thang, nam);
    //        SqlConditions cond = new SqlConditions();
    //        DateTime ngaydauthang = General.GetBeginDateInMonth(thang, nam);
    //        cond.Add("ngaydauthang", ngaydauthang);
    //        cond.Add("CustemerID", CustemerID);
    //        DataTable dt = cnn.CreateDataTable("select * from PA_ThaydoimucdongBHXH where (EDate<=@ngaydauthang) and (CustemerID=@CustemerID) order by EDate Desc", cond);
    //        if (dt.Rows.Count > 0)
    //        {
    //            DataRow row = dt.Rows[0];
    //            if ((!double.TryParse(row["BHYT"].ToString(), out TyleBHYT)) || (!double.TryParse(row["BHXH"].ToString(), out TyleBHXH)) || (!double.TryParse(row["PCD"].ToString(), out Phicongdoan)) || (!double.TryParse(row["BHTN"].ToString(), out TyleBHTN)) || (!double.TryParse(row["DN_BHYT"].ToString(), out TyleBHYT_DN)) || (!double.TryParse(row["DN_BHXH"].ToString(), out TyleBHXH_DN)) || (!double.TryParse(row["DN_PCD"].ToString(), out Phicongdoan_DN)) || (!double.TryParse(row["DN_BHTN"].ToString(), out TyleBHTN_DN)) || (!Int32.TryParse(row["TranBHXH"].ToString(), out TranBHXH)) || (!int.TryParse(row["Hinhthuc_PCD"].ToString(), out HinhthuctruPCD)) || (!Int32.TryParse(row["TranBHYT"].ToString(), out TranBHYT)) || (!Int32.TryParse(row["TranBHTN"].ToString(), out TranBHTN)) || (!int.TryParse(row["Hinhthuc_PCDDN"].ToString(), out HinhthuctruPCD_DN)) || (!int.TryParse(row["TrandongPCD"].ToString(), out TranPCD_NV)))
    //            {
    //                errormsg = "Một số giá trị trừ bảo hiểm không hợp lệ";
    //                return;
    //            }
    //        }
    //        if (HinhthuctruPCD == 1)
    //        {
    //            Phicongdoan = Phicongdoan * 0.01;
    //        }
    //        else
    //        {
    //            Phicongdoan = (Int32)Phicongdoan;
    //        }
    //        if (HinhthuctruPCD_DN == 1)
    //        {
    //            Phicongdoan_DN = Phicongdoan_DN * 0.01;
    //        }
    //        else
    //        {
    //            Phicongdoan_DN = (Int32)Phicongdoan_DN;
    //        }
    //        dt = cnn.CreateDataTable("select Giamtrubanthan, Giamtrunguoiphuthuoc from PA_ThaydoimucgiamtruTTNCN where (ngayapdung<=@ngaydauthang) and (CustemerID=@CustemerID) order by ngayapdung Desc", cond);
    //        if (dt.Rows.Count > 0)
    //        {
    //            DataRow row = dt.Rows[0];
    //            if ((!int.TryParse(row["Giamtrubanthan"].ToString(), out Giamtrubanthan)) || (!int.TryParse(row["Giamtrunguoiphuthuoc"].ToString(), out Giamtrunguoi1nguophuthuoc)))
    //            {
    //                errormsg = "Một số giá trị giảm trừ TTNCN không hợp lệ";
    //                return;
    //            }
    //        }
    //    }
    //    public Hesotangca hesotangca;
    //    public double TyleBHXH;
    //    public double TyleBHYT;
    //    public double TyleBHTN;
    //    public double TyleBHXH_DN;
    //    public double TyleBHYT_DN;
    //    public double TyleBHTN_DN;
    //    public int Giamtrubanthan;
    //    public int Giamtrunguoi1nguophuthuoc;
    //    public int TranBHXH;
    //    public int TranBHYT;
    //    public int TranBHTN;
    //    public int HinhthuctruPCD;
    //    public int HinhthuctruPCD_DN;
    //    public int TranPCD_NV;
    //    public double Phicongdoan;
    //    public double Phicongdoan_DN;
    //}
    //public class Tukhoanhanvien
    //{
    //    public Tukhoanhanvien(DpsConnection cnn, int thang, int nam, string id_nv)
    //    {
    //        NewSalary sal = new NewSalary();
    //        SqlConditions cond = new SqlConditions();
    //        cond.Add("id_nv", id_nv);
    //        cond.Add("nam", nam);
    //        cond.Add("thang", thang);
    //        DataTable bangluong = cnn.CreateDataTable("select IsBHXH, IsBHYT, IsBHTN, IsDongPCD, IsDongPCD_DN  from bangluong_new where (where)", "(where)", cond);
    //        if (bangluong.Rows.Count > 0)
    //        {
    //            IsDongBHTN = bool.TrueString.Equals(bangluong.Rows[0]["IsBHTN"].ToString());
    //            IsDongBHXH = bool.TrueString.Equals(bangluong.Rows[0]["IsBHXH"].ToString());
    //            IsDongBHYT = bool.TrueString.Equals(bangluong.Rows[0]["IsBHYT"].ToString());
    //            IsDongPCD = bool.TrueString.Equals(bangluong.Rows[0]["IsDongPCD"].ToString());
    //            IsDongPCD_DN = bool.TrueString.Equals(bangluong.Rows[0]["IsDongPCD_DN"].ToString());

    //        }
    //        int custemerid = General.GetCustemerID(id_nv);
    //        cond = new SqlConditions();
    //        cond.Add("custemerid", custemerid);
    //        DataTable listcotcong = cnn.CreateDataTable(@"select FieldName, RP_ReportFields.title from RP_ReportFields
    //        where TypeID in (2,3) order by Len(title) desc", cond);
    //        string listcolumn = "";
    //        for (int i = 0; i < listcotcong.Rows.Count; i++)
    //        {
    //            listcolumn += "," + listcotcong.Rows[i][0].ToString() + " as " + listcotcong.Rows[i][1].ToString();
    //        }
    //        if (!"".Equals(listcolumn)) listcolumn = listcolumn.Substring(1);
    //        cond = new SqlConditions();
    //        cond.Add("id_nv", id_nv);
    //        cond.Add("nam", nam);
    //        cond.Add("thang", thang);
    //        bangcong = cnn.CreateDataTable($"select {listcolumn} from bangchamcong where (where)", "(where)", cond);
    //        if (bangcong.Rows.Count == 0) bangcong.Rows.Add(bangcong.NewRow());

    //        cond = new SqlConditions();
    //        cond.Add("custemerid", custemerid);
    //        DataTable loaiphep = cnn.CreateDataTable("select Id_Type,KeyValue, title,Disable,len(KeyValue) as lenFieldName from Xnp_Types where CustemerID=@custemerid and nhom is null", cond);
    //        cond = new SqlConditions();
    //        cond.Add("id_nv", id_nv);
    //        cond.Add("nam", nam);
    //        cond.Add("thang", thang);
    //        string select = @"select * from Sa_Tonghopnghiphep_thang where (where)";
    //        DataTable dt_phep = cnn.CreateDataTable(select, "(where)", cond);
    //        phep = new DataTable();
    //        phep.Columns.Add("ID");
    //        phep.Columns.Add("FieldName");
    //        phep.Columns.Add("Title");
    //        phep.Columns.Add("Value");
    //        phep.Columns.Add("Disable");
    //        phep.Columns.Add("lenFieldName", typeof(int));
    //        for (int i = 0; i < loaiphep.Rows.Count; i++)
    //        {
    //            double sophep = 0;
    //            DataRow[] r = dt_phep.Select("TypeID=" + loaiphep.Rows[i]["Id_Type"]);
    //            if (r.Length > 0) double.TryParse(r[0]["Songaynghi"].ToString(), out sophep);
    //            phep.Rows.Add(new object[] { loaiphep.Rows[i]["Id_Type"], loaiphep.Rows[i]["KeyValue"], loaiphep.Rows[i]["title"], sophep, loaiphep.Rows[i]["Disable"], loaiphep.Rows[i]["lenFieldName"] });
    //        }
    //        int Cachlay = 2;
    //        Songuoiphuthuoc = sal.GetSonguoiphuthuoc(id_nv, cnn, thang, nam, Cachlay);
    //    }
    //    public bool IsDongBHXH;
    //    public bool IsDongBHYT;
    //    public bool IsDongBHTN;
    //    public bool IsDongPCD;
    //    public bool IsDongPCD_DN;
    //    public int Songuoiphuthuoc;
    //    public DataTable bangcong;
    //    public DataTable phep;
    //}

    public class KeyValue
    {
        public string Key;
        public object Value;
    }
    public class Thietlapditrevesom
    {
        public Thietlapditrevesom()
        {
            Cackhoangtru = new DataTable();
            Cachtrucong = 1;
            Sophuttinhnghikophep = 180;
            Sophutchophep = 5;
            Blocktru = 1;
            SophuttinhtronBlock = 1;
        }
        /// <summary>
        /// Khởi tạo theo giá trị truyền vào
        /// </summary>
        /// <param name="s_Cachtru"></param>
        /// <param name="s_sophuttinhnghikhongphep"></param>
        /// <param name="s_sophutchophep"></param>
        /// <param name="s_blocktru"></param>
        /// <param name="s_sophuttinhtronblock"></param>
        /// <param name="ThietlapID"></param>
        /// <param name="cnn"></param>
        /// <param name="Loai">1: áp dụng cho đi trễ, 2: áp dụng cho về sớm</param>
        public Thietlapditrevesom(string s_Cachtru, string s_sophuttinhnghikhongphep, string s_sophutchophep, string s_blocktru, string s_sophuttinhtronblock, string ThietlapID, DpsConnection cnn, int Loai)
        {
            int.TryParse(s_Cachtru, out Cachtrucong);
            int.TryParse(s_sophuttinhnghikhongphep, out Sophuttinhnghikophep);
            int.TryParse(s_sophutchophep, out Sophutchophep);
            int.TryParse(s_sophuttinhtronblock, out SophuttinhtronBlock);
            int.TryParse(s_blocktru, out Blocktru);
            //Lấy danh sách các khoản trừ
            string select = "select Tu, Denduoi, Sophuttru from Sa_Thietlaptinhcong_khoangthoigian where ThietlapID=@ThietlapID and Loai=@Loai";
            SqlConditions cond = new SqlConditions();
            cond.Add("Loai", Loai);
            cond.Add("ThietlapID", ThietlapID);
            Cackhoangtru = cnn.CreateDataTable(select, cond);
        }
        /// <summary>
        /// 1: Trừ theo block, 2: Trừ theo khoảng thời gian,3: Không trừ
        /// </summary>
        public int Cachtrucong;
        /// <summary>
        /// Số phút đi trễ bị tính là nghỉ không phép
        /// </summary>
        public int Sophuttinhnghikophep;
        /// <summary>
        /// Số phút cho phép đi trễ. Đi trễ từ số này trở xuống sẽ không tính là đi trễ
        /// </summary>
        public int Sophutchophep;
        /// <summary>
        /// Block trừ đi trễ, áp dụng khi trừ theo block
        /// </summary>
        public int Blocktru;
        /// <summary>
        /// Số phút tính tròn 1 block trừ
        /// </summary>
        public int SophuttinhtronBlock;
        /// <summary>
        /// Lưu các khoảng thời gian trừ đối với trường hợp trừ theo khoảng thời gian. Các cột gồm Tu, Denduoi, Sophuttru.
        /// </summary>
        public DataTable Cackhoangtru;
    }
    public class Thietlapthieugio
    {
        /// <summary>
        /// Khởi tạo dữ liệu mặc định
        /// </summary>
        public Thietlapthieugio()
        {
            Codon_Cachtinhbosung = 0;
            Codon_Socodinh = 0;
            Codon_Donvitinhsocodinh = 0;
            Codon_IsTinhtheodongiaitrinh = true;
            Khongdon_Cachtinh = 0;
            Khongdon_Socodinh = 0;
            Khongdon_Donvitinhsocodinh = 0;
        }
        /// <summary>
        /// Khởi tạo dữ liệu theo các tham số truyền vào
        /// </summary>
        /// <param name="s_codon_cachtinhbosung"></param>
        /// <param name="s_codon_socodinh"></param>
        /// <param name="s_codon_donvitinh"></param>
        /// <param name="s_codon_istinhtheodon"></param>
        /// <param name="s_khongdon_cachtinh"></param>
        /// <param name="s_khongdon_socodinh"></param>
        /// <param name="s_khongdon_donvi"></param>
        public Thietlapthieugio(object s_codon_cachtinhbosung, object s_codon_socodinh, object s_codon_donvitinh, object s_codon_istinhtheodon, object s_khongdon_cachtinh, object s_khongdon_socodinh, object s_khongdon_donvi)
        {
            int.TryParse(s_codon_cachtinhbosung.ToString(), out Codon_Cachtinhbosung);
            double.TryParse(s_codon_socodinh.ToString(), out Codon_Socodinh);
            int.TryParse(s_codon_donvitinh.ToString(), out Codon_Donvitinhsocodinh);
            Codon_IsTinhtheodongiaitrinh = !bool.FalseString.Equals(s_codon_istinhtheodon.ToString());
            int.TryParse(s_khongdon_cachtinh.ToString(), out Khongdon_Cachtinh);
            int.TryParse(s_khongdon_donvi.ToString(), out Khongdon_Donvitinhsocodinh);
            double.TryParse(s_khongdon_socodinh.ToString(), out Khongdon_Socodinh);
        }
        /// <summary>
        /// Tính thời gian theo đơn giải trình
        /// </summary>
        public bool Codon_IsTinhtheodongiaitrinh;
        /// <summary>
        /// Số giờ cố định, áp dụng cộng hay trừ tùy vào Cách tính (Cachtinh)
        /// </summary>
        public double Codon_Socodinh;
        /// <summary>
        /// Cách tính bổ sung ngoài việc tính theo đơn giải trình (nếu có): 0: Không trừ công, 1: Trừ số giờ/công cố định
        /// </summary>
        public int Codon_Cachtinhbosung;
        /// <summary>
        /// 0: Số giờ, 1: Số công. Áp dụng khi cách tính là trừ số cố định, số cố định nhập trong cột Thieugio_Cogiaitrinh_Socodinh
        /// </summary>
        public int Codon_Donvitinhsocodinh;
        /// <summary>
        /// 0: Không tính công, 1: Tính công/số giờ cố định, 2: Tính đủ công
        /// </summary>
        public int Khongdon_Cachtinh;
        /// <summary>
        /// Tính công là 1 số cố định (số giờ hoặc số công quy định trong biến Khongdon_Donvitinhsocodinh)
        /// </summary>
        public double Khongdon_Socodinh;
        /// <summary>
        /// 0: Số giờ, 1: Số công. Áp dụng khi cách tính là tính số cố định, số cố định nhập trong biến Khongdon_Socodinh
        /// </summary>
        public int Khongdon_Donvitinhsocodinh;
    }
    public class Thietlaptinhcong
    {
        public Thietlaptinhcong()
        {
            Ditre = new Thietlapditrevesom();
            Vesom = new Thietlapditrevesom();
            Thieugio = new Thietlapthieugio();
            Khongchamcong = new Thietlapthieugio();
            Tangca = new Thietlaptangca();
            Nghikhongphep = new Thietlaptrunghikhongphep();
        }
        /// <summary>
        /// Khởi tạo thiết lập chung của 1 khách hàng
        /// </summary>
        /// <param name="CustemerID"></param>
        public Thietlaptinhcong(string CustemerID, DpsConnection cnn)
        {
            Ditre = new Thietlapditrevesom();
            Vesom = new Thietlapditrevesom();
            Thieugio = new Thietlapthieugio();
            Khongchamcong = new Thietlapthieugio();
            Tangca = new Thietlaptangca();
            Nghikhongphep = new Thietlaptrunghikhongphep();
            string select = "select * from Sa_Thietlaptinhcong where CustemerID=@CustemerID and ((Id_ca is null) or (Id_ca=0))";

            SqlConditions cond = new SqlConditions();
            cond.Add("CustemerID", CustemerID);
            DataTable dt = cnn.CreateDataTable(select, cond);
            if (dt.Rows.Count > 0)
            {
                DataRow row = dt.Rows[0];
                Ditre = new Thietlapditrevesom(row["Ditre_Cachtrucong"].ToString(), row["Ditre_Sophuttinhnghikophep"].ToString(), row["Ditre_Sophutchophep"].ToString(), row["Ditre_Blocktru"].ToString(), row["Ditre_SophuttinhtronBlock"].ToString(), row["RowID"].ToString(), cnn, 1);
                Vesom = new Thietlapditrevesom(row["Vesom_Cachtrucong"].ToString(), row["Vesom_Sophuttinhnghikophep"].ToString(), row["Vesom_Sophutchophep"].ToString(), row["Vesom_Blocktru"].ToString(), row["Vesom_SophuttinhtronBlock"].ToString(), row["RowID"].ToString(), cnn, 2);
                Thieugio = new Thietlapthieugio(row["Thieugio_Cogiaitrinh_Cachtrubosung"], row["Thieugio_Cogiaitrinh_Socodinh"], row["Thieugio_Cogiaitrinh_Donvi"], row["Thieugio_Cogiaitrinh_Tinhtheodon"], row["Thieugio_Khonggiaitrinh_Cachtinh"], row["Thieugio_Khonggiaitrinh_Socodinh"], row["Thieugio_Khonggiaitrinh_Donvi"]);
                Khongchamcong = new Thietlapthieugio(row["Khongcham_Cogiaitrinh_Cachtrubosung"], row["Khongcham_Cogiaitrinh_Socodinh"], row["Khongcham_Cogiaitrinh_Donvi"], row["Khongcham_Cogiaitrinh_Tinhtheodon"], row["Khongcham_Khonggiaitrinh_Cachtinh"], row["Khongcham_Khonggiaitrinh_Socodinh"], row["Khongcham_Khonggiaitrinh_Donvi"]);
                Tangca = new Thietlaptangca(row["Tangca_block"], row["Tangca_Sophuttinhtronblock"], row["Tangca_Sophuttoithieu"], row["Tangca_Tinhtangca"]);
                Nghikhongphep = new Thietlaptrunghikhongphep(row["Khongphep_Cachtinh"].ToString(), row["Khongphep_Blocktru"].ToString(), row["Khongphep_SophuttinhtronBlock"].ToString(), row["RowID"].ToString(), cnn);
            }
        }
        /// <summary>
        /// Thiết lập tính công cho trường hợp đi trễ
        /// </summary>
        public Thietlapditrevesom Ditre;
        /// <summary>
        /// Thiết lập tính công cho trường hợp về sơm
        /// </summary>
        public Thietlapditrevesom Vesom;
        /// <summary>
        /// Thiết lập tính công cho trường thiếu giờ vào hoặc ra
        /// </summary>
        public Thietlapthieugio Thieugio;
        /// <summary>
        /// Thiết lập tính công cho trường hợp không chấm công (thiếu cả giờ vào và ra)
        /// </summary>
        public Thietlapthieugio Khongchamcong;
        /// <summary>
        /// Thiết lập tính tang ca
        /// </summary>
        public Thietlaptangca Tangca;
        /// <summary>
        /// Thiết lập trừ nghỉ không phép
        /// </summary>
        public Thietlaptrunghikhongphep Nghikhongphep;
    }
    /// <summary>
    /// Thiết lập tính tăng ca
    /// </summary>
    public class Thietlaptangca
    {
        /// <summary>
        /// Khởi tạo mặc định
        /// </summary>
        public Thietlaptangca()
        {
            Block = 1;
            Sophuttinhtronblock = 1;
            Sophuttoithieu = 30;
        }
        /// <summary>
        /// Khởi tạo với tham số truyền vào
        /// </summary>
        /// <param name="s_block"></param>
        /// <param name="s_Sophuttinhtronblock"></param>
        /// <param name="s_Sotoithieu"></param>
        public Thietlaptangca(object s_block, object s_Sophuttinhtronblock, object s_Sotoithieu, object s_Tinhtangca)
        {
            int.TryParse(s_block.ToString(), out Block);
            int.TryParse(s_Sophuttinhtronblock.ToString(), out Sophuttinhtronblock);
            int.TryParse(s_Sotoithieu.ToString(), out Sophuttoithieu);
            bool.TryParse(s_Tinhtangca.ToString(), out Tinhtangcatheodon);
        }
        /// <summary>
        /// Block làm tròn khi tính tăng ca
        /// </summary>
        public int Block;
        /// <summary>
        /// Số phút lẻ còn lại tối thiểu để được tính tròn thêm 1 block
        /// </summary>
        public int Sophuttinhtronblock;
        /// <summary>
        /// Số phút tăng ca tối thiêu
        /// </summary>
        public int Sophuttoithieu;
        /// <summary>
        /// Tính tăng ca dựa vào đơn đăng ký: 0:Tắt; 1: Mở
        /// </summary>
        public bool Tinhtangcatheodon;
    }
    public class Thietlaptrunghikhongphep
    {
        public Thietlaptrunghikhongphep()
        {
            Cackhoangtru = new DataTable();
            Cachtrucong = 1;
            Blocktru = 1;
            SophuttinhtronBlock = 1;
        }
        /// <summary>
        /// Khởi tạo theo giá trị truyền vào
        /// </summary>
        /// <param name="s_Cachtru"></param>
        /// <param name="s_sophuttinhnghikhongphep"></param>
        /// <param name="s_sophutchophep"></param>
        /// <param name="s_blocktru"></param>
        /// <param name="s_sophuttinhtronblock"></param>
        /// <param name="ThietlapID"></param>
        /// <param name="cnn"></param>
        public Thietlaptrunghikhongphep(string s_Cachtru, string s_blocktru, string s_sophuttinhtronblock, string ThietlapID, DpsConnection cnn)
        {
            int.TryParse(s_Cachtru, out Cachtrucong);
            int.TryParse(s_sophuttinhtronblock, out SophuttinhtronBlock);
            int.TryParse(s_blocktru, out Blocktru);
            //Lấy danh sách các khoản trừ
            string select = "select Tu, Denduoi, Sophuttru from Sa_Thietlaptinhcong_khoangthoigian where ThietlapID=@ThietlapID and Loai=@Loai";
            SqlConditions cond = new SqlConditions();
            cond.Add("Loai", 3);
            cond.Add("ThietlapID", ThietlapID);
            Cackhoangtru = cnn.CreateDataTable(select, cond);
        }
        /// <summary>
        /// 1: Trừ theo block, 2: Trừ theo khoảng thời gian,3: Không trừ
        /// </summary>
        public int Cachtrucong;

        /// <summary>
        /// Block trừ đi trễ, áp dụng khi trừ theo block
        /// </summary>
        public int Blocktru;
        /// <summary>
        /// Số phút tính tròn 1 block trừ
        /// </summary>
        public int SophuttinhtronBlock;
        /// <summary>
        /// Lưu các khoảng thời gian trừ đối với trường hợp trừ theo khoảng thời gian. Các cột gồm Tu, Denduoi, Sophuttru.
        /// </summary>
        public DataTable Cackhoangtru;
    }
    public class Tangcangay
    {
        public Tangcangay()
        {

        }
        /// <summary>
        /// Tổng số giờ tăng ca tính tiền bao gồm cả ca đêm
        /// </summary>
        public double Sogiotangca;
        public double Sogiotangcadem;
        public double Ngaykhac_Sogiotangca;
        public double Ngaykhac_Sogiotangcadem;
        public double Ratre_Sophuttangca;
        public double Ratre_Sophuttangcadem;
        public double Giuagio_Sophuttangca;
        public double Giuagio_Sophuttangcadem;
        public double Vaosom_Sophuttangca;
        public double Vaosom_Sophuttangcadem;
        /// <summary>
        /// Số giờ ca đêm thuộc giờ ca đêm của đêm ôm trước (không được xét tính hệ số 210%)
        /// </summary>
        public double Sophuttangcadem_giocademhomtruoc;
        /// <summary>
        /// Tổng số giờ tăng ca nghỉ bù bao gồm cả ca đêm
        /// </summary>
        public double Nghibu_Sogiotangca;
        public double Nghibu_Sogiotangcadem;
        public double Nghibu_Ngaykhac_Sogiotangca;
        public double Nghibu_Ngaykhac_Sogiotangcadem;
    }
    public class Congngay
    {
        public Congngay()
        {
            Tangca = new Tangcangay();
            IsDitre = false;
            IsVesom = false;
        }
        /// <summary>
        /// Số giờ làm việc
        /// </summary>
        public double Sogiongaythuong = 0;
        /// <summary>
        /// Số giờ làm ban đêm (không phải tăng ca)
        /// </summary>
        public double Sogiocadem = 0;
        /// <summary>
        /// Số phút trễ thực tế
        /// </summary>
        public double Sophutditre = 0;
        /// <summary>
        /// Số phút về sớm thực tế
        /// </summary>
        public double Sophutvesom = 0;
        /// <summary>
        /// Số phút trễ bị trừ ví dụ trễ thực tế 10p nhưng bị trừ 30p
        /// </summary>
        public double Sophuttrebitru = 0;
        /// <summary>
        /// Số phút về sớm bị trừ ví dụ trễ thực tế 10p nhưng bị trừ 30p
        /// </summary>
        public double Sophutvesombitru = 0;
        /// <summary>
        /// Ngày này có tính trễ hay không. Số phút trễ nhỏ hơn hoặc bằng số phút cho phép thì không tính trễ
        /// </summary>
        public bool IsDitre;
        /// <summary>
        /// Ngày này có tính về sớm hay không. Số phút về sớm nhỏ hơn hoặc bằng số phút cho phép thì không tính về sớm
        /// </summary>
        public bool IsVesom;
        /// <summary>
        /// Dữ liệu tăng ca ngày
        /// </summary>
        public Tangcangay Tangca;
        /// <summary>
        /// Số giờ nghỉ không phép trong ngày (bao gồm đi trễ tính nghỉ bù và về sớm tính nghỉ bù)
        /// </summary>
        public double Sogionghikhongphep;
    }
}
