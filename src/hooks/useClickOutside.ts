import { RefObject } from "react";
import useEventListener from "./useEventListener";

type EventCallback = (event: Event) => void;

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  cb: EventCallback
): void {
  useEventListener(
    "click",
    (e: Event) => {
      const mouseEvent = e as MouseEvent;
      if (
        ref.current == null ||
        ref.current.contains(mouseEvent.target as Node)
      )
        return;
      cb(mouseEvent);
    },
    document
  );
}
