/// <reference types="cypress"/>

import Chance from 'chance';

const chance = new Chance();

beforeEach(() => {
    cy.visit(Cypress.config().baseUrl+'/signup')
})


describe("Page elements test", () => {

    it('Check logo, Title, error message, form elements', () => {
        //Test logo
        cy.get(".center").find("img").should('have.attr', 'src').should('include', 'logo');

        //Test Title 
        cy.contains("Sign Up");

        //Test error message

        cy.get('p[name=errorMessage]');

        //Test Sign in form
        cy.get('form').within(($form) => {

            //firstName input
            cy.get('input[name=firstName]');

            //lastName input
            cy.get('input[name=lastName]');

            //Test Email TextFiled
            cy.get('input[name=email]');

            //Test Password TextField
            cy.get('input[name=password]');

            //Test Confirm Password TextField
            cy.get('input[name=confirmPassword]');

            // Test Submit button
            cy.get('button[type=submit]').should('contain', 'Sign up');

            // Test forget password link            
            cy.get('a').should('contain', 'I have an account? Sign In')
                .should('have.attr', 'href').should('include', '/')

        })
    })
})

describe("Validation", () => {

    it('Test submiting empty form shoould give (Required warning)', () => {

        cy.get('button[type=submit]').click();
        cy.get("#firstName-helper-text").should("contain", "Required")
        cy.get("#lastName-helper-text").should("contain", "Required")
        cy.get("#email-helper-text").should("contain", "Required")
        cy.get("#password-helper-text").should("contain", "Required")
        cy.get("#confirmPassword-helper-text").should("contain", "Required")
    })


    it('Insert Invalid input ', () => {

        // first name Starts with digit
        const firstName = '22kjetil';
        // last name Starts with digit
        const lastName = '5peteresen';
        // email without .somthing    
        const email = "test@gmail";
        //password shorter than 8 characters, no uppercas char, No Number
        const password = 'ranpass';
        //confirm password dosen't match
        const confirmPassword = 'RandomPass1@@';
        const expectedErrorMessage = 'Email must match tietoevry';
        // signin custom method

        cy.get('form').within(($form) => {
            cy.get('input[name=firstName]').type(firstName);
            cy.get('input[name=lastName]').type(lastName);;
            cy.get('input[name=email]').type(email);;
            cy.get('input[name=password]').type(password);;
            cy.get('input[name=confirmPassword]').type(confirmPassword);
            // Click Submit button
            cy.get('button[type=submit]').should('contain', 'Sign up').click();
        })
        cy.get("#firstName-helper-text").should("contain", "Invalid First Name")
        cy.get("#lastName-helper-text").should("contain", "Invalid Last Name")
        cy.get("#email-helper-text").should("contain", "Invalid email")
        cy.get("#password-helper-text").should("contain", "Must Contain 8 Characters, One UpperCase, One Number and one special character")
        cy.get("#confirmPassword-helper-text").should("contain", "Passwords don't match.")

    })

    it('Signup with right input', () => {
        const firstName = chance.first();
        const lastName = chance.last();
        const email = firstName + '@tietoevry.com';
        const password = 'RandomPass45@@';
        const expectedErrorMessage = 'User registered successfully!';
        cy.signup(firstName, lastName, email,password, password,expectedErrorMessage);
        
    })

})

describe("Links", () => {
    it('click the link I have an account? Sign In', () => {
        cy.get('#goToSignIn').should('contain', 'I have an account? Sign In').click()
        cy.url().should('include', '/') // => true
        cy.url().should('eq', 'http://localhost:3000/') // => true
        
    })

})
