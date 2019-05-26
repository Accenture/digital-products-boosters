import {
  divide,
  executeOperation,
  multiply,
  substract,
} from "./execute-operation";

describe("executeOperation", (): void => {
  it("should return the substraction of all the numbers passed in", (): void => {
    let result = executeOperation(substract, { x: 9, y: 3 });
    expect(result).toBe(6);
  });

  it("should return the multiplication of all the numbers passed in", (): void => {
    let result = executeOperation(multiply, { x: 9, y: 3 });
    expect(result).toBe(27);
  });

  it("should return the division of all the numbers passed in", (): void => {
    let result = executeOperation(divide, { x: 9, y: 3 });
    expect(result).toBe(3);
  });
});
