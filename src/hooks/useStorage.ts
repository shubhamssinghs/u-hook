import { useCallback, useState, useEffect } from "react";

type StorageValue<T> = T | (() => T);

function useLocalStorage<T>(key: string, defaultValue: StorageValue<T>) {
  return useStorage<T>(key, defaultValue, window.localStorage);
}

function useSessionStorage<T>(key: string, defaultValue: StorageValue<T>) {
  return useStorage<T>(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(
  key: string,
  defaultValue: StorageValue<T>,
  storageObject: Storage
) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return (defaultValue as () => T)();
    } else {
      return defaultValue as T;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined as T);
  }, []);

  return [value, setValue, remove] as const;
}

export default {
  useLocalStorage,
  useSessionStorage,
};
