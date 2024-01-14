import { useEffect, DependencyList } from "react";
import useTimeout from "./useTimeout";

interface UseDebounceProps {
  callback: () => void;
  delay: number;
  dependencies: DependencyList;
}

export default function useDebounce({
  callback,
  delay,
  dependencies,
}: UseDebounceProps) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
