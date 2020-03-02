xdescribe("All about template literals", () => {
  it("should return the expected string", () => {
    const name = "Andrew";
    const lname = "Mayer";
    const occupation = "developer";

    let template_array;
    let args_array;

    function tagFunction(string, ...args) {
      template_array = string;
      args_array = args;
    }

    tagFunction`Hi my name is ${name} ${lname} and I am a ${occupation}!`;

    const answer1 = "?";
    const answer2 = "?";

    expect(template_array).toEqual(answer1);
    expect(args_array).toEqual(answer2);
  });
});
