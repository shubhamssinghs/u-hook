import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(defaultValue);

  function toggleValue(value?: boolean) {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    );
  }

  return [value, toggleValue] as const;
}
