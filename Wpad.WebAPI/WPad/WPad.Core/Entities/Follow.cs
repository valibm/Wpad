using WPad.Core.Base;

namespace WPad.Core.Entities
{
    public class Follow : IEntity
    {
        //public int Id { get; set; }
        //public string AppUserId { get; set; }
        //public AppUser AppUser { get; set; }
        //public string FolloweeId { get; set; }
        //public AppUser Followee { get; set; }
        public string FollowerId { get; set; }
        public AppUser Follower { get; set; }
        public string FolloweeId { get; set; }
        public AppUser Followee { get; set; }
    }
}
