using WPad.Core.Base;

namespace WPad.Core.Entities
{
    public class Channel : BaseEntity, IEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int ImageId { get; set; }
        public Image Image { get; set; }
    }
}
