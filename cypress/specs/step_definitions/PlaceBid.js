import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username and passwordd', () => {
  cy.wait(2000)
  cy.visit("/");
  cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click();
  cy.get("#floatingInput").type("andre3");
  cy.get("#floatingPassword").type("andre3");
  cy.get("#root > div.form-signin > form > button").click();
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


Then('I click the Submit Bid-button to complete the bid', (buttonText) => {
  cy.wait(2000)
  cy.contains('Submit Bid').click();
});
