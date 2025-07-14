const LoginPage = require("../../../src/business/pageobjects/login.page");
const AccountPage = require("../../../src/business/pageobjects/account.page");
const HomePage = require("../../../src/business/pageobjects/home.page");
const ProductDetailsPage = require("../../../src/business/pageobjects/productDetails.page");
const HeaderPage = require("../../../src/business/pageobjects/header.page");
const FavoritesPage = require("../../../src/business/pageobjects/favorites.page");

const { validUser } = require("../../../src/business/data/loginData");

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
  errorText.should.equal(
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
  // Previous version using WebdriverIO-style expect:
  // expect(validMessages).toContain(messageText);

  // Chai assertions
  expectChai(validMessages).to.include(messageText);
  validMessages.should.include(messageText);
}

async function goToFavorites() {
  await HeaderPage.openFavorites();
  await FavoritesPage.isAtFavoritesPage();
}

module.exports = {
  loginAndClickOnProduct,
  assertFavoriteSuccessMessage,
  assertUnauthorizedFavoriteMessage,
  goToFavorites,
};
