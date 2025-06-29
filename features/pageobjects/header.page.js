const { $ } = require("@wdio/globals");
const Page = require("./page");

class HeaderPage extends Page  {

  get userNameLabel() {
    return $('#menu');
  }
  get favoritesLink() {
  return $('[data-test="nav-my-favorites"]');
}

 async openFavorites() {
    await this.userNameLabel.waitForClickable({ timeout: 5000 });
    await this.userNameLabel.click();

    await this.favoritesLink.waitForDisplayed({ timeout: 5000 });
    await this.favoritesLink.click();
  }

}

module.exports = new HeaderPage();
