# Default Readme File - Comes with the Vite project creation  
## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Starting Front-End Development
In the front-end we are going to begin with the project structure. Create a `Components` folder, it'll contain all application's components and make a `Pages` folder which will have all the pages of our client application. so let's make a `Home.tsx`, `Create.tsx`, `Delete.tsx`, `Update.tsx` and a `index.tsx` files. If I were going 
to make a big project I probably wouldn't go with this structure, but we can let the big projects to other github repositories.

## Adding Tailwind
[Tailwind](https://tailwindcss.com/) is a CSS framework with lots of classes to easily build your application's style. 

Let's start installing tailwind in our project following their documentation that you can check [here](https://tailwindcss.com/docs/guides/vite).
In the terminal, inside our project run these two commands:

`yarn:`
```
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

`npm:`
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Now we are going to add all the paths of our project that use Tailwind. Inside `tailwind.config.js` the `content` field should be an empty array, we are going to change it making the file look like this: 

```TS
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Adding axios
To make the requests to our API we can use the built-in functions that ES provides or install libraries to make it easier. We'll use [axios](https://axios-http.com/docs/intro) to make http requests.
To install it we simply run the command:

`npm:`
```
npm install axios
```
`yarn:`
```
yarn add axios
```
# Working on the Pages
Before build our pages, let's install [`react-router-dom`](https://reactrouter.com/en/main) and our application's routes. To install it run:

`npm:`
```
npm install react-router-dom
```

`yarn:`
```
yarn add react-router-dom
```

With this library, we are going to return something in every screen just to test if it's calling them correctly, so your files should look like this:

`Home.tsx`
```TSX
export function Home() {
  return (
    <div>
      <p>Here is our Home screen!</p>
    </div>
  );
}
```
`Create.tsx`
```TSX
export function Create() {
    return (
        <div>
            <p>Here is our screen to create data!</p>
        </div>
    )
}
```
`Update.tsx`
```TSX
export function Update() {
    return (
        <div>
            <p>Here is our screen to update data!</p>
        </div>
    )
}
```
`Delete.tsx`
```TSX
export function Delete() {
    return (
        <div>
            <p>Here is our screen to delete data!</p>
        </div>
    )
}
```
Inside the `Components` folder, create another folder called `Navbar` and inside it create a `index.tsx` file, which will contain our 'traditional' navigation bar.
`Navbar/index.tsx`
```TSX
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Read">Consult</Link>
        </li>
        <li>
          <Link to="/Create">Create</Link>
        </li>
        <li>
          <Link to="/Update">Update</Link>
        </li>
        <li>
          <Link to="/Delete">Delete</Link>
        </li>
      </ul>
    </nav>
  );
};
```
Now let's put it all together inside our `Pages/index.tsx`:
```TSX
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Read } from './Read';
import { Create } from './Create';
import { Home } from './Home';
import { Navbar } from '../Components/Navbar';
import { Update } from './Update';
import { Delete } from './Delete';

export function MainPage() {
  return (
    <BrowserRouter>
      <div className="bg-slate-500">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Read" element={<Read />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Delete" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}
```
You can just run the front-end application, since we are not going to call any API endpoints. Open the project folder inside the terminal and run:

`npm:`
```
npm run dev
```
`yarn:`
```
yarn dev
```
It should look like this
<p align="center">
   <img src="https://github.com/Saraivinha1703/API-monorepo-demo/assets/62428073/b1ef2b40-1c22-46e1-8690-90c88c84413e"/>
</p>

## Styling Navbar
Now that we have everything in place, let's add some classes to make it prettier. Checkout the [Tailwind Documentation](https://tailwindcss.com/docs/installation) to understand how to use their classes. We'll use 
variants to switch styles when the link in the navigation bar is clicked, so go to our `Components/Navbar/index.tsx` file and code it to look like this:
```TSX
import { useState } from 'react';
import { Link } from 'react-router-dom';

type VariantName = 'Home' | 'Read' | 'Create' | 'Update' | 'Delete' | 'Default';

type Variant = {
  [key in VariantName]: string;
};

export const Navbar = () => {
  const [selected, setSelected] = useState<VariantName>('Home');

  const selectedStyle = 'text-pastelGreen-500 font-bold';

  const variant: Variant = {
    Home: selectedStyle,
    Read: selectedStyle,
    Create: selectedStyle,
    Update: selectedStyle,
    Delete: selectedStyle,
    Default: 'text-gray-800',
  };

  const getVariant = (name: VariantName) =>
    selected === name ? variant[selected] : variant.Default;

  return (
    <nav>
      <ul className="flex flex-row justify-evenly p-4 items-center">
        <li className="w-1/6 text-center">
          <p className="font-bold text-xl">SomeNameOrLogo</p>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => setSelected('Home')}
            className={getVariant('Home')}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/Read"
            onClick={() => setSelected('Read')}
            className={getVariant('Read')}
          >
            Consult
          </Link>
        </li>
        <li>
          <Link
            to="/Create"
            onClick={() => setSelected('Create')}
            className={getVariant('Create')}
          >
            Create
          </Link>
        </li>
        <li>
          <Link
            to="/Update"
            onClick={() => setSelected('Update')}
            className={getVariant('Update')}
          >
            Update
          </Link>
        </li>
        <li>
          <Link
            to="/Delete"
            onClick={() => setSelected('Delete')}
            className={getVariant('Delete')}
          >
            Delete
          </Link>
        </li>
      </ul>
    </nav>
  );
};
```
Now it should look something like this:
<p align="center">
   <img src="https://github.com/Saraivinha1703/API-monorepo-demo/assets/62428073/c946ba6c-0a7e-4857-8a9b-e5d07dba233c"/>
</p>
