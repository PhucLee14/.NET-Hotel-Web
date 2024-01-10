using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotelManagement.Services.Email.Models
{
    public class EmailMessage
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public object Model { get; set; }
        public string TemplateName { get; set; }
    }
}