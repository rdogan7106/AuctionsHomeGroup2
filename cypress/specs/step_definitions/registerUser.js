import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in with username and password before registration' , () => {
  cy.visit("/");
  cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click();
  cy.get("#floatingInput").type("r")
  cy.get("#floatingPassword").type("r")
  cy.get("#root > div.form-signin > form > button").click()
 
});

When('I have accessed on the Dashboard link in the navbar', () => {
  cy.wait(1000)
  cy.get("#navbarSupportedContent > ul > li:nth-child(2) > a").click()
});

When('I click on the User link in the side menu', () => {
  cy.get("#root > div > div.d-flex.flex-column.flex-shrink-0.p-3.bg-body-tertiary > ul > li:nth-child(2) > button").click()
});

When('I click on the add icon in the User table', () => {
  cy.get("#root > div > div:nth-child(4) > div > div.MuiTableContainer-root.css-41abqd-MuiTableContainer-root > table > thead > tr:nth-child(1) > th:nth-child(2)").click()
});

When('I fill the username field', () => {
  cy.get("#username").type("test")
});

When('I fill the firstname field', () => {
  cy.get("#firstname").type("test")
});

When('I fill the lastname field', () => {
  cy.get("#lastname").type("test")
});

When('I fill the personal number field', () => {
 cy.get("#personalNumber").type(123)
});

When('I fill the email field', () => {
  cy.get("#email").type("test@gmail.com")
});

When('I fill the phone field', () => {
  cy.get("#phone").type("23342")
});

When('I fill the password field', () => {
  cy.get("#password").type("testpass")
});

Then('I click on the register button to complete the registration', () => {
  cy.get("#root > div > div:nth-child(4) > div > form > button").click()
});