/// <reference types="cypress"/>

import Chance from 'chance';

const chance = new Chance();

beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    const email = 'root@tietoevry.com';
    const password = '123456aB@';
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain', 'Sign In').click();
    cy.url().should('include', '/newBooking')

})
describe("Page elements test", () => {

    it('Check map, Title, button, datapicker', () => {

        cy.get("img").should('have.attr', 'src');
        //Test Title
        cy.contains("New Booking");
        //Test paragraphe
        cy.contains("Choose a date and click on a floor to show zone.");
        // check if button floor have length 7
        cy.get(".btn-group").find("button").should(($p) => {
            expect($p).to.have.length(7)


        })
        const today= new Date();
        const date ='"'+ today.getDate()  + '-' + (today.getMonth() + 1)  + '-' + today.getFullYear()+'"';

        // check datapicker
        cy.get('.Calendar1').click();
             })


})

describe("Function Test", () => {
    it("onClickFloor", ()=> {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get("span").should(($p) => {
            expect($p).to.have.length(3)
        })

    })
  // click on area
    it("Booking in  today", ()=> {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get(".span1").should("contain", "Zone A")
        cy.get('.Calendar1').click();
        cy.get("map").find("area:first").click({force: true})
        cy.get("#submitBooking").click()
        cy.get('.Toastify__toast-body[role=alert]').should('contain', "Booking success");
        cy.url().should('include', '/myBooking')
    })

    it("Booking in day that is already have booking", ()=> {

        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get(".span1").should("contain", "Zone A")
        cy.get('.Calendar1').click();
        cy.get("map").find("area:first").click({force: true})
        cy.get("#floor").should("contain", "Floor: 1");
        cy.get("#zone").should("contain", "Zone: Zone A");
        cy.get("#date").should("contain", "23-11-2020");
        cy.get("#submitBooking").click()
        cy.get('.Toastify__toast-body[role=alert]').should('contain', "You already have booking on that day");

    })

    it('shows bar chart', () => {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get('#doughnut')
            .should('be.visible')
            .and(chart => {
                // we can assert anything about the chart really
                expect(chart.height()).to.be.greaterThan(200)
            })

    })

})

describe("Token expired", () => {
    it("Token Expired when trye to booking", ()=> {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get(".span1").should("contain", "Zone A")
        cy.get('.Calendar1').click();
        cy.get("map").find("area:first").click({force: true})
        cy.wait(8000);
        cy.get("#submitBooking").click()
        cy.url().should('include', '/')
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");

    })


})