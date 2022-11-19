using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Business.DTOs;
using WPad.Business.DTOs.Headings;
using WPad.Business.DTOs.ReplyDtos;
using WPad.Business.DTOs.User;
using WPad.Core.Entities;

namespace WPad.Business.Profiles
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Channel, ChannelGetDto>().ReverseMap();
            CreateMap<ChannelCreateDto, Channel>().ReverseMap();
            CreateMap<UserGetDto, AppUser>().ReverseMap();
            CreateMap<Heading, HeadingCreateDto>().ReverseMap();
            CreateMap<HeadingGetDto, Heading>().ReverseMap();
                                               //.ForMember(x => x.AppUserImage, option => option.Ignore());
            CreateMap<Like, LikeCreateDto>().ReverseMap();
            CreateMap<Comment, CommentCreateDto>().ReverseMap();
            CreateMap<Comment, CommentGetDto>().ReverseMap();
            CreateMap<Reply, ReplyCreateDto>().ReverseMap();
            CreateMap<Reply, ReplyGetDto>().ReverseMap();
        }
    }
}
