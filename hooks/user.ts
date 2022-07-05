import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

const USER_QUERY_KEY = "user";

export function useUser() {
  const { data: user } = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson<{ name: string; id: number }>("/api/user");
      } catch (error) {
        return undefined;
      }
    },
    {
      staleTime: 30_000, //ms
    }
  );

  return user;
}

export function useSignIn() {
  const queryClient = useQueryClient();

  const { isError, isLoading, mutateAsync } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
  );

  return {
    signInError: isError,
    signInLoading: isLoading,
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutateAsync({ email, password });

        queryClient.invalidateQueries("user");
        return true;
      } catch (error) {
        return false;
      }
    },
  };
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson("/api/logout"));

  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData(USER_QUERY_KEY, undefined);
  };
}
