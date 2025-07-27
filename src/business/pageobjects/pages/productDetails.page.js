const Page = require("./page");
const { waitForToastToDisappear } = require("../../../core/utils/toastUtils");

class ProductDetailsPage extends Page {
  get productTitle() {
    return $('[data-test="product-"]');
  }

  get productName() {
    return $('[data-test="product-name"]');
  }

  get addToFavoritesButton() {
    return $("#btn-add-to-favorites");
  }
get toastSuccess() {
    return $('div[role="alert"].toast-message');
  }
  get toastError() {
    return $('div[role="alert"].toast-message');
  }

  async addToFavorites() {
    await this.addToFavoritesButton.click();

    await waitForToastToDisappear(this.toastSuccess);
  }

  async isAtProductPage() {
    await this.productName.waitForDisplayed({ timeout: 7000 });
    return await this.productName.isDisplayed();
  }

  async openProductDetailsPage() {
    await this.productTitle.click();
  }

  async open(productId) {
    return super.open(`/product/${productId}`);
  }
}

module.exports = new ProductDetailsPage();
