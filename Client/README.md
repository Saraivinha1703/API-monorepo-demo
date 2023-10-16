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

# Working on the Screens
## Home
Let's make our application a little bit prettier. In this screen I don't have much to do, because this is just a learning project, so I'm just going to put an icon and a simple text inside a box. The icon library I'm 
going to use is [`React Icons`](https://react-icons.github.io/react-icons/icons?name=io) and the code to make the `Home` screen is:
`Home.tsx`
```TSX
import { IoMdPlanet } from 'react-icons/io';

export function Home() {
  return (
    <div className="flex items-center">
      <div className="flex flex-col justify-center items-center p-5 rounded-xl shadow-lg shadow-black/30 duration-75 bg-gray-100 hover:p-8">
        <p className="text-lg text-pastelGreen-500 font-bold">
          Here is our Home screen!
        </p>
        <IoMdPlanet className="text-orange-400 text-[70px]" />
      </div>
    </div>
  );
}
```
Now let's change somethings in our `index.tsx` file so we can set our components in an easier way.

`index.tsx`
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
    <div className="flex flex-col h-screen justify-between">
      <BrowserRouter>
        <div className="shadow-md shadow-black/30">
          <Navbar />
        </div>
        <div className="flex h-full items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Read" element={<Read />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Update" element={<Update />} />
            <Route path="/Delete" element={<Delete />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
```

It should look something like this:
![image](https://github.com/Saraivinha1703/API-monorepo-demo/assets/62428073/ff32a7a7-6d3e-4476-83be-ee148456de8b)

## Consult

In this screen we'll have three sections:
 1. The first section, is the data that we want to search. Here, we'll select the endpoint that we want to fetch the data.
 2. The second section, we are going to have a table component that we'll make using the [`Composition Pattern`](https://www.youtube.com/watch?v=vPRdY87_SH0).
 3. And finally, we'll simply make a footer with our contact information.


### Drop down to select the endpoint
In the `Read.tsx` file we'll have a `div` that holds everything, and here is how we are going to set it:
```TSX
<div className="flex flex-col w-full h-full">
{/* All the code for this file is here */}
</div>
```
Now lets setup our search drop down.

`Read.tsx`
```TSX
<div className="flex mt-8 items-center justify-center flex-col">
        <p className="font-semibold my-2 text-xl text-pastelGreen-600 px-7">
          Select the data that you want to search
        </p>
        <select
          className="shadow shadow-black/30 w-1/3 h-8 rounded-xl bg-pastelGreen-300"
          onChange={e => setEndpoint(e.target.value)}
          defaultValue={'api/getBooksAndAuthors'}
        >
          <option disabled className="text-white text-center font-semibold">
            Books Options
          </option>
          <option value="api/getBooksAndAuthors">
            Get All Books And Authors
          </option>
          <option value="api/getBooks">Get All Books</option>
          <option disabled className="text-white text-center font-semibold">
            Authors Options
          </option>
          <option value="api/getAuthorsAndBooks">
            Get All Authors And Books
          </option>
          <option value="api/getAuthors">Get All Authors</option>
        </select>
      </div>
```
We are basically putting the endpoint that we want to call inside the `value` property of each `option` that we have, and putting one as default in the `select` itself. The disabled ones, I'm just using to divide 
the Book's endpoint from the Author's endpoints.

*_NOTE:_* The colors used in this project, I generated in this website [`UIColors`](https://uicolors.app/create), specific to use with tailwind and I just added inside the `extend` property in `tailwind.config.js`. 
It looks like this:

`tailwind.config.js`
```JS
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastelGreen: {
          50: '#f1fcf2',
          100: '#dff9e4',
          200: '#c0f2c9',
          300: '#74e18a',
          400: '#56d26f',
          500: '#2fb84b',
          600: '#21983a',
          700: '#1d7830',
          800: '#1c5f2b',
          900: '#194e26',
          950: '#082b11',
        },
      },
    },
  },
  plugins: [],
};
```
Now we'll make a `Models` folder that will have the types that we get from each endpoint. For example if we use Insomnia to call one of ours endpoints, it'll look like this: 

<p align="center">
   <img src="https://github.com/Saraivinha1703/API-monorepo-demo/assets/62428073/90957ef3-92fc-4e49-81e4-2e856bffd840"/>
</p>

So we need to make models that will say to our front-end application that those are the objects that will be returned from the back-end. The models that we'll are these:

`AuthorOnly.ts`
```TS
export type AuthorOnlyModel = {
  id: number;
  name: string;
  age: number;
};
```
`BooksOnly.ts`
```TS
export type BooksOnlyModel = {
  id: number;
  name: string;
  price: number;
  rating: number;
  createdDate: Date;
};
```
`AuthorsAndBooks.ts`
```TS
import { BooksOnlyModel } from './BooksOnly';

