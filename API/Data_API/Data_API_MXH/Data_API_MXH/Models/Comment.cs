using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class Comment
    {

        public int id_cmt { get; set; }
        public int ID_BaiDang { get; set; }

  
        public string NoiDung_cmt { get; set; }

        public int id_cmt_parent { get; set; } = 0;

        public string typepost { get; set; } = null;
        public DateTime CreatedDate { get; set; }
        public int CreatedBy{ get; set; }
        public DateTime UpdatedDate{ get; set; }
        public int UpdatedBy { get; set; } = 0;
    }
}