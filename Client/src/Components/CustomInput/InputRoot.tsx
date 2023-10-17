import clsx from 'clsx';

type InputRootProps = {
  children: React.ReactNode;
  className?: string;
};

export const InputRoot = (props: InputRootProps) => {
  return (
    <div
      className={clsx('mt-4 w-1/4 flex flex-col items-start', props.className)}
    >
      {props.children}
    </div>
  );
};
