using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.DAL.Implementations
{
    public class LikeRepository : Repository<Like>, ILikeRepository
    {
        public LikeRepository(AppDbContext context) : base(context)
        {
        }
    }
}
