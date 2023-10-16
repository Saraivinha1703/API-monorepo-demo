import clsx from 'clsx';

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const TableRow = (props: TableRowProps) => {
  return (
    <div
      className={clsx(
        'flex justify-evenly border-b-2 border-gray-400 p-2 rounded-xl',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
