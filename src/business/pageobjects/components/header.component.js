const { $ } = require('@wdio/globals');

class HeaderComponent {
  get homeLink() {
    return $('[data-test="nav-home"]');
  }

  get favoritesLink() {
    return $('[data-test="nav-favorites"]');
  }

  get signInLink() {
    return $('[data-test="nav-sign-in"]');
  }

  async goToHome() {
    await this.homeLink.waitForDisplayed({ timeout: 10000 });
    await this.homeLink.click();
  }

  async goToFavorites() {
    await this.favoritesLink.waitForDisplayed({ timeout: 10000 });
    await this.favoritesLink.click();
  }

  async goToLogin() {
    await this.signInLink.waitForDisplayed({ timeout: 10000 });
    await this.signInLink.click();
  }
}

module.exports = new HeaderComponent();
