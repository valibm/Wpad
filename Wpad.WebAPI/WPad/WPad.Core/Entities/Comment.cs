using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Base;

namespace WPad.Core.Entities
{
    public class Comment : BaseEntity, IEntity
    {
        public string Content { get; set; }

        public int HeadingId { get; set; }
        public Heading Heading { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public List<Reply> Replies { get; set; }
    }
}
