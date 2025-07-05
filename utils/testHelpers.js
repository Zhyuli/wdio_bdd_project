
const LoginPage = require("../pageobjects/login.page");
const AccountPage = require("../pageobjects/account.page");
const HomePage = require("../pageobjects/home.page");
const ProductDetailsPage = require("../pageobjects/productDetails.page");
const HeaderPage = require("../pageobjects/header.page");
const FavoritesPage = require("../pageobjects/favorites.page");

const { validUser } = require("../data/loginData");

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
}

async function assertFavoriteSuccessMessage() {
  await expect(ProductDetailsPage.toastSuccess).toBeDisplayed();
  const messageText = await ProductDetailsPage.toastSuccess.getText();
  const validMessages = [
    "Product added to your favorites list.",
    "Product already in your favorites list.",
  ];
  expect(validMessages).toContain(messageText);
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
