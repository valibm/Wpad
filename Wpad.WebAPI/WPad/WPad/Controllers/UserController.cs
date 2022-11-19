using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.DTOs.User;
using WPad.Business.Exceptions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;

namespace WPad.Controllers
{
    public class UserController : CustomBaseController
    {
        private readonly IUserService _userService;
        private readonly IFollowService _followService;

        public UserController(IUserService userService, IFollowService followService)
        {
            _userService = userService;
            _followService = followService;
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetAsync(string userName)
        {
            UserGetDto user;
            try
            {
                user = await _userService.GetAsync(userName);
                return ActionResultInstance(Response<UserGetDto>.Success(user, 200));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("User could not be found", 404, true));
            }
        }

        [HttpGet("search/{value}")]
        public async Task<IActionResult> Search(string value)
        {
            List<UserGetDto> users;
            try
            {
                users = await _userService.Search(value);
                return ActionResultInstance(Response<List<UserGetDto>>.Success(users, 200));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("User could not be found", 404, true));
            }
        }

        [HttpGet("images/{userId}")]
        public async Task<IActionResult> GetUserImages(string userId)
        {
            try
            {
                var images = await _userService.GetImagesAsync(userId);
                return ActionResultInstance(Response<List<Image>>.Success(images, 200));
            }
            catch (NotFoundException ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 404, true));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("User could not be found", 404, true));
            }
        }

        [HttpPost("update/{userId}")]
        public async Task<IActionResult> UpdateUserDetails(UserDetailsDto userDetails, string userId)
        {
            try
            {
                await _userService.UpdateDetailsAsync(userDetails, userId);
                return ActionResultInstance(Response<NoContentDto>.Success(204, "Account information has been updated succesfuly"));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("User's details could not be updated, try again later.", 500, true));
            }
        }

        [HttpPost("update/avatar/{userId}")]
        public async Task<IActionResult> ChangeUserAvatar(IFormFile imageFile, string userId)
        {
            await _userService.ChangeAvatar(imageFile, userId);
            return ActionResultInstance(Response<NoContentDto>.Success(200, "Profile changed succesfully"));
        }

        [HttpPost("update/cover/{userId}")]
        public async Task<IActionResult> ChangeUserCover(IFormFile imageFile, string userId)
        {
            await _userService.ChangeCover(imageFile, userId);
            return ActionResultInstance(Response<NoContentDto>.Success(200, "Cover changed succesfully"));
        }

        [HttpPost("{followeeId}/follow/{followerId}")]
        public async Task<IActionResult> FollowUser(string followeeId, string followerId)
        {
            try
            {
                await _userService.FollowUser(followeeId, followerId);
                return ActionResultInstance(Response<NoContentDto>.Success(200, "User followed succesfully"));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpPost("{followeeId}/unfollow/{followerId}")]
        public async Task<IActionResult> UnfollowUser(string followeeId, string followerId)
        {
            try
            {
                await _userService.UnfollowUser(followeeId, followerId);
                return ActionResultInstance(Response<NoContentDto>.Success(200, "User unfollowed succesfully"));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("followee/{userId}")]
        public async Task<IActionResult> GetFollowees(string userId)
        {
            try
            {
                var data = await _userService.GetFollowees(userId);
                return ActionResultInstance(Response<List<UserGetDto>>.Success(data, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("follower/{userId}")]
        public async Task<IActionResult> GetFollowers(string userId)
        {
            try
            {
                var data = await _userService.GetFollowers(userId);
                return ActionResultInstance(Response<List<UserGetDto>>.Success(data, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        //[HttpGet("{userId}/check/{recepientId}")]
        //public async Task<IActionResult> CheckFollow(string userId, string recepientId)
        //{
        //    try
        //    {
        //        CheckFollowDto check = await _followService.CheckFollow(userId, recepientId);
        //        return ActionResultInstance(Response<CheckFollowDto>.Success(check, 200));
        //    }
        //    catch (Exception ex)
        //    {
        //        return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
        //    }
        //}

        //[HttpPost("{userId}/checkrange")]
        //public async Task<IActionResult> CheckFollowRange(string userId, string[] recepientId)
        //{
        //    try
        //    {
        //        List<CheckFollowDto> checks = await _followService.CheckFollowRange(userId, recepientId);
        //        return ActionResultInstance(Response<List<CheckFollowDto>>.Success(checks, 200));
        //    }
        //    catch (Exception ex)
        //    {
        //        return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
        //    }
        //}
    }
}
