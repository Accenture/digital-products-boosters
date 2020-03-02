xdescribe("All about the keyword this", () => {
  it("should return some expected value for an arrow function", () => {
    let response;

    const myObject1 = {
      myMethod: () => {
        response = this;
      },
    };

    myObject1.myMethod();
    const answer = "?";

    expect(response).toEqual(answer);
  });

  it("should return some expected value for a non-arrow function", () => {
    let response;

    const myObject2 = {
      myMethod() {
        response = this;
      },
    };

    myObject2.myMethod();
    const answer = "?";

    expect(response).toEqual(answer);
  });

  it("should return some expected value for an instantiated arrow function", () => {
    let response;

    const myObject3 = {
      myArrowFunction: null,
      myMethod() {
        this.myArrowFunction = () => {
          response = this;
        };
      },
    };

    myObject3.myMethod();
    myObject3.myArrowFunction();
    const answer = "?";

    expect(response).toEqual(answer);
  });

  it("should return some expected value for a non-arrow function", () => {
    let response;

    const myFunction = () => {
      response = this;
    };

    myFunction();
    const answer = "?";

    expect(response).toEqual(answer);
  });
});
