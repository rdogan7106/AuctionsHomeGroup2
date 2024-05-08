import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('I am logged in with username and password to place a bid', () => {
  cy.login("vs4", "vs4")
});

When('I am redirected to the dashboard and I click on the Auctions-button', () => {
  cy.wait(2000);
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click();
});

When('I click the View Details-button of the desired auction item', () => {
  cy.get('.card.m-2').eq(0).find('button').contains('View Details').click();
});

When('I enter 1 in the Bid amount field', () => {
  cy.wait(2000);
  cy.get('input[type="number"]').clear().type("1");
});

When('I click the Submit Bid-button to complete the bid', () => {
  cy.wait(2000);
  cy.get('table.table-striped tbody').then($tbody => {
    if ($tbody.find('tr').length === 0) {
      cy.wrap(0).as('initialBidHistoryLength');
    } else {
      cy.wrap($tbody.find('tr').length).as('initialBidHistoryLength');
    }
  });
  cy.contains('Submit Bid').click();
});

Then('I should receive a confirmation message indicating that my bid was successful', () => {
  cy.get('@initialBidHistoryLength').then((initialBidHistoryLength) => {
    cy.log(`Initial bid history length: ${initialBidHistoryLength}`);
    cy.wait(2000);
    cy.get('table.table-striped tbody tr').its('length').then((updatedBidHistoryLength) => {
      cy.log(`Updated bid history length: ${updatedBidHistoryLength}`);
      expect(updatedBidHistoryLength).to.eq(initialBidHistoryLength + 1);
    });
  });
});
