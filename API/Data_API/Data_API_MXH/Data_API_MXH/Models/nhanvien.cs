using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class nhanvien
    {
        
        public int id_nv { get; set; } = 0;
     
        public string diachi { get; set; }
        public string sdt { get; set; }
      
        public string gioitinh { get; set; } = null;
        public string  ngaysinh { get; set; }
       
    }
}