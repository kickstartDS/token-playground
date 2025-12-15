import {
  QueryFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "../utils/router";
import { useEffect } from "react";

const fetchTokens = async (name: string, method = "GET", body?: any) => {
  if (body) {
    body = JSON.stringify(body);
  }
  const response = await fetch(`/api/tokens/${name}`, { method, body });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

const getTokens: QueryFunction<any, [path: string, name: string]> = async ({
  queryKey,
}) => fetchTokens(queryKey[1]);
const getMutation = (name: string) => fetchTokens(name);
const postTokens =
  (method: "POST" | "PUT") =>
  ({ name, tokens }: { name: string; tokens: any }) =>
    fetchTokens(name, method, tokens);

export const useGetTokens = (
  name: string | null,
  setTokens: (tokens: any) => void,
) => {
  // @ts-expect-error if name is null, the query is disabled
  const query = useQuery({
    enabled: !!name,
    queryKey: ["tokens", name],
    queryFn: getTokens,
    staleTime: Infinity,
    refetchInterval: false,
  });
  useEffect(() => {
    if (query.data) {
      setTokens(query.data);
    }
  }, [query.data]);
  return query;
};
export const useGetMutation = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getMutation,
    onSuccess(response, name) {
      queryClient.setQueryData(["tokens", name], response);
      searchParams.set("t", name);
    },
  });
};

export const useSave = (method: "POST" | "PUT") => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTokens(method),
    onSuccess(response, variables) {
      queryClient.setQueryData(["tokens", variables.name], variables.tokens);
      searchParams.set("t", variables.name);
    },
  });
};
