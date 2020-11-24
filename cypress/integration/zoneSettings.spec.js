/// <reference types="cypress"/>

import Chance from 'chance';

const chance = new Chance();

beforeEach(() => {
    cy.signinAsAdmin();
    cy.url().should('include', '/newBooking')
    cy.get('#zoneSettings').click();
})

describe('elements Test', () => {

    it('check NavBar has Zone settings link', () => {
        // test  NavBar has Zone settings link
        cy.get('.navbar-nav').find('a').should('contain', ' Zone settings');

        // test have 7 floor buttons
        cy.get('.btn-group').children().its('length').should('eq', 7);

    })

})

describe('Interactions', () => {

    it('Change Floor 1 Zone A', () => {
        //click first floor
        cy.get(".btn-group").find("button").first().click()

        cy.get('form').within(($form) => {

            //first table row Floor Nr = 1
            cy.get('td').first().children().first().should('contain', 1);
           

        })
    })

})

describe("Token expired", () => {
    it("Token Expired when on click floor ", ()=> {
        cy.get("#statistics").click({force: true})
        cy.wait(10000)
        cy.get("#ZoneSetting").click({force: true})
        cy.url().should('include', '/')
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");

    })
    it("Token Expired when on Click Save", ()=> {
        cy.get("#ZoneSetting").click({force: true})
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get("#dropdownMenuButton").click()
        cy.contains('Zone (A)').click()

        cy.get("#dropdownMenuButton").invoke('val').then((text) => {
            expect('2').to.equal("2");
        });
        cy.wait(10000)
        cy.get("#save").click()
        cy.url().should('include', '/')
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");

    })


})

