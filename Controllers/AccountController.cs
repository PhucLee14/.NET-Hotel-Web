using System;
using System.Linq;
using System.Runtime.Remoting.Lifetime;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HotelManagement.Models;
using HotelManagement.Services.Email.Models;
using HotelManagement.Utils.JWT;
using HotelManagement;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Data.Entity.Infrastructure;
using System.Reflection;

namespace HotelManagement.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private HotelManagement.Services.Email.EmailService _emailService;
        private JwtUtil _jwtUtil;

        public AccountController()
        {
            _emailService = new HotelManagement.Services.Email.EmailService();
            _jwtUtil = new JwtUtil();
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            //ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(TaiKhoanKH user)
        {
            var tenTaiKhoan = user.TenTaiKhoan;
            var matKhau = user.MatKhau;
            var query = db.TaiKhoanKHs.SingleOrDefault(m => m.TenTaiKhoan == user.TenTaiKhoan && m.MatKhau == user.MatKhau);
            if (query != null)
            {
                Session["User"] = query;
                Session["MaKH"] = query.MaKhachHang;
                return RedirectToAction("Index", "Home");
            }
            else
            {
                Response.Write("<script>alert('Invalid Credentials')</script>");
                return View();
            }
        }


        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Register([Bind(Include = "MaKhachHang,SoDienThoai,TenKhachHang,NgaySinh")] KhachHang khachHang, [Bind(Include = "TenTaiKhoan,MatKhau,ConfirmPassword")] TaiKhoanKH user)
        {
            // Check if the username already exists in TaiKhoanKH
            if (db.TaiKhoanKHs.Any(x => x.TenTaiKhoan == user.TenTaiKhoan))
            {
                ModelState.AddModelError("TenTaiKhoan", "Username already exists");
            }

            // Check if the phone number already exists in KhachHang
            var existingCustomerPhone = db.KhachHangs.FirstOrDefault(k => k.SoDienThoai == khachHang.SoDienThoai);

            if (existingCustomerPhone != null)
            {
                ModelState.AddModelError("SoDienThoai", "Số điện thoại đã đăng ký.");
            }

            if (ModelState.IsValid)
            {
                db.KhachHangs.Add(khachHang);

                user.MaKhachHang = khachHang.MaKhachHang;
                db.TaiKhoanKHs.Add(user);
                db.SaveChanges();

                ViewBag.SuccessMessage = "Saved Successfully";
                return RedirectToAction("Login", new TaiKhoanKH());
            }

            return View(khachHang);
        }

        [AllowAnonymous]
        public ActionResult AddGuestInfo()
        {
            return View();
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            // validate model
            if (!ModelState.IsValid)
                return View();

            // kiem tra user & ten user
            //var user = await UserManager.FindByNameAsync(model.Email);
            //if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
            //{
            //    // trả về view lỗi (không toonftaij user)
            //    return View("ForgotPasswordConfirmation");
            //}

            // tao token
            string tokenExpired = "50m";
            var token = _jwtUtil.GenerateToken(new Claim[] { new Claim("email", model.Email) }, tokenExpired);
            token = token.Replace(".", "@");



            // tao emailMessage
            var emailMessagel = new EmailMessage
            {
                To = model.Email,
                Subject = "Forgot password",
                TemplateName = "ResetPassword",
                Model = new ResetPasswordModel
                {
                    Firstname = "Nguyen van teo",
                    SiteUrl = "https://localhost:44326",
                    Token = token
                }
            };

            // gui email
            await _emailService.SendEmailAsync(emailMessagel);



            // If we got this far, something failed, redisplay form
            return View(model);

        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string token)
        {
            // edit token
            token = token.Replace("@", ".");

            try
            {
                // validate token
                var claims = _jwtUtil.ValidateToken(token);

                // return view nhu bth
                return View();

            }
            catch (Exception e)
            {
                // return view lỗi
                return View();

            }
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(string token, ResetPasswordViewModel model)
        {
            // edit token
            token = token.Replace("@", ".");

            try
            {

                // validate token
                var claims = _jwtUtil.ValidateToken(token);
                string email = claims?.Find(c => c.Type == "email")?.Value;


                if (!ModelState.IsValid)
                {
                    return View(model);
                }

                // tìm user trong db
                var user = await UserManager.FindByNameAsync(email);

                if (user == null)
                {
                    // return view loi
                    return RedirectToAction("ResetPasswordConfirmation", "Account");
                }

                // doi pass trong db
                var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);

                if (result.Succeeded)
                {
                    return RedirectToAction("ResetPasswordConfirmation", "Account");
                }
                AddErrors(result);

                return View();

            }
            catch (Exception e)
            {
                // return view lỗi
                return View();

            }
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [AllowAnonymous]
        public ActionResult LogOff()
        {
            // Xóa thông tin đăng nhập khỏi Session hoặc bất kỳ nơi nào bạn lưu trữ thông tin đăng nhập
            Session["User"] = null;

            // Chuyển hướng đến trang Index của Home
            return RedirectToAction("Index", "Home");
        }


        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}