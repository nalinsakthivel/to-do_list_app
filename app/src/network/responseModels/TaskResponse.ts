import { Task } from '@/types';

export type TaskResponse = Task;

export type TaskListResponse = Task[];

export interface DeleteTaskResponse {
  success: boolean;
}
