import { useMutation } from '@tanstack/react-query';
import { addTask, updateTask, toggleComplete, deleteTask } from '@/network/apiServices/PostApiServices';

export const useAddTaskMutation = () => useMutation({ mutationFn: addTask });

export const useUpdateTaskMutation = () =>
  useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => updateTask(id, { title }),
  });

export const useToggleCompleteMutation = () =>
  useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      toggleComplete(id, completed),
  });

export const useDeleteTaskMutation = () => useMutation({ mutationFn: deleteTask });
