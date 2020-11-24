/// <reference types="cypress"/>


    it('Test sign out', () => {

        cy.signinAsAdmin();
        cy.url().should('include', '/newBooking')


        // test  NavBar has Zone settings link
        cy.get('#logOut').click();
        cy.url('eq',Cypress.config().baseUrl+'/')

    })
