import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('I have logged in with my username and my password before update a user', () => {
  cy.login("r","r")

});

When('I  access the user update from', () => {
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
  cy.wait(500)
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(2) > button").click()
  cy.wait(500)
  cy.get("#root > div > div:nth-child(4) > div > div.MuiTableContainer-root.css-41abqd-MuiTableContainer-root > table > tbody > tr:nth-child(1) > td:nth-child(8) > svg").click()
  cy.wait(500)
});

When('I fill the username, firstname, lastname,personalNumber, email, phone, password fields', () => {
  cy.get("#username").clear()
  cy.get("#username").type("update test")
  cy.wait(500)
  cy.get("#firstname").clear()
  cy.get("#firstname").type("test")
  cy.wait(500)
  cy.get("#lastname").clear()
  cy.get("#lastname").type("test")
  cy.wait(500)
  cy.get("#personalNumber").clear()
  cy.get("#personalNumber").type(123)
  cy.wait(500)
  cy.get("#email").clear()
  cy.get("#email").type("testupdate@gmail.com")
  cy.wait(500)
  cy.get("#phone").clear()
  cy.get("#phone").type("23342")
  cy.wait(500)
  cy.get("#password").clear()
  cy.get("#password").type("testpass")
});

Then('I click on the update button to complete the update', () => {
  cy.get("#root > div > div:nth-child(4) > div > form > button").click()
}); 