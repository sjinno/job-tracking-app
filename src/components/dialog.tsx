import { ReactNode } from 'react';
import { cn } from '../lib';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Dialog({ children, className }: Props) {
  return (
    <div
      className={cn(
        'w-200 h-164.25 rounded-xl shadow-xl z-51 bg-white',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
