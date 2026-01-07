import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/lib/api/mockData";
import { UpdateUserPayload, User, PaginatedResponse } from "@/types";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateUserPayload) => {
      const { id, ...updates } = payload;
      return mockApi.updateUser(id, updates);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousData = queryClient.getQueriesData({ queryKey: ["users"] });

      queryClient.setQueriesData(
        { queryKey: ["users"] },
        (old: PaginatedResponse<User> | undefined) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.map((user: User) =>
              user.id === payload.id ? { ...user, ...payload } : user
            ),
          };
        }
      );

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
  });
}
