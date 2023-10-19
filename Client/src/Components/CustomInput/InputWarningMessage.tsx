import clsx from 'clsx';

type InputWarningMessageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const InputWarningMessage = (props: InputWarningMessageProps) => {
  return (
    <p
      className={clsx(
        'text-sm ml-5 mt-2 font-semibold text-yellow-500',
        props.className
      )}
    >
      {props.children}
    </p>
  );
};
