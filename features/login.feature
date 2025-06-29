Feature: User login functionality

  Scenario: Failed login with invalid credentials
    Given the user is on the login form
    When the user enters an incorrect email and password
    When the user submits the form
    Then the message "Invalid email or password" is displayed
    Then the user remains on the login form

  Scenario: Failed login with empty credentials
    Given the user is on the login form
    When the user submits the form without entering email and password
    Then the message "Email is required" is displayed
    And the message "Password is required" is displayed
    And the user remains on the login form

  Scenario: Failed login with incorrect password
    Given the user is on the login form
    When the user enters a correct email
    And the user enters an incorrect password
    And the user submits the form
    Then the message "Invalid email or password" is displayed
    And the user remains on the login form