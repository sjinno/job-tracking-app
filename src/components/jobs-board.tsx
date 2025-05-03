import { useModalContext } from '../hooks';
import { Button } from './button';
import { JobForm } from './job-form';

export function JobsBoard() {
  const { toggleOpen, onDialogChange } = useModalContext();

  const handleClick = () => {
    onDialogChange(<JobForm />);
    toggleOpen();
  };

  return (
    <div className="my-3">
      <Button onClick={handleClick}>Add job</Button>
    </div>
  );
}
