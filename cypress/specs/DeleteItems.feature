Feature: DeleteItems
  As an admin, I want to be able to delete items.

  Scenario: Delete items
    Given I am logged in with my username and my passsword before deleting Items
    When I have accessed on theDashboardlink in the navbar
    And I click on theAuctions in the side menu
    Then I click on the delete ikon to complete the delete