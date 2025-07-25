const fs = require("fs");
const path = require("path");

exports.config = {
  runner: "local",

  specs: ["../../tests/**/*.feature"],

  maxInstances: 10,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--headless", "--disable-gpu", "--window-size=1920,1080"],
      },
    },
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: [
          "-headless",
          "--disable-extensions",
          "--disable-sync",
          "-safe-mode",
          "--width=1920",
          "--height=1080",
        ],

        prefs: {
          "signon.rememberSignons": false,
          "browser.formfill.enable": false,
          "browser.urlbar.suggest.history": false,
          "browser.urlbar.suggest.bookmark": false,
          "layout.css.devPixelsPerPx": "1.0",
        },
      },
    },
  ],

  logLevel: "error",

  bail: 0,

  waitforTimeout: 20000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  framework: "cucumber",

  specFileRetries: 1,

  specFileRetriesDelay: 1,

  reporters: ["spec"],

  cucumberOpts: {
    // require: ["../../business/step-definitions/**/*.js"],
    require: [path.resolve(__dirname, '../../business/step-definitions/**/*.js')],
    

    backtrace: false,

    requireModule: [],

    dryRun: false,

    failFast: false,

    name: [],

    snippets: true,

    source: true,

    strict: false,

    tagExpression: "",

    timeout: 60000,

    ignoreUndefinedDefinitions: false,
  },
before: function () {
  require('../setup/assertions');
},

  beforeScenario: function (world, context) {
    browser.waitUntil(
      () => browser.execute(() => document.readyState === "complete"),
      {
        timeout: 10000,
        timeoutMsg: "Page did not load within timeout",
      }
    );
  },

  beforeStep: function (step, scenario, context) {
    browser.waitUntil(
      () => browser.execute(() => document.readyState === "complete"),
      {
        timeout: 15000,
        timeoutMsg: "Page did not load within timeout",
      }
    );
  },

  afterStep: async function (step, scenario, result, context) {
    if (!result.passed) {
      const screenshotsDir = path.resolve(__dirname, "artifacts", "screenshots");
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `${scenario.name}-${timestamp}.png`;
      await browser.saveScreenshot(`${screenshotsDir}/${filename}`);
      console.log(`Screenshot is saved: ${screenshotsDir}/${filename}`);
    }
  },
};
