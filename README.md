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