export type AuthorsAndBooksModel = {
  id: number;
  name: string;
  age: number;
  books: BooksOnlyModel[];
};
```
`BooksAndAuthors.ts`
```TS
import { AuthorOnlyModel } from './AuthorOnly';

export type BooksAndAuthorsModel = {
  id: number;
  name: string;
  price: number;
  rating: number;
  createdDate: Date;
  author: AuthorOnlyModel;
};
```
Inside our `Read.tsx` file, but outside the exported function, we'll add a `Variant` type, which means that our data can variate between different types of data.
```TSX
type VariantType =
  | AuthorsAndBooksModel
  | BooksAndAuthorsModel
  | BooksOnlyModel
  | AuthorOnlyModel;
```
Now inside our exported function we'll add the following code:
```TSX
const [endpoint, setEndpoint] = useState('api/getBooksAndAuthors');
  const [data, setData] = useState<VariantType[]>([]);

  useEffect(() => {
    axios.get(endpoint).then(res => setData(res.data));
  }, [endpoint]);
```
Here we are setting a `State` which means that we'll re-render the screen every time that this value change. In some cases this could be bad in terms of performance, but in this one it's fine, because it's just one 
state, not many, and we need to re-render the screen, so the information actually change in our screen. The next bit of code we are using a [`React Hook`](https://legacy.reactjs.org/docs/hooks-intro.html) called 
`useEffect` which is called every time that a value passed in its dependencies changes (if it does not have any dependency, it'll run just one time when the component renders). 

For the next part we'll need `clsx` so install it using: 
```
yarn add clsx
```

```
npm install clsx
```
## Composition Pattern
Now, make a new folder inside your `Components` folder called `Table` and inside it make the following files: `index.ts`, `TableRoot.tsx`, `TableHeader.tsx`, `TableRow.tsx` and `TableCell.tsx`.
We'll basically make everything that makes a table, but each part of it inside a different component and make a group that contains all of them.

`TableRoot.tsx`
```TSX
import clsx from 'clsx';

