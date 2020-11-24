/// <reference types="cypress"/>

import Chance from 'chance';


const chance = new Chance();

beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
})

describe("Page elements test", () => {

    it('Checks logo, Title, error message, form elements', () => {
        //Test logo
        cy.get(".center").find("img").should('have.attr', 'src').should('include', 'logo');

        //Test Title 
        cy.contains("Sign In");

        //Test Sign in form
        cy.get('form').within(($form) => {

            //Test Email TextFiled
            cy.get('.MuiTextField-root').first().find('input').should('have.attr', 'name')
                .should('include', 'email')

            //Test Password TextField
            cy.get('.MuiTextField-root').next().find('input').should('have.attr', 'name')
                .should('include', 'password')

            // Test Submit button
            cy.get('button').should('have.attr', 'type').should('contain', 'submit')
        })

        // Test forget password link
        cy.get('a').first().should('have.attr', 'href').should('include', '/forgotPassword')

        // Test sign up link
        cy.get('a').next().should('have.attr', 'href').should('include', '/signup')


    })
})


describe("Validation", () => {
    it('Test submiting empty form', () => {


        cy.get("#submit").click();
        cy.get("#input-helper-text").should("contain", "Required")
        cy.get("#password-helper-text").should("contain", "Required")
    })

    it('Sign in with email not match TietoEvry', () => {
        // generates random email
        const email = chance.email();
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'Email must match tietoEvry';
        // signin custom method
        cy.signin(email, password, expectedErrorMessage)

    })


    it('Sign in with unregisterd credentials', () => {
        const email = 'unregistered12@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'Email is not registered';

        cy.signin(email, password, expectedErrorMessage)
    })

    it('Signin with not activated credentials', () => {
        const firstName = "anyfirstname"
        const lastName = 'anylastname'
        const email = firstName + '@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'User registered successfully!';
       const expectedCodeStatus=201;
        cy.signup(firstName, lastName, email, password,expectedErrorMessage,expectedCodeStatus);
        const expectedErrorMessage2 = 'Email is not actived';
        cy.signin(email, password, expectedErrorMessage2).end();
        cy.log('Check click on resend activation link')
        cy.get('#resendActivationLink').click();
        cy.get('.Toastify__toast-body[role=alert]').should('contain', 'Cods is sent, Check your email!');

    })

    it('Sign in with wrong password', () => {
        const email = 'root@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage='Incorrect email or password'
        cy.signin(email, password, expectedErrorMessage)
    })

    it('Sign in with valid credentials', () => {
        const email = 'john@tietoevry.com';
        const password = '123456aB@';
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);
        cy.get('button[type=submit]').should('contain', 'Sign In').click();
        cy.url().should('include', '/newBooking')
        
    })
})



describe("Test Footer Links", () => {

    it('click the link I have an account? Sign In', () => {
        //   cy.get('#goToSignIn').should('contain', 'I have an account? Sign In').click()
        cy.get('#goToSignUp').click();
        cy.url().should('include', '/signup') // => true
        cy.url().should('eq', Cypress.config().baseUrl+'/signup') // => true

    })

    it('Link forget password', () => {
        //   cy.get('#goToSignIn').should('contain', 'I have an account? Sign In').click()
        cy.get('#forgetPassword').click();
        cy.url().should('include', '/forgotPassword') // => true
        cy.url().should('eq', Cypress.config().baseUrl+'/forgotPassword') // => true

    })
})

