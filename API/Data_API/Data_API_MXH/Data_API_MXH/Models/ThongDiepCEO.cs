using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class ThongDiepCEO
    {
        public int id_thongdiep { get; set; }
        public string title { get; set; }
        public string noidung { get; set; }
        public int create_by { get; set; }
        public DateTime createdate { get; set; }
    }
}