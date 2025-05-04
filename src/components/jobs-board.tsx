import { useModalContext } from '../hooks';
import { Button } from './button';
import { JobForm } from './job-form';
import { useJobsContext } from '../hooks/use-jobs';
import { useMemo } from 'react';
import { formatJobStatus, Job, JobStatus } from '../models';
import { Circle } from 'lucide-react';
import { cn } from '../lib';

export function JobsBoard() {
  const { toggleOpen, onDialogChange } = useModalContext();
  const { jobs } = useJobsContext();

  const jobsByStatus = useMemo(() => {
    const record: Record<JobStatus, Job[]> = {
      'not-yet-completed': [],
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
          <BoardColumn key={status} header={status as JobStatus} />
        ))}
      </div>
    </div>
  );
}

type BoardColumnProps = {
  header: JobStatus;
};

function BoardColumn({ header }: BoardColumnProps) {
  return (
    <div className="w-87 bg-board-column border border-zinc-200 rounded px-5 py-2.5">
      <ColumnHeader header={header} />
    </div>
  );
}

function ColumnHeader({ header }: Pick<BoardColumnProps, 'header'>) {
  const circle = (
    <Circle
      className={cn(
        'inline-block mr-1.5 mt-[0.0625rem] h-4',
        header === 'not-yet-completed' && 'text-sky-700 fill-sky-100',
        header === 'in-progress' && 'text-yellow-700 fill-yellow-100',
        header === 'completed' && 'text-orange-700 fill-orange-100'
      )}
      strokeWidth={3}
    />
  );
  const columnHeader = formatJobStatus(header);

  return (
    <div className="flex items-center">
      {circle}
      <h2 className="font-semibold flex items-center h-8">{columnHeader}</h2>
    </div>
  );
}
