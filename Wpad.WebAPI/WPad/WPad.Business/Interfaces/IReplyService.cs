using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs.ReplyDtos;
using WPad.Core.Entities;

namespace WPad.Business.Interfaces
{
    public interface IReplyService
    {
        Task<Reply> Get(int replyId);
        Task<List<ReplyGetDto>> GetForComment(int commentId);
        Task CreateAsync(ReplyCreateDto replyDto);
        Task Remove(int replyId);
    }
}
