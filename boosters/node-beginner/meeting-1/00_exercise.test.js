describe("All about scope", () => {
  it("should return some expected value when the variable is out of scope", () => {
    var x = 3;

    function generator(randomize) {
      if (randomize) {
        var x = Math.random();
        return x;
      }
      return x;
    }

    const response = generator(false);
    const answer = "?";

    expect(response).toEqual(answer);
  });

  it("should return some expected value when the variable is in scope", () => {
    function generator(randomize) {
      var x = 3;

      if (randomize) {
        var x = Math.random();
        return x;
      }
      return x;
    }

    const response = generator(false);
    const answer = "?";

    expect(response).toEqual(answer);
  });
});
