import { useCallback, useEffect, useRef } from "react";

interface TimeoutFunctions {
  reset: () => void;
  clear: () => void;
}

type TimeoutCallback = () => void;

export default function useTimeout(
  callback: TimeoutCallback,
  delay: number
): TimeoutFunctions {
  const callbackRef = useRef<TimeoutCallback>(callback);
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
