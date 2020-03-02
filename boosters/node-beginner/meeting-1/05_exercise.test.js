xdescribe("All about modules", () => {
  it("should load modules in the expected order", () => {
    const a = require("./modules/a");
    const b = require("./modules/b");

    const a_answer = { bWasLoaded: "?", loaded: "?" };
    const b_answer = { aWasLoaded: "?", loaded: "?" };

    expect(a).toEqual(a_answer);
    expect(b).toEqual(b_answer);
  });
});
