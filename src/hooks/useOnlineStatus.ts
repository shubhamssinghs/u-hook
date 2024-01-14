import { useState } from "react";
import useEventListener from "./useEventListener";

export default function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEventListener("online", () => setOnline(true));
  useEventListener("offline", () => setOnline(false));

  return online;
}
