Feature: Add to favourites functionality

Scenario: Attempting to add a product to favourites without being logged in
  Given the user is on the home page
  When the user clicks on a product
  Then the product details page is displayed
  When the user tries to add the product to favourites
  Then the message "Unauthorized, can not add product to your favorite list." is displayed


Scenario: Adding a product to favourites when logged in
  Given the user is logged in and is on the home page
  When the user views the product details
  And adds the product to favourites
  Then the message "Product added to your favorite list." is displayed

 
# Scenario: Deleting one product from favorites
#   Given the user is logged in and has a product in the Favorites list
#   And the user is on the Favorites page
#   When the user clicks the "Remove from favorites" icon on the product
#   Then the product is removed from the Favorites list
 