import { capitalize } from '../utils';

export const jobStatuses = [
  'not-yet-completed',
  'in-progress',
  'completed',
] as const;
export type JobStatus = (typeof jobStatuses)[number];

export interface Job {
  id: string;
  customerName: string;
  description: string;
  status: JobStatus;
}

export function formatJobStatus(header: JobStatus): string {
  return capitalize(header.replace(/-/g, ' '));
}
