using System.Collections.Generic;
using WPad.Core.Base;

namespace WPad.Core.Entities
{
    public class Heading : BaseEntity, IEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int? ViewCount { get; set; }
        public int? LikeCount { get; set; }

        public int ChannelId { get; set; }
        public Channel Channel { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public List<Image> Images { get; set; }
        //public List<Comment> Comments { get; set; }
        public List<Like> Likes { get; set; }
    }
}
