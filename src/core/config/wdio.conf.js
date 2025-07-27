const fs = require("fs");
const path = require("path");
const { beforeStep, beforeScenario, afterStep } = require("../hooks/hooks.js");

exports.config = {
  runner: "local",

  specs: ["../../tests/**/*.feature"],

  maxInstances: 10,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [ "--disable-gpu", "--window-size=1920,1080"],//"--headless",
      },
    },
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: [
          // "-headless",
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
    require: [
      path.resolve(__dirname, "../../business/step-definitions/**/*.js"),
    ],

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
    require("../setup/assertions");
  },
  beforeScenario,
  beforeStep,
  afterStep,
};
