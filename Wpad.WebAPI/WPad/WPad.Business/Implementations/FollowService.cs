using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Business.DTOs.User;
using WPad.Business.Exceptions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class FollowService : IFollowService
    {
        private readonly IFollowRepository _repository;
        private readonly AppDbContext _context;

        public FollowService(IFollowRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<List<Follow>> GetFollowees(string userId)
        {
            List<Follow> follow = await _repository.GetAllAsync(x => x.FollowerId == userId, "Followee.Images", "Followee.Followers");
            return follow;
        }

        public async Task<List<Follow>> GetFollowers(string userId)
        {
            List<Follow> follow = await _repository.GetAllAsync(x => x.FolloweeId == userId, "Follower.Images", "Follower.Followers");
            return follow;
        }

        //public async Task<CheckFollowDto> CheckFollow(string userId, string recipientId)
        //{
        //    var follow = await _repository.GetAsync(x => x.AppUserId == userId && x.FolloweeId == recipientId);
        //    CheckFollowDto check = new()
        //    {
        //        AppUserId = userId,
        //        FolloweeId = recipientId
        //    };
        //    if (follow is null)
        //    {
        //        check.State = true;
        //        return check;
        //    } 
        //    else
        //    {
        //        check.State = false;
        //        return check;
        //    }
        //}

        //public async Task<List<CheckFollowDto>> CheckFollowRange(string userId, string[] recipientIds)
        //{
        //    List<CheckFollowDto> checks = new();

        //    foreach (string recipientId  in recipientIds)
        //    {
        //        CheckFollowDto check = await CheckFollow(userId, recipientId);
        //        checks.Add(check);
        //    }

        //    if (checks is null)
        //    {
        //        throw new NotFoundException("Followers could not be found");
        //    }

        //    return checks;
        //}

        public async Task CreateAsync(string followeeId, string followerId)
        {
            Follow follow = new()
            {
                FolloweeId = followeeId,
                FollowerId = followerId
            };

            await _repository.CreateAsync(follow);
            await _context.SaveChangesAsync();
        }

        public async Task Remove(string followeeId, string followerId)
        {
            Follow follow = await _repository.GetAsync(u => u.FolloweeId == followeeId && u.FollowerId == followerId);
            if (follow is null)
            {
                throw new NotFoundException("Follow could not be found");
            }

            _repository.Delete(follow);
            await _context.SaveChangesAsync();
        }
    }
}
