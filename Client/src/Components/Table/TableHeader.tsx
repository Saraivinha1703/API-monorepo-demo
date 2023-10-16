import clsx from 'clsx';

type TableHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const TableHeader = (props: TableHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex justify-evenly border-b-4 border-pastelGreen-500 p-4 bg-gray-200 rounded-xl font-bold text-lg text-pastelGreen-500',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
