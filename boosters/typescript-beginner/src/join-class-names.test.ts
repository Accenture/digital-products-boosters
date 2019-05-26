import { joinClassNames } from "./join-class-names";

describe("joinClassNames", (): void => {
  it("should return the class name if a single class name was provided", (): void => {
    let classNames = ["button"];
    let result = joinClassNames(classNames);
    expect(result).toBe("button");
  });

  it("should return the class names separated by spaces if more than one was provided", (): void => {
    let classNames = ["button", "large"];
    let result = joinClassNames(classNames);
    expect(result).toBe("button large");
  });

  it("should return the class names separated by spaces and ignore any undefined values", (): void => {
    let classNames = ["button", undefined, "large"];
    let result = joinClassNames(classNames);
    expect(result).toBe("button large");
  });

  it("should return undefined if only undefined values are given", (): void => {
    let classNames = [undefined];
    let result = joinClassNames(classNames);
    expect(result).toBe(undefined);
  });
});
