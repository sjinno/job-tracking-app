import { ReactNode } from 'react';
import { useModalContext } from '../providers';
import { cn } from '../lib';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Overlay({ children: dialog, className }: Props) {
  const { toggleOpen } = useModalContext();

  return (
    <div
      className={cn('fixed inset-0 bg-overlay z-50', className)}
      onClick={toggleOpen}
    >
      {dialog}
    </div>
  );
}
