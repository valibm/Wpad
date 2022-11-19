using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.Exceptions;
using WPad.Business.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.Business.Implementations
{
    public class ChannelService : IChannelService
    {
        private readonly IMapper _mapper;
        private readonly IChannelRepository _repository;
        private readonly AppDbContext _context;
        public ChannelService(IMapper mapper, IChannelRepository repository, AppDbContext context)
        {
            _mapper = mapper;
            _repository = repository;
            _context = context;
        }


        public async Task<List<ChannelGetDto>> GetAllAsync()
        {
            var channels = await _repository.GetAllAsync(null, "Image");

            if (channels is null)
            {
                throw new NotFoundException("Channels could not be found");
            }

            var channelsDto = _mapper.Map<List<ChannelGetDto>>(channels);

            return channelsDto;
        }

        public async Task<ChannelGetDto> GetAsync(int id)
        {
            var channel = await _repository.GetAsync(x => x.Id == id, "Image");

            if (channel is null)
            {
                throw new NotFoundException("Channel could not be found");
            }

            var channelDto = _mapper.Map<ChannelGetDto>(channel);

            return channelDto;
        }

        public async Task ChannelCreateAsync(ChannelCreateDto channel)
        {
            var channelDb = _mapper.Map<Channel>(channel);
            await _repository.CreateAsync(channelDb);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateChannelAsync(int id, ChannelUpdateDto channel)
        {
            var channelDb = await _repository.GetAsync(x => x.Id == id);
            if (channelDb is null)
            {
                throw new NotFoundException("Channel could not be found");
            }
            channelDb.Name = channel.Name;
            channelDb.ImageId = channel.ImageId;
            _repository.Update(channelDb);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteChannelAsync(int id)
        {
            var channel = await _repository.GetAsync(x => x.Id == id);
            if (channel is null)
            {
                throw new NotFoundException("Channel could not be found");
            }
            _repository.Delete(channel);
            await _context.SaveChangesAsync();
        }
    }
}
