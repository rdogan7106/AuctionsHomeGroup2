import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username and passwordd', () => {
  cy.login("andre3", "andre3")
});


When('I am redirected to the dashboard and I click on the Auctions-button', () => {
  cy.wait(2000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
});

When('I click the View Details-button of the desired auction item', () => {
  cy.get('.card.m-2').eq(0).find('button').contains('View Details').click();
});


When('I enter 1 in the Bid amount field', (bidAmount) => {
  cy.wait(2000)
  cy.get('input[type="number"]').clear().type("1");
});


When('I click the Submit Bid-button to complete the bid', (buttonText) => {
  cy.wait(2000)
  cy.contains('Submit Bid').click();
});

Then('I should receive a confirmation message indicating that my bid was successful', () => {
  cy.request(`/api/auctions/3/bidHistory`).then((response) => {
    expect(response.status).to.eq(200);
    const bidHistory = response.body;
    const latestBid = bidHistory[0];
    expect(latestBid.bidPrice).to.eq(21);
    expect(latestBid.bidderID).to.eq('e3dd6ba2-e2f2-4f42-8859-d63fb346b264');
  });
});

