using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class LuotXem
    {
        public int id_luotxem { get; set; } = 0;
        public int id_thongdiep { get; set; }
        public int id_user { get; set; }
    }
}