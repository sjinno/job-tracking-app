import { ReactNode } from 'react';
import { cn } from '../lib';

type ButtonType = 'button' | 'submit' | 'reset';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  className?: string;
};

export function Button({
  children: label,
  onClick,
  type = 'button',
  className,
}: Props) {
  return (
    <button
      className={cn(
        'border rounded bg-zinc-100 px-3 py-1 text-sm font-medium',
        className
      )}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
