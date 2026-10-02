import { describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { PlaceWithSection } from "../types/app/place";
import usePlaceSelection from "./usePlaceSelection";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

import * as navigation from "next/navigation";

const filteredPlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as PlaceWithSection[];

const allPlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as PlaceWithSection[];

function setupNavigationMocks({
  pathname = "/paris",
  compare = "",
}: {
  pathname?: string;
  compare?: string;
} = {}) {
  const replace = vi.fn();

  vi.mocked(navigation.usePathname).mockReturnValue(pathname);

  window.history.replaceState(
    null,
    "",
    compare ? `${pathname}?compare=${compare}` : pathname
  );

  vi.mocked(navigation.useRouter).mockReturnValue({
    replace,
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  } as unknown as ReturnType<typeof navigation.useRouter>);

  return {
    replace,
  };
}

function getSelectedIds(isSelected: (place: PlaceWithSection) => boolean) {
  return allPlaces.filter(isSelected).map((place) => place.id);
}

describe("usePlaceSelection", () => {
  it("initially selects all places when url param absent", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    // expect
    expect(getSelectedIds(result.current.isSelected)).toEqual([1, 2, 3]);
  });

  it("clears all places by clicking on button", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    act(() => {
      result.current.clearAllPlaces();
    });

    // expect
    expect(getSelectedIds(result.current.isSelected)).toEqual([]);
  });

  it("removes a place by unchecking", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(1, false);
    });

    // expect
    expect(getSelectedIds(result.current.isSelected)).not.toContain(1);
  });

  it("adds a place when selecting it", () => {
    // arrange
    setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(1, false);
    });

    // expect
    expect(getSelectedIds(result.current.isSelected)).not.toContain(1);

    // act
    act(() => {
      result.current.handleCheckboxChange(1, true);
    });

    // expect
    expect(getSelectedIds(result.current.isSelected)).toContain(1);
  });

  it("initializes correctly from URLParams", () => {
    // arrange
    setupNavigationMocks({ compare: "1,3" });

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    // expect
    expect(getSelectedIds(result.current.isSelected)).toEqual([1, 3]);
  });

  it("updates URLParams correctly", async () => {
    // arrange
    const filteredPlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as PlaceWithSection[];
    const allPlaces = [{ id: 1 }, { id: 2 }, { id: 3 }] as PlaceWithSection[];

    const { replace } = setupNavigationMocks();

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(1, false);
    });

    // expect
    expect(getSelectedIds(result.current.isSelected)).toEqual([2, 3]);
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
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    act(() => {
      result.current.handleCheckboxChange(2, true);
    });

    // expect
    expect(getSelectedIds(result.current.isSelected)).toEqual(
      expect.arrayContaining([1, 2, 3])
    );
    await waitFor(() => {
      expect(replace).toHaveBeenLastCalledWith("/paris", {
        scroll: false,
      });
    });
  });

  it("only marks places as visible that are both selected and filtered", () => {
    // arrange
    setupNavigationMocks({ compare: "1,2" });
    const filteredPlaces = [{ id: 2 }, { id: 3 }] as PlaceWithSection[];

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    // expect
    expect(allPlaces.filter(result.current.isVisible).map((p) => p.id)).toEqual(
      [2]
    );
  });

  it("ignores invalid ids in compare param", () => {
    // arrange
    setupNavigationMocks({ compare: "1,abc,3" });

    // act
    const { result } = renderHook(() =>
      usePlaceSelection({
        allPlaces,
        filteredPlaces,
      })
    );

    // expect
    expect(getSelectedIds(result.current.isSelected)).toEqual([1, 3]);
  });
});
