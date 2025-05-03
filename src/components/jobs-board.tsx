import { useModalContext } from '../hooks';
import { Button } from './button';

export function JobsBoard() {
  const { toggleOpen } = useModalContext();

  return (
    <div className="my-3">
      <Button label="Add job" onClick={toggleOpen} />
    </div>
  );
}
