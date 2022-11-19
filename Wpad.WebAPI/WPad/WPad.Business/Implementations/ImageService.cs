using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Business.Exceptions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly AppDbContext _context;
        public ImageService(IImageRepository imageRepository, AppDbContext context)
        {
            _imageRepository = imageRepository;
            _context = context;
        }

        public async Task<List<Image>> GetUserImagesAsync(string userId)
        {
            var images = await _imageRepository.GetAllAsync(x => x.AppUserId == userId);

            if (images is null)
            {
                throw new NotFoundException("There's no image related to the user");
            }

            return images;
        }

        public async Task<List<Image>> GetHeadingImagesAsync(int headingId)
        {
            var images = await _imageRepository.GetAllAsync(x => x.HeadingId == headingId);

            if (images is null)
            {
                throw new NotFoundException("There's no image related to the Heading");
            }

            return images;
        }

        public async Task CreateImageAsync(Image image)
        {
            await _imageRepository.CreateAsync(image);
            await _context.SaveChangesAsync();
        }

        public async Task CreateImageRangeAsync(List<Image> images)
        {
            foreach (var image in images)
            {
                await _imageRepository.CreateAsync(image);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAvatarImage(string userId)
        {
            var image = await _imageRepository.GetAsync(x => x.AppUserId == userId && x.IsAvatar == true);
            if (image != null)
            {
                _imageRepository.Delete(image);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteCoverImage(string userId)
        {
            var image = await _imageRepository.GetAsync(x => x.AppUserId == userId && x.IsCover == true);
            if (image != null)
            {
                _imageRepository.Delete(image);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteImage(int id)
        {
            var image = await _imageRepository.GetAsync(x => x.Id == id);
            _imageRepository.Delete(image);
            await _context.SaveChangesAsync();
        }
    }
}
