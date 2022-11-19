using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.Interfaces;

namespace WPad.Controllers
{
    public class CommentController : CustomBaseController
    {
        private readonly ICommentService _service;

        public CommentController(ICommentService service)
        {
            _service = service;
        }

        [HttpGet("{headingId}")]
        public async Task<IActionResult> Get(int headingId)
        {
            try
            {
                List<CommentGetDto> comments = await _service.GetForHeadingId(headingId);
                return ActionResultInstance(Response<List<CommentGetDto>>.Success(comments, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateComment(CommentCreateDto commentDto)
        {
            try
            {
                await _service.CreateAsync(commentDto);
                return ActionResultInstance(Response<NoContentDto>.Success(200, "Added comment succefully"));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Comment could not be created", 500, false));
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Remove(int commentId)
        {
            try
            {
                await _service.Remove(commentId);
                return ActionResultInstance(Response<NoContentDto>.Success(200, "Comment removed succefully"));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Comment could not be removed, try again later", 500, false));
            }
        }
    }
}
