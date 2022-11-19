using System;
using System.Collections.Generic;
using WPad.Core.Entities;

namespace WPad.Business.DTOs
{
    public class CommentGetDto
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string Content { get; set; }
        public AppUser AppUser { get; set; }
        public List<Reply> Replies { get; set; }
    }
}
