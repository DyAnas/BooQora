/// <reference types="cypress"/>

import Chance from 'chance';


const chance = new Chance();

beforeEach(() => {
    cy.signinAsAdmin();
    cy.url().should('include', '/newBooking')
    cy.contains(' Add new Admin').click();
    cy.url('include', '/addNewAdmin')
})


describe('Creat New Admin', () => {

    it('Test Elements', () => {
        // test  NavBar has Zone settings link
        cy.get('.navbar-nav').find('a').should('contain', ' Add new Admin');
        // test TextFiled Find user by email
        cy.get('input[name=email]');
        // test TextFiled Find user buttons
        cy.get('button').contains('Find')
    })



    it('Insert email dose not match @tietoevry.com', () => {
        const email = chance.email();
        cy.get('input[name=email]').type(email);
        cy.get('button').contains('Find').click();

        cy.get('.Toastify__toast-body[role=alert]').should('contain', 'Email must match tietoEvry');
    })


    it('Insert unregistered email', () => {

        ;
        cy.get('input[name=email]').type('unregisteredemail@tietoevry.com');
        cy.get('button').contains('Find').click();

        cy.get('.Toastify__toast-body[role=alert]').should('contain', 'Email is not found');

    })



    it('cheange the email under editing email', () => {

        cy.get('input[name=email]').type('root@tietoevry.com');
        cy.get('button').contains('Find').click();
        cy.get('input[name=email]').clear();
        cy.get('input[name=email]').type('rolalalalaot@tietoevry.com');
        cy.get('button[type=submit]').click()
        cy.get('.Toastify__toast-body[role=alert]').should('contain', 'Email is not found');

    })

})

describe('Find , Save, Admin ', () => {

    it('Find registered user (Admin)', () => {

        const registeredEmail = 'root@tietoevry.com'
        cy.get('input[name=email]').type(registeredEmail);
        cy.get('button').contains('Find').click();


        const userToken = JSON.parse(localStorage.getItem('user')).token



        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/api/v1/employees/email/' + registeredEmail,
            headers: {
                Authorization: 'Bearer ' + userToken,
            },
            failOnStatusCode: false
        })
            .then((resp) => {
                console.log(resp.body.firstName.toUpperCase());
                cy.get('td').first().should('contain', resp.body.firstName.toUpperCase());
                cy.get('#lastName').should('contain', resp.body.lastName.toUpperCase());
                cy.get('#email').should('contain', resp.body.email);
                cy.get('#activeCheck').check()
            })
    })




    it('Upgrade a registered user to Admin', () => {

        const registeredEmail = 'john@tietoevry.com'
        cy.get('input[name=email]').type(registeredEmail);
        cy.get('button').contains('Find').click();

        cy.get('#activeCheck').check().click();
        
        cy.get('button[type=submit]').click()
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "Updated success");

    })

    
    it('Upgrade a registered user to Admin', () => {

        const registeredEmail = 'john@tietoevry.com'
        cy.get('input[name=email]').type(registeredEmail);
        cy.get('button').contains('Find').click();

        cy.get('#cancel').click();
        

    })
    

    it("when Token Expired ", () => {

        const registeredEmail = 'root@tietoevry.com'
        cy.get('input[name=email]').type(registeredEmail);
        cy.get('button').contains('Find').click();
        cy.wait(10000)
        cy.get('button[type=submit]').click()
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");
        cy.url().should('include', '/')
    })

    it("when Token Expired 2", () => {

        const registeredEmail = 'root@tietoevry.com'
        cy.get('input[name=email]').type(registeredEmail);
        cy.wait(10000)
        cy.get('button').contains('Find').click();

        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");

        cy.url().should('include', '/')
    })

})
