using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication5.Areas.Registration.Controllers
{
    [RouteArea("Registration")]
    [Route("Login")]
    public class LoginController : Controller
    {
        // GET: Registration/Login
        [HttpGet]
        [Route("Login")]
        public ActionResult Login()
        {
            return View();
        }

        [Route("Logout")]
        public ActionResult Logout()
        {
            return View("Login");
        }

        [HttpGet]
        [Route("Signup")]

        public ActionResult Signup()
        {
            return View();
        }
    }
}