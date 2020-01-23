xdescribe("All about variable types", () => {
  function var_func(arg) {
    if (arg) {
      var x = 5;
    }
    return x;
  }

  function const_func(arg) {
    try {
      if (arg) {
        const x = 5;
      }
      return x;
    } catch {
      return new Error();
    }
  }

  it("should return some expected value when var_func is called with true", () => {
    const response = var_func(true);
    const answer = "?";

    expect(response).toEqual(answer);
  });

  it("should return some expected value when var_func is called with false", () => {
    const response = var_func(false);
    const answer = "?";

    expect(response).toEqual(answer);
  });

  it("should return some expected value when const_func is called with true", () => {
    const response = const_func(true);
    const answer = "?";

    expect(response).toEqual(answer);
  });

  it("should return some expected value when const_func is called with false", () => {
    const response = const_func(false);
    const answer = "?";

    expect(response).toEqual(answer);
  });
});
