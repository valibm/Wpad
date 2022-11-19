using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Business.DTOs.Headings;
using WPad.Core.Entities;

namespace WPad.Business.Interfaces
{
    public interface IHeadingService
    {
        Task<Heading> Get(int id);
        Task Addimage(IFormFile image, int headingId);
        Task<HeadingCountDto> GetHeadingsCount(string userId);
        Task<List<HeadingGetDto>> GetHeadingsForHome(int page);
        Task<List<HeadingGetDto>> GetForUserId(string userId);
        Task<List<HeadingGetDto>> GetFolloweesHeadings(string userId, int page);
        Task<List<HeadingGetDto>> GetForChannel(int id, int page);
        Task<List<HeadingGetDto>> GetTrends();
        Task<List<HeadingGetDto>> Search(string value, int page);
        Task<List<HeadingGetDto>> SearchForChannel(int id, string value, int page);
        Task<List<Image>> GetImagesAsync(int headingId);
        Task<Heading> CreateHeadingAsync(HeadingCreateDto headingDto);
        Task<CheckLikeDto> CheckLike(int headingId, string userId);
        Task HandleLike(int headingId, string userId);
        Task Remove(int id);
    }
}
