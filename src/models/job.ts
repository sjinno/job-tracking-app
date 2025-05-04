export const jobStatusTypes = [
  'not-yet-completed',
  'in-progress',
  'completed',
] as const;
export type JobStatus = (typeof jobStatusTypes)[number];

export interface Job {
  id: string;
  customerName: string;
  description: string;
  status: JobStatus;
}
