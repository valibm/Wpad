using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.DTOs.Headings;
using WPad.Business.Exceptions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;

namespace WPad.Controllers
{
    public class HeadingController : CustomBaseController
    {
        private readonly IHeadingService _headingService;

        public HeadingController(IHeadingService headingService)
        {
            _headingService = headingService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                Heading heading = await _headingService.Get(id);
                return ActionResultInstance(Response<Heading>.Success(heading, 200));
            }
            catch (NotFoundException ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 400, true));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("home/{page}")]
        public async Task<IActionResult> GetForHome(int page = 1)
        {
            try
            {
                var headings = await _headingService.GetHeadingsForHome(page);
                return ActionResultInstance(Response<List<HeadingGetDto>>.Success(headings, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("home/{userId}/following/{page}")]
        public async Task<IActionResult> GetForFollowing(string userId, int page = 1)
        {
            try
            {
                var headings = await _headingService.GetFolloweesHeadings(userId, page);
                return ActionResultInstance(Response<List<HeadingGetDto>>.Success(headings, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("search/{value}/{page}")]
        public async Task<IActionResult> Search(string value, int page)
        {
            try
            {
                var headings = await _headingService.Search(value, page);
                return ActionResultInstance(Response<List<HeadingGetDto>>.Success(headings, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("channel/{id}/search/{value}/{page}")]
        public async Task<IActionResult> SearchForChannel(int id, string value, int page)
        {
            try
            {
                var headings = await _headingService.SearchForChannel(id, value, page);
                return ActionResultInstance(Response<List<HeadingGetDto>>.Success(headings, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("channel/{id}/{page}")]
        public async Task<IActionResult> GetForChannel(int id, int page)
        {
            try
            {
                var headings = await _headingService.GetForChannel(id, page);
                return ActionResultInstance(Response<List<HeadingGetDto>>.Success(headings, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("trends")]
        public async Task<IActionResult> GetTrends()
        {
            try
            {
                List<HeadingGetDto> headings = await _headingService.GetTrends();
                return ActionResultInstance(Response<List<HeadingGetDto>>.Success(headings, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateHeading(HeadingCreateDto headingDto)
        {
            try
            {
                var heading = await _headingService.CreateHeadingAsync(headingDto);
                return ActionResultInstance(Response<Heading>.Success(heading, 200));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Heading could not be created", 500, true));
            }
        }

        [HttpPost("addimage/{headingId}")]
        public async Task<IActionResult> AddImage(IFormFile imageFile, int headingId)
        {
            try
            {
                await _headingService.Addimage(imageFile, headingId);
                return ActionResultInstance(Response<NoContentDto>.Success(204, "Images added succesfully"));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Images could not be added", 500, true));
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetForUserId(string userId)
        {
            try
            {
                var heading = await _headingService.GetForUserId(userId);
                return ActionResultInstance(Response<List<HeadingGetDto>>.Success(heading, 200));
            }
            catch (NotFoundException ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 400, true));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("count/{userId}")]
        public async Task<IActionResult> GetHeadingsCount(string userId)
        {
            try
            {
                HeadingCountDto count = await _headingService.GetHeadingsCount(userId);
                return ActionResultInstance(Response<HeadingCountDto>.Success(count, 200));
            }
            catch (NotFoundException ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 400, true));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("images/{headingId}")]
        public async Task<IActionResult> GetHeadingImages(int headingId)
        {
            try
            {
                var images = await _headingService.GetImagesAsync(headingId);
                return ActionResultInstance(Response<List<Image>>.Success(images, 200));
            }
            catch (NotFoundException ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 404, true));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Something went wrong", 500, true));
            }
        }

        [HttpPost("handlelike/{headingId}/{userId}")]
        public async Task<IActionResult> HandleLike(int headingId, string userId)
        {
            try
            {
                await _headingService.HandleLike(headingId, userId);
                return ActionResultInstance(Response<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpGet("checklike/{headingId}/{userId}")]
        public async Task<IActionResult> CheckLike(int headingId, string userId)
        {
            try
            {
                var check = await _headingService.CheckLike(headingId, userId);
                return ActionResultInstance(Response<CheckLikeDto>.Success(check, 200));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Something went wrong", 500, true));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> CheckLike(int id)
        {
            try
            {
                await _headingService.Remove(id);
                return ActionResultInstance(Response<NoContentDto>.Success(200, "Heading removed succesfully"));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }
    }
}
