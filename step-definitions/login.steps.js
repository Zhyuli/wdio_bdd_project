const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const { validUser, invalidUser, emptyUser } = require("../data/loginData");
const { expect } = require("@wdio/globals");

Given("the user is on the login form", async () => {
  await LoginPage.open();
});

When("the user enters an incorrect email and password", async () => {
  await LoginPage.inputEmail.setValue(invalidUser.email);
  await LoginPage.inputPassword.setValue(invalidUser.password);
});

When("the user submits the form", async () => {
  await LoginPage.btnSubmit.click();
});

Then('the message "Invalid email or password" is displayed', async () => {
  await (await LoginPage.loginErrorMessage).waitForDisplayed({ timeout: 7000 });
  await expect(LoginPage.loginErrorMessage).toBeDisplayed();

  const emailErrorText = await LoginPage.loginErrorMessage.getText();

  // Chai assertions
  emailErrorText.should.equal("Invalid email or password");
});

Then("the user remains on the login form", async () => {
  await expect(LoginPage.inputEmail).toBeDisplayed();
});

When(
  "the user submits the form without entering email and password",
  async () => {
    await LoginPage.inputEmail.setValue(emptyUser.email);
    await LoginPage.inputPassword.setValue(emptyUser.password);
    await LoginPage.btnSubmit.click();
  }
);

Then('the message "Email is required" is displayed', async () => {
  await (
    await LoginPage.emailRequiredMessage
  ).waitForDisplayed({ timeout: 5000 });
  await expect(LoginPage.emailRequiredMessage).toBeDisplayed();

  const emailRequiredMessageText =
    await LoginPage.emailRequiredMessage.getText();

  // Chai assertions

  emailRequiredMessageText.should.equal("Email is required");
});

Then('the message "Password is required" is displayed', async () => {
  await (
    await LoginPage.passwordRequiredMessage
  ).waitForDisplayed({ timeout: 5000 });
  await expect(LoginPage.passwordRequiredMessage).toBeDisplayed();

  const passwordRequiredMessageText =
    await LoginPage.passwordRequiredMessage.getText();

  // Chai assertions

  passwordRequiredMessageText.should.equal("Password is required");
});

When("the user enters a correct email", async () => {
  await LoginPage.inputEmail.setValue(validUser.email);
});

When("the user enters an incorrect password", async () => {
  await LoginPage.inputPassword.setValue(invalidUser.password);
});
