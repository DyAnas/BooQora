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


Cypress.Commands.add("signin", (email, password, errorMessage) => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain', 'Sign In').click();
    cy.get('.Toastify__toast-body[role=alert]').should('contain', errorMessage);

})

Cypress.Commands.add("signinAsAdmin", () => {
    cy.visit(Cypress.config().baseUrl)

    const email = 'root@tietoEvry.com'
    const password = '123456aB@'
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain', 'Sign In').click();


})

Cypress.Commands.add("signup", (firstName, lastName, email, password, message, statuscode) => {
    cy.visit('/signup')
    cy.get('input[name=firstName]').type(firstName);
    cy.get('input[name=lastName]').type(lastName);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('input[name=confirmPassword]').type(password);

    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/employees/signup',
        body: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: password

        },
        failOnStatusCode: false
    })
        .then((resp) => {
            expect(resp.status).to.eq(statuscode)
            expect(resp.body.message).to.eq(message)
        })



})


// it('test request', () => {

//     cy.request({
//         method: 'POST',
//         url: '/signin',
//         body: {
//             email: 'abdulrazak.kanjo@tietoevry.com',
//             password: 'Password123@'
//         },
//         failOnStatusCode: false
//         //followRedirect: false // turn off following redirects
//     })
//         .then((resp) => {
//             // redirect status code is 302
//             expect(resp.status).to.eq(404)
//             //  expect(resp.redirectedToUrl).to.eq('http://localhost:8082/unauthorized')
//         })
// })





        //     cy.request({
        //         method: 'POST',
        //         url: '/signin',
        //         body: {
        //             email: 'root@tietoevry.com',
        //             password: 'WrongPassd123@'
        //         },
        //         failOnStatusCode: false
        //     })
        //         .then((resp) => {

        //             expect(resp.status).to.eq(404)
        //             expect(resp.body.message).to.eq('')
        //         })
        // })