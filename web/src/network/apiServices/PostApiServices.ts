import { HttpsClient } from '@/network/HttpsClient';
import { API } from '@/network/constants/ApiConstants';
import type { AuthRequest } from '@/network/requestModels/AuthRequest';
import type { CreateTaskRequest, UpdateTaskRequest } from '@/network/requestModels/TaskRequest';
import type { AuthResponse } from '@/network/responseModels/AuthResponse';
import type { TaskResponse, DeleteTaskResponse } from '@/network/responseModels/TaskResponse';

export const login = async (payload: AuthRequest): Promise<AuthResponse> => {
  const { data } = await HttpsClient.post<AuthResponse>(API.LOGIN, payload);
  return data;
};

export const register = async (payload: AuthRequest): Promise<AuthResponse> => {
  const { data } = await HttpsClient.post<AuthResponse>(API.REGISTER, payload);
  return data;
};

export const addTask = async (payload: CreateTaskRequest): Promise<TaskResponse> => {
  const { data } = await HttpsClient.post<TaskResponse>(API.TASKS, payload);
  return data;
};

export const updateTask = async (
  id: string,
  payload: UpdateTaskRequest
): Promise<TaskResponse> => {
  const { data } = await HttpsClient.put<TaskResponse>(API.TASK_BY_ID(id), payload);
  return data;
};

export const toggleComplete = async (id: string, completed: boolean): Promise<TaskResponse> => {
  const { data } = await HttpsClient.put<TaskResponse>(API.TASK_BY_ID(id), { completed });
  return data;
};

export const deleteTask = async (id: string): Promise<DeleteTaskResponse> => {
  const { data } = await HttpsClient.delete<DeleteTaskResponse>(API.TASK_BY_ID(id));
  return data;
};
