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
        status === 'not-yet-started' &&
          'text-not-yet-started fill-bg-not-yet-started',
        status === 'in-progress' && 'text-in-progress fill-bg-in-progress',
        status === 'completed' && 'text-completed fill-bg-completed'
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
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
