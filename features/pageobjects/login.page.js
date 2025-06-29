const { $ } = require("@wdio/globals");
const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputEmail() {
    return $("#email");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnSubmit() {
    return $('input[data-test="login-submit"]');
  }

  get registerLink() {
    return $('[data-test="register-link"]');
  }

  get loginErrorMessage() {
    return $('[data-test="login-error"] .help-block');
  }

  get emailRequiredMessage() {
    return $('[data-test="email-error"]');
  }

  get passwordRequiredMessage() {
    return $('[data-test="password-error"]');
  }
  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
  async goToRegister() {
    return this.registerLink.click();
  }
  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("auth/login");
  }
  isDisplayed() {
    return this.inputEmail.isDisplayed();
  }
}

module.exports = new LoginPage();
