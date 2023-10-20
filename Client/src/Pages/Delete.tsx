import { useState, useRef } from 'react';
import { CustomInput } from '../Components/CustomInput';
import { CustomButton } from '../Components/CustomButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type DeleteTypeVariant = 'book' | 'author';

export function Delete() {
  const [deleteType, setDeleteType] = useState<DeleteTypeVariant>('book');
  const idToDelete = useRef<number>(0);
  const navigate = useNavigate();

  function handleDelete() {
    if (idToDelete.current !== 0)
      deleteType === 'book'
        ? axios({
            method: 'delete',
            baseURL: '/api/removeBook',
            params: { bookId: idToDelete.current },
          })
            .then(res => console.log(res))
            .then(() => navigate('/Read'))
        : axios({
            method: 'delete',
            baseURL: '/api/removeAuthor',
            params: { authorId: idToDelete.current },
          })
            .then(res => console.log(res))
            .then(() => navigate('/Read'));
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <select
        className="shadow shadow-black/30 w-1/3 h-8 rounded-xl bg-pastelGreen-300 mt-5"
        defaultValue={'book'}
        onChange={e => setDeleteType(e.target.value as DeleteTypeVariant)}
      >
        <option value="book">Book</option>
        <option value="author">Author</option>
      </select>
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="shadow-lg shadow-black/25 p-5 flex flex-col items-center gap-3 w-1/2 rounded-lg duration-200 hover:p-8
        "
        >
          <h1 className="font-bold text-xl text-pastelGreen-500">Update</h1>
          {deleteType === 'book' ? (
            <CustomInput.Root>
              <CustomInput.Label text="Insert the Book's Id" />
              <CustomInput.Content
                styleType="normal"
                type="number"
                placeholder="Book's Id"
                onChange={e => (idToDelete.current = parseInt(e.target.value))}
              />
            </CustomInput.Root>
          ) : (
            <CustomInput.Root>
              <CustomInput.Label text="Insert the Author's Id" />
              <CustomInput.Content
                styleType="normal"
                placeholder="Author's Id"
                onChange={e => (idToDelete.current = parseInt(e.target.value))}
              />
            </CustomInput.Root>
          )}
          <CustomButton.Root styleType="red" onClick={() => handleDelete()}>
            <CustomButton.Text text="Delete Item" />
          </CustomButton.Root>
        </div>
      </div>
    </div>
  );
}
