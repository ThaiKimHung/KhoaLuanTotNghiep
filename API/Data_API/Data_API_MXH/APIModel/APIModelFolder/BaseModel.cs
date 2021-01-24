//using API_KD.Assets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIModel
{
    public class BaseModel<T>
    {
        /// <summary>
        /// Khởi tạo nhanh
        /// //code
        //0: không thành công
        //7: phiên đăng nhập hết hạn
        //8: không có quyền
        //9: lỗi khác
        /// </summary>
        /// <param name="loai">1: không có quyền, 2 lỗi lấy dữ liệu;</param>
        //public BaseModel(StateCode code)
        //{
        //    switch (code)
        //    {
        //        case StateCode.NoPermit:
        //            status = 0;
        //            error = new ErrorModel() { message = "Không có quyền truy cập", code = "8" };
        //            break;
        //        case StateCode.CannotGetData:
        //            status = 0;
        //            error = new ErrorModel() { message = "Lấy dữ liệu thất bại", code = "0" };
        //            break;
        //    }
        //}
        public BaseModel()
        {
            error = new ErrorModel();
        }
        //khởi tạo nhanh trả về lỗi
        public BaseModel(string errorMessage)
        {
            status = 0;
            error = new ErrorModel() { message = errorMessage, code = "9" };
        }

        public int status { get; set; }
        public T data { get; set; }
        public PageModel page { get; set; }
        public ErrorModel error { get; set; }
        public bool Visible { get; set; }
    }


    public class ErrorModel
    {
        public string message { get; set; }
        public string code { get; set; }
        public string LastError { get; set; }
    }
    public class ResultModel
    {
        public int status { get; set; }
        public object data { get; set; }
        public ErrorModel error { get; set; }
    }

    public class PageModel
    {
        public int Page { get; set; } = 1;
        public int AllPage { get; set; } = 0;
        public int Size { get; set; } = 10;
        public int TotalCount { get; set; } = 0;
    }
    public class ErrorModelBTSC : ErrorModel
    {
        public string devmessage { get; set; } = "";
        public int status { get; set; } = 1;
    }

    public class CusErrorModel<T>
    {
        public string message { get; set; }
        public string code { get; set; }
        /// <summary>
        /// Thông báo lỗi code cho dev không cần debug
        /// </summary>
        public string devmessage { get; set; }
        public int status { get; set; } = 0;///bao loi
        public T data { get; set; }

    }

}