using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class thongbao
    {

        public int id_thongbao { get; set; }
        public string title { get; set; }
        public int id_bd { get; set; }
        public int id_cmt { get; set; }

        public int create_tb_by { get; set; }
        public DateTime timetb { get; set; }
    }
}