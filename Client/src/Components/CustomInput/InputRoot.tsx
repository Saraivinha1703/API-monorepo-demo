import clsx from 'clsx';

type InputRootProps = {
  children: React.ReactNode;
  className?: string;
};

export const InputRoot = (props: InputRootProps) => {
  return (
    <div className={clsx('w-3/4 flex flex-col items-start', props.className)}>
      {props.children}
    </div>
  );
};
