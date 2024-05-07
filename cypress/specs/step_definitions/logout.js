import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username and password before log out', () => {
  cy.login("r","r")
});

When('I click on the logout link in the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click(); 
});

Then('I should be redirected to the login page',()=> {
  cy.timeout(1000)
  cy.url().should("include","/login")
})