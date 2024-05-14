Feature: DeleteItems
  As an admin, I want to be able to delete items.

  Scenario: Delete items
    Given I am logged in with my username and my passsword before deleting Items
    When I have accessed on theDashboardlink in the navbar
    And I click on the Auctions in the side menu in order to delete an auction
    Then I click on the delete icon to complete the delete