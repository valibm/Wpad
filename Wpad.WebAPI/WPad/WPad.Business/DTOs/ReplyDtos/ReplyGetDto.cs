using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Entities;

namespace WPad.Business.DTOs.ReplyDtos
{
    public class ReplyGetDto
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string Content { get; set; }
        public int CommentId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
