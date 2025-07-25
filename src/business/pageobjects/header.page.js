const { $ } = require("@wdio/globals");
const Page = require("./page");
const { waitForToastToDisappear } = require("../../core/utils/toastUtils");

class HeaderPage extends Page {
  get userNameLabel() {
    return $("#menu");
  }
  get favoritesLink() {
    return $('[data-test="nav-my-favorites"]');
  }

  async openFavorites() {
    await waitForToastToDisappear();
    await this.userNameLabel.waitForClickable({ timeout: 5000 });
    await this.userNameLabel.click();

    await this.favoritesLink.waitForDisplayed({ timeout: 5000 });
    await this.favoritesLink.click();
  }
}

module.exports = new HeaderPage();
