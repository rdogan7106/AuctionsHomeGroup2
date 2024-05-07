Cypress.Commands.add('login',(username,password)=> {
    cy.visit("/");
    cy.wait(500)
    cy.get("#navbarSupportedContent > ul > li:nth-child(3) > a").click(); 
    cy.wait(500)
    cy.get("#floatingInput").type(username)
    cy.wait(500)
    cy.get("#floatingPassword").type(password)
    cy.wait(500)
    cy.get("#root > div.form-signin > form > button").click()
    cy.wait(500)
})