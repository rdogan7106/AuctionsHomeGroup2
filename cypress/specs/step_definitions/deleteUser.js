import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username and password before the deletion process', () => {
  cy.visit("/");
  cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click();
  cy.get("#floatingInput").type("r")
  cy.get("#floatingPassword").type("r")
  cy.get("#root > div.form-signin > form > button").click()
  cy.wait(1000)
});

When('I click on the User link in the side menu while in my Dashboard Panel', () => {
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
  cy.wait(1000)
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(2) > button").click()

});

When('I click on the delete icon for the first user in the User table', () => {
  cy.get("#root > div > div:nth-child(4) > div > div.MuiTableContainer-root.css-41abqd-MuiTableContainer-root > table > tbody > tr:nth-child(1) > td:nth-child(9) > svg").click()
  cy.wait(1000)
});

Then('the user should be deleted from the system', () => {
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(2) > button").click()
});