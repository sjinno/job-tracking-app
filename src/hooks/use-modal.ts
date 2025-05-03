import { createContext, useContext, useState } from 'react';

type ModalContextValue = {
  open: boolean;
  toggleOpen: () => void;
};

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined
);

export function useModal(): ModalContextValue {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  return { open, toggleOpen };
}

export function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'useModalContext must be used within a ModalContext.Provider'
    );
  }
  return context;
}
