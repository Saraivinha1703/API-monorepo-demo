import clsx from 'clsx';

type TableCellProps = {
  text: string;
  className?: string;
};

export const TableCell = (props: TableCellProps) => {
  return (
    <div className={clsx('w-full text-center', props.className)}>
      <p>{props.text}</p>
    </div>
  );
};
