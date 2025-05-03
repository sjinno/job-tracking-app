import { useEffect } from 'react';
import { useModalContext } from '../hooks';
import { Dialog } from './dialog';
import { Overlay } from './overlay';

export function Modal() {
  const { open, toggleOpen } = useModalContext();

  useEffect(() => {
    const closeModalWithEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleOpen();
    };

    window.addEventListener('keydown', closeModalWithEscape);

    return () => {
      window.removeEventListener('keydown', closeModalWithEscape);
    };
  }, []);

  if (!open) return null;

  return (
    <Overlay className="flex justify-center items-center">
      <Dialog>dialog</Dialog>
    </Overlay>
  );
}
