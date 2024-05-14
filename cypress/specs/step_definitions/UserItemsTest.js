import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username..... and passsword.....', () => {
  cy.login("andre5", "andre5")
});

When('I have accessed the Dashboard link in the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click()
});

When('I click on the User Items in the side menu', () => {
  cy.wait(1000)
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(2) > button").click()
});



Then('I can see the items I have registered', () => {
  cy.wait(2000);
  cy.get('.container .d-flex.flex-wrap .MuiCard-root').should('exist');
});
