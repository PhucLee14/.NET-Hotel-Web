using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotelManagement.Services.Email.Models
{
    public class ResetPasswordModel
    {
        public string SiteUrl { get; set; }
        public string Firstname { get; set; }
        public string Token { get; set; }
    }
}