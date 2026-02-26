import useSWR from 'swr';
import { apiFetch, getStoredSession } from './api';

type FetcherResponse<T> = Promise<T>;

type UseApiOptions<T> = {
  fallbackData?: T;
};

export const useApi = <T>(path: string | null, options: UseApiOptions<T> = {}) => {
  const { fallbackData } = options;
  const session = getStoredSession();

  const fetcher = (url: string): FetcherResponse<T> =>
    apiFetch<T>(url, {
      token: session?.accessToken ?? null,
    });

  return useSWR<T>(path, fetcher, {
    fallbackData,
    revalidateOnFocus: false,
  });
};
