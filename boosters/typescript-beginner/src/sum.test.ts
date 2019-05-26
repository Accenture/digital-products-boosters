import { sum } from "./sum";

describe("sum", (): void => {
  it("should return sum of the two numbers", (): void => {
    let result = sum(1, 2);
    expect(result).toBe(3);
  });
});
