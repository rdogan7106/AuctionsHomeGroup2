Feature: Place a bid

  Background: 
    Given I am logged in with username.... and passwordd....

  Scenario: Placing a succesful bid after logging in

    When I am redirected to the dashboard and I click on the Auctions-button
    And I click the View Details-button of the desired auction item
    And I enter 1 in the Bid amount field
    And I click the Submit Bid-button to complete the bid
    Then I should receive a confirmation message indicating that my bid was successful
