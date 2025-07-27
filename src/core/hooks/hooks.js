const fs = require("fs");
const path = require("path");

const beforeScenario = function (world, context) {
  browser.waitUntil(
    () => browser.execute(() => document.readyState === "complete"),
    {
      timeout: 10000,
      timeoutMsg: "Page did not load within timeout",
    }
  );
};

const beforeStep = function (step, scenario, context) {
  browser.waitUntil(
    () => browser.execute(() => document.readyState === "complete"),
    {
      timeout: 15000,
      timeoutMsg: "Page did not load within timeout",
    }
  );
};

const afterStep = async function (step, scenario, result, context) {
  if (!result.passed) {
    const screenshotsDir = path.resolve(__dirname, "../artifacts/screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${scenario.name}-${timestamp}.png`;
    await browser.saveScreenshot(`${screenshotsDir}/${filename}`);
    console.log(`Screenshot is saved: ${screenshotsDir}/${filename}`);
  }
};

module.exports = {
  beforeScenario,
  beforeStep,
  afterStep,
};
