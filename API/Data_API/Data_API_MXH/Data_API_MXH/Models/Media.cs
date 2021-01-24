using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class Media
    {
        public int ID_media{ get; set; } = 0;
        public int createdby { get; set; }
        public string base64 { get; set; }
        public string hinhanh { get; set; }
        
        public string title { get; set; }
        public string template { get; set; }

        public DateTime createdate { get; set; }


    }
}