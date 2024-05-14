Feature: UpdateItems
  As an admin, I want to be able to update items.

  Scenario: Update items
    Given I am logged in with my username and my passsword before updating Items
    When I have accessed on theDashboardlinkin the navbar
    And I click on the Auctions in the side menu
    And I click on the update ikon to complete the update
    And I fill the title, price, description, start date, end date, image
    Then Then I click on the register button to update the registration