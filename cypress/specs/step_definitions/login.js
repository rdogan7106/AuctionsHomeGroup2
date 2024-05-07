import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username.. and password..', () => {
  cy.login('andre3', 'andre3')

});

When('I click on the Dashboard link in the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
});

Then('I should be redirected to my profile page', () => {
  cy.wait(2000)
  cy.url().should("include", "/dashboard")
});
