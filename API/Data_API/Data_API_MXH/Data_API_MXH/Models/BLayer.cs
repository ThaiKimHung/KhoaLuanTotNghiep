using System.Data;
using DpsLibs.Data;
using System.Collections.Specialized;
using APIModel.DTO;
using System;
using System.Collections;
using APIModel.BLayer;
using System.Collections.Generic;

namespace Data_API_MXH.BLayer
{
    public class Employee
    {
        public Int32 Id_nv
        {
            get
            {
                return _id_nv;
            }
        }
        Int32 _id_nv = 0;
        /// <summary>
        /// Lấy tất cả id chức danh bên dưới 1 nhân viên
        /// </summary>
        /// <param name="id_manager">id nhân viên</param>
        /// <returns>danh sách chức danh cách nhau bằng dấu ,</returns>
        public string GetAllChildPositionByManager(string id_manager, bool IsIncludeManager)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("Id_nv", id_manager);
            string select = "select id_chucdanh from tbl_nhanvien where (where)";
            using (DpsConnection cnn = new DpsConnection())
            {
                DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
                if (dt.Rows.Count <= 0)
                {
                    return "";
                }
                StringCollection listchucdanh = new StringCollection();
                listchucdanh.Add(dt.Rows[0][0].ToString());
                DataTable kiemnhiem = cnn.CreateDataTable("select id_chucdanh from lslamviec where active=1 and disable=0 and hinhthuc=3 and (where)", "(where)", cond);
                for (int i = 0; i < kiemnhiem.Rows.Count; i++)
                {
                    if (!listchucdanh.Contains(kiemnhiem.Rows[i][0].ToString()))
                        listchucdanh.Add(kiemnhiem.Rows[i][0].ToString());
                }

                StringCollection id = new StringCollection();
                StringCollection tmp = new StringCollection();
                for (int i = 0; i < listchucdanh.Count; i++)
                {
                    if (IsIncludeManager)
                        id.Add(listchucdanh[i]);
                    tmp = GetAllPosition(listchucdanh[i], cnn);
                    for (int j = 0; j < tmp.Count; j++)
                    {
                        id.Add(tmp[j]);
                    }
                }
                string id_chucdanh = "";
                for (int k = 0; k < id.Count; k++)
                {
                    id_chucdanh += "," + id[k];
                }
                if (!"".Equals(id_chucdanh)) id_chucdanh = id_chucdanh.Substring(1);
                return id_chucdanh;
            }
        }
        public StringCollection GetAllPosition(string Id_parent, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("Id_parent", Id_parent);
            DataTable dt = cnn.CreateDataTable("select id_row from tbl_chucdanh where (where) and disable=0", "(where)", cond);
            StringCollection id = new StringCollection();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                id.Add(dt.Rows[i][0].ToString());
                StringCollection child = GetAllPosition(dt.Rows[i][0].ToString(), cnn);
                for (int j = 0; j < child.Count; j++)
                {
                    id.Add(child[j]);
                }
            }
            return id;
        }
        public EDTO GetById()
        {
            return GetById(Id_nv.ToString());
        }
        public EDTO GetById(string ID)
        {
            using (DpsConnection cnn = new DpsConnection())
            {
                EDTO result = GetById(ID, cnn);
                return result;
            }
        }
        /// <summary>
        /// Lấy thông tin nhân viên
        /// </summary>
        /// <param name="ID">id nhân viên cần lấy</param>
        /// <returns>thông tin nhân viên cần lấy</returns>
        public EDTO GetById(string ID, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("Employee.id_nv", ID);
            DataTable dt = cnn.CreateDataTable(@"select Employee.*, tbl_account.username, hopdong.* ,tbl_cocautochuc.title as cocau, dm_mauin.Title as tenmauinthoiviec, dm_nhommau.title as tennhommau
            from Employee left join tbl_account on Employee.id_nv=tbl_account.id_nv left join hopdong on hopdong.id_nv = employee.id_nv
            left join tbl_cocautochuc on cocauid = tbl_cocautochuc.rowid
			left join dm_mauin on Employee.MauinID=dm_mauin.RowID
		    left join dm_nhommau on Employee.Nhommau=dm_nhommau.RowID
            where (where)", "(where)", cond);
            EDTO emp = new EDTO();
            if (cnn.LastError != null)
            {
                return emp;
            }
            emp.id_nv = 0;
            if (dt.Rows.Count > 0)
            {
                emp.bangcapkhac = dt.Rows[0]["bangcapkhac"].ToString();
                Int32 so = 0;
                DateTime ngay = new DateTime();
                if (!"".Equals(dt.Rows[0]["ngaythoiviec"].ToString()))
                {
                    emp.boithuongthoiviec = dt.Rows[0]["boithuongthoiviec"].ToString();
                    emp.thoiviec = bool.TrueString.Equals(dt.Rows[0]["thoiviec"].ToString());
                    emp.soqdtv = dt.Rows[0]["soqdthoiviec"].ToString();
                    if (Int32.TryParse(dt.Rows[0]["hinhthucthoiviec"].ToString(), out so))
                        emp.id_hinhthuctv = so;
                    if (DateTime.TryParse(dt.Rows[0]["ngaythoiviec"].ToString(), out ngay))
                        emp.ngaythoiviec = ngay;
                    if (DateTime.TryParse(dt.Rows[0]["ngaykythoiviec"].ToString(), out ngay))
                        emp.ngaykyqdtv = ngay;
                    emp.nguoikyqdtv = dt.Rows[0]["nguoikythoiviec"].ToString();
                    emp.lydothoiviec = dt.Rows[0]["lydothoiviec"].ToString();
                    emp.trocapthoiviec = string.Format("{0:###,##0.##}", dt.Rows[0]["trocapthoiviec"]);
                    if (DateTime.TryParse(dt.Rows[0]["ngaytrathe"].ToString(), out ngay))
                        emp.ngaytrathe = ngay;
                }
                emp.chuyenmon = dt.Rows[0]["chuyenmon"].ToString();
                emp.cmnd = dt.Rows[0]["cmnd"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["ngaycap"].ToString(), out ngay))
                    emp.ngaycapcmnd = ngay;
                emp.diachitamtru = dt.Rows[0]["tamtru_diachi"].ToString();
                emp.diachithuongtru = dt.Rows[0]["thuongtru_diachi"].ToString();
                emp.Full_Diachithuongtru = dt.Rows[0]["thuongtru"].ToString();
                emp.Full_Diachitamtru = dt.Rows[0]["tamtru_diachi"].ToString() + ("".Equals(dt.Rows[0]["Tamtruxa"].ToString()) ? "" : ", " + dt.Rows[0]["Tamtruxa"].ToString()) + ("".Equals(dt.Rows[0]["tenhuyentamtru"].ToString()) ? "" : ", " + dt.Rows[0]["tenhuyentamtru"].ToString()) + ("".Equals(dt.Rows[0]["tentinhtamtru"].ToString()) ? "" : ", " + dt.Rows[0]["tentinhtamtru"].ToString());
                emp.dongbhxh = bool.Parse(dt.Rows[0]["dongbhxh"].ToString());
                emp.dongbhyt = bool.Parse(dt.Rows[0]["dongbhyt"].ToString());
                emp.DongBHTN = (bool)dt.Rows[0]["BHTN"];
                emp.email = dt.Rows[0]["email"].ToString();
                emp.gioitinh = dt.Rows[0]["phai"].ToString();
                emp.hocham = dt.Rows[0]["hocham"].ToString();
                emp.holot = dt.Rows[0]["holot"].ToString();
                emp.Ghichubhxh = dt.Rows[0]["ghichubhxh"].ToString();
                emp.MauinID_ThoiViec = dt.Rows[0]["MauinID"].ToString();
                emp.Structure = dt.Rows[0]["cocau"].ToString();
                if (Int32.TryParse(dt.Rows[0]["cocauid"].ToString(), out so))
                    emp.StructureID = so;
                if (Int32.TryParse(dt.Rows[0]["bangcap"].ToString(), out so))
                    emp.id_bangcap = so;
                //if (Int32.TryParse(dt.Rows[0]["id_bp"].ToString(), out so))
                //    emp.id_bp = so;
                //if (Int32.TryParse(dt.Rows[0]["id_to"].ToString(), out so))
                //    emp.id_to = so;
                //if (Int32.TryParse(dt.Rows[0]["id_dv"].ToString(), out so))
                //    emp.id_dv = so;
                if (Int32.TryParse(dt.Rows[0]["id_chucdanh"].ToString(), out so))
                    emp.id_chucdanh = so;
                if (Int32.TryParse(dt.Rows[0]["id_cv"].ToString(), out so))
                    emp.id_cv = so;
                if (Int32.TryParse(dt.Rows[0]["dantoc"].ToString(), out so))
                    emp.id_dantoc = so;
                if (Int32.TryParse(dt.Rows[0]["tamtru_huyen"].ToString(), out so))
                    emp.id_huyen_tamtru = so;
                if (Int32.TryParse(dt.Rows[0]["tamtru_tinh"].ToString(), out so))
                    emp.id_tinh_tamtru = so;
                if (Int32.TryParse(dt.Rows[0]["thuongtru_huyen"].ToString(), out so))
                    emp.id_huyen_thuongtru = so;
                if (Int32.TryParse(dt.Rows[0]["loainhanvien"].ToString(), out so))
                    emp.id_loainv = so;
                if (Int32.TryParse(dt.Rows[0]["id_nganhang"].ToString(), out so))
                    emp.id_nganhang = so;
                if (Int32.TryParse(dt.Rows[0]["id_nv"].ToString(), out so))
                    emp.id_nv = so;
                if (Int32.TryParse(dt.Rows[0]["tinh"].ToString(), out so))
                    emp.id_tinh = so;
                if (Int32.TryParse(dt.Rows[0]["thuongtru_tinh"].ToString(), out so))
                    emp.id_tinh_thuongtru = so;
                if (Int32.TryParse(dt.Rows[0]["tongiao"].ToString(), out so))
                    emp.id_tongiao = so;
                if (Int32.TryParse(dt.Rows[0]["tinhtranghn"].ToString(), out so))
                    emp.id_tthn = so;
                if (Int32.TryParse(dt.Rows[0]["Thuongtru_xa"].ToString(), out so))
                    emp.Thuongtru_Xa = so;
                if (Int32.TryParse(dt.Rows[0]["Tamtru_xa"].ToString(), out so))
                    emp.Tamtru_Xa = so;
                emp.manv = dt.Rows[0]["manv"].ToString();
                emp.mobile = dt.Rows[0]["mobile"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["Ngaycappassport"].ToString(), out ngay))
                    emp.ngaycappassport = ngay;
                emp.noicappassport = dt.Rows[0]["Noicappassport"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["Ngaycapsobhxh"].ToString(), out ngay))
                    emp.ngaycapsobhxh = ngay;
                if (DateTime.TryParse(dt.Rows[0]["NgaycaptheBHYT"].ToString(), out ngay))
                    emp.ngaycapthebhyt = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngaycapsolaodong"].ToString(), out ngay))
                    emp.ngaycapsolaodong = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngayhethanbhxh"].ToString(), out ngay))
                    emp.ngayhethanbhxh = ngay;
                if (DateTime.TryParse(dt.Rows[0]["NgayhethanBHYT"].ToString(), out ngay))
                    emp.ngayhethanbhyt = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngaysinh"].ToString(), out ngay))
                    emp.ngaysinh = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngaytrathe"].ToString(), out ngay))
                    emp.ngaytrathe = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngayvaobienche"].ToString(), out ngay))
                    emp.ngayvaobienche = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngayvaocty"].ToString(), out ngay))
                    emp.ngayvaocongty = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngayvaodang"].ToString(), out ngay))
                    emp.ngayvaodang = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngayvaodoan"].ToString(), out ngay))
                    emp.ngayvaodoan = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngaythamgiacongdoan"].ToString(), out ngay))
                    emp.Ngaythamgiacongdoan = ngay;
                emp.noicapcmnd = dt.Rows[0]["noicap"].ToString();
                emp.id_noicapcmnd = dt.Rows[0]["Id_noicapcmnd"].ToString();
                emp.noicappassport = dt.Rows[0]["noicappassport"].ToString();
                emp.noidangkykcb = dt.Rows[0]["noidangkykcb"].ToString();
                emp.phone_tamtru = dt.Rows[0]["tamtru_phone"].ToString();
                emp.phone_thuongtru = dt.Rows[0]["thuongtru_phone"].ToString();
                emp.quanhegiadinh = dt.Rows[0]["quanhegiadinh"].ToString();

                emp.quoctich = dt.Rows[0]["quoctich"].ToString();
                if (Int32.TryParse(dt.Rows[0]["songayphep"].ToString(), out so))
                    emp.songayphep = so;
                emp.sopassport = dt.Rows[0]["Passport"].ToString();
                emp.sosobhxh = dt.Rows[0]["sosobhxh"].ToString();
                emp.sosolaodong = dt.Rows[0]["sosolaodong"].ToString();
                emp.sotaikhoan = dt.Rows[0]["sotaikhoan"].ToString();
                emp.sothebhyt = dt.Rows[0]["sothebhyt"].ToString();
                emp.tamnghi = bool.Parse(dt.Rows[0]["tamnghi"].ToString());
                emp.ten = dt.Rows[0]["ten"].ToString();
                bool bo = false;
                emp.tinhtranghn = dt.Rows[0]["tinhtranghn"].ToString();
                if (bool.TryParse(dt.Rows[0]["trathe"].ToString(), out bo))
                    emp.trathe = bo;
                emp.trinhdo = dt.Rows[0]["trinhdo"].ToString();
                emp.tenbp = dt.Rows[0]["tenbp"].ToString();
                emp.tenchucdanh = dt.Rows[0]["tenchucdanh"].ToString();
                emp.tenchucvu = dt.Rows[0]["tencv"].ToString();
                emp.tenhuyen_tamtru = dt.Rows[0]["tenhuyentamtru"].ToString();
                emp.tenhuyen_thuongtru = dt.Rows[0]["tenhuyenthuongtru"].ToString();
                emp.tentinh = dt.Rows[0]["tentinh"].ToString();
                emp.tentinh_tamtru = dt.Rows[0]["tentinhtamtru"].ToString();
                emp.tentinh_thuongtru = dt.Rows[0]["tentinhthuongtru"].ToString();
                emp.tentinhtranghonnhan = dt.Rows[0]["tentinhtranghonnhan"].ToString();
                emp.tentongiao = dt.Rows[0]["tentongiao"].ToString();
                emp.tendantoc = dt.Rows[0]["tendantoc"].ToString();
                emp.tennganhang = dt.Rows[0]["tennganhang"].ToString();
                emp.masothue = dt.Rows[0]["masothue"].ToString();
                emp.mataikhoan = dt.Rows[0]["mataikhoan"].ToString();
                emp.chinhanhnganhang = dt.Rows[0]["chinhanhnganhang"].ToString();
                if (Int32.TryParse(dt.Rows[0]["namthamgiabh"].ToString(), out so))
                    emp.namthamgiabhxh = so;
                emp.namsinh = dt.Rows[0]["namsinh"].ToString();

                int sonho = 0;
                string cap = dt.Rows[0]["cap"].ToString();
                if (int.TryParse(dt.Rows[0]["cap"].ToString(), out sonho))
                    emp.cap = sonho;
                if (int.TryParse(dt.Rows[0]["loaihopdong"].ToString(), out sonho))
                    emp.id_loaihopdong = sonho;
                int kinhnghiem = 0;
                int.TryParse(dt.Rows[0]["KinhnghiemLVNH"].ToString(), out kinhnghiem);
                emp.tinhdangkykcb = dt.Rows[0]["ProVinceID"].ToString();
                emp.tendonvi = dt.Rows[0]["tendonvi"].ToString();
                emp.id_noikcb = dt.Rows[0]["id_noikcb"].ToString();
                emp.tenbangcap = dt.Rows[0]["tenbangcap"].ToString();
                if (int.TryParse(dt.Rows[0]["truongtotnghiep"].ToString(), out sonho))
                    emp.truongtotnghiep = sonho;
                emp.Tentruongtotnghiep = dt.Rows[0]["Tentruongtotnghiep"].ToString();
                if (bool.FalseString.Equals(dt.Rows[0]["AllowEditchucdanh"].ToString())) emp.Alloweditchucdanh = false;
                else emp.Alloweditchucdanh = true;
                emp.macd = dt.Rows[0]["macd"].ToString();
                emp.sohdld = dt.Rows[0]["sohd"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["ngayky"].ToString(), out ngay))
                    emp.ngaykyHD = ngay;
                if (DateTime.TryParse(dt.Rows[0]["ngaybatdau"].ToString(), out ngay))
                    emp.ngaybatdauHD = ngay;
                if (DateTime.TryParse(dt.Rows[0]["ngayhethan"].ToString(), out ngay))
                    emp.ngayketthucHD = ngay;
                emp.Sothe = dt.Rows[0]["sothe"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["Ngayhethanthuviec"].ToString(), out ngay))
                    emp.Ngayhethanthuviec = ngay;
                if (Boolean.TrueString.Equals(dt.Rows[0]["CD"].ToString()))
                    emp.DongPCD = true;
                else emp.DongPCD = false;
                if (int.TryParse(dt.Rows[0]["chieucao"].ToString(), out sonho))
                    emp.chieucao = sonho;
                double sothuc = 0;
                if (double.TryParse(dt.Rows[0]["cannang"].ToString(), out sothuc))
                    emp.cannang = sothuc;
                if (int.TryParse(dt.Rows[0]["Nhommau"].ToString(), out sonho))
                    emp.nhommau = sonho;
                emp.Tinhtrangsuckhoe = dt.Rows[0]["Tinhtrangsuckhoe"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["NgayvaoDangchinthuc"].ToString(), out ngay))
                    emp.NgayvaoDangchinhthuc = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngaynhapngu"].ToString(), out ngay))
                    emp.Ngaynhapngu = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngayxuatngu"].ToString(), out ngay))
                    emp.Ngayxuatngu = ngay;
                if (int.TryParse(dt.Rows[0]["Quanham"].ToString(), out sonho))
                    emp.Quanham = sonho;
                emp.Ghichuquansu = dt.Rows[0]["Ghichuquansu"].ToString();
                if (int.TryParse(dt.Rows[0]["Hangthuongbinh"].ToString(), out sonho))
                    emp.Hangthuongbinh = sonho;
                if (int.TryParse(dt.Rows[0]["Giadinhchinhsach"].ToString(), out sonho))
                    emp.Giadinhchinhsach = sonho;
                if (int.TryParse(dt.Rows[0]["Trinhdochinhtri"].ToString(), out sonho))
                    emp.Trinhdochinhtri = sonho;
                if (int.TryParse(dt.Rows[0]["Trinhdovitinh"].ToString(), out sonho))
                    emp.Trinhdotinhoc = sonho;
                emp.Tentrinhdochinhtri = dt.Rows[0]["tentrinhdochinhtri"].ToString();
                emp.Tentrinhdovitinh = dt.Rows[0]["tentrinhdovitinh"].ToString();

                if (int.TryParse(dt.Rows[0]["diadiemlamviec"].ToString(), out sonho))
                    emp.Diadiemlamviec = sonho;
                emp.Tendiadiemlamviec = dt.Rows[0]["tendiadiemlamviec"].ToString();
                emp.Chucvutrongcongdoan = dt.Rows[0]["Chucvucongdoan"].ToString();
                //Lấy trình độ ngoại ngữ
                cond = new SqlConditions();
                cond.Add("id_nv", ID);
                DataTable ngoaingu = cnn.CreateDataTable("SELECT DM_Ngoaingu.Title as Ngoaingu, DM_Trinhdongoaingu.Title AS Trinhdo, EM_Trinhdongoaingu.Ghichu FROM EM_Trinhdongoaingu INNER JOIN DM_Ngoaingu ON EM_Trinhdongoaingu.NgoainguID = DM_Ngoaingu.RowID INNER JOIN DM_Trinhdongoaingu ON EM_Trinhdongoaingu.TrinhdoID = DM_Trinhdongoaingu.RowID where em_trinhdongoaingu.id_nv=@id_nv", cond);
                string s = "";
                for (int i = 0; i < ngoaingu.Rows.Count; i++)
                {
                    s += ngoaingu.Rows[i][0].ToString() + "-" + ngoaingu.Rows[i][1].ToString() + (!"".Equals(ngoaingu.Rows[i][2].ToString()) ? "-" + ngoaingu.Rows[i][2].ToString() : "");
                }
                emp.Tentrinhdongoaingu = s;
                emp.Nickname = dt.Rows[0]["NickName"].ToString();
                emp.ChucvutrongDoan = dt.Rows[0]["Chucvutrongdoan"].ToString();
                emp.NoivaoDang = dt.Rows[0]["NoivaoDang"].ToString();
                emp.Nguoigioithieu1 = dt.Rows[0]["Nguoigioithieu1"].ToString();
                emp.Congviecnoio1 = dt.Rows[0]["Congviecnoio1"].ToString();
                emp.Nguoigioithieu2 = dt.Rows[0]["Nguoigioithieu2"].ToString();
                emp.Congviecnoio2 = dt.Rows[0]["Congviecnoio2"].ToString();
                emp.NoivaoDangchinhthuc = dt.Rows[0]["NoivaoDangchinhthuc"].ToString();
                emp.SotheDang = dt.Rows[0]["SotheDang"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["NgaycaptheDang"].ToString(), out ngay))
                    emp.NgaycaptheDang = ngay;
                emp.NoicaptheDang = dt.Rows[0]["NoicaptheDang"].ToString();
                emp.ChucvutrongDang = dt.Rows[0]["Chucvutrongdang"].ToString();
                if (int.TryParse(dt.Rows[0]["Hangbenhbinh"].ToString(), out sonho))
                    emp.Hangbenhbinh = sonho;
                emp.Tenquanham = dt.Rows[0]["tenquanham"].ToString();
                emp.Tengiadinhchinhsach = dt.Rows[0]["tengiadinhchinhsach"].ToString();
                emp.Tenhangthuongbinh = dt.Rows[0]["tenhangthuongbinh"].ToString();
                emp.Tenhangbenhbinh = dt.Rows[0]["tenhangbenhbinh"].ToString();
                emp.Tennguyenquan = dt.Rows[0]["tennguyenquan"].ToString();
                emp.Diemmanh = dt.Rows[0]["diemmanh"].ToString();
                emp.Diemyeu = dt.Rows[0]["diemyeu"].ToString();
                emp.Ghichuthoiviec = dt.Rows[0]["ghichuthoiviec"].ToString();
                emp.Emailcanhan = dt.Rows[0]["Emailcanhan"].ToString();
                if (DateTime.TryParse(dt.Rows[0]["Ngayketthucdaotao"].ToString(), out ngay))
                    emp.Ngayketthucdaotao = ngay;
                if (DateTime.TryParse(dt.Rows[0]["Ngaybatdauthuviec"].ToString(), out ngay))
                    emp.Ngaybatdauthuviec = ngay;
                emp.Chutaikhoan = dt.Rows[0]["Chutaikhoan"].ToString();

                emp.filethoiviec = dt.Rows[0]["Filethoiviec"].ToString();
                try { emp.Ngaybatdaudongbhtn = (DateTime)dt.Rows[0]["Ngaybatdaudongbhtn"]; }
                catch { }
                try { emp.Ngaybatdaudongbhxh = (DateTime)dt.Rows[0]["Ngaybatdaudongbhxh"]; }
                catch { }
                try { emp.Ngaytrasobhxh = (DateTime)dt.Rows[0]["Ngaytrasobhxh"]; }
                catch { }
                try { emp.Datrasobhxh = dt.Rows[0]["Datrasobhxh"].ToString().ToLower().Equals("true"); }
                catch { }
                emp.nguoilienhe = dt.Rows[0]["nguoilienhe"].ToString();
                emp.Quanhe_nguoilienhe = dt.Rows[0]["Quanhe_nguoilienhe"].ToString();
                emp.Sodienthoai_nguoilienhe = dt.Rows[0]["Sodienthoai_nguoilienhe"].ToString();
                // cập nhật thông tin tạm trú
                emp.tenchuho = dt.Rows[0]["tenchuho"].ToString();
                emp.quanhevoichuho = dt.Rows[0]["quanhevoichuho"].ToString();
                emp.sosohokhau = dt.Rows[0]["sosohokhau"].ToString();
                emp.sotaikhoan1 = dt.Rows[0]["sotaikhoan1"].ToString();
                //  emp.namsinhchuho = dt.Rows[0]["namsinhchuho"].ToString();
                // thêm field ghichu
                emp.ghichu = dt.Rows[0]["ghichu"].ToString();

                try { emp.Dongpcd_dn = (bool)dt.Rows[0]["IsDongPCD_DN"]; }
                catch { emp.Dongpcd_dn = false; }
                emp.Id_chedonghi = dt.Rows[0]["Id_chedonghi"].ToString();
                try { emp.NgayhethanPassport = (DateTime)dt.Rows[0]["NgayhethanPassport"]; }
                catch { }

                emp.Id_nganhhoc = (dt.Rows[0]["Id_nganhhoc"] != DBNull.Value) ? (dt.Rows[0]["Id_nganhhoc"].ToString()) : "";
                emp.namtotnghiep = (dt.Rows[0]["Namtotnghiep"] != DBNull.Value) ? (dt.Rows[0]["Namtotnghiep"].ToString()) : "";
                DateTime ngayketthuc = new DateTime();
                if (dt.Columns.Contains("NgaycapMST"))
                {
                    if (DateTime.TryParse(dt.Rows[0]["NgaycapMST"].ToString(), out ngayketthuc))
                    {
                        emp.NgaycapMST = ngayketthuc;
                    }
                }

                emp.Tentruongtotnghiep = dt.Rows[0]["Tentruongtotnghiep"].ToString();
                //Bằng cấp
                if (dt.Rows[0]["Id_bangtotnghiep"] != DBNull.Value)
                {
                    DataTable dt_trinhdobangcap = cnn.CreateDataTable("SELECT Id_row, Loaibang FROM DM_bang where Id_row=@Id_row", new SqlConditions() { { "Id_row", dt.Rows[0]["Id_bangtotnghiep"].ToString() } });
                    if (dt_trinhdobangcap.Rows.Count == 1)
                    {
                        emp.trinhdobangcap = dt_trinhdobangcap.Rows[0]["Loaibang"].ToString();
                    }
                }
                if (bool.TrueString.Equals(dt.Rows[0]["IsForeigner"].ToString())) emp.IsForeigner = true;
                else emp.IsForeigner = false;

                if (bool.TrueString.Equals(dt.Rows[0]["IsKycamketthue"].ToString())) emp.IsKycamketthue = true;
                else emp.IsKycamketthue = false;
                emp.CachtinhthueTNCN = dt.Rows[0]["CachtinhthueTNCN"].ToString();
                emp.Emailcanhan = dt.Rows[0]["Emailcanhan"].ToString();
                if (dt.Columns.Contains("IsCutrutren180ngay"))
                    emp.IsCutrutu180ngay = bool.TrueString.Equals(dt.Rows[0]["IsCutrutren180ngay"].ToString());
                if (!"".Equals(emp.Sothe))
                    int.TryParse(emp.Sothe, out emp.UserID);
                emp.Username = dt.Rows[0]["Username"].ToString();
                cond.Add("id_nv", ID);
                int.TryParse(dt.Rows[0]["EnrollNumber"].ToString(), out emp.EnrollNumber);
                emp.tentinh_thuongtru = dt.Rows[0]["tentinhthuongtru"].ToString();
                emp.tenhuyen_thuongtru = dt.Rows[0]["tenhuyenthuongtru"].ToString();
                emp.Thuongtru_Xa_ten = dt.Rows[0]["thuongtruxa"].ToString();
                emp.tenloainv = dt.Rows[0]["tenloainhanvien"].ToString();
                emp.tenmauinthoiviec = dt.Rows[0]["tenmauinthoiviec"].ToString();
                emp.tennhommau = dt.Rows[0]["tennhommau"].ToString();
                emp.tenhinhthucthoiviec = dt.Rows[0]["Loaithoiviec"].ToString();
                emp.Nghihuu_noicutru = dt.Rows[0]["nghihuu_noicutru"].ToString();
            }
            return emp;
        }
        public Employee(string id_nv)
        {
            //
            // TODO: Add constructor logic here
            //
            Int32 so = 0;
            if (Int32.TryParse(id_nv, out so))
                _id_nv = so;
        }
        public Employee()
        {
            //
            // TODO: Add constructor logic here
            //
        }
    }

    public class Phepnam
    {
        public static double Songayphepconlai(DateTime ToDate, string id_nv, DpsConnection cnn, bool IsTruphepdachuyen_dasudung)
        {
            string select = "select tongcong, Danghi_ton + Danghiton_ext AS Danghi_ton, Danghi_chinh + Danghichinh_ext AS Danghi_chinh, baoluuden, Tonnamtruoc, Songaydachuyenquanamsau, SongayExt, Dangchoduyet,Songayphepthamnien, Baoluudenngay from Tbl_Songayphepnam where (where)";
            SqlConditions cond = new SqlConditions();
            cond.Add("id_nv", id_nv);
            cond.Add("nam", ToDate.Year);
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            if (dt.Rows.Count <= 0) return 0;
            int baoluuden = 0;
            decimal songayphepco = 0;
            decimal sophepton = 0;
            decimal danghi_chinh = 0;
            decimal danghi_ton = 0;
            decimal songaydachuyenquanamsau = 0;
            decimal.TryParse(dt.Rows[0][0].ToString(), out songayphepco);
            decimal.TryParse(dt.Rows[0][1].ToString(), out danghi_ton);
            decimal.TryParse(dt.Rows[0][2].ToString(), out danghi_chinh);
            int.TryParse(dt.Rows[0][3].ToString(), out baoluuden);
            decimal.TryParse(dt.Rows[0][4].ToString(), out sophepton);
            decimal.TryParse(dt.Rows[0]["Songaydachuyenquanamsau"].ToString(), out songaydachuyenquanamsau);
            bool IsDachuyenphepton = !"".Equals(dt.Rows[0]["Songaydachuyenquanamsau"].ToString());
            decimal songaypheptonconlai = 0;
            if (!"".Equals(dt.Rows[0]["Baoluudenngay"].ToString()))
            {
                DateTime Baoluudenngay = (DateTime)dt.Rows[0]["Baoluudenngay"];
                if (Baoluudenngay >= ToDate) songaypheptonconlai = sophepton - danghi_ton;
            }
            else if (ToDate.Year == DateTime.Today.Year && baoluuden >= ToDate.Month) songaypheptonconlai = sophepton - danghi_ton;
            decimal songaychinhconlai = songayphepco - danghi_chinh;
            decimal Songayext = 0;
            decimal.TryParse(dt.Rows[0]["SongayExt"].ToString(), out Songayext);
            songaychinhconlai += Songayext;
            decimal songaydangchoduyet = 0;
            decimal.TryParse(dt.Rows[0]["Dangchoduyet"].ToString(), out songaydangchoduyet);
            decimal Songayphepton_dasudung = 0;
            decimal Songayphepthamnien = 0;
            decimal.TryParse(dt.Rows[0]["Songayphepthamnien"].ToString(), out Songayphepthamnien);
            if ((IsDachuyenphepton) && (IsTruphepdachuyen_dasudung))
            {
                //Lấy số ngày phép đã chuyển qua năm sau đã được sử dụng
                cond = new SqlConditions();
                cond.Add("nam", ToDate.Year + 1);
                cond.Add("id_nv", id_nv);
                DataTable phepnamsau = cnn.CreateDataTable("select Danghi_ton + Danghiton_ext AS Danghi_ton, Tonnamtruoc, baoluuden, Baoluudenngay, Dangchoduyet from tbl_songayphepnam where nam=@nam and id_nv=@id_nv", cond);
                if (phepnamsau.Rows.Count > 0)
                {
                    decimal namsau_songayphepton = 0;
                    decimal namsau_songaydanghi = 0;
                    decimal namsau_songaydangchoduyet = 0;
                    decimal Songayphepdachuyen_conlai = 0;
                    decimal.TryParse(phepnamsau.Rows[0][0].ToString(), out namsau_songaydanghi);
                    decimal.TryParse(phepnamsau.Rows[0][1].ToString(), out namsau_songayphepton);
                    decimal.TryParse(phepnamsau.Rows[0]["Dangchoduyet"].ToString(), out namsau_songaydangchoduyet);
                    if (!"".Equals(phepnamsau.Rows[0]["Baoluudenngay"].ToString()))
                    {
                        DateTime Baoluudenngay = (DateTime)phepnamsau.Rows[0]["Baoluudenngay"];
                        if (Baoluudenngay >= DateTime.Today) Songayphepdachuyen_conlai = namsau_songayphepton - namsau_songaydanghi - namsau_songaydangchoduyet;
                    }
                    else if (baoluuden >= DateTime.Today.Month) Songayphepdachuyen_conlai = namsau_songayphepton - namsau_songaydanghi - namsau_songaydangchoduyet;
                    if (Songayphepdachuyen_conlai < 0) Songayphepdachuyen_conlai = 0;
                    Songayphepton_dasudung = namsau_songayphepton - Songayphepdachuyen_conlai;
                }
            }
            return (double)(songaypheptonconlai + songaychinhconlai + Songayphepthamnien - Songayphepton_dasudung - songaydangchoduyet);
        }
        public static double Songayphepconlai(DateTime ToDate, string id_nv, DpsConnection cnn, string id_type, bool IsTruphepdachuyen_dasudung)
        {
            if ("41".Equals(id_type))
            {
                int debug = 1;
            }
            string select = "select Hanmuc, Danghi_ton, Danghi_chinh, baoluuden, Tonnamtruoc, Dangchoduyet, Danghiton_ext, Danghichinh_ext, Songay_ext, Songaydachuyenquanamsau from Sys_QuotaLeave where (where)";
            SqlConditions cond = new SqlConditions();
            cond.Add("id_nv", id_nv);
            cond.Add("nam", ToDate.Year);
            cond.Add("Id_type", id_type);
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            if (dt.Rows.Count <= 0) return 0;
            DateTime baoluuden = new DateTime();
            decimal songayphepco = 0;
            decimal sophepton = 0;
            decimal danghi_chinh = 0;
            decimal danghi_ton = 0;
            decimal danghiton_ext = 0;
            decimal danghichinh_ext = 0;
            decimal songay_ext = 0;
            decimal.TryParse(dt.Rows[0]["Hanmuc"].ToString(), out songayphepco);
            decimal.TryParse(dt.Rows[0]["Songay_ext"].ToString(), out songay_ext);
            songayphepco += songay_ext;


            decimal.TryParse(dt.Rows[0]["Danghi_ton"].ToString(), out danghi_ton);
            decimal.TryParse(dt.Rows[0]["Danghi_chinh"].ToString(), out danghi_chinh);

            decimal.TryParse(dt.Rows[0]["Danghiton_ext"].ToString(), out danghiton_ext);
            decimal.TryParse(dt.Rows[0]["Danghichinh_ext"].ToString(), out danghichinh_ext);
            danghi_ton += danghiton_ext;
            danghi_chinh += danghichinh_ext;

            DateTime.TryParse(dt.Rows[0]["baoluuden"].ToString(), out baoluuden);
            if (baoluuden.Equals(new DateTime())) baoluuden = new DateTime(ToDate.Year, 1, 1);
            decimal.TryParse(dt.Rows[0]["Tonnamtruoc"].ToString(), out sophepton);
            bool IsDachuyenphepton = !"".Equals(dt.Rows[0]["Songaydachuyenquanamsau"].ToString());
            decimal songaypheptonconlai = 0;
            if (baoluuden >= ToDate) songaypheptonconlai = sophepton - danghi_ton;
            decimal songaychinhconlai = songayphepco - danghi_chinh;
            decimal songaydangchoduyet = 0;
            decimal.TryParse(dt.Rows[0]["Dangchoduyet"].ToString(), out songaydangchoduyet);
            decimal Songayphepdachuyen_conlai = 0; decimal Songayphepton_dasudung = 0;
            if ((IsDachuyenphepton) && (IsTruphepdachuyen_dasudung))
            {
                //Lấy số ngày phép đã chuyển qua năm sau mà chưa được sử dụng
                cond = new SqlConditions();
                cond.Add("nam", ToDate.Year + 1);
                cond.Add("id_nv", id_nv);
                cond.Add("Id_type", id_type);
                DataTable phepnamsau = cnn.CreateDataTable("select Danghi_ton + Danghiton_ext AS Danghi_ton, Tonnamtruoc, Baoluuden, Dangchoduyet from Sys_QuotaLeave where nam=@nam and id_nv=@id_nv and Id_type=@Id_type", cond);
                if (phepnamsau.Rows.Count > 0)
                {
                    decimal namsau_songayphepton = 0;
                    decimal namsau_songaydanghi = 0;
                    decimal namsau_songaydangchoduyet = 0;
                    decimal.TryParse(phepnamsau.Rows[0][0].ToString(), out namsau_songaydanghi);
                    decimal.TryParse(phepnamsau.Rows[0][1].ToString(), out namsau_songayphepton);
                    decimal.TryParse(phepnamsau.Rows[0]["Dangchoduyet"].ToString(), out namsau_songaydangchoduyet);
                    DateTime Baoluudenngay = new DateTime();
                    DateTime.TryParse(phepnamsau.Rows[0]["baoluuden"].ToString(), out Baoluudenngay);
                    if (Baoluudenngay.Equals(new DateTime())) Baoluudenngay = new DateTime(ToDate.Year, 1, 1);
                    if (Baoluudenngay >= DateTime.Today)
                        Songayphepdachuyen_conlai = namsau_songayphepton - namsau_songaydanghi - songaydangchoduyet;
                    if (Songayphepdachuyen_conlai < 0) Songayphepdachuyen_conlai = 0;
                    Songayphepton_dasudung = namsau_songayphepton - Songayphepdachuyen_conlai;
                }
            }
            return (double)(songaypheptonconlai + songaychinhconlai - Songayphepton_dasudung - songaydangchoduyet);
        }
        public static double RemainLeave(string id_type, int year, string id_nv, DateTime ToDate, DpsConnection cnn)
        {
            return RemainLeave(id_type, year, id_nv, ToDate, cnn, true);
        }
        public static double RemainLeave(string id_type, int year, string id_nv, DateTime ToDate, DpsConnection cnn, bool IsTruphepdachuyendasudung)
        {
            double result = 0;
            DateTime Fromdate = General.GetBeginDateInMonth(1, year);
            DateTime EndDateInYear = General.GetEndDateInMonth(12, year);
            SqlConditions cond = new SqlConditions();
            cond.Add("Id_type", id_type);
            DataTable loaiphep = cnn.CreateDataTable("select IsAnnualLeave from Xnp_Types where (where) and disable=0", "(where)", cond);
            if ((loaiphep.Rows.Count > 0) && (bool.TrueString.Equals(loaiphep.Rows[0][0].ToString())))
            {
                result = Phepnam.Songayphepconlai(ToDate, id_nv, cnn, IsTruphepdachuyendasudung);
            }
            else
            {
                result = Phepnam.Songayphepconlai(ToDate, id_nv, cnn, id_type, IsTruphepdachuyendasudung);
            }
            return result;
        }
        public bool Delete(string id_request, string idnguoixoa, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            Hashtable val = new Hashtable();
            cond.Add("Id_Rq", id_request);
            val.Add("Disable", 1);
            val.Add("DeletedBy", idnguoixoa);
            val.Add("Ngayhuy", DateTime.Now);
            val.Add("Lock", false);
            int result = cnn.Update(val, cond, "Xnp_Requests");
            if (result <= 0)
                return false;
            return true;
        }
        public Donxinphep GetByID(string id, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("id_rq", id);
            string select = @"select Xnp_Requests.*, xnp_types.Title as tenloai,IsCongtac, tbl_chucdanh.tenchucdanh, Tbl_Custemers.loaihinh, IsNghiDiDuLich, Xnp_Requests.DiaDiem, IsAnnualLeave from Xnp_Requests inner join Xnp_Types on Type=Id_type 
            inner join tbl_nhanvien on tbl_nhanvien.id_nv= Xnp_Requests.id_nv join tbl_chucdanh on id_chucdanh = tbl_chucdanh.id_row
            inner join Tbl_Custemers on  CustemerID = Tbl_Custemers.rowid
            where (where) and (Xnp_Requests.disable=0) and (Xnp_Requests.ngayhuy is NULL)";
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            Donxinphep result = new Donxinphep();
            if (dt.Rows.Count > 0)
            {
                int so = 0;
                if (int.TryParse(dt.Rows[0]["Type"].ToString(), out so))
                    result.hinhthuc = so;
                int.TryParse(id, out so);
                result.Id_rq = so;
                if (!"".Equals(dt.Rows[0]["Valid"].ToString()))
                    result.IsApproved = (bool)dt.Rows[0]["Valid"];
                result.Ngaynhap = (DateTime)dt.Rows[0]["CreatedDate"];
                DateTime Ngayvaolam = (DateTime)dt.Rows[0]["Ngayvaolam"];
                BuoiNghi Ngay = new BuoiNghi();
                Ngay.Ngay = Ngayvaolam;
                Ngay.Buoi = dt.Rows[0]["Buoivaolam"].ToString();
                result.Ngayvaolam = Ngay;
                Ngay = new BuoiNghi();
                Ngay.Ngay = Ngayvaolam;
                if ("AM".Equals(dt.Rows[0]["Buoivaolam"].ToString()))
                {
                    Ngay.Buoi = "PM";
                    Ngay.Ngay = Ngayvaolam.AddDays(-1);
                }
                else Ngay.Buoi = "AM";
                result.Denhetngay = Ngay;
                if (int.TryParse(dt.Rows[0]["CreatedBy"].ToString(), out so))
                    result.Nguoinhap = so;
                if (int.TryParse(dt.Rows[0]["Id_nv"].ToString(), out so))
                    result.Id_nv = so;
                double songay = 0;
                if (double.TryParse(dt.Rows[0]["DayNum"].ToString(), out songay))
                    result.Songay = songay;
                result.tenhinhthuc = dt.Rows[0]["tenloai"].ToString();
                int.TryParse(dt.Rows[0]["hinhthuc"].ToString(), out result.Hinhthucditre);
                int.TryParse(dt.Rows[0]["Sophut"].ToString(), out result.Sophut);
                Ngay = new BuoiNghi();
                Ngay.Ngay = (DateTime)dt.Rows[0]["StartDate"];
                Ngay.Buoi = dt.Rows[0]["Buoinghi"].ToString();
                result.ghichu = dt.Rows[0]["Note"].ToString();
                result.Tungay = Ngay;
                result.nguoibangiaocongviec = dt.Rows[0]["nguoibangiaocongviec"].ToString();
                result.nguoilienhe = dt.Rows[0]["nguoilienhe"].ToString();
                result.dienthoainguoilienhe = dt.Rows[0]["dienthoainguoilienhe"].ToString();
                if (!"".Equals(dt.Rows[0]["Tungay_thoigian"].ToString())) result.Tungaygio = (DateTime)dt.Rows[0]["Tungay_thoigian"];
                if (!"".Equals(dt.Rows[0]["Denngay_thoigian"].ToString())) result.Denngaygio = (DateTime)dt.Rows[0]["Denngay_thoigian"];
                result.ChucVuNguoiGui = dt.Rows[0]["tenchucdanh"].ToString();
                result.LoaiHinhKhachHang = dt.Rows[0]["LoaiHinh"].ToString();
                if (!"".Equals(dt.Rows[0]["IsCongtac"].ToString()))
                    result.IsCongTac = (bool)dt.Rows[0]["IsCongtac"];
                if (!"".Equals(dt.Rows[0]["IsNghiDiDuLich"].ToString()))
                    result.IsNghiDiDuLich = (bool)dt.Rows[0]["IsNghiDiDuLich"];
                if (!"".Equals(dt.Rows[0]["IsAnnualLeave"].ToString()))
                    result.IsPhepNam = (bool)dt.Rows[0]["IsAnnualLeave"];
                result.DiaDiem = dt.Rows[0]["DiaDiem"].ToString();
                if (dt.Columns.Contains("IsLydochinhdang")) return result;
            }
            return result;
        }
        public Donxinphep GetByID(string id)
        {
            using (DpsConnection cnn = new DpsConnection())
            {
                return GetByID(id, cnn);
            }
        }
    }

    public class Menu
    {
        public static string GetIDMenu_HR(string id_nv, string custemer)
        {
            string list = "", sql_listRole = "", v_module = "";
            object username;
            Employee bemp = new Employee();
            SqlConditions cond = new SqlConditions();
            using (DpsConnection cnn = new DpsConnection())
            {
                Thamso para = new Thamso(custemer);
                cond.Add("CustemerID", custemer);
                username = cnn.ExecuteScalar("select Username from Tbl_Account where id_nv=" + id_nv);
                string[] listrole = Assets.Common.GetRolesForUser(username.ToString());
                DataTable tmp = cnn.CreateDataTable(@"select loaihinh from tbl_custemers where rowid=@CustemerID", cond);
                string loaihinh = "1";
                cond.Add("HienThi", 1);
                if (tmp.Rows.Count > 0)
                    loaihinh = tmp.Rows[0][0].ToString();
                cond.Add("Phanloai1", loaihinh);
                cond.Add("Phanloai2", para.Hinhthucchamcong);
                for (int i = 0; i < listrole.Length; i++)
                {
                    sql_listRole += ",@IDRole" + i;
                    cond.Add("IDRole" + i, listrole[i]);
                }
                if (!"".Equals(sql_listRole)) sql_listRole = sql_listRole.Substring(1);

                if (listrole.Length == 0)
                {
                    sql_listRole = "0";
                }
                //Kiểm tra quyền manager
                string listchucdanhbenduoi = bemp.GetAllChildPositionByManager(id_nv, true);
                string[] slist = listchucdanhbenduoi.Split(',');
                if (slist.Length <= 1)
                    v_module = "module = 'HR' and groupname = 'Personal'";
                else v_module = "module = 'HR'";

            }
            using (DpsConnection cnn_ldp = new DpsConnection("ConnectionStringLandingPage", true))
            {
                string sql = $@"select Id_row
                    from tbl_submenu 
                    where (AllowPermit IN ({sql_listRole}) or (AllowPermit is NULL and ({v_module})))
                    and hienthi=1  and ((Phanloai1 is null) 
                    or (Phanloai1=@Phanloai1)) 
                    and (((Phanloai2 is null) or (Phanloai2=@Phanloai2)) 
                    and ((CustemerID is null) or (CustemerID=@CustemerID))) order by position";

                DataTable dt = cnn_ldp.CreateDataTable(sql, cond);
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        list += ',' + dt.Rows[i][0].ToString();
                    }
                }
            }
            return list;
        }
    }

    public class Donxinphep
    {
        public Donxinphep()
        {
            _id_nv = 0;
            Tungay = new BuoiNghi();
            Ngayvaolam = new BuoiNghi();
            hinhthuc = 0;
            tenhinhthuc = "";
            Id_rq = 0;
            Id_group = 0;
            IsApproved = false;
            Nhanvien = new EDTO();
            Hinhthucditre = 0;
            Sophut = 0;
            nguoibangiaocongviec = "";
            nguoilienhe = "";
            dienthoainguoilienhe = "";
            Colydochinhdang = false;
            IsCongTac = false;
        }
        private int _id_nv;
        public int Id_nv
        {
            get
            {
                return _id_nv;
            }
            set
            {
                _id_nv = value;
                EDTO result = new EDTO();
                if (_id_nv > 0)
                {
                    Employee bemp = new Employee(_id_nv.ToString());
                    result = bemp.GetById();
                }
                Nhanvien = result;
            }
        }
        public EDTO Nhanvien;
        public BuoiNghi Tungay;
        public BuoiNghi Ngayvaolam;
        public BuoiNghi Denhetngay;
        /// <summary>
        /// Loại nghỉ phép: phép năm, nghỉ không lương,...
        /// </summary>
        public int hinhthuc;
        /// <summary>
        /// Tên loại nghỉ phép
        /// </summary>
        public string tenhinhthuc;
        public int Id_rq;
        public int Id_group;//Id Quy trình duyệt
        public bool IsApproved;
        public double Songay;
        public int Nguoinhap;
        public DateTime Ngaynhap;
        public string ghichu;
        /// <summary>
        /// 1: Vào trễ, 2: Về sớm
        /// </summary>
        public int Hinhthucditre;
        /// <summary>
        /// Số phút đi trễ/về sớm. Áp dụng đối với đơn xin vào trễ, ra sớm
        /// </summary>
        public int Sophut;
        public string nguoilienhe;
        public string dienthoainguoilienhe;
        public string nguoibangiaocongviec;
        public DateTime Tungaygio;
        public DateTime Denngaygio;
        public bool Colydochinhdang;
        public bool IsCongTac;
        public string ChucVuNguoiGui;
        public string LoaiHinhKhachHang;
        public bool IsNghiDiDuLich;
        public string DiaDiem;
        public bool IsPhepNam;
    }

    /// <summary>
    /// Đối tượng từng quy trình thực tế
    /// </summary>
    public class Process
    {
        public string error_message;
        Exception _lasterror;
        public Exception LastError
        {
            get
            {
                return _lasterror;
            }
        }
        public Process()
        { }
        public void GetEmpList(object objectid, object objecttype, List<string> listnv, DpsConnection cnn)
        {
            SqlConditions conds = new SqlConditions();
            conds.Add("ID", objectid);
            DataTable tmp = new DataTable();
            switch (objecttype.ToString())
            {
                case "1":
                    {
                        tmp = cnn.CreateDataTable(@"select id_nv from tbl_nhanvien join tbl_cocautochuc on cocauid = tbl_cocautochuc.rowid 
                            where tbl_nhanvien.disable=0 and thoiviec=0 and tbl_cocautochuc.disable=0 and tbl_cocautochuc.rowid=@ID", conds);
                        foreach (DataRow r_tmp in tmp.Rows)
                        {
                            if (!listnv.Contains(r_tmp[0].ToString())) listnv.Add(r_tmp[0].ToString());
                        }
                    }
                    break;
                case "2":
                    {
                        tmp = cnn.CreateDataTable(@"select id_nv from tbl_nhanvien join tbl_chucdanh on tbl_nhanvien.id_chucdanh = tbl_chucdanh.id_row
                            where tbl_nhanvien.disable=0 and thoiviec=0 and tbl_chucdanh.disable=0 and tbl_chucdanh.id_row=@ID", conds);
                        foreach (DataRow r_tmp in tmp.Rows)
                        {
                            if (!listnv.Contains(r_tmp[0].ToString())) listnv.Add(r_tmp[0].ToString());
                        }
                    }
                    break;
                default:
                    {
                        tmp = cnn.CreateDataTable(@"select id_nv from tbl_nhanvien
                        where tbl_nhanvien.disable=0 and thoiviec=0 and id_nv=@ID", conds);
                        foreach (DataRow r_tmp in tmp.Rows)
                        {
                            if (!listnv.Contains(r_tmp[0].ToString())) listnv.Add(r_tmp[0].ToString());
                        }
                    }
                    break;
            }
        }
    }
}
