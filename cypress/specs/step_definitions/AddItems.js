import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with my username and my passsword before adding an item', () => {
  cy.login("f", "12345")
});

When('I have accessed on theDashboard link in the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click()
});

When('I click on the Add Auctions Items in the side menu', () => {
  cy.wait(1000)
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(3) > button").click()
});

When('I fill the title field', () => {
  cy.wait(1000)
  cy.get("#title").type("fifa")
});
When('I fill the price field', () => {
  cy.wait(1000)
  cy.get("#price").type("40")
});

When('I fill the start date field', () => {
  cy.wait(1000)
  cy.get("#startDate").type("2024-05-14T03:33")
});

When('I fill the end date field', () => {
  cy.wait(1000)
  cy.get("#endDate").type("2024-05-16T03:33")
});

When('I fill the description field', () => {
  cy.wait(1000)
  cy.get("#description").type("game")
});

When('I fill the image field', () => {
  cy.wait(1000)
  cy.get("#image").type("test")
});

Then('I click on the register button to complete theregistration', () => {
  cy.wait(1000)
  cy.get("#root > div > div:nth-child(4) > div > form > button").click()
});