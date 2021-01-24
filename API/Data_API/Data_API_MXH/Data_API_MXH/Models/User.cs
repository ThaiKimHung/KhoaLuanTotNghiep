using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class User
    {
    
        public int id_user { get; set; }
        public int IDNV { get; set; }
        
        public string email { get; set; }
        public string username { get; set; }
        public string pass { get; set; }
        public bool TinhTrang { get; set; }

    }
}