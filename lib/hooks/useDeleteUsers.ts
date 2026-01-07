import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/lib/api/mockData";
import { DeleteUsersPayload } from "@/types";

export function useDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: DeleteUsersPayload) => {
      return mockApi.deleteUsers(payload.userIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
