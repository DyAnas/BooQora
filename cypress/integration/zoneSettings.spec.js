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