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

        //Test error message

      //  cy.get('#errorMessage')

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

    //FIXME CHANGE THE ERRORR MESSAGE 
    it('Sign in with unregisterd credentials', () => {
        const email = chance.first() + '@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'Incorrect email or password';

        cy.signin(email, password, expectedErrorMessage)

    })

    it('Signin with not activated credentials', () => {
        const firstName = chance.first();
        const lastName = chance.last();
        const email = firstName + '@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'User registered successfully!';
        cy.signup(firstName, lastName, email, password, password, expectedErrorMessage);

        const expectedErrorMessage2 = 'Email is not actived';
        cy.signin(email, password, expectedErrorMessage2)


    })
})
    describe("Test Footer Links", () => {

        it('click the link I have an account? Sign In', () => {
            //   cy.get('#goToSignIn').should('contain', 'I have an account? Sign In').click()
            cy.get('#goToSignUp').click();  
            cy.url().should('include', '/signup') // => true
               cy.url().should('eq', 'http://localhost:3000/signup') // => true
       
           })
    
        it('Link forget password', () => {
         //   cy.get('#goToSignIn').should('contain', 'I have an account? Sign In').click()
         cy.get('#forgetPassword').click();  
         cy.url().should('include', '/forgotPassword') // => true
            cy.url().should('eq', 'http://localhost:3000/forgotPassword') // => true
    
        })
    })    

    describe('Sign in Senarioes ', ()=>{

        it('sign in as Admin',()=>{

            

        })



    })

