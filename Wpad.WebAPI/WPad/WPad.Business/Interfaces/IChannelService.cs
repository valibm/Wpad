using System.Collections.Generic;
using System.Threading.Tasks;
using WPad.Business.DTOs;

namespace WPad.Business.Interfaces
{
    public interface IChannelService
    {
        Task<ChannelGetDto> GetAsync(int id);
        Task<List<ChannelGetDto>> GetAllAsync();
        Task ChannelCreateAsync(ChannelCreateDto channel);
        Task UpdateChannelAsync(int id, ChannelUpdateDto channel);
        Task DeleteChannelAsync(int id);
    }
}
