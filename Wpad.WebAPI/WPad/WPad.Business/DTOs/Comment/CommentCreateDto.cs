using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPad.Business.DTOs
{
    public class CommentCreateDto
    {
        public string Content { get; set; }
        public int HeadingId { get; set; }
        public string AppUserId { get; set; }
    }
}
