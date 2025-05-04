import { useEffect } from 'react';
import { useModalContext } from '../providers';
import { Dialog } from './dialog';
import { Overlay } from './overlay';
import { cn } from '../lib';

export function Modal() {
  const { open, toggleOpen, dialog } = useModalContext();

  useEffect(() => {
    const closeModalWithEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) toggleOpen();
    };

    window.addEventListener('keydown', closeModalWithEscape);

    return () => {
      window.removeEventListener('keydown', closeModalWithEscape);
    };
  }, [open]);

  return (
    <Overlay
      className={cn(
        'flex justify-center items-center transition-opacity duration-300',
        open
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      )}
    >
      <Dialog
        className={cn(
          'px-12 py-6 transition-all duration-300 transform',
          open
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-2'
        )}
      >
        {dialog}
      </Dialog>
    </Overlay>
  );
}
