Feature: AddItems
  As an user, I want to be able to add items.

  Background:
    Given I am logged in with username and passswordd

  Scenario: Register new items
    When I have accessed on theDashboard link in the navbar
    And I click on the Add Auctions Items in the side menu
    And I fill the title field
    And I fill the price field
    And I fill the start date field
    And I fill the end date field
    And I fill the description field
    And I fill the image field
    Then I click on the register button to complete the registration