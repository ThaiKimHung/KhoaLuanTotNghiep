using APIModel.Controller;
using DpsLibs.Data;
using System;
using System.Collections;
using System.Data;
using System.Globalization;
using System.Text;

namespace APIModel.BLayer
{
    enum PasswordScore
    {
        Blank = 0,
        VeryWeak = 1,
        Weak = 2,
        Medium = 3,
        Strong = 4,
        VeryStrong = 5
    }
    public class General
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
        public General()
        {

        }
        #region Nhân Viên
        /// <summary>
        /// Lấy danh sách các cơ cấu tổ chức nhân viên có quyền truy xuất
        /// </summary>
        /// <param name="id_nv">Nhân viên</param>
        public static string GetListStructureByNhanvien(string id_nv)
        {
            string list = "0";
            using (DpsConnection cnn = new DpsConnection())
            {
                string custemerid = GetCustemerID(id_nv, cnn).ToString();
                SqlConditions cond = new SqlConditions();
                cond.Add("id_nv", id_nv);
                DataTable dt = cnn.CreateDataTable("select cocauid from P_Phanquyenphamvi where (where)", "(where)", cond);
                cnn.Disconnect();
                foreach (DataRow r in dt.Rows)
                {
                    list += "," + r[0];
                    list += GetListStructureByParent(r["cocauid"].ToString(), custemerid, cnn, false);
                }
            }
            return list;
        }
        public static string GetListStructureByParent(string parentid, string custemerid, DpsConnection cnn, bool IsBaoGomDL)
        {
            string list = "";
            SqlConditions cond = new SqlConditions();
            cond.Add("parentid", parentid);
            cond.Add("tbl_cocautochuc.disable", 0);
            cond.Add("tbl_cocautochuc.custemerid", custemerid);
            string select = "select tbl_cocautochuc.rowid from tbl_cocautochuc where (where)";
            //if (!IsBaoGomDL)
            //    select = "select tbl_cocautochuc.rowid from tbl_cocautochuc left join dm_loaihinhdonvi on loaidonvi = dm_loaihinhdonvi.rowid where (ladonvidoclap is NULL or ladonvidoclap =0) and (where)";
            //DataTable dt = cnn.CreateDataTable($"select tbl_cocautochuc.rowid from tbl_cocautochuc left join dm_loaihinhdonvi on loaidonvi = dm_loaihinhdonvi.rowid where {(IsBaoGomDL ? "" : "(ladonvidoclap is NULL or ladonvidoclap =0) and")} (where)", "(where)", cond);
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            foreach (DataRow r in dt.Rows)
            {
                list += "," + r[0];
                list += GetListStructureByParent(r["rowid"].ToString(), custemerid, cnn, IsBaoGomDL);
            }
            //if (list.Equals("")) list = "," + parentid;
            return list;
        }
        /// <summary>
        /// Lấy danh sách các cơ cấu tổ chức nhân viên có quyền truy xuất
        /// </summary>
        /// <param name="id_nv">Nhân viên</param>
        /// <param name="cocauid">Nhân viên</param>
        public static string GetListStructureByNhanvien(string id_nv, string cocauid)
        {
            DataTable dt = new DataTable();
            string list = "0";
            using (DpsConnection cnn = new DpsConnection())
            {
                string CustemerID = GetCustemerID(id_nv, cnn).ToString();
                SqlConditions cond = new SqlConditions();
                if (cocauid == GetQuyenCoCauIDTheoNhanVien(long.Parse(id_nv.ToString()), cnn))
                {
                    list += "," + cocauid;
                    cond.Add("id_nv", id_nv);
                    dt = cnn.CreateDataTable("select cocauid from P_Phanquyenphamvi where (where)", "(where)", cond);
                    cnn.Disconnect();
                    foreach (DataRow r in dt.Rows)
                    {
                        list += "," + r[0];
                        list += GetListStructureByParent(r["cocauid"].ToString(), CustemerID, cnn, false);
                    }
                }
                else
                {
                    cnn.ClearError();
                    cond.Add("rowid", cocauid);
                    cond.Add("disable", 0);
                    dt = cnn.CreateDataTable("select rowid from tbl_cocautochuc where (where)", "(where)", cond);
                    foreach (DataRow r in dt.Rows)
                    {
                        list += "," + r[0];
                        list += GetListStructureByParent(r["rowid"].ToString(), CustemerID, cnn, false);
                    }
                }
            }
            return list;
        }
        public static string GetQuyenCoCauIDTheoNhanVien(long id_nv, DpsConnection cnn)
        {
            string id = "0";
            DataTable dt = cnn.CreateDataTable($@"select top 1 cocauid from P_Phanquyendonvi join DM_Donvisudung on rowid = donviid 
                        where startdate <= getdate() and (expiredate is NULL or expiredate >= getdate()) and id_nv = {id_nv}");
            if (dt.Rows.Count > 0)
            {
                id = dt.Rows[0][0].ToString();
            }
            return id;
        }
        #endregion
        public static bool ChuyenNgay(out DateTime kq, string ngay_ddMMyyy, bool isUTC = false)
        {
            string[] formats = new string[] { "dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy HH:mm", "dd/MM/yyyy HH", "dd/MM/yyyy", "yyyy-MM-dd'T'HH:mm:ss'.'fff'Z'", "O", "yyyy-MM-dd'T'HH:mm:ssZ", "yyyy-MM-dd'T'HH:mm:ss", "d/MM/yyyy", "d/M/yyyy", "dd/M/yyyy", "yyyy", "HH:mm", "MM/yyyy", "HH:mm:ss", "M/d/yyyy h:mm:ss tt" };
            kq = new DateTime();

            if (isUTC)
            {
                return DateTime.TryParseExact(ngay_ddMMyyy, formats, null, DateTimeStyles.AssumeUniversal, out kq);
            }
            else
                return DateTime.TryParseExact(ngay_ddMMyyy, formats, null, DateTimeStyles.None, out kq);
        }

        public static string ExportToExcel(DataTable source, string title, string[] header, string[] columnwidth, string rowheight, string headerheight, Hashtable format)
        {
            bool ismergeRow = false;
            StringBuilder result = new StringBuilder();
            string border = @"<Borders>
        <Border ss:Position=""Bottom"" ss:LineStyle=""Continuous"" ss:Weight=""1""/>
        <Border ss:Position=""Left"" ss:LineStyle=""Continuous"" ss:Weight=""1""/>
        <Border ss:Position=""Right"" ss:LineStyle=""Continuous"" ss:Weight=""1""/>
        <Border ss:Position=""Top"" ss:LineStyle=""Continuous"" ss:Weight=""1""/>
      </Borders>";
            string numberformat = @"<NumberFormat ss:Format=""_(* #,##0.00_);_(* \(#,##0.00\);_(* &quot;-&quot;??_);_(@_)""/>";
            string startExcelXML = @"<xml version><Workbook 
                          xmlns=""urn:schemas-microsoft-com:office:spreadsheet""
                           xmlns:o=""urn:schemas-microsoft-com:office:office"" 
                          xmlns:x=""urn:schemas-    microsoft-com:office:
                          excel"" xmlns:ss=""urn:schemas-microsoft-com:
                          office:spreadsheet"">
                          <Styles>
                           <Style ss:ID=""Default"" ss:Name=""Normal""> <Alignment ss:Vertical=""Center"" ss:WrapText=""1""/><Font/> <Interior/> <NumberFormat/> <Protection/> </Style>
                           <Style ss:ID=""BoldColumn""><Alignment ss:WrapText=""1""/>  {0} <Font x:Family=""Swiss"" ss:Bold=""1""/> </Style>
                           <Style ss:ID=""StringLiteral""><Alignment ss:WrapText=""1""/>  {0} <NumberFormat ss:Format=""@""/> </Style>
                           <Style ss:ID=""Decimal""><Alignment ss:WrapText=""1""/>  {0} {1} </Style>
                           <Style ss:ID=""Integer""><Alignment ss:WrapText=""1""/>  {0} <NumberFormat ss:Format=""#,##0""/> </Style>
                           <Style ss:ID=""DateLiteral""><Alignment ss:WrapText=""1""/>  {0} <NumberFormat ss:Format=""dd/mm/yyyy;@""/> </Style>
                           <Style ss:ID=""TimeLiteral""> <Alignment ss:WrapText=""1""/>  {0} <NumberFormat ss:Format=""HH:mm;@""/> </Style>
                           <Style ss:ID=""defaultrow""> <Alignment ss:Vertical=""Center"" ss:WrapText=""1""/></Style>
                           <Style ss:ID=""centercolumn""> <Alignment ss:Horizontal=""Center"" ss:Vertical=""Center"" ss:WrapText=""1""/> {0} </Style>
                           <Style ss:ID=""titlecolumn""> <Alignment ss:Horizontal=""Center"" ss:Vertical=""Center"" ss:WrapText=""1""/>  {0} <Font ss:FontName=""Arial"" x:Family=""Swiss"" ss:Size=""16"" ss:Bold=""1""/> </Style>
                           <Style ss:ID=""header""><Alignment ss:Horizontal=""Center"" ss:Vertical=""Center"" ss:WrapText=""1""/> {0} <Font ss:FontName=""Arial"" x:Family=""Swiss"" ss:Color=""#FFFFFF"" ss:Bold=""1""/> <Interior ss:Color=""#8DB4E3"" ss:Pattern=""Solid""/> </Style>
                           <Style ss:ID=""mergerow""><Alignment ss:Horizontal=""Left"" ss:Vertical=""Center"" ss:WrapText=""1""/> {0} <Font ss:FontName=""Arial"" x:Family=""Swiss"" ss:Bold=""1""/> <Interior ss:Color=""#D6DCE4"" ss:Pattern=""Solid""/> </Style>
                          </Styles> ";
            startExcelXML = string.Format(startExcelXML, border, numberformat);
            const string endExcelXML = "</Workbook>";
            string ten = "";
            result.Append(startExcelXML);
            int i = 1;
            if (source.Rows.Count > 0)
            {
                int socot = header.Length;
                if (socot > source.Columns.Count) socot = source.Columns.Count;

                ten = source.Rows[0][0].ToString();
                result.Append("<Worksheet ss:Name=\"Danhsach\">");
                result.Append("<Table x:FullColumns=\"1\" x:FullRows=\"1\">");
                result.Append("<Column ss:Width=\"25\"/>");
                for (int j = 0; j < columnwidth.Length; j++)
                {
                    result.Append("<Column ss:Width=\"" + columnwidth[j] + "\"/>");
                }
                result.Append("<Row>");

                result.Append("<Cell ss:MergeAcross=\"" + socot.ToString() + "\" ss:StyleID=\"titlecolumn\"><Data ss:Type=\"String\">");
                result.Append(title);
                result.Append("</Data></Cell>");
                result.Append("</Row>");
                result.Append("<Row  ss:Height=\"" + headerheight + "\">");

                result.Append("<Cell ss:StyleID=\"header\"><Data ss:Type=\"String\">STT</Data></Cell>");
                for (int x = 0; x < header.Length; x++)
                {
                    result.Append("<Cell ss:StyleID=\"header\"><Data ss:Type=\"String\">");
                    result.Append(header[x]);
                    result.Append("</Data></Cell>");
                }
                result.Append("</Row>");
                string template = "";
                IFormatProvider fm = new CultureInfo("en-US", true);
                //Kiểm tra cột merge_row có tồn tại
                DataColumnCollection columns = source.Columns;
                if (columns.Contains("merge_row")) ismergeRow = true;
                foreach (DataRow x in source.Rows)
                {
                    bool mergeRow = false;
                    if (ismergeRow)
                    {
                        if (x["merge_row"] != DBNull.Value)
                            mergeRow = x["merge_row"].Equals(bool.TrueString);
                    }
                    if (mergeRow)
                    {
                        result.Append("<Row ss:AutoFitHeight=\"0\" ss:Height=\"" + rowheight + "\" ss:StyleID=\"defaultrow\">");
                        result.Append("<Cell  ss:MergeAcross=\"" + socot.ToString() + "\" ss:StyleID=\"mergerow\">" +
                              "<Data ss:Type=\"String\">");
                        string XMLstring = x["merge_title"].ToString();
                        result.Append(XMLstring);
                        result.Append("</Data></Cell>");
                        result.Append("</Row>");
                    }
                    else
                    {
                        result.Append("<Row ss:AutoFitHeight=\"0\" ss:Height=\"" + rowheight + "\" ss:StyleID=\"defaultrow\">");
                        result.Append("<Cell ss:StyleID=\"centercolumn\"><Data ss:Type=\"Number\">");
                        result.Append(i.ToString());
                        result.Append("</Data></Cell>");
                        i++;
                        for (int y = 0; y < socot; y++)
                        {
                            System.Type rowType;
                            rowType = x[y].GetType();
                            switch (rowType.ToString())
                            {
                                case "System.String":
                                    string XMLstring = x[y].ToString();
                                    XMLstring = XMLstring.Trim();
                                    XMLstring = XMLstring.Replace("&", "&");
                                    XMLstring = XMLstring.Replace(">", ">");
                                    XMLstring = XMLstring.Replace("<", "<");
                                    result.Append("<Cell ss:StyleID=\"StringLiteral\">" +
                                          "<Data ss:Type=\"String\">");
                                    result.Append(XMLstring);
                                    result.Append("</Data></Cell>");
                                    break;
                                case "System.DateTime":
                                    if (x[y] == DBNull.Value)
                                        break;
                                    DateTime XMLDate = (DateTime)x[y];
                                    string XMLDatetoString = ""; //Excel Converted Date
                                    XMLDatetoString = XMLDate.Year.ToString() +
                                          "-" +
                                          (XMLDate.Month < 10 ? "0" +
                                          XMLDate.Month.ToString() : XMLDate.Month.ToString()) +
                                          "-" +
                                          (XMLDate.Day < 10 ? "0" +
                                          XMLDate.Day.ToString() : XMLDate.Day.ToString()) +
                                          "T" +
                                          (XMLDate.Hour < 10 ? "0" +
                                          XMLDate.Hour.ToString() : XMLDate.Hour.ToString()) +
                                          ":" +
                                          (XMLDate.Minute < 10 ? "0" +
                                          XMLDate.Minute.ToString() : XMLDate.Minute.ToString()) +
                                          ":" +
                                          (XMLDate.Second < 10 ? "0" +
                                          XMLDate.Second.ToString() : XMLDate.Second.ToString()) + ".000";
                                    string f = "DateLiteral";
                                    if (format.Contains(y.ToString()))
                                        f = format[y.ToString()].ToString();
                                    result.Append("<Cell ss:StyleID=\"" + f + "\">" +
                                          "<Data ss:Type=\"DateTime\" >");
                                    result.Append(XMLDatetoString);
                                    result.Append("</Data></Cell>");
                                    break;
                                case "System.Boolean":
                                    result.Append("<Cell ss:StyleID=\"StringLiteral\">" +
                                          "<Data ss:Type=\"String\">");
                                    result.Append(x[y].ToString());
                                    result.Append("</Data></Cell>");
                                    break;
                                case "System.Int16":
                                case "System.Int32":
                                case "System.Int64":
                                case "System.Byte":
                                    result.Append("<Cell ss:StyleID=\"Integer\">" +
                                          "<Data ss:Type=\"Number\"  >");
                                    result.Append(x[y].ToString());
                                    result.Append("</Data></Cell>");
                                    break;
                                case "System.Single":
                                case "System.Decimal":
                                case "System.Double":
                                case "System.float":
                                    template = @"<Cell ss:StyleID=""Decimal""><Data ss:Type=""Number"">{0}</Data></Cell>";
                                    result.AppendFormat(fm, template, new object[] { x[y] });
                                    break;
                                case "System.DBNull":
                                    result.Append("<Cell ss:StyleID=\"StringLiteral\">" +
                                          "<Data ss:Type=\"String\">");
                                    result.Append("</Data></Cell>");
                                    break;
                                default:
                                    throw (new Exception(rowType.ToString() + " not handled."));
                            }
                        }
                        result.Append("</Row>");
                    }
                }
                result.Append("</Table>");
                result.Append(" </Worksheet>");
            }
            result.Append(endExcelXML);
            return result.ToString();
        }
        public static string TestGetDomain(DpsConnection cnn, string CustemerID)
        {
            string result = "";
            SqlConditions cond = new SqlConditions();
            cond.Add("id_row", 543);
            cond.Add("CustemerID", CustemerID);
            DataTable dt = cnn.CreateDataTable("select giatri, mota from tbl_thamso where (where)", "(where)", cond);
            if (dt.Rows.Count > 0)
                result = dt.Rows[0][0].ToString();
            return result;
        }


        public static string GetDomain(DpsConnection cnn, string CustemerID)
        {
            string result = "";
            SqlConditions cond = new SqlConditions();
            cond.Add("id_row", 543);
            cond.Add("CustemerID", CustemerID);
            DataTable dt = cnn.CreateDataTable("select giatri, mota from tbl_thamso where (where)", "(where)", cond);
            if (dt.Rows.Count > 0)
                result = dt.Rows[0][0].ToString();
            return result;
        }
        public static string GetThamSo(DpsConnection cnn, string CustemerID, int id)
        {
            string result = "";
            SqlConditions cond = new SqlConditions();
            cond.Add("id_row", id);
            cond.Add("CustemerID", CustemerID);
            DataTable dt = cnn.CreateDataTable("select giatri, mota from V_HR_Tbl_ThamSo where (where)", "(where)", cond);
            if (dt.Rows.Count > 0)
                result = dt.Rows[0][0].ToString();
            return result;
        }
        public static string GetFormatDate(DateTime tungay, DateTime denngay, string tugio, string dengio)
        {
            if (denngay.Date.Equals(DateTime.MinValue))
                return $"{GetDayOfWeek(tungay)} {(tungay.Year.Equals(DateTime.Now.Year) ? string.Format("{0:dd/MM}", tungay) : string.Format("{0:dd/MM/yyyy}", tungay))}";
            if (tungay.Date.Equals(denngay.Date))
                return $"{GetDayOfWeek(tungay)} {(tungay.Year.Equals(DateTime.Now.Year) ? string.Format("{0:dd/MM}", tungay) : string.Format("{0:dd/MM/yyyy}", tungay))} {tugio} - {dengio}";
            return $"{GetDayOfWeek(tungay)} {(tungay.Year.Equals(DateTime.Now.Year) ? string.Format("{0:dd/MM}", tungay) : string.Format("{0:dd/MM/yyyy}", tungay))} {tugio} - {GetDayOfWeek(denngay)} {(denngay.Year.Equals(DateTime.Now.Year) ? string.Format("{0:dd/MM}", denngay) : string.Format("{0:dd/MM/yyyy}", denngay))} { dengio}";
        }
        public static string GetDayOfWeek(DateTime date)
        {
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Friday: return "T6";
                case DayOfWeek.Monday: return "T2";
                case DayOfWeek.Saturday: return "T7";
                case DayOfWeek.Sunday: return "CN";
                case DayOfWeek.Thursday: return "T5";
                case DayOfWeek.Tuesday: return "T3";
                case DayOfWeek.Wednesday: return "T4";
            }
            return "";
        }
        /// <summary>
        /// Lấy domain theo appcode
        /// </summary>
        /// <param name="AppCode"></param>
        /// <returns></returns>
        public static string GetDomainByAppCode(string AppCode, DpsConnection cnn)
        {
            object domain = cnn.ExecuteScalar("select Domain from AppList where AppCode = @AppCode", new SqlConditions() { { "AppCode", AppCode } });
            if (domain != null)
                return domain.ToString();
            return string.Empty;
        }
        public static string GetDomainByAppCode(string AppCode)
        {
            using (DpsConnection cnn = new DpsConnection("ConnectionStringLandingPage", true))
            {
                return GetDomainByAppCode(AppCode, cnn);
            }
        }
        /// <summary>
        /// Lấy id khách hàng theo id_nv
        /// </summary>
        /// <param name="id_nv"></param>
        /// <returns></returns>
        public static string GetCustemerID(string id_nv)
        {
            using (DpsConnection cnn = new DpsConnection())
            {
                return GetCustemerID(id_nv, cnn);
            }
        }
        /// <summary>
        /// Lấy id khách hàng theo id_nv
        /// </summary>
        /// <param name="id_nv"></param>
        /// <param name="cnn"></param>
        /// <returns></returns>
        public static string GetCustemerID(string id_nv, DpsConnection cnn)
        {
            SqlConditions cond = new SqlConditions();
            cond.Add("id_nv", id_nv);
            string select = "select CustemerID from V_HR_Employee where (where)";
            DataTable dt = cnn.CreateDataTable(select, "(where)", cond);
            if (dt.Rows.Count <= 0) return string.Empty;
            return dt.Rows[0][0].ToString();
        }
        public static string GetThamSo(string CustemerID, int id)
        {
            using (DpsConnection cnn = new DpsConnection())
            {
                return GetThamSo(cnn, CustemerID, id);
            }
        }
        public static string getErrorMessageFromBackend(string ErrorCode, string LangCode = "vi", string _space = "")
        {
            string Mess = "";
            string code = ErrorCode;
            string space = _space;
            if (LangCode == "vi")
            {
                Mess = LocalizationUtility.GetBackendMessage(code, space, "vi");
                if (Mess == null)
                {
                    Mess = LocalizationUtility.GetBackendMessage("null", "", "vi");
                }
            }
            else
            {
                Mess = LocalizationUtility.GetBackendMessage(code, space, "en");
                if (Mess == null)
                {
                    Mess = LocalizationUtility.GetBackendMessage("null", "", "en");
                }
            }
            return Mess;
        }
        public static DateTime GetEndDateInMonth(int thang, int nam)
        {
            int songaycuathang = DateTime.DaysInMonth(nam, thang);
            IFormatProvider fm = new CultureInfo("en-US", true);
            string d = songaycuathang.ToString() + "/" + thang.ToString() + "/" + nam.ToString();
            DateTime result = new DateTime();
            DateTime.TryParseExact(d, "d/M/yyyy", fm, DateTimeStyles.NoCurrentDateDefault, out result);
            return result;
        }
        public static DateTime GetBeginDateInMonth(int thang, int nam)
        {
            IFormatProvider fm = new CultureInfo("en-US", true);
            string d = "1/" + thang.ToString() + "/" + nam.ToString();
            DateTime result = new DateTime();
            DateTime.TryParseExact(d, "d/M/yyyy", fm, DateTimeStyles.NoCurrentDateDefault, out result);
            return result;
        }
    }
   
}