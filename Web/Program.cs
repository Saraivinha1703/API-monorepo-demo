using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Data.Context;
using Web.Data.Repositories;
using Web.Interfaces;
using Web.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<Seed>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
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

app.MapGet(
    "/api/getBooks",
    async (IBookRepository bookRepository, IMapper mapper) =>
    {
        List<Book> books = mapper.Map<List<Book>>(await bookRepository.GetValuesAsync());

        return Results.Ok(books);
    }
);

app.MapFallbackToFile("index.html");

app.Run();
