import { arrayToGroups } from "./arrays.utils";

describe("arrayToGroups", () => {
  it("should return empty array when input array is empty", () => {
    const result = arrayToGroups([], 3);
    expect(result).toEqual([]);
  });

  it("should split array into groups of specified size", () => {
    const input = [1, 2, 3, 4, 5, 6];
    const result = arrayToGroups(input, 2);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it("should handle array that doesn't divide evenly", () => {
    const input = [1, 2, 3, 4, 5];
    const result = arrayToGroups(input, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should return single group when array is smaller than group size", () => {
    const input = [1, 2];
    const result = arrayToGroups(input, 3);
    expect(result).toEqual([[1, 2]]);
  });

  it("should work with different types of elements", () => {
    const input = ["a", "b", "c", "d", "e"];
    const result = arrayToGroups(input, 3);
    expect(result).toEqual([
      ["a", "b", "c"],
      ["d", "e"],
    ]);
  });

  it("should handle group size of 1", () => {
    const input = [1, 2, 3];
    const result = arrayToGroups(input, 1);
    expect(result).toEqual([[1], [2], [3]]);
  });

  it("should handle group size equal to array length", () => {
    const input = [1, 2, 3];
    const result = arrayToGroups(input, 3);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should handle group size larger than array length", () => {
    const input = [1, 2, 3];
    const result = arrayToGroups(input, 5);
    expect(result).toEqual([[1, 2, 3]]);
  });
});
