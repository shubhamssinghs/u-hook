import { useState, useCallback } from "react";

export default function useStateWithValidation<T>(
  validationFunc: (value: T) => boolean,
  initialValue: T
) {
  const [state, setState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(() =>
    validationFunc(initialValue)
  );

  const handleChange = useCallback(
    (nextState: T | ((prevState: T) => T)) => {
      const nextValue =
        typeof nextState === "function"
          ? (nextState as (prevState: T) => T)(state)
          : nextState;

      setState(nextValue);
      setIsValid(validationFunc(nextValue));
    },
    [state, validationFunc]
  );

  return [state, handleChange, isValid] as const;
}
