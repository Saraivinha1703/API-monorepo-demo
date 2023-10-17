import { CustomInput } from '../CustomInput';

export const BookFormContent = () => {
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
