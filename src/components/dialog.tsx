import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Dialog({ children, className }: Props) {
  return (
    <div
      className={clsx(
        'w-200 h-164.25 rounded-xl shadow-xl z-51 bg-white',
        className
      )}
    >
      {children}
    </div>
  );
}
