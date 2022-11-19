using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs.User;
using WPad.Business.Exceptions;
using WPad.Business.Extensions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IImageService _imageService;
        private readonly IFollowService _followService;
        private readonly IWebHostEnvironment _env;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public UserService(IMapper mapper,
                           AppDbContext context,
                           IUserRepository repository,
                           IImageService imageService,
                           UserManager<AppUser> userManager,
                           IWebHostEnvironment env,
                           IFollowService followService)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _imageService = imageService;
            _env = env;
            _followService = followService;
        }

        public async Task<List<UserGetDto>> GetAllAsync()
        {
            var users = await _repository.GetAllAsync(null, "Images");

            if (users is null)
            {
                throw new NotFoundException("Users could not be found");
            }

            var mappedUsers = _mapper.Map<List<UserGetDto>>(users);

            return mappedUsers;
        }

        public async Task<UserGetDto> GetForIdAsync(string userId)
        {
            var user = await _repository.GetAsync(x => x.Id == userId, "Images", "Followees", "Followers");

            if (user is null)
            {
                throw new NotFoundException("User could not be found");
            }

            var mappedUser = _mapper.Map<UserGetDto>(user);

            return mappedUser;
        }

        public async Task<UserGetDto> GetAsync(string userName)
        {
            var user = await _repository.GetAsync(x => x.UserName == userName, "Images", "Followees.Followee.Images", "Followers.Follower.Images");

            if (user is null)
            {
                throw new NotFoundException("User could not be found");
            }

            var mappedUser = _mapper.Map<UserGetDto>(user);

            return mappedUser;
        }

        public async Task<List<UserGetDto>> Search (string value)
        {
            List<AppUser> users = await _repository.GetAllAsync(u => u.UserName.Contains(value) || u.Firstname.Contains(value) || u.Lastname.Contains(value), 
                                                                "Images", "Followees", "Followers");
            if (users is null)
            {
                throw new NotFoundException("User could not be found");
            }
            var mappedUsers = _mapper.Map<List<UserGetDto>>(users);
            return mappedUsers;
        }

        public async Task<List<Image>> GetImagesAsync(string userId)
        {
            var images = await _imageService.GetUserImagesAsync(userId);
            return images;
        }

        public async Task ChangeAvatar(IFormFile image, string userId)
        {
            await _imageService.DeleteAvatarImage(userId);
            string fileName = await image.CreateFile(_env);
            Image newImage = new()
            {
                Name = fileName,
                IsAvatar = true,
                AppUserId = userId,
            };
            await _imageService.CreateImageAsync(newImage);
        }

        public async Task ChangeCover(IFormFile image, string userId)
        {
            await _imageService.DeleteCoverImage(userId);
            string fileName = await image.CreateFile(_env);
            Image newImage = new()
            {
                Name = fileName,
                IsCover = true,
                AppUserId = userId,
            };
            await _imageService.CreateImageAsync(newImage);
        }

        public async Task UpdateDetailsAsync(UserDetailsDto userDetails, string userId)
        {
            var user = await _repository.GetAsync(x => x.Id == userId);

            if (userDetails.Firstname != null)
            {
                user.Firstname = userDetails.Firstname;
            }
            if (userDetails.Lastname != null)
            {
                user.Lastname = userDetails.Lastname;
            }
            if (userDetails.Bio != null)
            {
                user.Bio = userDetails.Bio;
            }
            if (userDetails.Location != null)
            {
                user.Location = userDetails.Location;
            }
            if (userDetails.Gender != null)
            {
                user.Gender = userDetails.Gender;
            }
            if (userDetails.FacebookLink != null)
            {
                user.FacebookLink = userDetails.FacebookLink;
            }
            if (userDetails.TwitterLink != null)
            {
                user.TwitterLink = userDetails.TwitterLink;
            }
            if (userDetails.InstagramLink != null)
            {
                user.InstagramLink = userDetails.InstagramLink;
            }
            if (userDetails.ShowName != null)
            {
                user.ShowName = userDetails.ShowName;
            }

            _repository.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task FollowUser(string followeeId, string followerId)
        {
            await _followService.CreateAsync(followeeId, followerId);
        }

        public async Task UnfollowUser(string followeeId, string followerId)
        {
            await _followService.Remove(followeeId, followerId);
        }

        public async Task<List<UserGetDto>> GetFollowees(string userId)
        {
            var follows = await _followService.GetFollowees(userId);
            List<AppUser> users = new();
            foreach (var follow in follows)
            {
                users.Add(follow.Followee);
            }

            if (users is null)
            {
                throw new NotFoundException("Followers could not be found");
            }

            var mappedUsers = _mapper.Map<List<UserGetDto>>(users);

            return mappedUsers;
        }

        public async Task<List<UserGetDto>> GetFollowers(string userId)
        {
            var follows = await _followService.GetFollowers(userId);
            List<AppUser> users = new();
            foreach (var follow in follows)
            {
                users.Add(follow.Follower);
            }

            if (users is null)
            {
                throw new NotFoundException("Followers could not be found");
            }

            var mappedUsers = _mapper.Map<List<UserGetDto>>(users);

            return mappedUsers;
        }
    }
}