type TableRootProps = {
  children: React.ReactNode;
  className?: string;
};
export const TableRoot = (props: TableRootProps) => {
  return (
    <div
      className={clsx(
        'bg-gray-100 w-[90%] rounded-xl shadow-lg shadow-black/20',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
```
`TableHeader.tsx`
```TSX
import clsx from 'clsx';

type TableHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const TableHeader = (props: TableHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex justify-evenly border-b-4 border-pastelGreen-500 p-4 bg-gray-200 rounded-xl font-bold text-lg text-pastelGreen-500',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
```
`TableRow.tsx`
```TSX
import clsx from 'clsx';

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const TableRow = (props: TableRowProps) => {
  return (
    <div
      className={clsx(
        'flex justify-evenly border-b-2 border-gray-400 p-2',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
```
`TableCell.tsx`
```TSX
import clsx from 'clsx';

type TableCellProps = {
  text: string;
  className?: string;
};

export const TableCell = (props: TableCellProps) => {
  return (
    <div className={clsx('w-full text-center', props.className)}>
      <p>{props.text}</p>
    </div>
  );
};

```
`index.tsx`
```TS
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableRoot } from './TableRoot';
import { TableRow } from './TableRow';

export const Table = {
  Root: TableRoot,
  Cell: TableCell,
  Header: TableHeader,
  Row: TableRow,
};
```

Now we'll make the table itself inside our `Read.tsx` file

```TSX
 <div className="w-full h-full flex flex-col items-center justify-between">
        <Table.Root className="my-10">
          <Table.Header>
            {data[0] !== undefined
              ? Object.entries(data[0]).map(([key]) => (
                  <Table.Cell
                    text={
                      key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, ' $1')
                        .trim()
                    }
                  />
                ))
              : null}
          </Table.Header>
          {data.map(value => {
            if (value !== undefined)
              return (
                <Table.Row>
                  {Object.values(value).map(val => {
                    return (
                      <Table.Cell
                        text={
                          typeof val !== 'object' ? (
                            dateRegex.test(val) ? (
                              val.toString().split('T')[0]
                            ) : (
                              val
                            )
                          ) : (
                            <button
                              className="py-1.5 px-3 rounded-lg shadow-lg shadow-pastelGreen-500/50 bg-gradient-to-r from-pastelGreen-300 to-pastelGreen-500 duration-150 hover:bg-gradient-to-br hover:py-2 hover:px-4"
                              onClick={() => toggleModal(true, val)}
                            >
                              <p className="text-black/80">See Values</p>
                            </button>
                          )
                        }
                      />
                    );
                  })}
                </Table.Row>
              );
          })}
        </Table.Root>
        <CustomFooter className="w-full" />
      </div>
```
There is a lot going on here, but it is actually very simple. We are basically displaying the keys and the values that we have from our endpoints regardless of what is returned from our endpoints. But here we have a 
function that we do not have implemented yet. This function is used to show the information that is inside of an object in a pop up, instead of writing the object in the table, so let's implement it.

First, we'll add the following code outside the `return` and inside the exported function:

```TSX
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const modalContent = useRef<BooksOnlyModel[] | AuthorOnlyModel>();

  function toggleModal(
    open: boolean,
    obj?: BooksOnlyModel[] | AuthorOnlyModel
  ) {
    setModalVisible(open);
    modalContent.current = obj;
  }
```
Now, inside the return, we'll add a `dialog` tag, which opens a dialog like the `Modal` component  from `React Native`
```TSX
<dialog
        open={modalVisible}
        className="absolute top-0 w-full h-full items-center justify-center bg-black/40"
      >
        <div className="flex items-center justify-center my-16">
          <div className="flex flex-col items-center justify-center w-1/2 p-4 bg-white rounded-xl max-h-[570px] overflow-scroll scrollbar-hide shadow-xl shadow-black/30">
            {Array.isArray(modalContent.current) ? (
              <Table.Root>
                <Table.Header>
                  <Table.Cell text="Id" />
                  <Table.Cell text="Name" />
                  <Table.Cell text="Price" />
                  <Table.Cell text="Rating" />
                  <Table.Cell text="Created Date" />
                </Table.Header>
                {modalContent.current.map(books => {
                  return (
                    <Table.Row>
                      <Table.Cell text={books.id.toString()} />
                      <Table.Cell text={books.name} />
                      <Table.Cell text={books.price.toString()} />
                      <Table.Cell text={books.rating.toString()} />
                      <Table.Cell
                        text={books.createdDate.toString().split('T')[0]}
                      />
                    </Table.Row>
                  );
                })}
              </Table.Root>
            ) : typeof modalContent.current === 'object' ? (
              Object.entries(modalContent.current).map(([key, val]) => {
                return (
                  <div className="flex justify-start w-full text-center">
                    <p className="mb-2 text-pastelGreen-500 font-semibold mr-6">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </p>
                    <p>{val}</p>
                  </div>
                );
              })
            ) : (
              ''
            )}
            <button
              className="bg-gradient-to-r from-red-300 to-red-600 py-1.5 px-3 mt-4 text-white font-semibold text-lg rounded-lg shadow-lg shadow-red-500/50 duration-150 hover:py-2 hover:px-4 hover:bg-gradient-to-br"
              onClick={() => toggleModal(false)}
            >
              <p>Close</p>
            </button>
          </div>
        </div>
      </dialog>
```
Here we are making a table if we have multiple objects or just showing one object. If we run the project with the `dotnet watch` command, we should have the `Consult` screen looking something like this:

<p>
   <img src="https://github.com/Saraivinha1703/API-monorepo-demo/assets/62428073/2748f0e0-ee10-4d2a-b12d-ea7eb225b389"/>
</p>
