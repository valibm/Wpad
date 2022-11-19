using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.DAL.Implementations
{
    public class ReplyRepository : Repository<Reply>, IReplyRepository
    {
        public ReplyRepository(AppDbContext context) : base(context)
        {
        }
    }
}
