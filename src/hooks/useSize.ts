import { useState, useEffect } from "react";

interface Size {
  width: number;
  height: number;
}

export default function useSize(ref: React.RefObject<HTMLElement>): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new ResizeObserver(([entry]) => {
      const contentRect = entry?.contentRect ?? { width: 0, height: 0 };
      setSize({
        width: contentRect.width,
        height: contentRect.height,
      });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}
