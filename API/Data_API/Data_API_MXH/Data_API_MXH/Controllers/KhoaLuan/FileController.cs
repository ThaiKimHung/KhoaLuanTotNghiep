
using System;

using System.Threading.Tasks;
using System.Web.Http;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Drawing;
using System.Web.Http.Cors;
using DpsLibs.Data;
using System.Collections;
using System.Data;
using APIModel.Classes;
using System.Threading;
using Newtonsoft.Json.Linq;

namespace Data_API_MXH.Controllers.KhoaLuan
{
    [RoutePrefix("api/KhoaLuan")]

    public class FileController : ApiController
    {
        // GET api/<controller>
        [Route("File_baidang")]
        [HttpPost]

        public async Task<object> File_baidang([FromBody] Models.ImageModel data)
        {

            DataTable lastid = new DataTable();
            DataRow[] dr;
            string Id = "";
            Hashtable val = new Hashtable();

            //!string.IsNullOrEmpty(data.image.ToString())
                //Data_API_MXH.Assets.Common.getDomain();
                if (data.image!=null)
                {
                    string base64 = data.image.ToString();
                    string filename = data.name;
                    int so = 0;


                    int baidang;


                    try
                    {
                        String path = HttpContext.Current.Server.MapPath($"~/UploadedFiles/"); //Path

                        //Check if directory exist
                        if (!System.IO.Directory.Exists(path))
                        {
                            System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                        }
                        while (File.Exists(path + filename))
                        {
                            string[] s = filename.Split('_');
                            if (s.Length >= 2)
                            {
                                if (int.TryParse(s[0], out so)) filename = (so + 1) + "_" + filename.Substring(so.ToString().Length + 1);
                                else filename = "1_" + data.name;
                            }
                            else filename = "1_" + data.name;
                        }

                        //set the image path
                        string imgPath = Path.Combine(path, filename);

                        byte[] imageBytes = Convert.FromBase64String(data.image.ToString());

                        File.WriteAllBytes(imgPath, imageBytes);

                        try
                        {
                            //Conds.Add("email", Email);
                            //Conds.Add("password", Pass);




                            using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                            {

                                SqlConditions Conds = new SqlConditions();
                                Thread.Sleep(500);
                                lastid = cnn.CreateDataTable(@"
                             SELECT Max(ID_BAIDANG) as asLastID FROM TBL_BAIDANG");
                                dr = lastid.Select();

                                Id = lastid.Rows[0]["asLastID"].ToString();

                                //foreach (DataRow r in dr[0].Table.Rows)
                                //{

                                //    Id = r["asLastID"].ToString();


                                //}
                                baidang = Int32.Parse(Id);
                                val.Add("TYPEPOST", filename);



                                Conds.Add("ID_BAIDANG", baidang);


                                if (cnn.Update(val, Conds, "TBL_BAIDANG") < 0)
                                {
                                    return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                                }
                            }

                            return JsonResultCommon.ThanhCong();
                        }
                        catch (Exception ex)
                        {
                            return JsonResultCommon.Exception(ex);
                        }


                    }
                    catch (Exception ex)
                    {
                        return JsonResultCommon.Exception(ex);
                    }

                }
                
               return JsonResultCommon.ThatBai("Cập nhật thất bại");



        }


        [Route("File_Updatebaidang")]
        [HttpPost]

        public async Task<object> File_Updatebaidang(int id_baidang,[FromBody] Models.ImageModel data)
        {

            DataTable lastid = new DataTable();
            DataRow[] dr;
            string Id = "";
            Hashtable val = new Hashtable();

            //!string.IsNullOrEmpty(data.image.ToString())
            //Data_API_MXH.Assets.Common.getDomain();
            if (data.image != null)
            {
                string base64 = data.image.ToString();
                string filename = data.name;
                int so = 0;



                try
                {
                    String path = HttpContext.Current.Server.MapPath($"~/UploadedFiles/"); //Path

                    //Check if directory exist
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                    }
                    while (File.Exists(path + filename))
                    {
                        string[] s = filename.Split('_');
                        if (s.Length >= 2)
                        {
                            if (int.TryParse(s[0], out so)) filename = (so + 1) + "_" + filename.Substring(so.ToString().Length + 1);
                            else filename = "1_" + data.name;
                        }
                        else filename = "1_" + data.name;
                    }

                    //set the image path
                    string imgPath = Path.Combine(path, filename);

                    byte[] imageBytes = Convert.FromBase64String(data.image.ToString());

                    File.WriteAllBytes(imgPath, imageBytes);

                    try
                    {
                        //Conds.Add("email", Email);
                        //Conds.Add("password", Pass);




                        using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                        {

                            SqlConditions Conds = new SqlConditions();
                          
                         
                            val.Add("TYPEPOST", filename);



                            Conds.Add("ID_BAIDANG", id_baidang);


                            if (cnn.Update(val, Conds, "TBL_BAIDANG") < 0)
                            {
                                return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                            }
                        }

                        return JsonResultCommon.ThanhCong();
                    }
                    catch (Exception ex)
                    {
                        return JsonResultCommon.Exception(ex);
                    }


                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }

            }

            return JsonResultCommon.ThatBai("Cập nhật thất bại");



        }



        /// <summary>
        /// Lưu giá trị trường động
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>




        [Route("AvatarUser")]
        [HttpPost]

        public async Task<object> AvatarUser(int id_user, [FromBody] Models.ImageModel data)
        {
            DataTable lastid = new DataTable();
            DataRow[] dr;
            string Id = "";
            Hashtable val = new Hashtable();

            //!string.IsNullOrEmpty(data.image.ToString())
            //Data_API_MXH.Assets.Common.getDomain();
            if (data.image != null)
            {
                string base64 = data.image.ToString();
                string filename = data.name;
                int so = 0;


                int baidang;


                try
                {
                    String path = HttpContext.Current.Server.MapPath($"~/Avatar/"); //Path

                    //Check if directory exist
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                    }
                    while (File.Exists(path + filename))
                    {
                        string[] s = filename.Split('_');
                        if (s.Length >= 2)
                        {
                            if (int.TryParse(s[0], out so)) filename = (so + 1) + "_" + filename.Substring(so.ToString().Length + 1);
                            else filename = "1_" + data.name;
                        }
                        else filename = "1_" + data.name;
                    }

                    //set the image path
                    string imgPath = Path.Combine(path, filename);

                    byte[] imageBytes = Convert.FromBase64String(data.image.ToString());

                    File.WriteAllBytes(imgPath, imageBytes);

                    try
                    {
                        //Conds.Add("email", Email);
                        //Conds.Add("password", Pass);




                        using (DpsConnection cnn = new DpsConnection("ConnectSQLMXH", true))
                        {

                            SqlConditions Conds = new SqlConditions();
                            Thread.Sleep(500);
                          
                            val.Add("AVATAR", filename);



                            Conds.Add("ID_USER", id_user);


                            if (cnn.Update(val, Conds, "TBL_USER") < 0)
                            {
                                return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                            }
                        }

                        return JsonResultCommon.ThanhCong();
                    }
                    catch (Exception ex)
                    {
                        return JsonResultCommon.Exception(ex);
                    }


                }
                catch (Exception ex)
                {
                    return JsonResultCommon.Exception(ex);
                }

            }

            return JsonResultCommon.ThatBai("Cập nhật thất bại");

        }
    }



}