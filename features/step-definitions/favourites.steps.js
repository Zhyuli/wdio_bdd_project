const { Given, When, Then } = require("@wdio/cucumber-framework");
const { validUser } = require("../data/loginData");
const HomePage = require("../pageobjects/home.page");
const LoginPage = require("../pageobjects/login.page");
const ProductDetailsPage = require("../pageobjects/productDetails.page");
const AccountPage = require("../pageobjects/account.page");
const {
  loginAndClickOnProduct,
  assertFavoriteSuccessMessage,
  assertUnauthorizedFavoriteMessage,
} = require("../utils/testHelpers");

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
