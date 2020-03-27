/* eslint-disable no-undef */
describe("testing form", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/form");
    })
    
    it("testy testy", function() {
        cy.get("input[name='name']")
        .type("Ethan")
        .should("have.value", "Ethan");
        cy.get("textarea#special")
            .type("hello")
            .should("have.value", "hello");
        cy.get('#cheese')
            .click();
        cy.get('#pepperoni')
            .click();
        cy.get('button')
            .click();
    });
});