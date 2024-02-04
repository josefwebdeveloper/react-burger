import {_baseUrl} from "../../src/utils/constants";
const host = "http://localhost:3000";
const INGREDIENTS = "[data-cy=ingredients]";
const CONSTRUCTOR = "[data-cy=constructor]";
const BUN_NAME = "Краторная булка N-200i";
const SAUCE_NAME = "Соус Spicy-X";
const MAIN_NAME = "Биокотлета из марсианской Магнолии";
const CONSTRUCTOR_ELEMENT = "[data-cy=constructor-element]";
const POPUP_HEADING = "Детали ингредиента";

describe('service is available', function() {
    beforeEach( () => {
        cy.intercept("GET", `${_baseUrl}ingredients`, {fixture: "ingredients.json"});
        cy.viewport(1300, 800);
        cy.visit(host);
    })
    it("should drag and drop ingredients", () => {
        cy.get(INGREDIENTS)
            .contains(BUN_NAME)
            .trigger("dragstart");
        cy.get(CONSTRUCTOR).trigger("drop");
        cy.get("[data-cy=constructor-bun-1]")
            .contains(BUN_NAME)
            .should("exist");
        cy.get("[data-cy=constructor-bun-2]")
            .contains(BUN_NAME)
            .should("exist");
        cy.get(INGREDIENTS)
            .contains(MAIN_NAME)
            .trigger("dragstart");
        cy.get(CONSTRUCTOR).trigger("drop");
        cy.get(INGREDIENTS)
            .contains(SAUCE_NAME)
            .trigger("dragstart");
        cy.get(CONSTRUCTOR).trigger("drop");
        cy.get(CONSTRUCTOR_ELEMENT)
            .contains(MAIN_NAME)
            .should("exist");
        cy.get(CONSTRUCTOR_ELEMENT)
            .contains(SAUCE_NAME)
            .should("exist");
    });
});
describe("testing ingredient popup window", () => {
    beforeEach( () => {
        cy.intercept("GET", `${_baseUrl}ingredients`, {fixture: "ingredients.json"});
        cy.viewport(1300, 800);
        cy.visit(host);
    });
    it("check popup is open", () => {
        cy.contains(POPUP_HEADING).should("not.exist");
        cy.contains(SAUCE_NAME).click();
        cy.contains(POPUP_HEADING).should("exist");
        cy.get("#modals").contains(SAUCE_NAME).should("exist");
    });
    it("check popup closing", () => {
        cy.contains(SAUCE_NAME).click();
        cy.contains(POPUP_HEADING).should("exist");
        cy.get("#modals [data-cy=close-icon-popup]").click();
        cy.contains(POPUP_HEADING).should("not.exist");
    })
    it('check popup closing by overlay', () => {
        cy.contains(SAUCE_NAME).click();
        cy.contains(POPUP_HEADING).should("exist");
        cy.get("#modals [data-cy=close-by-overlay]").click({force: true});
        cy.contains(POPUP_HEADING).should("not.exist");
    })
});

describe("testing making order works", () => {
    beforeEach( () => {
        cy.intercept("GET", `${_baseUrl}ingredients`, {fixture: "ingredients.json"});
        cy.intercept("POST", `${_baseUrl}orders`, {fixture: "postOrder.json"}).as("order");
        cy.viewport(1300, 800);
        cy.visit(host);
    });
    it('should enter profile and make order', () => {
        cy.get("[data-cy=account-entrance]").click();
        cy.get('input[name=email]').type('josefYandex@gmail.com');
        cy.get('input[name=password]').type('aaaaaa');
        cy.get('button').contains('Войти').click();
        cy.get(INGREDIENTS)
          .contains(BUN_NAME)
          .trigger("dragstart");
        cy.get(CONSTRUCTOR).trigger("drop");
        cy.get("[data-cy=constructor-bun-1]")
          .contains(BUN_NAME)
        cy.get("[data-cy=constructor-bun-2]")
          .contains(BUN_NAME)
        cy.get(INGREDIENTS)
          .contains(MAIN_NAME)
          .trigger("dragstart");
        cy.get(CONSTRUCTOR).trigger("drop");
        cy.get(INGREDIENTS)
          .contains(SAUCE_NAME)
          .trigger("dragstart");
        cy.get(CONSTRUCTOR).trigger("drop");
        cy.get(CONSTRUCTOR_ELEMENT)
          .contains(MAIN_NAME)
        cy.get(CONSTRUCTOR_ELEMENT)
          .contains(SAUCE_NAME)
        cy.get("[data-cy=constructor-order]").click();
        cy.get("#modals [data-cy=order-number]").contains("123456").should("exist");
        cy.get("#modals [data-cy=close-icon-popup]").click();
        cy.contains("идентификатор заказа").should("not.exist");
        cy.get(CONSTRUCTOR)
          .contains(BUN_NAME)
          .should("not.exist");
        cy.get(CONSTRUCTOR)
          .contains(SAUCE_NAME)
          .should("not.exist");
        cy.get(CONSTRUCTOR)
          .contains(MAIN_NAME)
          .should("not.exist");
    })

});