// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//TODO
Cypress.Commands.add("signin", (email, password, errorMessage) => {
    cy.visit('http://localhost:3000/')

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain','Sign In').click();
    cy.get('p[name=errorMessage]').should('contain', errorMessage);

})

Cypress.Commands.add("signup", (firsName,lastName, email, password) => {
    cy.visit('http://localhost:3000/signup')
    cy.get('input[name=firstName]').type(firsName);
    cy.get('input[name=lastName]').type(lastName);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('input[name=confirmPassword]').type(password);
    cy.get('button[type=submit]').should('contain','Sign up').click();
    cy.wait(2000);
    cy.get('p[name=errorMessage]').should('contain', 'User registered successfully!');

})

