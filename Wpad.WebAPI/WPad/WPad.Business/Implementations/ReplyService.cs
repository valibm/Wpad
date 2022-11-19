using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs.ReplyDtos;
using WPad.Business.Exceptions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class ReplyService : IReplyService
    {
        private readonly IReplyRepository _repository;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ReplyService(IReplyRepository repository, AppDbContext context, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Reply> Get(int replyId)
        {
            Reply reply = await _repository.GetAsync(c => c.Id == replyId);
            if (reply is null)
            {
                throw new NotFoundException("Comment could not be found");
            }
            return reply;
        }

        public async Task<List<ReplyGetDto>> GetForComment(int commentId)
        {
            List<Reply> replies = await _repository.GetAllOrderedAsync(c => c.CreatedDate ,c => c.CommentId == commentId, "AppUser.Images");
            List<ReplyGetDto> repliesDto = _mapper.Map<List<ReplyGetDto>>(replies);
            return repliesDto;
        }

        public async Task CreateAsync(ReplyCreateDto replyDto)
        {
            Reply reply = _mapper.Map<Reply>(replyDto);
            await _repository.CreateAsync(reply);
            await _context.SaveChangesAsync();
        }

        public async Task Remove(int replyId)
        {
            Reply reply = await Get(replyId);
            _repository.Delete(reply);
        }
    }
}
