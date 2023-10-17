import clsx from 'clsx';

type InputContentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputContent = (props: InputContentProps) => {
  return (
    <input
      placeholder={props.placeholder}
      type="number"
      className={clsx(
        'border border-pastelGreen-500 rounded-xl h-8 shadow-md shadow-black/10 w-full',
        props.className
      )}
      onChange={e => (props.onChange ? props.onChange(e) : null)}
    />
  );
};
