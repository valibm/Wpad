using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs.User;
using WPad.Core.Entities;

namespace WPad.Business.Interfaces
{
    public interface IUserService
    {
        Task<List<UserGetDto>> GetAllAsync();
        Task<UserGetDto> GetForIdAsync(string userId);
        Task<UserGetDto> GetAsync(string userName);
        Task<List<UserGetDto>> Search(string value);
        Task<List<Image>> GetImagesAsync(string userId);
        Task<List<UserGetDto>> GetFollowees(string userId);
        Task<List<UserGetDto>> GetFollowers(string userId);
        Task UpdateDetailsAsync(UserDetailsDto userDetails, string userId);
        Task ChangeAvatar(IFormFile image, string userId);
        Task ChangeCover(IFormFile image, string userId);
        Task FollowUser(string followeeId, string followerId);
        Task UnfollowUser(string followeeId, string followerId);
    }
}
