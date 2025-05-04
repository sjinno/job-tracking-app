import { ChevronDown } from 'lucide-react';
import { cn } from '../lib';
import { formatJobStatus, Job, JobStatus, jobStatuses } from '../models';
import { useEffect, useRef, useState } from 'react';
import { useJobsContext } from '../providers';
import { useDrag } from 'react-dnd';

type Props = {
  job: Job;
};

export function JobCard({ job }: Props) {
  const [open, setOpen] = useState(false);

  const dragRef = useRef<HTMLDivElement | null>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'JOB',
    item: { ...job },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  drag(dragRef);

  return (
    <div
      className={cn(
        'px-3 py-1.5 bg-white border border-zinc-300 shadow rounded-lg my-3 text-sm',
        isDragging && 'border-blue-600 border-2'
      )}
      ref={dragRef}
    >
      <div>
        <h3>
          <Label label="Customer Name" />
          {job.customerName}
        </h3>
        <p>
          <Label label="Description" />
          {job.description}
        </p>
        <div className="flex items-center h-7">
          <Label label="Status" />
          <div
            className={cn(
              'ml-1.5 px-1 mt-0.5 flex items-center relative',
              !open && 'hover:bg-zinc-100'
            )}
          >
            <div
              className="cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Status status={job.status} />
              <ChevronDown
                className="inline-block h-2.5 -mt-0.5"
                strokeWidth={5}
              />
            </div>
            <SelectPanel
              job={job}
              open={open}
              closePanel={() => setOpen(false)}
            />
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
        'border-1 rounded-3xl px-2 font-semibold text-xs',
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

function SelectPanel({
  job,
  open,
  closePanel,
}: {
  job: Job;
  open: boolean;
  closePanel: () => void;
}) {
  const { updateJob } = useJobsContext();
  const otherStatuses = jobStatuses.filter((s) => s !== job.status);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };

    const closeOnClickOutside = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnClickOutside);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnClickOutside);
    };
  }, []);

  return (
    <div
      className={cn(
        'absolute left-0 top-7 w-42 bg-white rounded-lg border border-zinc-300 transition-all px-3 py-2 pb-1 my-1.5 z-49',
        open ? 'opacity-100 max-h-100' : 'opacity-0 max-h-0'
      )}
      ref={panelRef}
    >
      {otherStatuses.map((s) => (
        <div
          key={s}
          className="hover:bg-zinc-100 p-1 rounded cursor-pointer flex items-center mb-1"
          onClick={() => {
            updateJob(job.id, 'status', s);
            closePanel();
          }}
          onBlur={() => closePanel()}
        >
          <Status status={s} />
        </div>
      ))}
    </div>
  );
}
