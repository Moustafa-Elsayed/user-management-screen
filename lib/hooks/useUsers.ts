import { useQuery } from "@tanstack/react-query";
import { mockApi } from "@/lib/api/mockData";

export function useUsers(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => mockApi.getUsers(page, pageSize),
  });
}
