import clsx from 'clsx';

type CustomButtonTextProps = {
  text: string;
  className?: string;
};

export const CustomButtonText = (props: CustomButtonTextProps) => {
  return (
    <p className={clsx('font-semibold text-black', props.className)}>
      {props.text}
    </p>
  );
};
