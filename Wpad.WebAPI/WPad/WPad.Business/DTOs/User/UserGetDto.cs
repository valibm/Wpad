using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Entities;

namespace WPad.Business.DTOs.User
{
    public class UserGetDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Gender { get; set; }
        public string Bio { get; set; }
        public string Location { get; set; }
        public bool? ShowName { get; set; }
        public DateTime Birthday { get; set; }
        public string FacebookLink { get; set; }
        public string TwitterLink { get; set; }
        public string InstagramLink { get; set; }
        public DateTime? RegisterDate { get; set; }
        public List<Image> Images { get; set; }
        public List<Follow> Followers { get; set; }
        public List<Follow> Followees { get; set; }
    }
}
