import clsx from 'clsx';

type InputErrorMessageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const InputErrorMessage = (props: InputErrorMessageProps) => {
  return (
    <p
      className={clsx(
        'text-sm ml-5 mt-2 font-semibold text-red-500',
        props.className
      )}
    >
      {props.children}
    </p>
  );
};
