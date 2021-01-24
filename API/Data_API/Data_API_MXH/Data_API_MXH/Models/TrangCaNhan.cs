using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class TrangCaNhan
    {
        public int id_canhan { get; set; } = 0;
        public int id_user { get; set; }
        public string anhbia { get; set; }
        public string tieusu { get; set; }
    }
}