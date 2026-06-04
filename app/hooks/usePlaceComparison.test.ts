import { describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Place } from "../types/app/place";
import usePlaceComparison from "./usePlaceComparison";

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

import * as navigation from "next/navigation";

const eligiblePlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as Place[];

const allPlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as Place[];

function setupNavigationMocks({
  pathname = "/paris",
  compare = "",
}: {
  pathname?: string;
  compare?: string;
} = {}) {
  const replace = vi.fn();

  vi.mocked(navigation.usePathname).mockReturnValue(pathname);

  vi.mocked(navigation.useSearchParams).mockReturnValue(
    new URLSearchParams(
      compare ? `compare=${compare}` : ""
    ) as unknown as ReturnType<typeof navigation.useSearchParams>
  );

  vi.mocked(navigation.useRouter).mockReturnValue({
    replace,
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  });

  return {
    replace,
  };
}

describe("usePlaceComparison", () => {
  it("initially selects all places when url param absent", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    // expect
    expect(result.current.selectedPlaceIds).toEqual([1, 2, 3]);
  });

  it("clears all places by clicking on button", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    act(() => {
      result.current.clearAllPlaces();
    });

    // expect
    expect(result.current.selectedPlaceIds).toEqual([]);
  });

  it("removes a place by unchecking", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(1, false);
    });

    // expect
    expect(result.current.selectedPlaceIds).not.toContain(1);
  });

  it("adds a place when selecting it", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(1, false);
    });

    // expect
    expect(result.current.selectedPlaceIds).not.toContain(1);

    // act
    act(() => {
      result.current.handleCheckboxChange(1, true);
    });

    // expect
    expect(result.current.selectedPlaceIds).toContain(1);
  });

  it("initializes correctly from URLParams", () => {
    // arrange
    setupNavigationMocks({ compare: "1,3" });

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    // expect
    expect(result.current.selectedPlaceIds).toEqual([1, 3]);
  });

  it("updates URLParams correctly", async () => {
    // arrange
    const eligiblePlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as Place[];
    const allPlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as Place[];

    const { replace } = setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(1, false);
    });

    // expect
    expect(result.current.selectedPlaceIds).toEqual([2, 3]);
    await waitFor(() => {
      expect(replace).toHaveBeenLastCalledWith("/paris?compare=2,3", {
        scroll: false,
      });
    });
  });

  it("removes URLParams if all selected", async () => {
    // arrange
    const { replace } = setupNavigationMocks({ compare: "1,3" });

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(2, true);
    });

    // expect
    expect(result.current.selectedPlaceIds).toEqual(
      expect.arrayContaining([1, 2, 3])
    );
    await waitFor(() => {
      expect(replace).toHaveBeenLastCalledWith("/paris", {
        scroll: false,
      });
    });
  });

  it("ignores invalid ids in compare param", () => {
    // arrange
    setupNavigationMocks({ compare: "1,abc,3" });

    // act
    const { result } = renderHook(() =>
      usePlaceComparison({
        allPlaces,
        eligiblePlaces,
      })
    );

    // expect
    expect(result.current.selectedPlaceIds).toEqual([1, 3]);
  });
});
