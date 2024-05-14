Feature: UserItems
  As a user, I want to be able to view the items I have registered

  Background:
    Given I am logged in with username..... and passsword.....

  Scenario: View registered items
    When I have accessed the Dashboard link in the navbar
    And I click on the User Items in the side menu
    Then I can see the items I have registered