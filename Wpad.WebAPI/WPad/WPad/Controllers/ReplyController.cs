using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.DTOs.ReplyDtos;
using WPad.Business.Interfaces;

namespace WPad.Controllers
{
    public class ReplyController : CustomBaseController
    {
        private readonly IReplyService _service;

        public ReplyController(IReplyService service)
        {
            _service = service;
        }

        [HttpGet("{commentId}")]
        public async Task<IActionResult> Get(int commentId)
        {
            try
            {
                List<ReplyGetDto> replies = await _service.GetForComment(commentId);
                return ActionResultInstance(Response<List<ReplyGetDto>>.Success(replies, 200));
            }
            catch (Exception ex)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail(ex.Message, 500, true));
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateReply(ReplyCreateDto replyDto)
        {
            try
            {
                await _service.CreateAsync(replyDto);
                return ActionResultInstance(Response<NoContentDto>.Success(200, "Added reply succefully"));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Reply could not be created", 500, false));
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Remove(int replyId)
        {
            try
            {
                await _service.Remove(replyId);
                return ActionResultInstance(Response<NoContentDto>.Success(200, "Reply removed succefully"));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Reply could not be removed, try again later", 500, false));
            }
        }
    }
}
