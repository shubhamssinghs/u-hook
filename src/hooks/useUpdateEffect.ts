import { useEffect, useRef, DependencyList } from "react";

type Callback = () => void;

export default function useUpdateEffect(
  callback: Callback,
  dependencies: DependencyList
) {
  const firstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}
