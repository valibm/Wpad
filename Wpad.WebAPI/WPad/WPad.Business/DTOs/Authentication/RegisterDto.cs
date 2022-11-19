using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPad.Business.DTOs.Authentication
{
    public class RegisterDto
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
