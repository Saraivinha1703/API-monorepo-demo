import { useState } from 'react';
import { CreateBookForm } from './forms/CreateBook';
import { CreateAuthorForm } from './forms/CreateAuthor';

type VariantType = 'book' | 'author';

export function Create() {
  const [createType, setCreateType] = useState<VariantType>('book');

  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <select
        className="shadow shadow-black/30 w-1/3 h-8 rounded-xl bg-pastelGreen-300 mt-5"
        defaultValue={'book'}
        onChange={e => setCreateType(e.target.value as VariantType)}
      >
        <option value="book">Book</option>
        <option value="author">Author</option>
      </select>
      <div className="w-full h-full flex flex-col items-center mb-20">
        {createType === 'book' ? <CreateBookForm /> : <CreateAuthorForm />}
      </div>
    </div>
  );
}
