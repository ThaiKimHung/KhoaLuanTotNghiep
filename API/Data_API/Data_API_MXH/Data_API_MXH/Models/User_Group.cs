using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class User_Group
    {

        public int Id_Group { get; set; } = 0;
        public int id_user { get; set; }
        public bool quyen_group { get; set; }
        public DateTime CreateDate { get; set; }
       

    }
}