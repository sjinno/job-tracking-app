import clsx from 'clsx';
import { ReactNode } from 'react';
import { useModalContext } from '../hooks';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Overlay({ children: dialog, className }: Props) {
  const { toggleOpen } = useModalContext();

  return (
    <div
      className={clsx('fixed inset-0 bg-overlay z-50', className)}
      onClick={toggleOpen}
    >
      {dialog}
    </div>
  );
}
