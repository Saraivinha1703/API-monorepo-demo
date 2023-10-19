import clsx from 'clsx';
import { CustomButton } from '../../Components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { CustomInput } from '../../Components/CustomInput';
import { CreateBookModel } from '../../Models/CreateBook';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type CreateBookFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type RegistrationFormFields = CreateBookModel;

export const CreateBookForm = (props: CreateBookFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>();

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data: CreateBookModel) => {
    axios
      .post(
        'api/newBook',
        {
          name: data.name,
          price: data.price,
          rating: data.rating,
          createdDate: data.createdDate,
        },
        { params: { authorId: data.authorId } }
      )
      .then(() => navigate('/Read'));
  });

  return (
    <form
      onSubmit={onSubmit}
      {...props}
      className={clsx(
        'bg-gradient-to-r from-zinc-100 to-white w-1/2 mt-5 flex flex-col items-center gap-1 py-3 rounded-xl shadow-xl duration-300 shadow-black/30 hover:p-5 hover:bg-gradient-to-b mb-16',
        props.className
      )}
    >
      <div className="w-full flex flex-col gap-5 items-center">
        <h1 className="font-bold text-xl text-pastelGreen-500">New Book</h1>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'The book must have a name.' }}
          render={({ field: { onChange } }) => (
            <CustomInput.Root>
              <CustomInput.Label
                text="Name"
                className={errors.name ? 'text-red-500' : undefined}
              />
              <CustomInput.Content
                placeholder="Book's Name"
                styleType={errors.name ? 'error' : 'normal'}
                onChange={onChange}
              />
              {errors.name && (
                <CustomInput.ErrorMessage>
                  {errors.name.message}
                </CustomInput.ErrorMessage>
              )}
            </CustomInput.Root>
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{ required: 'The book must have a price.' }}
          render={({ field: { onChange } }) => (
            <CustomInput.Root>
              <CustomInput.Label
                text="Price"
                className={errors.price ? 'text-red-500' : undefined}
              />
              <CustomInput.Content
                styleType={errors.price ? 'error' : 'normal'}
                placeholder="How much does it cost? (00.00)"
                type="number"
                onChange={onChange}
              />
              {errors.price && (
                <CustomInput.ErrorMessage>
                  {errors.price.message}
                </CustomInput.ErrorMessage>
              )}
            </CustomInput.Root>
          )}
        />
        <Controller
          name="rating"
          control={control}
          rules={{
            required: 'The book must have a rating.',
            max: { value: 5, message: 'The range is between 0 and 5.' },
          }}
          render={({ field: { onChange } }) => (
            <CustomInput.Root>
              <CustomInput.Label
                text="Rating - optional"
                className={errors.rating ? 'text-red-500' : undefined}
              />
              <CustomInput.Content
                styleType={errors.rating ? 'error' : 'normal'}
                placeholder="How good is it? (0-5)"
                type="number"
                onChange={onChange}
              />
              {errors.rating && (
                <CustomInput.ErrorMessage>
                  {errors.rating.message}
                </CustomInput.ErrorMessage>
              )}
            </CustomInput.Root>
          )}
        />
        <Controller
          name="createdDate"
          control={control}
          rules={{ required: 'The book must have a date.' }}
          render={({ field: { onChange } }) => (
            <CustomInput.Root>
              <CustomInput.Label
                text="Created Date"
                className={errors.createdDate ? 'text-red-500' : undefined}
              />
              <CustomInput.Content
                type="date"
                onChange={onChange}
                styleType={errors.createdDate ? 'error' : 'normal'}
              />
              {errors.createdDate && (
                <CustomInput.ErrorMessage>
                  {errors.createdDate.message}
                </CustomInput.ErrorMessage>
              )}
            </CustomInput.Root>
          )}
        />
        <Controller
          name="authorId"
          control={control}
          rules={{ required: 'The book must have an author.' }}
          render={({ field: { onChange } }) => (
            <CustomInput.Root>
              <CustomInput.Label
                text="Author's Id"
                className={errors.authorId ? 'text-red-500' : undefined}
              />
              <CustomInput.Content
                styleType={errors.authorId ? 'error' : 'normal'}
                placeholder="Id"
                type="number"
                onChange={onChange}
              />
              {errors.authorId && (
                <CustomInput.ErrorMessage>
                  {errors.authorId.message}
                </CustomInput.ErrorMessage>
              )}
            </CustomInput.Root>
          )}
        />
      </div>

      <CustomButton.Root styleType="pink" className="mt-3">
        <CustomButton.Text text="Create Book" />
      </CustomButton.Root>
    </form>
  );
};
