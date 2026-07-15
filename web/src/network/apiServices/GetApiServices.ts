import { HttpsClient } from '@/network/HttpsClient';
import { API } from '@/network/constants/ApiConstants';
import type { TaskListResponse } from '@/network/responseModels/TaskResponse';

export const getTasks = async (): Promise<TaskListResponse> => {
  const { data } = await HttpsClient.get<TaskListResponse>(API.TASKS);
  return data;
};
