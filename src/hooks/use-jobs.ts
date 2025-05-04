import { createContext, useContext, useState } from 'react';
import { Job } from '../models';

type JobsContextValue = {
  jobs: Job[];
  addJob: (job: Job) => void;
};

export const JobsContext = createContext<JobsContextValue | undefined>(
  undefined
);

export function createJobsStore(): JobsContextValue {
  const [jobs, setJobs] = useState<Job[]>([]);
  const addJob = (job: Job) => setJobs((prev) => [...prev, job]);
  return { jobs, addJob };
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
