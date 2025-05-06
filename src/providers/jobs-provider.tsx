import { createContext, useContext, useState } from 'react';
import { Job } from '../models';

type JobsContextValue = {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: <K extends keyof Job>(id: string, field: K, value: Job[K]) => void;
};

const JobsContext = createContext<JobsContextValue | undefined>(undefined);

function createJobsContext(): JobsContextValue {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => setJobs((prev) => [...prev, job]);

  const updateJob = <K extends keyof Job>(
    id: string,
    field: K,
    value: Job[K]
  ) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, [field]: value } : j))
    );
  };

  return { jobs, addJob, updateJob };
}

export function useJobsContext(): JobsContextValue {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error(
      'useJobsContext must be used within a JobsContext.Provider'
    );
  }
  return context;
}

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const value = createJobsContext();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}
