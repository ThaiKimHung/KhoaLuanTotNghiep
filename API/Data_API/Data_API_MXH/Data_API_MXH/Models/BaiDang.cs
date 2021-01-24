using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data_API_MXH.Models
{
    public class BaiDang
    {
      
        public int ID_BaiDang { get; set; } = 0;
        public int Id_LoaiBaiDang { get; set; }
        public string title { get; set; }
        public string NoiDung { get; set; }
        public int Id_Group { get; set; } = 0;
      
        public int id_khenthuong{ get; set; } =0;


        public string typepost { get; set; } = null;
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdateDate { get; set; }
        public int UpdateBy { get; set; }

    }
}