using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication5.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Admin/Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Rooms()
        {
            return View();
        }
        public ActionResult RoomType()
        {
            return View();
        }
        public ActionResult Guest()
        {
            return View();
        }
        public ActionResult Staff()
        {
            return View();
        }
        public ActionResult Service()
        {
            return View();
        }
        public ActionResult Invoice()
        {
            return View();
        }
    }
}