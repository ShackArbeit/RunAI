import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { AuthState } from "./types";
import { getAuthState, logout } from "./api";
import { authQueryKeys } from "./query-keys";

export function useAuthQuery() {
  return useQuery({
    queryKey: authQueryKeys.all,
    queryFn: getAuthState,
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (authState: AuthState) => {
      queryClient.setQueryData(authQueryKeys.all, authState);
    },
  });
}