using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs.User;
using WPad.Core.Entities;

namespace WPad.Business.Interfaces
{
    public interface IFollowService
    {
        Task<List<Follow>> GetFollowers(string userId);
        Task<List<Follow>> GetFollowees(string userId);
        //Task<CheckFollowDto> CheckFollow(string userId, string recipientId);
        //Task<List<CheckFollowDto>> CheckFollowRange(string userId, string[] recipientIds);
        Task CreateAsync(string followeeId, string followerId);
        Task Remove(string followeeId, string followerId);



        //Task<Follow> GetFollow(string userId, string recipientId);
    }
}
