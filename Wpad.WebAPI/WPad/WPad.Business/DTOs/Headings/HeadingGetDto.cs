using System;
using System.Collections.Generic;
using WPad.Core.Entities;

namespace WPad.Business.DTOs.Headings
{
    public class HeadingGetDto
    {
        //public List<Heading> Headings { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int? ViewCount { get; set; }
        public int? LikeCount { get; set; }
        public DateTime CreatedDate { get; set; }

        public int ChannelId { get; set; }
        public Channel Channel { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public List<Image> Images { get; set; }
        public List<Like> Likes { get; set; }
        //public List<Comment> Comments { get; set; }

        //public Image AppUserImage { get; set; }
    }
}
