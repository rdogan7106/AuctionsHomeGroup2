import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with my username and my passsword before updating Items', () => {
  cy.login("vs", "vs")
});

When('I have accessed on theDashboardlinkin the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
});

When('I click on the Auctions in the side menu', () => {
  cy.wait(1000)
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(1) > button").click()
});

When('I click on the update ikon to complete the update', () => {
  cy.wait(1000)
  cy.get("#root > div > div:nth-child(4) > div > div.MuiTableContainer-root.css-41abqd-MuiTableContainer-root > table > tbody > tr:nth-child(1) > td:nth-child(10) > svg > path").click()
});

When('I fill the title, price, description, start date, end date, image', () => {
  When('I fill the username, firstname, lastname,personalNumber, email, phone, password fields', () => {
    cy.get("#title").clear()
    cy.get("#title").type("update test")
    cy.wait(500)
    cy.get("#price").clear()
    cy.get("#price").type("9")
    cy.wait(500)
    cy.get("#description").clear()
    cy.get("#description").type("test")
    cy.wait(500)
    cy.get("#startDate").clear()
    cy.get("#startDate").type("2024-05 - 14T03: 33")
    cy.wait(500)
    cy.get("#endDate").clear()
    cy.get("#endDate").type("2024-05-16T03:33")
    cy.wait(1000)
    cy.get("#image").clear()
    cy.wait(500)
    cy.get("#image").type("test image")
  });
});

Then('Then I click on the register button to update the registration', () => {
  cy.get("#root > div > div:nth-child(4) > div > form > button").click()
});