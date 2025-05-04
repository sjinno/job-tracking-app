import { useModalContext, useJobsContext } from '../../hooks';
import { Button } from '../button';
import { JobForm } from '../job-form';
import { useMemo } from 'react';
import { Job, JobStatus } from '../../models';
import { BoardColumn } from './board-column';

export function JobsBoard() {
  const { toggleOpen, onDialogChange } = useModalContext();
  const { jobs } = useJobsContext();

  const jobsByStatus = useMemo(() => {
    const record: Record<JobStatus, Job[]> = {
      'not-yet-started': [],
      'in-progress': [],
      completed: [],
    };

    for (const job of jobs) {
      record[job.status].push(job);
    }

    return record;
  }, [jobs]);

  const handleClick = () => {
    onDialogChange(<JobForm />);
    toggleOpen();
  };

  return (
    <div className="my-3 grow flex flex-col">
      <h2 className="font-bold text-2xl my-3">Jobs Board</h2>
      <div>
        <Button className="block" onClick={handleClick}>
          Add job
        </Button>
      </div>
      <div className="my-3 flex gap-1.5 grow">
        {Object.entries(jobsByStatus).map(([status, jobs], _) => (
          <BoardColumn key={status} status={status as JobStatus} jobs={jobs} />
        ))}
      </div>
    </div>
  );
}
