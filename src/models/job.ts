import { capitalize } from '../utils';

export const jobStatuses = [
  'not-yet-started',
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
