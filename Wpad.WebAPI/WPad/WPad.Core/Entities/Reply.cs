using WPad.Core.Base;

namespace WPad.Core.Entities
{
    public class Reply : BaseEntity, IEntity
    {
        public string Content { get; set; }

        public int CommentId { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
