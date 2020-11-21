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

        cy.get('#erorrMessage')

        //Test Sign in form
        cy.get('form').within(($form) => {

            //Test Email TextFiled
            cy.get('.MuiTextField-root').first().find('input').should('have.attr', 'name')
            .should('include', 'email')

            //Test Password TextField
            cy.get('.MuiTextField-root').next().find('input').should('have.attr', 'name')
            .should('include', 'password')

            // Test Submit button
            cy.get('button').type('submit')
        })

            // Test forget password link
            cy.get('a').first().should('have.attr', 'href').should('include', '/forgotPassword')

            // Test sign up link
            cy.get('a').next().should('have.attr', 'href').should('include', '/signup')

       
    })

    it('Test Validering', () => {

        cy.get("#submit").click();
        cy.get("#input-helper-text").should("contain", "Required")
        cy.get("#password-helper-text").should("contain", "Required")

    })




})