import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ModalContextValue = {
  open: boolean;
  toggleOpen: () => void;
  dialog: ReactNode | null;
  onDialogChange: (node: ReactNode) => void;
};

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined
);

function createModalStore(): ModalContextValue {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<ReactNode | null>(null);

  useEffect(() => {
    if (!open) setDialog(null);
  }, [open]);

  const toggleOpen = () => setOpen((prev) => !prev);
  const onDialogChange = (node: ReactNode) => setDialog(node);

  return { open, toggleOpen, dialog, onDialogChange };
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

export function ModalProvider({ children }: { children: ReactNode }) {
  const context = createModalStore();
  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
}
