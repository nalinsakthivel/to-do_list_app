import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/network/apiServices/GetApiServices';
import { QUERY_KEYS } from '@/network/constants/QueryKeys';

export const useTasksQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: getTasks,
  });
};
