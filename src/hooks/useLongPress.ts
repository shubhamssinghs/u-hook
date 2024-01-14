import { RefObject } from "react";
import useEventListener from "./useEventListener";
import useTimeout from "./useTimeout";
import useEffectOnce from "./useEffectOnce";

interface UseLongPressProps {
  ref: RefObject<HTMLElement>;
  cb: () => void;
  options?: {
    delay?: number;
  };
}

export default function useLongPress({
  ref,
  cb,
  options = { delay: 250 },
}: UseLongPressProps) {
  const { delay = 250 } = options;
  const { reset, clear } = useTimeout(cb, delay);
  useEffectOnce(clear);

  useEventListener("mousedown", reset, ref.current || undefined);
  useEventListener("touchstart", reset, ref.current || undefined);

  useEventListener("mouseup", clear, ref.current || undefined);
  useEventListener("mouseleave", clear, ref.current || undefined);
  useEventListener("touchend", clear, ref.current || undefined);
}
