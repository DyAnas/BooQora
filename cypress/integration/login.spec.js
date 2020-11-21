/// <reference types="cypress"/>

import Chance from "chance";

const chance = new Chance();

beforeEach(() => {
    cy.visit('http://localhost:3000/')
})

describe("Sign in page tests", () => {

    it('Page elements test', () => {
        //Test logo
        cy.get(".center").find("img").should('have.attr', 'src').should('include', 'logo');

        //Test Title 
        cy.contains("Sign In");

        //Test error message

        cy.get('#errorMessage')

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


describe("Sign in Test Validation", () => {
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

    //FIXME CHANGE THE ERRORR MESSAGE 
    it('Sign in with unregisterd credentials', () => {
        const email = chance.first() + '@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'Incorrect email or password';

        cy.signin(email, password, expectedErrorMessage)

    })

    it('Signin with not activated credentials', () => {
        const firsName = chance.first();
        const lastName = chance.last();
        const email = firsName + '@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'Email is not actived';
        cy.signup(firsName, lastName, email, password)
        cy.signin(email, password, expectedErrorMessage)

        
    })

   
})
