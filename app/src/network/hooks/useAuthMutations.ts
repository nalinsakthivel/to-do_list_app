import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/network/apiServices/PostApiServices';

export const useLoginMutation = () => useMutation({ mutationFn: login });

export const useRegisterMutation = () => useMutation({ mutationFn: register });
