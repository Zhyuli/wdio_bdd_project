const { Given, When, Then } = require("@wdio/cucumber-framework");

const HomePage = require("../pageobjects/home.page");

const ProductDetailsPage = require("../pageobjects/productDetails.page");
const FavoritesPage = require("../pageobjects/favorites.page");

const {
  loginAndClickOnProduct,
  assertFavoriteSuccessMessage,
  assertUnauthorizedFavoriteMessage,
  goToFavorites,
} = require("../../core/utils/testHelpers");



//Scenario: Attempting to add a product to favourites without being logged in

Given("the user is on the home page", async () => {
  await HomePage.open();
});

When("the user clicks on a product", async () => {
  await HomePage.clickOnProduct();
});

Then("the product details page is displayed", async () => {
  await ProductDetailsPage.isAtProductPage();
  await expect(ProductDetailsPage.productName).toBeDisplayed();
});

When("the user tries to add the product to favourites", async () => {
  await ProductDetailsPage.addToFavorites();
});

Then(
  'the message "Unauthorized, can not add product to your favorite list." is displayed',
  async () => {
    await assertUnauthorizedFavoriteMessage();
  }
);

// Scenario: Adding a product to favourites when logged in

Given("the user is logged in and is on the home page", async () => {
  await loginAndClickOnProduct();
});

When("the user views the product details", async () => {
  await ProductDetailsPage.isAtProductPage();
  await expect(ProductDetailsPage.productName).toBeDisplayed();
});

When("adds the product to favourites", async () => {
  await ProductDetailsPage.addToFavorites();
});

Then(
  'the message "Product added to your favorite list." is displayed',
  async () => {
    await assertFavoriteSuccessMessage();
  }
);

// Scenario: Deleting one product from favorites

Given(
  "the user is logged in and has a product in the Favorites list",
  async () => {
    await loginAndClickOnProduct();
    await ProductDetailsPage.addToFavorites();
  }
);
Given("the user is on the Favorites page", async () => {
  await goToFavorites();
});

When(
  'the user clicks the "Remove from favorites" icon on the product',
  async () => {
    await FavoritesPage.removeFromFavorites();
  }
);

Then("the product is removed from the Favorites list", async () => {
  await FavoritesPage.isFavoritesListEmpty();
});
