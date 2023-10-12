var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.MapGet("/api/hello", () => Results.Ok(new { Message = "Hello, world!" }));


app.MapFallbackToFile("index.html");

app.Run();
