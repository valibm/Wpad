using WPad.Core.Base;

namespace WPad.Core.Entities
{
    public class Like : IEntity
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int HeadingId { get; set; }
        //public Heading Heading { get; set; }
    }
}
