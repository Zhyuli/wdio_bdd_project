async function waitForToastToDisappear(toast) {
  try {
    console.log(
      "[waitForToastToDisappear]:Waiting for toast to become visible..."
    );

    if (await toast.isExisting()) {
      console.log("[DEBUG]: Toast exists in DOM.");

      const opacity = await toast.getCSSProperty("opacity");
      const visibility = await toast.getCSSProperty("visibility");
      const display = await toast.getCSSProperty("display");

      console.log(
        `[DEBUG]: Toast styles - opacity: ${opacity.value}, visibility: ${visibility.value}, display: ${display.value}`
      );
    } else {
      console.warn("[DEBUG]: Toast does not exist in DOM.");
    }

    await toast.waitForDisplayed({ timeout: 20000 });
    console.log(
      "[waitForToastToDisappear]:Toast became visible. Waiting for it to disappear..."
    );

    await toast.waitForDisplayed({ reverse: true, timeout: 20000 });
    console.log("[waitForToastToDisappear]:Toast disappeared successfully.");
  } catch (e) {
    console.warn(
      "[waitForToastToDisappear]:Toast was not visible or did not disappear"
    );
  }
}

module.exports = { waitForToastToDisappear };
