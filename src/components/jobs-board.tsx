import { useModalContext } from '../hooks';
import { Button } from './button';
import { JobForm } from './job-form';
import { useJobsContext } from '../hooks/use-jobs';

export function JobsBoard() {
  const { toggleOpen, onDialogChange } = useModalContext();
  const { jobs } = useJobsContext();

  const handleClick = () => {
    onDialogChange(<JobForm />);
    toggleOpen();
  };

  return (
    <div className="my-3">
      <h2 className="font-bold text-2xl my-3">Jobs Board</h2>
      <Button onClick={handleClick}>Add job</Button>
      <div>
        {jobs.map((job, index) => (
          <p key={index}>
            {job.customerName}: {job.description} ({job.status})
          </p>
        ))}
      </div>
    </div>
  );
}
