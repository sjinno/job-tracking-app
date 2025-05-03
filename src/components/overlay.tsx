import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Overlay({ children: dialog, className }: Props) {
  return (
    <div className={clsx('fixed inset-0 bg-overlay z-50', className)}>
      {dialog}
    </div>
  );
}
