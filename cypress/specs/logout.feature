Feature: Logout

  As a user/admin, I want to be able to log out of the website so that I can ensure my session is securely closed.

  Background:
    Given I am logged in with username and password 

  Scenario: Successfully logging out
    When I click on the logout link in the navbar
    Then I should be redirected to the login page
