const LoginPage = require("../../business/pageobjects/pages/login.page");
const AccountPage = require("../../business/pageobjects/pages/account.page");
const HomePage = require("../../business/pageobjects/pages/home.page");
const ProductDetailsPage = require("../../business/pageobjects/pages/productDetails.page");
// const HeaderPage = require("../../business/pageobjects/pages/header.page");
const HeaderComponent = require("../../business/pageobjects/components/header.component");
const FavoritesPage = require("../../business/pageobjects/pages/favorites.page");
const {waitForToastToDisappear} = require("../../core/utils/toastUtils");

const { validUser } = require("../../business/data/loginData");

async function loginAndClickOnProduct() {
  await LoginPage.open();
  await LoginPage.login(validUser.email, validUser.password);
  await AccountPage.isAtAccountPage();
  await AccountPage.goToHomePage();
  await HomePage.clickOnProduct();
}

async function assertUnauthorizedFavoriteMessage() {
  await expect(ProductDetailsPage.toastError).toBeDisplayed();
  await expect(ProductDetailsPage.toastError).toHaveText(
    "Unauthorized, can not add product to your favorite list."
  );
  // Chai assertions
  const errorText = await ProductDetailsPage.toastError.getText();
  expectChai(errorText).to.equal(
    "Unauthorized, can not add product to your favorite list."
  );
}

async function assertFavoriteSuccessMessage() {
  await expect(ProductDetailsPage.toastSuccess).toBeDisplayed();
  const messageText = await ProductDetailsPage.toastSuccess.getText();
  const validMessages = [
    "Product added to your favorites list.",
    "Product already in your favorites list.",
  ];

  // Chai assertions
  validMessages.should.include(messageText);
}

async function goToFavorites() {
  await waitForToastToDisappear(
    ProductDetailsPage.toastSuccess,
    ProductDetailsPage.toastError
  );

  await HeaderComponent.openFavoritesDropdown;
  await FavoritesPage.isAtFavoritesPage();
}

module.exports = {
  loginAndClickOnProduct,
  assertFavoriteSuccessMessage,
  assertUnauthorizedFavoriteMessage,
  goToFavorites,
};
