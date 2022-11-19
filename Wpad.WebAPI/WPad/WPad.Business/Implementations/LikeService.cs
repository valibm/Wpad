using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class LikeService : ILikeService
    {
        private readonly ILikeRepository _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public LikeService(ILikeRepository repository, AppDbContext context, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Like> Get(int id)
        {
            Like like = await _repository.GetAsync(x => x.Id == id);
            return like;
        }

        public async Task<List<Like>> GetForHeadingAsync (int headingId)
        {
            List<Like> like = await _repository.GetAllAsync(x => x.HeadingId == headingId);
            return like;
        }

        public async Task Create (int headingId, string userId)
        {
            Like like = new()
            {
                HeadingId = headingId,
                AppUserId = userId
            };
            await _repository.CreateAsync(like);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveForUser (int headingId, string userId)
        {
            List<Like> likes = await GetForHeadingAsync(headingId);
            foreach (Like like in likes)
            {
                if (like.AppUserId == userId)
                {
                    await Remove(like);
                }
            }
        }

        public async Task Remove (Like like)
        {
            _repository.Delete(like);
            await _context.SaveChangesAsync();
        }
    }
}
