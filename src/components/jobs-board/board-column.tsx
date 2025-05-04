import { Circle } from 'lucide-react';
import { formatJobStatus, Job, JobStatus } from '../../models';
import { cn } from '../../lib';
import { JobCard } from '../job-card';

type BoardColumnProps = {
  status: JobStatus;
  jobs: Job[];
};

export function BoardColumn({ status, jobs }: BoardColumnProps) {
  return (
    <div className="w-87 bg-board-column border border-zinc-300 rounded px-5 py-2.5">
      <ColumnHeader status={status} />
      <ColumnData jobs={jobs} />
    </div>
  );
}

function ColumnHeader({ status }: Pick<BoardColumnProps, 'status'>) {
  const circle = (
    <Circle
      className={cn(
        'inline-block mr-1.5 mt-[0.0625rem] h-4',
        status === 'not-yet-started' && 'text-sky-700 fill-sky-100',
        status === 'in-progress' && 'text-yellow-700 fill-yellow-100',
        status === 'completed' && 'text-orange-700 fill-orange-100'
      )}
      strokeWidth={3}
    />
  );
  const columnHeader = formatJobStatus(status);

  return (
    <div className="flex items-center">
      {circle}
      <h2 className="font-semibold flex items-center h-8">{columnHeader}</h2>
    </div>
  );
}

function ColumnData({ jobs }: Pick<BoardColumnProps, 'jobs'>) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard job={job} />
      ))}
    </div>
  );
}
