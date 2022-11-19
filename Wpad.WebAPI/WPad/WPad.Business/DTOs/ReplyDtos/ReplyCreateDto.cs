using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPad.Business.DTOs.ReplyDtos
{
    public class ReplyCreateDto
    {
        public string Content { get; set; }
        public int CommentId { get; set; }
        public string AppUserId { get; set; }
    }
}
