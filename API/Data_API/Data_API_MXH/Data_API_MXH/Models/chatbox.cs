using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class chatbox
    {
       
        public int idchat { get; set; } = 0;
        public string message { get; set; }
        public string type { get; set; }
        public DateTime Create_date { get; set; }
        public int userid_nhan { get; set; }
        public int userid_send { get; set; } = 0;
        public int disable { get; set; } = 0;

    }
}