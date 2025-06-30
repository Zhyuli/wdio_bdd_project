const { $ } = require("@wdio/globals");
const Page = require("./page");
const HomePage = require("./home.page");

class AccountPage extends Page {
    
  get pageTitle() {
    return $('[data-test="page-title"]');
  }

  get homeLink() {
    return $('[data-test="nav-home"]');
  }

  get favoritesLink() {
    return $('[data-test="nav-favorites"]');
  }

  async isAtAccountPage() {
    await this.pageTitle.waitForDisplayed({ timeout: 5000 });
    await expect(this.pageTitle).toHaveText("My account");
  }
  async goToHomePage() {
    await this.homeLink.click();
    await expect(HomePage.homeBanner).toBeDisplayed();
  }

  async openFavoritesPage() {
    await this.isAtAccountPage();
    await this.favoritesLink.waitForDisplayed({ timeout: 10000 });
    await this.favoritesLink.click();
  }
  async open() {
  return super.open("/account"); 
}
}

module.exports = new AccountPage();
