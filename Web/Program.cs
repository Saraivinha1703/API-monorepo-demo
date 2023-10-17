using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

app.MapGet(
    "/api/getBook",
    async (DataContext context, IMapper mapper, [FromQuery] int bookId) =>
    {
        BookDto book = await mapper
            .ProjectTo<BookDto>(context.Books.Where(b => b.Id == bookId).AsQueryable())
            .FirstOrDefaultAsync();

        return Results.Ok(book);
    }
);

//Create
app.MapPost(
    "api/newBook",
    async (DataContext context, [FromBody] BookOnlyDto book, [FromQuery] int authorId) =>
    {
        Author author = await context.Authors.Where(a => a.Id == authorId).FirstOrDefaultAsync();
        Book createBook =
            new()
            {
                Name = book.Name,
                Price = book.Price,
                Rating = book.Rating,
                CreatedDate = book.CreatedDate,
                Author = author,
            };
        await context.Books.AddAsync(createBook);
        await SaveAsync(context);
        return Results.Ok("Book Created Successfully!");
    }
);

//Update
app.MapPut(
    "api/updateBook",
    async (DataContext context, [FromBody] BookOnlyDto book, [FromQuery] int authorId) =>
    {
        Author author = await context.Authors.Where(a => a.Id == authorId).FirstOrDefaultAsync();
        Book updateBook =
            new()
            {
                Id = book.Id,
                Name = book.Name,
                Price = book.Price,
                Rating = book.Rating,
                CreatedDate = book.CreatedDate,
                Author = author,
            };
        context.Books.Update(updateBook);
        await SaveAsync(context);
        return Results.Ok("Book Updated Successfully!");
    }
);

//Delete
app.MapDelete(
    "api/removeBook",
    async (DataContext context, [FromQuery] int bookId) =>
    {
        Book book = await context.Books.Where(b => b.Id == bookId).FirstOrDefaultAsync();
        context.Books.Remove(book);
        await SaveAsync(context);
        return Results.Ok("Book Removed Successfully!");
    }
);

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

app.MapGet(
    "/api/getAuthor",
    async (DataContext context, IMapper mapper, [FromQuery] int authorId) =>
    {
        AuthorDto author = await mapper
            .ProjectTo<AuthorDto>(context.Authors.Where(b => b.Id == authorId).AsQueryable())
            .FirstOrDefaultAsync();
        return Results.Ok(author);
    }
);

//Create
app.MapPost(
    "api/newAuthor",
    async (DataContext context, IMapper mapper, [FromBody] AuthorDto authorDto) =>
    {
        Author author = mapper.Map<Author>(authorDto);
        await context.AddAsync(author);
        await SaveAsync(context);
    }
);

//Update
app.MapPut(
    "api/updateAuthor",
    async (DataContext context, IMapper mapper, [FromBody] AuthorDto authorDto) =>
    {
        Author author = mapper.Map<Author>(authorDto);
        context.Update(author);
        await SaveAsync(context);
    }
);

//Delete
app.MapDelete(
    "api/removeAuthor",
    async (DataContext context, [FromQuery] int authorId) =>
    {
        List<Book> books = await context.Books.Where(b => b.Author.Id == authorId).ToListAsync();
        context.RemoveRange(books);
        Author author = await context.Authors.Where(b => b.Id == authorId).FirstOrDefaultAsync();
        context.Remove(author);
        await SaveAsync(context);
        return Results.Ok("Author Removed Successfully!");
    }
);

async Task<bool> SaveAsync(DataContext context)
{
    int num = await context.SaveChangesAsync();
    return num > 0;
}

app.MapFallbackToFile("index.html");

app.Run();
