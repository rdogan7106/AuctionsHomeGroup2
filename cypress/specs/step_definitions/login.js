import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username and password', () => {
  cy.visit("/");
  cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click();
  cy.get("#floatingInput").type("r")
  cy.get("#floatingPassword").type("r")
  cy.get("#root > div.form-signin > form > button").click()
 
});

When('I click on the Dashboard link in the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
});

Then('I should be redirected to my profile page', () => {
  cy.wait(1000)
  cy.url().should("include","/dashboard")
});