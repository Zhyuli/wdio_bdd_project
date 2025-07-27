const { $ } = require("@wdio/globals");
const Page = require("./page");
const HomePage = require("./home.page");
const HeaderComponent = require("./components/header.component");

class AccountPage extends Page {
  get pageTitle() {
    return $('[data-test="page-title"]');
  }

  async isAtAccountPage() {
    try {
      await this.pageTitle.waitForDisplayed({ timeout: 10000 });

      const title = await this.pageTitle.getText();
      expect(title).toBe("My account");
    } catch (error) {
      throw new Error(`Account page is not displayed: ${error.message}`);
    }
  }

  async goToHomePage() {
    await HeaderComponent.goToHome();

    await expect(HomePage.homeBanner).toBeDisplayed();
  }

  async openFavoritesPage() {
    await this.isAtAccountPage();

    await HeaderComponent.goToFavorites();
  }
  async open() {
    return super.open("/account");
  }
}

module.exports = new AccountPage();
