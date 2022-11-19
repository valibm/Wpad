using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Entities;

namespace WPad.Business.Interfaces
{
    public interface IImageService
    {
        Task<List<Image>> GetUserImagesAsync(string userId);
        Task<List<Image>> GetHeadingImagesAsync(int headingId);
        Task CreateImageAsync(Image image);
        Task CreateImageRangeAsync(List<Image> image);
        Task DeleteAvatarImage(string userId);
        Task DeleteCoverImage(string userId);
        Task DeleteImage(int id);
    }
}
