const { $ } = require("@wdio/globals");
const ProductDetailsPage = require("../pageobjects/productDetails.page");

async function waitForToastToDisappear() {
  const toast = ProductDetailsPage.toastSuccess;

  try {
     console.log("[waitForToastToDisappear]:Waiting for toast to become visible...");
    await toast.waitForDisplayed({ timeout: 20000 });
    console.log("[waitForToastToDisappear]:Toast became visible. Waiting for it to disappear...");
    await toast.waitForDisplayed({ reverse: true, timeout: 20000 });
      console.log("[waitForToastToDisappear]:Toast disappeared successfully.");
  } catch (e) {
    console.warn("[waitForToastToDisappear]:Toast was not visible or did not disappear");
  }
}

module.exports = { waitForToastToDisappear };
