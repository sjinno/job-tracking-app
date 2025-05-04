import { ChevronDown } from 'lucide-react';
import { cn } from '../lib';
import { formatJobStatus, Job, JobStatus, jobStatuses } from '../models';
import { useState } from 'react';
import { useJobsContext } from '../providers';

type Props = {
  job: Job;
};

export function JobCard({ job }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-3 py-1.5 bg-white border border-zinc-300 shadow rounded-lg my-3 text-sm">
      <div>
        <h3>
          <Label label="Custome Name" />
          {job.customerName}
        </h3>
        <p>
          <Label label="Description" />
          {job.description}
        </p>
        <div className="flex items-center h-7">
          <Label label="Status" />
          <div className="hover:bg-zinc-100 ml-1.5 px-1 mt-0.5 flex items-center relative">
            <div
              className="cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Status status={job.status} />
              <ChevronDown className="inline-block h-2.5" strokeWidth={5} />
            </div>
            <SelectPanel job={job} open={open} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ label }: { label: string }) {
  return <span className="font-semibold">{label}: </span>;
}

function Status({ status }: { status: JobStatus }) {
  const label = formatJobStatus(status);

  return (
    <button
      className={cn(
        'border-1 rounded-3xl px-2 font-semibold my-1 text-xs',
        status === 'not-yet-started' &&
          'border-not-yet-started/50 bg-bg-not-yet-started text-not-yet-started',
        status === 'in-progress' &&
          'border-in-progress bg-bg-in-progress text-in-progress',
        status === 'completed' &&
          'border-completed bg-bg-completed text-completed'
      )}
    >
      {label}
    </button>
  );
}

function SelectPanel({ job, open }: { job: Job; open: boolean }) {
  const { updateJob } = useJobsContext();

  const otherStatuses = jobStatuses.filter((s) => s !== status);

  return (
    <div
      className={cn(
        'absolute left-0 top-7 w-42 bg-white rounded-lg border border-zinc-300 transition-all px-3 py-1.5 my-1.5',
        open ? 'opacity-100 max-h-100' : 'opacity-0 max-h-0'
      )}
    >
      {otherStatuses.map((s) => (
        <div
          key={s}
          className="hover:bg-zinc-100 px-1 mb-0.5 rounded cursor-pointer"
          onClick={() => updateJob(job.id, 'status', s)}
        >
          <Status status={s} />
        </div>
      ))}
    </div>
  );
}
