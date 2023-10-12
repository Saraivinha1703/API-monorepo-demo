[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carlos-saraiva-neto/)

# API-monorepo-demo
This is a .Net Web API mono repository project, made to learn how to make and work with APIs and ReactJs as the front-end, using [Vite](https://vitejs.dev/) as our dev server and front-end builder. 🙂

In this project, my goal is to build a [CRUD](https://www.crowdstrike.com/cybersecurity-101/observability/crud-vs-rest/) using SqlServer and authentication 
using [JWT](https://jwt.io/introduction). I'm going to make two versions:
  1. Only having the CRUD operations with some random data just to have something to work with. 😿
  2. CRUD operations with JWT authentication. 🔐

To test the endpoints we will send the requests using [Insomnia](https://insomnia.rest/download) but you can also use [Postman](https://www.postman.com/downloads/), 
they are both API platforms to develop and test APIs.
# Requirements
In this project I'm using [.Net 7.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) with [Visual Studio Code](https://code.visualstudio.com/) as my [IDE](https://www.redhat.com/en/topics/middleware/what-is-ide), all the .Net commands are made via Terminal.

I also have the `CSharpier - Code formatter` to format my code and the `C# Dev Kit` that allow us to make tests, navigate to definitions, debug, 
format the code and other features that you can check it out [here](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit). 
This extension will also bring `C#` and `.NET Runtime Install Tool` extensions.

# Getting Started
Start you project inside your project's folder 📁 with the following command:
```
mkdir YourMonorepoProjectName
```
Now that we have the folder that will store our API and the front-end, lets start our API project. 
It will be an empty project, but you can also create a minimal API or a regular Web API, the purpose of this project is to have a monorepo project, so any API will work and we don't need to make it too complicated. 
Enter you monorepo folder with: 📂
```
cd YourMonorepoProjectName
```
To created our empty .Net project execute:
```
dotnet new web -o YourProjectName
```
**_NOTE:_** The project will be created with the latest version of the SDK that you have, 
if you want any other version that you have you need to specify with the following command:
```
dotnet new web -f net6.0 -o YourProjectName
```
This would create the project using .Net version 6, if you want to see the options run:
```
dotnet new webapi -h
```
This command will generate an empty project and we will configure it after creating our Vite project with a react-ts template using the following command:
```
yarn create vite my-react-app --template react-ts
```
**_NOTE:_** It does not accept capital letters.

## .Net Project Configuration
Let's configure our Web API, we are going to make configurations to the development and production modes. To start, we are going to install the library that will run our front-end as soon as we start the API, 
so go inside your .Net project folder:
```
cd YourProjectName
```
And run:
```
dotnet add package Microsoft.AspNetCore.SpaProxy
```
Now we are going to configure the `YourProjectName.csproj` and it should look something like this: 
```HTML
<Project Sdk="Microsoft.NET.Sdk.Web">

   <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>disable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <IsPackable>false</IsPackable>

    <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
    <TypeScriptToolsVersion>Latest</TypeScriptToolsVersion>

    <SpaRoot>../Client/</SpaRoot>
    <DefaultItemExcludes>$(DefaultItemExcludes);$(SpaRoot)node_modules\**</DefaultItemExcludes>

    <SpaProxyPort>3000</SpaProxyPort>
    <SpaProxyServerUrl>http://localhost:$(SpaProxyPort)</SpaProxyServerUrl>
    <SpaProxyLaunchCommand>yarn dev --port $(SpaProxyPort)|| npm start -- --port $(SpaProxyPort)</SpaProxyLaunchCommand>
  </PropertyGroup>

 <ItemGroup>
    <!-- Don't publish the SPA source files, but do show them in the project files list -->
    <Content Remove="$(SpaRoot)**" />
    <None Remove="$(SpaRoot)**" />
    <None Include="$(SpaRoot)**" Exclude="$(SpaRoot)node_modules\**" />
  </ItemGroup>

 <ItemGroup>
   <PackageReference Include="Microsoft.AspNetCore.SpaProxy" Version="7.0.11" />
 </ItemGroup>

  <Target Name="DebugEnsureNodeEnv" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Debug' And !Exists('$(SpaRoot)node_modules') ">
    <!-- Ensure Node.js is installed -->
    <Exec Command="node --version" ContinueOnError="true">
      <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
    </Exec>
    
    <Error Condition="'$(ErrorCode)' != '0'" Text="Node.js is required to build and run this project. To continue, please install Node.js from https://nodejs.org/, and then restart your command prompt or IDE." />
    
    <Message Importance="high" Text="Restoring dependencies using 'yarn || npm'. This may take several minutes..." />
    <Exec WorkingDirectory="$(SpaRoot)" Command="yarn || npm install" />
  </Target>

   <Target Name="PublishRunWebpack" AfterTargets="ComputeFilesToPublish">
    <!-- As part of publishing, ensure the JS resources are freshly built in production mode -->
    <Exec WorkingDirectory="$(SpaRoot)" Command="yarn || npm install" />
    <Exec WorkingDirectory="$(SpaRoot)" Command="yarn build || npm run build" />

    <!-- Include the newly-built files in the publish output -->
    <ItemGroup>
      <DistFiles Include="$(SpaRoot)dist\**" />
      <ResolvedFileToPublish Include="@(DistFiles->'%(FullPath)')" Exclude="@(ResolvedFileToPublish)">
        <RelativePath>wwwroot\%(RecursiveDir)%(FileName)%(Extension)</RelativePath>
        <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
        <ExcludeFromSingleFile>false</ExcludeFromSingleFile>
      </ResolvedFileToPublish>
    </ItemGroup>
  </Target>
</Project>
```
In this file we are basically configuring the route that our font-end is supposed to run, where to find the files after the project build, between other configurations. I used the .Net React template as a reference and just adapted some things 
to run the front-end at the port that I wanted and using yarn to run the commands.

Now we need to add something to our `Program.cs` file, just to return some value to test, so it should look with something like this:
`Program.cs`
```C#
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

//https://stackoverflow.com/questions/53988848/why-does-order-between-usestaticfiles-and-usedefaultfiles-matter
//Must be called before UseStaticFIles - this method is a URL rewriter that doesn't actually serve the file.
app.UseDefaultFiles();

//this method actually serves the file
app.UseStaticFiles();

//map the routes and decide which one to use based on the request - https://www.youtube.com/watch?v=NCZzYxzHrN8
app.UseRouting();

app.MapGet("/api/hello", () => Results.Ok(new { Message = "Hello, world!" }));

app.MapFallbackToFile("index.html");

app.Run();

```

To finish the configurations in this part of the project we are going to the `Properties/launchSettings.json` and add this line in every profile that you have:
```JSON
"ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.SpaProxy"
```
This line is added to `SpaProxy` run your front-end automatically without you having to run it manually, so you just need to run one project.
Now this file should look with something like this:
`launchSettings.json`
```JSON
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:47531",
      "sslPort": 44321
    }
  },
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5283",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.SpaProxy"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.SpaProxy"
      }
    }
  }
}
```
## ReactJs Project Configuration
Now that we have our API ready to go, let's get inside our front-end project and configure it so it calls the right endpoint when we try to fetch some data. Install all the dependencies after the creation of your project running: 
```
yarn install
```
Go to your `vite.config.ts` file and set it so the requests are redirected to our .Net API endpoints like this:
```Typescript
import { defineConfig } from 'vite';
import { env } from 'process';
import react from '@vitejs/plugin-react';

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'http://localhost:5283';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
});

```
To test if the data is being fetched correctly, go inside the `src/App.tsx` and add a `useEffect` hook, that runs every time the screen is refreshed *(just to test)* and a `useState` hook to display the fetched information. 
Your file should look something like this: 
`App.tsx`
```TSX
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(0);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(r => setText(r));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>{JSON.stringify(text)}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```
To test it out, go to your .Net API folder and run the following command:
```
dotnet watch
```
It should launch the API and open a tab in your browser, then the Proxy will run our front-end dev server and the React page should pop up with our .Net API response.

# Starting Project
To start this project we will make a simple Bookstore application. Create a `Models` folder and inside it create this two files: `Book.cs` and 
`Author.cs`.

To create properties we have two options, first is to declare some properties like this:
```C#
public string Name { get; set; } = null!;
```
Here we are basically saying that this value will not be null, but we can also go to the `YourProjectName.csproj` and change the Nullable tag from `enable` to 
`disable`. The second option is what I'm going with.
```HTML
  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <!-- disabling the nullable tag (we can still declare nullable variables) -->
    <Nullable>disable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
```
## Making Models
Now we are going to make some random properties just to have some data, you can make whatever you want, for this example, I'm going to make a bookstore and the models are going to have this properties:

`Book.cs`
```C#
namespace YourProjectName.Models;

public class Book
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedDate { get; set; }
    public Author Author { get; set; }
}
```
`Author.cs`
```C#
namespace YourProjectName.Models;

public class Author
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public List<Book> Books { get; set; }
}
```

## Making Data Context and Seed
You can also make a static list with all the values you want to fetch, since the porpuse of this project is not how we store the data. 
But I'm going to use SqlServer, and we can use it with help of some .Net librabries that does the query job for us. To use them we are going to run the two following commands:
```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```
and
```
dotnet add package Microsoft.EntityFrameworkCore.Design
```
With this two libraries installed, we are going to make the data context of our application, creating a `Data/Context` folder with a `DataContext.cs` file, that contains our entities and 
custom options.

`DataContext.cs`
```C#
using Microsoft.EntityFrameworkCore;
using YourProjectName.Models;

namespace YourProjectName.Data.Context;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        foreach (
            var property in builder.Model
                .GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?))
        )
        {
            property.SetPrecision(18);
            property.SetScale(2);
        }
    }
}
```
In the `OnModelCreating` method we are going to set the precision of our `Price` decimal property, if we don´t do this, when we generate the migrations it will give us a warning. 
In this method we can configure anything before entity framework does the binding between our entities and the tables in the database. 

Now we are going to make the `Seed.cs` file in the `Data` folder and create some random data just to populate the database with data to fetch.

`Seed.cs` (this data is not accurate)
```C#
using YourProjectName.Models;
using YourProjectName.Data.Context;

namespace YourProjectName.Data;

public class Seed
{
    private readonly DataContext _context;

    public Seed(DataContext context)
    {
        _context = context;
    }

    public void SeedDataContext()
    {
        Author georgeOrwell = new Author() { Name = "George Orwell", Age = 47, };
        Author charlesDickens = new Author() { Name = "Charles Dickens", Age = 58, };
        Author franzKafka = new Author() { Name = "Franz Kafka", Age = 41, };
        if (!_context.Authors.Any())
        {
            List<Book> books = new List<Book>()
            {
                new Book()
                {
                    Name = "Animal Farm",
                    Price = 10.5m,
                    CreatedDate = new DateTime(1924, 2, 21),
                    Rating = 5,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "Nineteen Eighty-Four",
                    Price = 20.55m,
                    CreatedDate = new DateTime(1947, 8, 3),
                    Rating = 3,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "Burmese Days",
                    Price = 2.82m,
                    CreatedDate = new DateTime(1932, 10, 30),
                    Rating = 4,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "Homage to Catalonia",
                    Price = 34.21m,
                    CreatedDate = new DateTime(1938, 5, 18),
                    Rating = 4,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "The Pickwick Papers",
                    Price = 23.64m,
                    CreatedDate = new DateTime(1848, 1, 18),
                    Rating = 4,
                    Author = charlesDickens
                },
                new Book()
                {
                    Name = "Oliver Twist",
                    Price = 12.14m,
                    CreatedDate = new DateTime(1837, 6, 23),
                    Rating = 2,
                    Author = charlesDickens
                },
                new Book()
                {
                    Name = "Our Mutual Friend",
                    Price = 4.45m,
                    CreatedDate = new DateTime(1838, 1, 8),
                    Rating = 1,
                    Author = charlesDickens
                },
                new Book()
                {
                    Name = "The Trial",
                    Price = 9.92m,
                    Rating = 3,
                    CreatedDate = new DateTime(1911, 4, 7),
                    Author = franzKafka
                },
                new Book()
                {
                    Name = "Metamorphosis",
                    CreatedDate = new DateTime(1914, 8, 22),
                    Price = 9.80m,
                    Rating = 4,
                    Author = franzKafka
                },
            };
            _context.AddRange(books);
            _context.SaveChanges();
        }
    }
}
```
Nothing that we did will work, if we don't add our data context and seed to our services in the `Program.cs` file. We need to add them because our classes have dependencies 
and they are satisfied with the dependency injection made by .Net. To add them, go to the `Program.cs` file and put the following code lines before the app build.
```C#
builder.Services.AddTransient<Seed>();
builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
```
We also have to add our database string connection, so our API can connect to some database to add and change the data. go to the `appsettings.json` in the root folder and 
add `ConnectionStrings` section to this file, then a default connection to the section, now this file should look something like this: 
```JSON
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YourServerName;Database=test;User Id=sa;Password=123456;TrustServerCertificate=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```
**_NOTE:_** The string inside `GetConnectionString` method in `Program.cs` file, must match the name of the connection string in the `ConnectionStrings` section.

After the app build we are going to add a if statement to check if we are passing a parameter to populate the database and run the method to do it.
```C#
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
```
## Migrations
Our application is Code-First which means that the database is made from our models and not Database-First which is the other way around. 
Migrations are the commands to create our tables inside our database, to generate them we need the `dotnet ef` CLI, if you don't have it, run this command to install it globally:
```
dotnet tool install --global dotnet-ef
```
If it still not working, restart the computer. Now that you have or if you already have this tool, run this command to add the migrations:
```
dotnet ef migrations add migrationName
```
To update the database with our generated tables in the migrations we simply run this command that will get the server by our connection string set in the `Program.cs`:
```
dotnet ef database update
```
## Populating
Now that we have a database and a seed, we are going to populate the database to have some data to work with, running this command:
```
dotnet run seeddata
```
To check the database I'm using `SQL Server Management Studio 19 (SSMS)` you can download it [here](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16#download-ssms). This is how the tables are supposed to look:
<p align="center"> 
<strong>Author's Table</strong>
</p>

<p align="center">
  <img src="https://github.com/Saraivinha1703/MinimalAPIDemo/assets/62428073/f2130a1e-cbf8-46ed-9e6b-004a4c772ea7" />
</p>

<p align="center"> 
<strong>Book's Table</strong>
</p>

<p align="center">
  <img src="https://github.com/Saraivinha1703/MinimalAPIDemo/assets/62428073/d04d10d0-1644-425d-99ce-53069b965098" />
</p>

# Building Project
Now that we have our basic project structure, we are going to create methods to fetch the data, services with business logic to handle the data and data transfer objects (DTO) to filter what is passed to the front-end or not.

## Repository Pattern
The repository pattern is a design pattern, they are techniques to make the project development easier, there are a lot of them, some are used more often than others, all of them have their use, but in the right context. 
You can study the design patterns from this [site](https://refactoring.guru/design-patterns/catalog) and you should watch videos from youtube or some course from the specific design pattern that you are studying to make it easier. 
Basically the repository pattern will handle the access to the data from the rest of the app, so if you want to execute anything that have something to do with the database information, you will have to use the repository for the entity that you want.

Inside the root folder, create a `Interfaces` folder, that will contain the [interfaces](https://www.w3schools.com/cs/cs_interface.php) of our application, including the repositories interfaces. Create a `Repositories` folder inside the `Data` folder.
First we are going to define the interfaces, they will demand to any class that inherits it to implement its methods. The first interface we are going to make inside the `Interfaces` folder is a generic interface, since we are going to have CRUD operations
which is the same to any entity, it's going to make the methods implementation easier. 

Create a `Interfaces/IRepository.cs` file and configure it with something like this:

```C#
namespace YourProjectName.Interfaces;

public interface IRepository<T>
    where T : class
{
    Task<ICollection<T>> GetValues();
    Task<T> GetValue(int id);
    Task<bool> Create(T obj);
    Task<bool> Update(T obj);
    Task<bool> Delete(T obj);
    Task<bool> Save();
}
```
