using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Core.Entities;

namespace WPad.Business.Interfaces
{
    public interface ILikeService
    {
        Task<List<Like>> GetForHeadingAsync (int headingId);
        Task<Like> Get(int id);
        Task Create(int headingId, string userId);
        Task RemoveForUser(int headingId, string userId);
        Task Remove(Like like);
    }
}
