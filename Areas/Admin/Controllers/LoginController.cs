using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HotelManagement.Areas.Admin.Controllers
{
    public class LoginController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        [HttpGet]
        [Route("Login")]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string username, string password)
        {
            // check database
            TaiKhoanNV taiKhoanNV = db.TaiKhoanNVs.FirstOrDefault(t => t.TenTaiKhoan == username && t.MatKhau == password);
            if (taiKhoanNV != null)
            {
                //Session["user"] = login.HoTenNV +" ("+ login.ChucVu+")";
                Session["HoTenNV"] = taiKhoanNV.NhanVien.TenNhanVien;
                Session["Quyen"] = taiKhoanNV.Quyen;
                Session["MaNV"] = taiKhoanNV.MaNhanVien;

                return RedirectToAction("Index", "Home");
            }
            else
            {
                TempData["error"] = "Tài khoản hoặc mật khẩu không chính xác!";
                return View();
            }
        }

        [Route("Logout")]
        public ActionResult Logout()
        {
            return View("Login");
        }
    }
}