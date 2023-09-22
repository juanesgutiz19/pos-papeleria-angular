const fs = require('fs');


const reportText = fs.readFileSync('reports/mutation/mutation.json', 'utf8');
const report = JSON.parse(reportText);
const frameworkName = report.framework.name;
const projectRoot = report.projectRoot;
const issuesTotal = Object.entries(report.files).map(file => {
    const fileName = file[0];
    const fileData = file[1];
    const mutantsFaileds = fileData.mutants.filter(mutant => mutant.status === 'Survived' || mutant.status === 'NoCoverage');
    return mutantsFaileds.map(mutant => {
        let cause = "The " + mutant.mutatorName + " was mutated without any tests failing.";
        if (mutant.replacement) {
            cause = "The " + mutant.mutatorName + " was mutated to " + mutant.replacement + " without any tests failing."
        }
        let message = "A mutant survived after running the tests. " + cause
        if (mutant.status == "NoCoverage") {
            message = "A mutant was not covered by any of the tests. " + cause
        }
        let fileSrcName = fileName;
        if (projectRoot) {
            fileSrcName = fileName.replace(projectRoot+"/", "");
        }

        return {
            "engineId": frameworkName,
            "ruleId": "Mutant".concat(mutant.status),
            "primaryLocation": {
                "message": message,
                "filePath": fileSrcName,
                "textRange": {
                    "startLine": mutant.location.start.line,
                    "endLine": mutant.location.end.line,
                    "startColumn": (mutant.location.start.column - 1),
                    "endColumn": (mutant.location.end.column - 1)
                }
            },
            "type": "CODE_SMELL",
            "severity": "MAJOR",
            "effortMinutes": 10
        }
    });
}).flat();

const sonarIssuesReport = {
    "issues": issuesTotal
};
fs.writeFileSync("sonarMutationReport.json", JSON.stringify(sonarIssuesReport));
