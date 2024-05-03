gitFeature: Login

  As a user/admin, I want to be able to log in to the website so that I can access my dashboard.

  Background:
    Given I am logged in with username and password 

  Scenario: Accessing dashboard page after successful login
    When I click on the Dashboard link in the navbar
    Then I should be redirected to my profile page