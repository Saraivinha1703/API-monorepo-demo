import { useForm, Controller, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { CreateAuthorModel } from '../../Models/CreateAuthor';
import clsx from 'clsx';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { useNavigate } from 'react-router-dom';

type CreateAuthorFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type RegistrationFormFields = CreateAuthorModel;

export const CreateAuthorForm = (props: CreateAuthorFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>();
  const navigate = useNavigate();
  const { fields, append } = useFieldArray({ name: 'books', control: control });

  const onSubmit = handleSubmit((data: CreateAuthorModel) => {
    console.log(data);
    axios.post('api/newAuthor', data).then(() => navigate('/Read'));
  });

  return (
    <form
      onSubmit={onSubmit}
      {...props}
      className={clsx(
        'bg-gradient-to-r from-zinc-100 to-white w-1/2 mt-5 mb-16 flex flex-col items-center gap-1 py-3 rounded-xl shadow-xl duration-300 shadow-black/30 hover:p-5 hover:bg-gradient-to-b',
        props.className
      )}
    >
      <div className="w-full flex flex-col gap-5 items-center">
        <h1 className="font-bold text-xl text-pastelGreen-500">New Author</h1>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'The author must have a name.' }}
          render={({ field: { onChange } }) => (
            <CustomInput.Root>
              <CustomInput.Label
                text="Name"
                className={errors.name ? 'text-red-500' : undefined}
              />
              <CustomInput.Content
                onChange={onChange}
                placeholder="Name"
                styleType={errors.name ? 'error' : 'normal'}
              />
              <CustomInput.ErrorMessage>
                {errors.name ? errors.name.message : ''}
              </CustomInput.ErrorMessage>
            </CustomInput.Root>
          )}
        />
        <Controller
          name="age"
          control={control}
          rules={{ required: 'The author must have an age.' }}
          render={({ field: { onChange } }) => (
            <CustomInput.Root>
              <CustomInput.Label
                text="Age"
                className={errors.age ? 'text-red-500' : undefined}
              />
              <CustomInput.Content
                placeholder="How old is he? (00)"
                onChange={onChange}
                type="number"
                styleType={errors.age ? 'error' : 'normal'}
              />
              <CustomInput.ErrorMessage>
                {errors.age ? errors.age.message : ''}
              </CustomInput.ErrorMessage>
            </CustomInput.Root>
          )}
        />
        {fields.map((_value, index) => {
          return (
            <div className="w-full flex flex-col items-center gap-3">
              <line className="border-t-2 border-black/10 w-3/4 rounded-lg" />
              <p className="text-yellow-500 text-xs font-semibold italic">
                NOTE: if you do not apply a value for the 'Price', 'Rating' and
                'Created Date', a value will be applied by default. (0)
              </p>
              <Controller
                name={`books.${index}.name`}
                control={control}
                rules={{ required: 'The book must have a name.' }}
                render={({ field: { onChange } }) => (
                  <CustomInput.Root>
                    <CustomInput.Label
                      text="Book's Name"
                      className={
                        errors.books && errors.books[index]?.name
                          ? 'text-red-500'
                          : undefined
                      }
                    />
                    <CustomInput.Content
                      onChange={onChange}
                      styleType={
                        errors.books && errors.books[index]?.name
                          ? 'error'
                          : 'normal'
                      }
                      placeholder="Name"
                    />
                    {errors.books && errors.books[index]?.name ? (
                      <CustomInput.ErrorMessage>
                        {errors.books[index]?.name?.message}
                      </CustomInput.ErrorMessage>
                    ) : undefined}
                  </CustomInput.Root>
                )}
              />
              <Controller
                name={`books.${index}.price`}
                control={control}
                rules={{ required: 'The book must have a price.' }}
                render={({ field: { onChange } }) => (
                  <CustomInput.Root>
                    <CustomInput.Label
                      text="Price"
                      className={
                        errors.books &&
                        errors.books[index]?.price &&
                        _value.price !== 0
                          ? 'text-red-500'
                          : undefined
                      }
                    />
                    <CustomInput.Content
                      type="number"
                      onChange={onChange}
                      styleType={
                        errors.books && errors.books[index]?.price
                          ? 'error'
                          : 'normal'
                      }
                      placeholder="How much does it cost? (00.00)"
                    />
                  </CustomInput.Root>
                )}
              />
              <Controller
                name={`books.${index}.rating`}
                control={control}
                rules={{
                  required: 'The book must have a rating.',
                  max: { value: 5, message: 'The range is between 0 and 5.' },
                }}
                render={({ field: { onChange } }) => (
                  <CustomInput.Root>
                    <CustomInput.Label
                      text="Rating"
                      className={
                        errors.books && errors.books[index]?.rating
                          ? 'text-red-500'
                          : undefined
                      }
                    />
                    <CustomInput.Content
                      type="number"
                      onChange={onChange}
                      styleType={
                        errors.books && errors.books[index]?.rating
                          ? 'error'
                          : 'normal'
                      }
                      placeholder="How good is it? (0-5)"
                    />
                    {errors.books && errors.books[index]?.rating ? (
                      <CustomInput.ErrorMessage>
                        {errors.books[index]?.rating?.message}
                      </CustomInput.ErrorMessage>
                    ) : undefined}
                  </CustomInput.Root>
                )}
              />
              <Controller
                name={`books.${index}.createdDate`}
                control={control}
                rules={{ required: 'The book must have a date.' }}
                render={({ field: { onChange } }) => (
                  <CustomInput.Root>
                    <CustomInput.Label text="Created Date" />
                    <CustomInput.Content
                      type="date"
                      onChange={onChange}
                      styleType={
                        errors.books && errors.books[index]?.createdDate
                          ? 'error'
                          : 'normal'
                      }
                    />
                  </CustomInput.Root>
                )}
              />
            </div>
          );
        })}
        <div className="w-full">
          <CustomButton.Root
            styleType="teal"
            className="mt-3 ml-[10%]"
            onClick={e => {
              e.preventDefault();
              append({
                name: '',
                price: 0,
                rating: 0,
                createdDate: new Date(),
              });
            }}
          >
            <CustomButton.Text text="Add Book +" />
          </CustomButton.Root>
        </div>
      </div>
      <CustomButton.Root styleType="pink" className="mt-3" type="submit">
        <CustomButton.Text text="Create Author" />
      </CustomButton.Root>
    </form>
  );
};
