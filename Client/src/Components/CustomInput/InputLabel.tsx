import clsx from 'clsx';

type InputLabelProps = {
  text: string;
  className?: string;
};

export const InputLabel = (props: InputLabelProps) => {
  return (
    <p
      className={clsx(
        'ml-2 font-semibold text-pastelGreen-500',
        props.className
      )}
    >
      {props.text}
    </p>
  );
};
