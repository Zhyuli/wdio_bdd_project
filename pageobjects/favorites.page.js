const { $ } = require("@wdio/globals");
const Page = require("./page");

class FavoritesPage extends Page {
  get favoriteCard() {
    return $('[data-test^="favorite-"]');
  }

  get removeBtn() {
    return $('[data-test="delete"]');
  }

  get pageFavoritesTitlePage() {
    return $('h1[data-test="page-title"]');
  }

  async isAtFavoritesPage() {
    await expect(this.pageFavoritesTitlePage).toBeDisplayed();
    await expect(this.pageFavoritesTitlePage).toHaveText("Favorites");
  }

  async removeFromFavorites() {
    // await this.removeBtn.click();
    console.log("Waiting for delete button...");
    await this.removeBtn.waitForDisplayed({ timeout: 15000 });

    const isDisplayed = await this.removeBtn.isDisplayed();
    console.log("Delete button is displayed:", isDisplayed);

    await this.removeBtn.click();
  }

  async isFavoritesListEmpty() {
    await browser.waitUntil(
      async () => !(await this.favoriteCard.isExisting()),
      {
        timeout: 10000,
        timeoutMsg: "Favorite card did not disappear after removing.",
      }
    );

    const isExisting = await this.favoriteCard.isExisting();
    expect(isExisting).toBe(false);
  }
}

module.exports = new FavoritesPage();
