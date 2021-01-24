using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class Like
    {
        public int ID_Like { get; set; } = 0;
        public string title { get; set; }
        public string link_icon { get; set; }
        public bool Disabled_icon { get; set; }

        //public int id_group { get; set; } = 0;


    }
}