using AutoMapper;
using Web.Data.Dto;
using Web.Models;

namespace Web.Data.Context;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<AuthorOnlyDto, Author>();
        CreateMap<Author, Author>();
        CreateMap<Author, AuthorOnlyDto>();
        CreateMap<Book, BookDto>();
        CreateMap<BookDto, Book>();
    }
}
