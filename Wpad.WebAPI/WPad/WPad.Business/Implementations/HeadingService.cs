using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.DTOs.Headings;
using WPad.Business.Exceptions;
using WPad.Business.Extensions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class HeadingService : IHeadingService
    {
        private readonly AppDbContext _context;
        private readonly IHeadingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        private readonly ILikeService _likeService;
        private readonly IWebHostEnvironment _env;
        private readonly IFollowService _followService;

        public HeadingService(AppDbContext context,
                              IHeadingRepository repository,
                              IMapper mapper,
                              IImageService imageService,
                              ILikeService likeService,
                              IWebHostEnvironment env,
                              IFollowService followService)
        {
            _context = context;
            _repository = repository;
            _mapper = mapper;
            _imageService = imageService;
            _likeService = likeService;
            _env = env;
            _followService = followService;
        }

        public async Task<Heading> Get(int id)
        {
            var heading = await _repository.GetAsync(x => x.Id == id, "Images", "Channel", "AppUser.Images", "Likes");
            if (heading is null)
            {
                throw new NotFoundException("Heading could not be found");
            }
            return heading;
        }

        public async Task<List<HeadingGetDto>> GetForUserId(string userId)
        {
            var headings = await _repository.GetAllOrderedAsync(x => x.CreatedDate, x=> x.AppUserId == userId, "Images", "Channel", "AppUser.Images", "Likes");
            if (headings is null)
            {
                throw new NotFoundException("Heading could not be found");
            }
            var mappedHeading = _mapper.Map<List<HeadingGetDto>>(headings);

            return mappedHeading;
        }

        public async Task<HeadingCountDto> GetHeadingsCount(string userId)
        {
            List<HeadingGetDto> headings = await GetForUserId(userId);
            HeadingCountDto count = new()
            {
                Count = headings.Count,
            };
            return count;
        }

        public async Task<List<HeadingGetDto>> GetTrends()
        {
            List<HeadingGetDto> headings = _mapper.Map<List<HeadingGetDto>>(await _repository.GetAllPaginateAsync(1, 12, x => x.LikeCount, 
                                                      x => x.CreatedDate.Day == DateTime.Now.Day && x.CreatedDate.Month == DateTime.Now.Month && x.CreatedDate.Year == DateTime.Now.Year, "Images", "Channel", "AppUser.Images", "Likes"));
            return headings;
        }

        public async Task<List<HeadingGetDto>> GetHeadingsForHome(int page)
        {
            List<HeadingGetDto> headings = _mapper.Map<List<HeadingGetDto>>(await _repository.GetAllPaginateAsync(page, 10, x => x.CreatedDate, null , "Images", "Channel", "AppUser.Images", "Likes"));
            return headings;
        }

        public async Task<List<HeadingGetDto>> GetForChannel(int id, int page)
        {
            List<HeadingGetDto> headings = _mapper.Map<List<HeadingGetDto>>(await _repository.GetAllPaginateAsync(page, 10, x => x.CreatedDate, x => x.ChannelId == id, "Images", "Channel", "AppUser.Images", "Likes"));
            return headings;
        }

        public async Task<List<HeadingGetDto>> GetFolloweesHeadings(string userId, int page)
        {
            var follows = await _followService.GetFollowees(userId);

            List<HeadingGetDto> headings = new();

            foreach (var follow in follows)
            {
                var data = await GetForUserId(follow.FolloweeId);
                headings.AddRange(data);
            }

            var sortedList = headings.OrderByDescending(x => x.CreatedDate).Skip((page - 1) * 10).Take(10).ToList();
            return sortedList;
        }

        public async Task<List<HeadingGetDto>> Search(string value, int page)
        {
            List<Heading> headings = await _repository.GetAllPaginateAsync(page, 10, h => h.CreatedDate, h => h.Title.Contains(value), "Images", "Channel", "AppUser.Images", "Likes");

            if (headings is null)
            {
                throw new NotFoundException("Heading could not be found");
            }

            var mappedHeading = _mapper.Map<List<HeadingGetDto>>(headings);
            return mappedHeading;
        }

        public async Task<List<HeadingGetDto>> SearchForChannel(int id, string value, int page)
        {
            List<Heading> headings = await _repository.GetAllPaginateAsync(page, 10, h => h.CreatedDate, h => h.Title.Contains(value) && h.ChannelId == id, "Images", "Channel", "AppUser.Images", "Likes");

            if (headings is null)
            {
                throw new NotFoundException("Heading could not be found");
            }

            var mappedHeading = _mapper.Map<List<HeadingGetDto>>(headings);
            return mappedHeading;
        }

        public async Task<List<Image>> GetImagesAsync(int headingId)
        {
            var images = await _imageService.GetHeadingImagesAsync(headingId);
            return images;
        }


        public async Task<Heading> CreateHeadingAsync(HeadingCreateDto headingDto)
        {
            var heading = _mapper.Map<Heading>(headingDto);
            await _repository.CreateAsync(heading);
            await _context.SaveChangesAsync();

            return heading;
        }

        public async Task HandleLike(int headingId, string userId)
        {
            Heading heading = await Get(headingId);
            var check = await CheckLike(headingId, userId);
            if (!check.State)
            {
                heading.LikeCount++;
                await _likeService.Create(headingId, userId);
            }
            else
            {
                heading.LikeCount--;
                await _likeService.RemoveForUser(headingId, userId);
            }
            //var heading = _mapper.Map<Heading>(headingDto);
            _repository.Update(heading);
            await _context.SaveChangesAsync();
        }

        public async Task<CheckLikeDto> CheckLike(int headingId, string userId)
        {
            var likes = await _likeService.GetForHeadingAsync(headingId);
            CheckLikeDto check = new();
            if (likes is null)
            {
                check.State = false;
            }
            else
            {
                foreach (var like in likes)
                {
                    if (like.AppUserId == userId)
                    {
                        check.State = true;
                        break;
                    }
                    else
                    {
                        check.State = false;
                    }
                }
            }
            return check;
        }

        public async Task Addimage (IFormFile image, int headingId)
        {
            string fileName = await image.CreateFile(_env);
            Image newImage = new()
            {
                Name = fileName,
                HeadingId=headingId
            };
            await _imageService.CreateImageAsync(newImage);
        }

        public async Task Remove (int id)
        {
            Heading heading = await Get(id);
            _repository.Delete(heading);
            await _context.SaveChangesAsync();
        }
    }
}
