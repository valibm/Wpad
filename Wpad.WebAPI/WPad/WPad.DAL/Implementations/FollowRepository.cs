using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.DAL.Implementations
{
    public class FollowRepository : Repository<Follow>, IFollowRepository
    {
        public FollowRepository(AppDbContext context) : base(context)
        {
        }
    }
}
