using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.Exceptions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _repository;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository repository, AppDbContext context, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Comment> Get (int commentId)
        {
            Comment comment = await _repository.GetAsync(c => c.Id == commentId, "Replies.AppUser");
            if (comment is null)
            {
                throw new NotFoundException("Comment could not be found");
            }
            return comment;
        }

        public async Task<List<CommentGetDto>> GetForHeadingId (int headingId)
        {
            List<Comment> comments = await _repository.GetAllOrderedAsync(c => c.CreatedDate ,c => c.HeadingId == headingId, "AppUser.Images", "Replies.AppUser.Images");
            List<CommentGetDto> commentsDto = _mapper.Map<List<CommentGetDto>>(comments);
            return commentsDto;
        }

        public async Task CreateAsync (CommentCreateDto commentDto)
        {
            Comment comment = _mapper.Map<Comment>(commentDto);
            await _repository.CreateAsync(comment);
            await _context.SaveChangesAsync();
        }

        public async Task Remove (int commentId)
        {
            Comment comment = await Get(commentId);
            _repository.Delete(comment);
        }
    }
}
