Feature: AddItems
  As an user, I want to be able to add items.
  
  Scenario: Register new items
    Given I am logged in with my username and my passsword before adding a new Item
    When I have accessed on theDashboard link in the navbar
    And I click on the Add Auctions Items in the side menu
    And I fill the title field
    And I fill the price field
    And I fill the start date field
    And I fill the end date field
    And I fill the description field
    And I fill the image field
    Then I click on the register button to complete theregistration