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
    try {
      await this.pageTitle.waitForDisplayed({ timeout: 10000 });
      // await expect(this.pageTitle).toHaveText("My account");
      const title = await this.pageTitle.getText();
      expect(title).toBe("My account");
    } catch (error) {
      throw new Error(`Account page is not displayed: ${error.message}`);
    }
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
