import clsx from 'clsx';

type InputIconProps = {
  children: React.ReactNode;
  className?: string;
};

export const InputIcon = (props: InputIconProps) => {
  return <div className={clsx(props.className)}>{props.children}</div>;
};
