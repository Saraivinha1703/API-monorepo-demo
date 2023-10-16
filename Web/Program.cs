using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Data.Context;
using Web.Data.Dto;
using Web.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<Seed>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);

void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory?.CreateScope())
    {
        var service = scope?.ServiceProvider.GetService<Seed>();
        service?.SeedDataContext();
    }
}

//https://stackoverflow.com/questions/53988848/why-does-order-between-usestaticfiles-and-usedefaultfiles-matter
//Must be called before UseStaticFIles - this method is a URL rewriter that doesn't actually serve the file.
app.UseDefaultFiles();

//this method actually serves the file
app.UseStaticFiles();

//map the routes and decide which one to use based on the request - https://www.youtube.com/watch?v=NCZzYxzHrN8
app.UseRouting();

app.MapGet("/api/hello", () => Results.Ok(new { Message = "Hello, world!" }));

//Books
app.MapGet(
    "/api/getBooksAndAuthors",
    async (DataContext context, IMapper mapper) =>
    {
        List<BookDto> books = await mapper
            .ProjectTo<BookDto>(
                context.Books.Include(b => b.Author).OrderBy(b => b.Id).AsQueryable()
            )
            .ToListAsync();

        return Results.Ok(books);
    }
);

app.MapGet(
    "/api/getBooks",
    async (DataContext context, IMapper mapper) =>
    {
        List<BookOnlyDto> books = await mapper
            .ProjectTo<BookOnlyDto>(
                context.Books.Include(b => b.Author).OrderBy(b => b.Id).AsQueryable()
            )
            .ToListAsync();

        return Results.Ok(books);
    }
);

//Create

//Update

//Delete


//Authors
app.MapGet(
    "/api/getAuthorsAndBooks",
    async (DataContext context, IMapper mapper) =>
    {
        List<AuthorDto> authors = await mapper
            .ProjectTo<AuthorDto>(context.Authors.OrderBy(a => a.Id).AsQueryable())
            .ToListAsync();

        return Results.Ok(authors);
    }
);

app.MapGet(
    "/api/getAuthors",
    async (DataContext context, IMapper mapper) =>
    {
        List<AuthorOnlyDto> authors = await mapper
            .ProjectTo<AuthorOnlyDto>(context.Authors.OrderBy(a => a.Id).AsQueryable())
            .ToListAsync();

        return Results.Ok(authors);
    }
);

//Create

//Update

//Delete


app.MapFallbackToFile("index.html");

app.Run();
