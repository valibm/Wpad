using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Base;

namespace WPad.Core.Entities
{
    public class Image : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAvatar { get; set; }
        public bool IsCover { get; set; }
        public string AppUserId { get; set; }
        public int? HeadingId { get; set; }
    }
}
