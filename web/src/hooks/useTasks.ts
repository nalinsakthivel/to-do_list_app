import { useEffect, useState } from 'react';
import { useTasksQuery } from '@/network/hooks/useTasksQuery';
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
  useToggleCompleteMutation,
  useDeleteTaskMutation,
} from '@/network/hooks/useTaskMutations';
import { connectSocket, disconnectSocket } from '@/network/socket';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import { useTaskStore } from '@/stores/hooks/useTaskStore';
import type { Task } from '@/types';
import { logout } from '@/utils/SecurityUtils';
import { parseAxiosError } from '@/utils/ErrorHandlerUtils';

export const useTasks = () => {
  const token = useAuthStore((state) => state.token);
  const { tasks, setTasks } = useTaskStore();
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  const tasksQuery = useTasksQuery();
  const addTaskMutation = useAddTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const toggleCompleteMutation = useToggleCompleteMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  useEffect(() => {
    if (tasksQuery.data) {
      setTasks(tasksQuery.data);
    }
  }, [tasksQuery.data, setTasks]);

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token);

    socket.on('task:created', (task: Task) => {
      useTaskStore.getState().addTask(task);
    });
    socket.on('task:updated', (task: Task) => {
      useTaskStore.getState().updateTask(task);
    });
    socket.on('task:deleted', ({ id }: { id: string }) => {
      useTaskStore.getState().removeTask(id);
    });

    return () => {
      disconnectSocket();
    };
  }, [token]);

  const handleAddTask = () => {
    const title = newTitle.trim();
    if (!title) return;

    setError('');
    addTaskMutation.mutate(
      { title },
      {
        onSuccess: () => setNewTitle(''),
        onError: (err) => setError(parseAxiosError(err)),
      }
    );
  };

  const handleToggleComplete = (task: Task) => {
    toggleCompleteMutation.mutate(
      { id: task._id, completed: !task.completed },
      { onError: (err) => setError(parseAxiosError(err)) }
    );
  };

  const handleEditTask = (task: Task, title: string) => {
    updateTaskMutation.mutate(
      { id: task._id, title },
      { onError: (err) => setError(parseAxiosError(err)) }
    );
  };

  const handleDeleteTask = (task: Task) => {
    deleteTaskMutation.mutate(task._id, {
      onError: (err) => setError(parseAxiosError(err)),
    });
  };

  const handleLogout = () => {
    logout();
  };

  return {
    tasks,
    loading: tasksQuery.isLoading,
    error: error || (tasksQuery.isError ? parseAxiosError(tasksQuery.error) : ''),
    newTitle,
    setNewTitle,
    handleAddTask,
    handleToggleComplete,
    handleEditTask,
    handleDeleteTask,
    handleLogout,
    refetch: tasksQuery.refetch,
  };
};
