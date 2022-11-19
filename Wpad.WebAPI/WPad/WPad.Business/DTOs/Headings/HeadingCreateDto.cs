using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPad.Business.DTOs.Headings
{
    public class HeadingCreateDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int ChannelId { get; set; }
        public string AppUserId { get; set; }
    }
}
