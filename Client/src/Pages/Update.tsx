import { useState, useRef } from 'react';
import { CustomInput } from '../Components/CustomInput';
import { CustomButton } from '../Components/CustomButton';
import { useNavigate } from 'react-router-dom';

type UpdateTypeVariant = 'book' | 'author';

export function Update() {
  const [updateType, setUpdateType] = useState<UpdateTypeVariant>('book');

  const idToUpdate = useRef<number>(0);

  const navigate = useNavigate();

  function handleUpdate() {
    if (updateType === 'book')
      navigate(`/UpdateBookForm/${idToUpdate.current}`, {
        state: { bookId: idToUpdate.current },
      });
    else
      navigate(`/UpdateAuthorForm/${idToUpdate.current}`, {
        state: { authorId: idToUpdate.current },
      });
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <select
        className="shadow shadow-black/30 w-1/3 h-8 rounded-xl bg-pastelGreen-300 mt-5"
        defaultValue={'book'}
        onChange={e => setUpdateType(e.target.value as UpdateTypeVariant)}
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
          {updateType === 'book' ? (
            <CustomInput.Root>
              <CustomInput.Label text="Insert the Book's Id" />
              <CustomInput.Content
                styleType="normal"
                type="number"
                placeholder="Book's Id"
                onChange={e => (idToUpdate.current = parseInt(e.target.value))}
              />
            </CustomInput.Root>
          ) : (
            <CustomInput.Root>
              <CustomInput.Label text="Insert the Author's Id" />
              <CustomInput.Content
                styleType="normal"
                placeholder="Author's Id"
                onChange={e => (idToUpdate.current = parseInt(e.target.value))}
              />
            </CustomInput.Root>
          )}
          <CustomButton.Root styleType="teal" onClick={() => handleUpdate()}>
            <CustomButton.Text text="Search To Update" />
          </CustomButton.Root>
        </div>
      </div>
    </div>
  );
}
