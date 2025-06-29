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
    await this.removeBtn.click();
  }

  async isFavoritesListEmpty() {
    const isExisting = await this.favoriteItemCard.isExisting();
    expect(isExisting).toBe(false);
  }
}

module.exports = new FavoritesPage();
