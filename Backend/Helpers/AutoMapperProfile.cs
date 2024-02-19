using AutoMapper;
using WebApi.Models.Posts;
using WebApi.Entities;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateRequest, Post>();

        CreateMap<UpdateRequest, Post>();
    }
}