using System;
using WPad.Core.Entities;

namespace WPad.Business.DTOs
{
    public class ChannelGetDto
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ImageId { get; set; }
        public Image Image { get; set; }
    }
}
