xdescribe("All about async operations", () => {
  it("should executed in the expected order of operation", () => {
    let appending_result = "";

    function topLevel() {
      return level2().then(res => {
        appending_result += "1";
      });
    }

    function level2() {
      return new Promise(resolve => {
        appending_result += "2";
        resolve("Level 2");
      }).then(x => {
        appending_result += "3";
        return level3();
      });
    }

    function level3() {
      return new Promise(resolve => {
        appending_result += "4";
        resolve("Level 3");
      });
    }

    topLevel().then(() => {
      const answer = "?";

      expect(appending_result).toEqual(answer);
    });
  });
});
