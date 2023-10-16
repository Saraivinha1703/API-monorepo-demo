import clsx from 'clsx';

type TableRootProps = {
  children: React.ReactNode;
  className?: string;
};
export const TableRoot = (props: TableRootProps) => {
  return (
    <div
      className={clsx(
        'bg-gray-100 w-[90%] rounded-xl shadow-lg shadow-black/20',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
