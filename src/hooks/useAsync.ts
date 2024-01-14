import { useCallback, useEffect, useState } from "react";

type CallbackType = () => Promise<any>;

interface UseAsyncResult {
  loading: boolean;
  error?: any;
  value?: any;
}

export default function useAsync(
  callback: CallbackType,
  dependencies: any[] = []
): UseAsyncResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<any>();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}
