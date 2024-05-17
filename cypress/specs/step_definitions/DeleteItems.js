import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with my username and my passsword before deleting Items', () => {
  cy.login("andre", "andre")
});

When('I have accessed on theDashboardlink in the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
}); 
// t

When('I click on the Auctions in the side menu in order to delete an auction', () => {
  cy.wait(1000)
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(1) > button").click()
});

Then('I click on the delete icon to complete the delete', () => {
  cy.wait(1000)
  cy.get("#root > div > div:nth-child(4) > div > div.MuiTableContainer-root.css-1evjoiv > table > tbody > tr:nth-child(1) > td:nth-child(11) > svg > path").click();
});
