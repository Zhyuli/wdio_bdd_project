
Feature: User Registration

Scenario: Successful registration of a new customer

Given the user opens the website
 Given the user navigates to the registration form from the login window
 When the user fills in all required fields with valid data
 Then submits the registration form
 Then the user is redirected back to the login window
 Then can log in using the registered email and password