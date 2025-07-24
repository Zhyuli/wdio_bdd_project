const Page = require("./page");
const { waitForToastToDisappear } = require("../../core/utils/toastUtils");

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

  get toastError() {
    return $(".toast-message");
  }

  get toastSuccess() {
    return $('div.toast-message[role="alert"]');
  }

  async addToFavorites() {
    await this.addToFavoritesButton.click();
    await waitForToastToDisappear();
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
