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
