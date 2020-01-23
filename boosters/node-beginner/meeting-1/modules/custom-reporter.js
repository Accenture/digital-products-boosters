class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunStart(test) {
    this._numTestSuitesLeft = test.numTotalTestSuites;

    console.log();
    console.log(`Found ${test.numTotalTestSuites} test suites`);
  }

  onRunComplete(test, results) {
    const { numFailedTests, numPassedTests, numPendingTests, testResults, numTotalTests } = results;

    console.log();
    testResults.map(({ failureMessage }) => {
      if (failureMessage) {
        let failureArray = failureMessage.split("\n");

        failureArray.forEach((elm, index) => {
          if (elm.startsWith("    Received: ")) {
            failureArray[index] = "";
          }
        });

        console.log(failureArray.join("\n"));
      }
    });

    console.log(`Ran ${numTotalTests} tests.`);
    process.stdout.write(` ${numPassedTests || 0} passing`);
    process.stdout.write(` ${numFailedTests || 0} failing`);
    process.stdout.write(` ${numPendingTests || 0} pending`);
    console.log();
  }
}

module.exports = CustomReporter;
