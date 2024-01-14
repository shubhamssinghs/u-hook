import { useState, RefObject } from "react";
import useEventListener from "./useEventListener";

interface UseHoverProps {
  ref?: RefObject<HTMLElement>;
}

export default function useHover({ ref }: UseHoverProps = {}) {
  const [hovered, setHovered] = useState(false);

  useEventListener(
    "mouseover",
    () => setHovered(true),
    ref?.current || undefined
  );
  useEventListener(
    "mouseout",
    () => setHovered(false),
    ref?.current || undefined
  );

  return hovered;
}
