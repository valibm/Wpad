using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPad.Business.DTOs.User
{
    public class CheckFollowDto
    {
        public string AppUserId { get; set; }
        public string FolloweeId { get; set; }
        public bool State { get; set; }
    }
}
