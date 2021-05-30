class TestResultsProcessor {
    constructor() {
        this.duration = 0;
    };

    onTestResult(test, {perfStats = {}}) {
        const testDuration = perfStats.end - perfStats.start;
        this.duration += testDuration;
    };

    onRunComplete(contexts, results){
        const durationInSeconds = Math.floor(this.duration / 1000);
        const totalMinutes = Math.floor(durationInSeconds / 60);
        const totalSeconds = durationInSeconds - totalMinutes * 60;
        const totalTime = `${totalMinutes}m ${totalSeconds}s`;

        if (!results.numFailedTestSuites) {
            console.log(`\nAll tests suites passed in ${totalTime} successfully!`);
            return;
        }

        const failedTestsInfo = results.testResults.reduce((acc, test) => (
            test.failureMessage ? [...acc, `${test.testFilePath} failed because of:\n${test.failureMessage}`] : acc
        ), []);

        const failedInfo = [
            `\n${results.numFailedTests} tests in ${results.numFailedTestSuites} test suites failed in ${totalTime}`,
            'Summary of all failed test suites: ',
            ...failedTestsInfo
        ];

        failedInfo.forEach(info => console.log(info))
    };
}

module.exports = TestResultsProcessor;
