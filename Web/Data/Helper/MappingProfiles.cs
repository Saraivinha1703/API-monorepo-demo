using AutoMapper;
using Web.Data.Dto;
using Web.Models;

namespace Web.Data.Context;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Book, BookDto>();
        CreateMap<BookDto, Book>();

        CreateMap<Book, BookOnlyDto>();
        CreateMap<BookOnlyDto, Book>();

        CreateMap<Author, AuthorDto>();
        CreateMap<AuthorDto, Author>();

        CreateMap<AuthorOnlyDto, Author>();
        CreateMap<Author, AuthorOnlyDto>();
    }
}
