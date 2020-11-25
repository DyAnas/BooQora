/// <reference types="cypress"/>





beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    const email = 'root@tietoevry.com';
    const password = '123456aB@';
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain', 'Sign In').click();
    cy.url().should('include', '/newBooking')

})


const nowTime = Cypress.moment().format('DD-MM-yyyy')
const today = Cypress.moment().format('DD')
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

        // check datapicker

        cy.get("#dates").click()
        cy.get("#dates").invoke('val').then((text) => {
            expect(nowTime).to.equal(text);
        })

        cy.get("#dates").click()
        cy.contains(today).click({ force: true });
        cy.get("#dates").invoke('val').then((text) => {
            expect(nowTime).to.equal(text);
        })


    })


})

describe("Function Test", () => {
    it("onClickFloor", () => {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get("span").should(($p) => {
            expect($p).to.have.length(3)
        })

    })
    // click on area
    it("make booking today", () => {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get(".span1").should("contain", "Zone A")
        cy.get('.Calendar1').click();
        cy.get("map").find("area:first").click({ force: true })
        cy.get("#submitBooking").click()
        cy.get('.Toastify__toast-body[role=alert]').should('contain', "Booking success");
        cy.url().should('include', '/myBooking')
    })

    it("Booking in day that is already have booking", () => {

        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get(".span1").should("contain", "Zone A")
        cy.get('.Calendar1').click();
        cy.get("map").find("area:first").click({ force: true })
        cy.get("#floor").should("contain", "Floor: 1");
        cy.get("#zone").should("contain", "Zone: Zone A");
        cy.get("#date").should("contain", nowTime);
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
    it('My Booking', () => {

        cy.get("#myBooking").click({ force: true })
        cy.get("table").should('be.visible');
        cy.get(".MuiIconButton-colorInherit").click()
        cy.get('.Toastify__toast-body[role=alert]').should('contain', "success deleted");
    })
})

describe("Token expired", () => {
    it("Token Expired when on click floor", () => {
        cy.wait(10000)
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.url().should('include', '/')
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");

    })
    it("Token Expired when on click confirm booking", () => {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get("map").find("area:first").click({ force: true })
        cy.wait(10000)
        cy.get("#submitBooking").click()
        cy.url().should('include', '/')
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");

    })

    it("Token Expired when click delete booking", () => {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get("map").find("area:first").click({ force: true })
        cy.get("#submitBooking").click()
        cy.wait(10000)
        cy.get(".MuiIconButton-colorInherit").click()
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");
        cy.url().should('include', '/')

    })


    it("Token Expired when click my booking", () => {
        cy.wait(10000)
        cy.get("#myBooking").click({ force: true })
        cy.get('.Toastify__toast-body[role=alert]')
            .should('contain', "You have been inactive for a while. For your security, please sign in again");
        cy.url().should('include', '/')

    })



})