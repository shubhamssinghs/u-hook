import { useState, useCallback } from "react";

type State = Record<string, any>;

export default function useMergeState(
  initialState: State = {}
): [State, (newState: State | ((currentState: State) => State)) => void] {
  const [state, setState] = useState<State>(initialState);

  const mergeState = useCallback(
    (newState: State | ((currentState: State) => State)) => {
      if (typeof newState === "function") {
        setState((currentState) => ({
          ...currentState,
          ...newState(currentState),
        }));
      } else {
        setState((currentState) => ({ ...currentState, ...newState }));
      }
    },
    []
  );

  return [state, mergeState];
}
