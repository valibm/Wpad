using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Core.Entities;

namespace WPad.Business.Interfaces
{
    public interface ICommentService
    {
        Task<Comment> Get(int commentId);
        Task<List<CommentGetDto>> GetForHeadingId(int headingId);
        Task CreateAsync(CommentCreateDto commentDto);
        Task Remove(int commentId);
    }
}
