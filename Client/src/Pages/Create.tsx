import { useState } from 'react';
import { CustomInput } from '../Components/CustomInput';
import { CustomButton } from '../Components/CustomButton';

type VariantType = 'book' | 'author';
const BookFormContent = () => {
  return (
    <>
      <h1 className="text-xl font-bold text-pastelGreen-500">New Book</h1>
      <CustomInput.Root className="w-full">
        <CustomInput.Label text="Name" />
        <CustomInput.Content placeholder="Book's Name" />
      </CustomInput.Root>

      <CustomInput.Root className="w-full">
        <CustomInput.Label text="Price" />
        <CustomInput.Content
          type="number"
          placeholder="How much does it cost? (00.00)"
        />
      </CustomInput.Root>

      <CustomInput.Root className="w-full">
        <CustomInput.Label text="Rating" />
        <CustomInput.Content
          type="number"
          placeholder="How good is it? (0-5)"
        />
      </CustomInput.Root>

      <CustomInput.Root className="w-full">
        <CustomInput.Label text="Created Date" />
        <CustomInput.Content type="date" placeholder="yyyy-mm-dd" />
      </CustomInput.Root>
    </>
  );
};
export function Create() {
  const [createType, setCreateType] = useState<VariantType>('book');
  const [authorBooksForms, setAuthorBooksForms] = useState<React.ReactNode[]>(
    []
  );
  function handleNewAuthorBook() {
    setAuthorBooksForms([...authorBooksForms, <BookFormContent />]);
    console.log(authorBooksForms);
  }
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
      <div className="w-full h-full flex flex-col items-center">
        {createType === 'book' ? (
          <form className="w-1/2 flex flex-col items-center mt-5 p-5 bg-white rounded-xl shadow-xl shadow-black/40 duration-200 hover:p-8">
            <BookFormContent />
            <CustomInput.Root className="w-full">
              <CustomInput.Label text="Author's Id" />
              <CustomInput.Content placeholder="Id" />
            </CustomInput.Root>
          </form>
        ) : (
          <div className="w-1/2 flex flex-col items-center mt-5 p-5 bg-white rounded-xl shadow-xl shadow-black/40 duration-200 hover:p-8">
            <h1 className="text-xl font-bold text-pastelGreen-500">
              New Author
            </h1>
            <p className="text-sm text-black/50 italic">
              *You must insert at least one book.
            </p>
            <CustomInput.Root className="w-full">
              <CustomInput.Label text="Name" />
              <CustomInput.Content placeholder="Authors's Name" />
            </CustomInput.Root>

            <CustomInput.Root className="w-full">
              <CustomInput.Label text="Age" />
              <CustomInput.Content
                type="number"
                placeholder="How old is he? (00)"
              />
            </CustomInput.Root>
            {authorBooksForms.length > 0
              ? authorBooksForms.map((val, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex flex-col items-center mt-3"
                    >
                      {val}
                    </div>
                  );
                })
              : null}
            <div className="w-full">
              <CustomButton.Root
                styleType="violet"
                className="mt-6"
                onClick={() => handleNewAuthorBook()}
              >
                <CustomButton.Text text="Insert a Book + " />
              </CustomButton.Root>
            </div>

            <CustomButton.Root styleType="pink" className="mt-6">
              <CustomButton.Text text="Create" />
            </CustomButton.Root>
          </div>
        )}
      </div>
    </div>
  );
}
