const { $ } = require("@wdio/globals");
import ProductDetailsPage from "../pageobjects/productDetails.page";

async function waitForToastToDisappear() {
  const toast = ProductDetailsPage.toastSuccess;

  try {
    await toast.waitForDisplayed({ timeout: 5000 });
    await toast.waitForDisplayed({ reverse: true, timeout: 10000 });
  } catch (e) {
    console.warn("Toast was not visible or did not disappear");
  }
}

module.exports = { waitForToastToDisappear };
