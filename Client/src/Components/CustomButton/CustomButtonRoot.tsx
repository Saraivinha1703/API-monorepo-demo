import clsx from 'clsx';

type VariantStyle = 'green' | 'purple' | 'teal' | 'violet' | 'pink';

type CustomButtonRootProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  styleType?: VariantStyle;
};

export const CustomButtonRoot = (props: CustomButtonRootProps) => {
  const variant = {
    green:
      'bg-gradient-to-r from-pastelGreen-200 to-pastelGreen-500 shadow-lg shadow-pastelGreen-500/50',
    purple:
      'bg-gradient-to-r from-purple-200 to-purple-500 shadow-lg shadow-purple-500/50',
    violet:
      'bg-gradient-to-r from-violet-200 to-violet-500 shadow-lg shadow-violet-500/50',
    pink: 'bg-gradient-to-r from-pink-200 to-pink-500 shadow-lg shadow-pink-500/50',
    teal: 'bg-gradient-to-r from-teal-200 to-teal-500 shadow-lg shadow-teal-500/50',
  };

  return (
    <button
      className={clsx(
        'py-1.5 px-4 m-2 rounded-lg duration-100 hover:py-2 hover:px-5 hover:bg-gradient-to-br',
        props.styleType ? variant[props.styleType] : null,
        props.className
      )}
      onClick={e => (props.onClick ? props.onClick(e) : null)}
    >
      {props.children}
    </button>
  );
};
