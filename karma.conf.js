// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-sonarqube-reporter'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    remapIstanbulReporter: {
      dir: require('path').join(__dirname, 'reports/coverage/app-base'),
      reports: {
        html: 'coverage',
        lcovonly: 'reports/test-results/coverage/coverage.lcov'
      }
    },
    coverageReporter: {
      // specify a common output directory
      dir: require('path').join(__dirname, 'reports/coverage/app-base'),
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
      ]
    },
    reporters: ['progress', 'kjhtml','sonarqube', 'coverage'],
    // htmlReporter: {
    //   outputFile: 'reports/unit/units.html',

    //   // Optional
    //   pageTitle: 'Vida - Tests Unitarios',
    //   subPageTitle: 'Presentacion HTML de los test unitarios',
    //   dir: 'reports/html/'
    // },
    sonarqubeReporter: {
      basePath: 'src/app',        // test files folder
      filePattern: '**/*spec.ts', // test files glob pattern
      encoding: 'utf-8',          // test files encoding
      outputFolder: 'reports',    // report destination
      legacyMode: false,          // report for Sonarqube < 6.2 (disabled)
      reportName: (metadata) => { // report name callback, but accepts also a
                                  // string (file name) to generate a single file
        /**
         * Report metadata array:
         * - metadata[0] = browser name
         * - metadata[1] = browser version
         * - metadata[2] = plataform name
         * - metadata[3] = plataform version
         */
         return 'sonarqubeReport.xml';
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
