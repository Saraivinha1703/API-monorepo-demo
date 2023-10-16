import clsx from 'clsx';

type CustomFooterProps = {
  className?: string;
};

export const CustomFooter = (props: CustomFooterProps) => {
  return (
    <div
      className={clsx(
        'flex h-28 items-center justify-evenly border-t border-gray-300',
        props.className
      )}
    >
      <p className="font-semibold text-black/40 text-lg">Contacts: </p>
      <p>Somebody's Name</p>
      <p>email@somemail.something</p>
      <p>Some Number: +000 000 000 000</p>
    </div>
  );
};
