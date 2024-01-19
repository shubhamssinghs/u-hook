import useMergeState from "./useMergeState";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useMergeState", () => {
  test("should have the same value as the initial value", () => {
    const { result } = renderHook(() => useMergeState({ name: "shubham" }));

    expect(result.current[0]).toEqual({ name: "shubham" });
  });
});

describe("useMergeState", () => {
  test("should have the same value as the updated value", () => {
    const { result } = renderHook(() => useMergeState({ name: "shubham" }));

    act(() => {
      result.current[1]({ name: "singh" });
    });

    expect(result.current[0]).toEqual({ name: "singh" });
  });
});

describe("useMergeState", () => {
  test("should add the new value to the state", () => {
    const { result } = renderHook(() =>
      useMergeState({ firstName: "shubham" })
    );

    act(() => {
      result.current[1]({ lastName: "singh" });
    });

    expect(result.current[0]).toEqual({
      firstName: "shubham",
      lastName: "singh",
    });
  });
});

describe("useMergeState", () => {
  test("should merge state using function updater", () => {
    const { result } = renderHook(() =>
      useMergeState({ firstName: "shubham" })
    );

    act(() => {
      result.current[1]((currentState) => ({
        lastName: "singh" + currentState.firstName,
      }));
    });

    expect(result.current[0]).toEqual({
      firstName: "shubham",
      lastName: "singhshubham",
    });
  });
});
