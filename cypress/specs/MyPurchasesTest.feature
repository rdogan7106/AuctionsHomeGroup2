Feature: MyPurchases
  As a user, I want to be able to view the items I have purchased

  Background:
    Given I am logged in with username...... and passsword......

  Scenario: View purchased items
    When I have accessed the Dashboard link in the navbar.
    And I click on the My Purchases in the side menu
    Then I can see the items I have purchased