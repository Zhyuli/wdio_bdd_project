const { Given, When, Then } = require("@wdio/cucumber-framework");
const HomePage = require("../pageobjects/home.page.js");
const LoginPage = require("../pageobjects/login.page.js");
const RegisterPage = require("../pageobjects/register.page.js");
const AccountPage = require("../pageobjects/account.page.js");
const { validUser } = require("../data/userData.js");

Given("the user opens the website", async () => {
  await HomePage.open();
});

Given(
  "the user navigates to the registration form from the login window",
  async () => {
    await HomePage.goToLogin();
    await LoginPage.goToRegister();
    await RegisterPage.open();
  }
);

When("the user fills in all required fields with valid data", async () => {
  await RegisterPage.fillForm(validUser);
});

Then("submits the registration form", async () => {
  await RegisterPage.btnSubmit.click();
});

Then("the user is redirected back to the login window", async () => {
  await expect(LoginPage.inputEmail).toBeDisplayed({ timeout: 5000 });
});

Then("can log in using the registered email and password", async () => {
  await LoginPage.open();
  await LoginPage.login(validUser.email, validUser.password);
  await AccountPage.isAtAccountPage();

  // Chai assertions expectChai to verify account page title
  const accountPageTitle = await AccountPage.pageTitle.getText();

   expectChai(accountPageTitle).to.equal("My account");
});
