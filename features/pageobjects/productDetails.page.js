const Page = require("./page");

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
    const toast = await this.toastSuccess;
    if (await toast.isDisplayed()) {
      await toast.waitForDisplayed({ reverse: true, timeout: 10000 });
    }
  }

  async isAtProductPage() {
    await this.productName.waitForDisplayed({ timeout: 7000 });
    return await this.productName.isDisplayed();
  }

  async openProductDetailsPage() {
    await this.productTitle.click();
  }

  async open(productId) {
    // const productId = '01JYVGV7NND5XCEKKNFC61P1TM';
    return super.open(`/product/${productId}`);
  }
}

module.exports = new ProductDetailsPage();
