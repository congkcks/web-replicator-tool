
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { success, error: showError } = useToast();

  const request = useCallback(
    async <R = T>(
      apiFunction: () => Promise<R>,
      options?: UseApiOptions<R>
    ): Promise<R | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiFunction();
        setData(result as unknown as T); // Type cast as we're using a generic return type

        if (options?.successMessage) {
          success('Thành công', options.successMessage);
        }

        if (options?.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (err) {
        const errorObject = err instanceof Error ? err : new Error('Unknown error');
        setError(errorObject);

        if (options?.errorMessage) {
          showError('Lỗi', options.errorMessage);
        } else {
          showError('Lỗi', errorObject.message);
        }

        if (options?.onError) {
          options.onError(errorObject);
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [success, showError]
  );

  return { data, error, isLoading, request };
}
