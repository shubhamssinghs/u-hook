import { useEffect, useState, RefObject } from "react";

export default function useOnScreen(
  ref: RefObject<HTMLElement>,
  rootMargin: string = "0px"
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry) {
          setIsVisible(firstEntry.isIntersecting);
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current == null) return;
      observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isVisible;
}
