using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.Interfaces;

namespace WPad.Controllers
{
    public class ChannelController : CustomBaseController
    {
        private readonly IChannelService _service;

        public ChannelController(IChannelService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            ChannelGetDto channel;
            try
            {
                channel = await _service.GetAsync(id);
                return ActionResultInstance(Response<ChannelGetDto>.Success(channel, 200));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Channel could not be found", 404, true));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<ChannelGetDto> channels;
            try
            {
                channels = await _service.GetAllAsync();
                return ActionResultInstance(Response<List<ChannelGetDto>>.Success(channels, 200));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Channel could not be found", 404, true));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateChannel(ChannelCreateDto channelCreate)
        {
            try
            {
                await _service.ChannelCreateAsync(channelCreate);
                return ActionResultInstance(Response<NoContentDto>.Success(204));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Channel could not be created", 500, true));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateChannel(int id, ChannelUpdateDto channelUpdate)
        {
            try
            {
                await _service.UpdateChannelAsync(id, channelUpdate);
                return ActionResultInstance(Response<NoContentDto>.Success(204));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Channel could not be updated", 500, true));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChannel(int id)
        {
            try
            {
                await _service.DeleteChannelAsync(id);
                return ActionResultInstance(Response<NoContentDto>.Success(204));
            }
            catch (Exception)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Channel could not be updated", 500, true));
            }
        }
    }
}
