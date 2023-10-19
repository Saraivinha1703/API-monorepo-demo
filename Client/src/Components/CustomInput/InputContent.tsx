import clsx from 'clsx';

type VariantStyle = 'normal' | 'error' | 'warning';
type InputContentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  styleType: VariantStyle;
};

export const InputContent = (props: InputContentProps) => {
  const variant = {
    normal: 'border-pastelGreen-500 placeholder-zinc-300 text-black',
    error: 'border-red-500 placeholder-red-300 text-red-500',
    warning: 'border-yellow-500 placeholder-yellow-300 text-yellow-500',
  };

  return (
    <input
      {...props}
      className={clsx(
        'border rounded-xl h-10 shadow-md shadow-black/10 w-full p-2 duration-150 hover:shadow-lg',
        variant[props.styleType],
        props.className
      )}
    />
  );
};
