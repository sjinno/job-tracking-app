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
      <h2 className="font-bold text-2xl my-3">Jobs Board</h2>
      <Button onClick={handleClick}>Add job</Button>
    </div>
  );
}
