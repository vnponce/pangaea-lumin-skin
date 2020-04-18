/// <reference types="cypress" />

context('Cart panel behavior', () => {
  beforeEach(() => {
    cy.wait(1000);
    cy.visit('/');
  });

  const firstItemData = {
    title: 'Premium-Grade Moisturizing Balm',
    image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png',
    price: 29,
  };

  describe('Cart panel', () => {
    it('should be hidden when load page', () => {
      cy.get('.panel').should('be.not.visible');
    });

    it('should be visible when click Add Cart button from each product', () => {
      cy.get('.product:first-child button').click();
      cy.get('.panel').should('be.visible');
    });

    it('should add new item in cart when click Add Cart button', () => {
      cy.get('.product:first-child button').click();
      cy.get('.panel .cart-product:first-child').within(() => {
        cy.get('img').should('have.attr', 'src', firstItemData.image_url);
        cy.get('img').should('have.attr', 'alt', firstItemData.title);
        cy.get('.title').should('contain', firstItemData.title);
        cy.get('.price').should('contain', `$${firstItemData.price}.00`);
      });
    });

    it('should hide panel when click arrow panel icon', () => {
      cy.get('.product:first-child button').click();
      cy.get('.panel').should('be.visible');
      cy.get('.panel .close-icon').click();
      cy.get('.panel').should('be.not.visible');
    });

    it('should sum price for each product', () => {
      cy.get('.product:first-child button').click();
      cy.get('.panel .close-icon').click();
      cy.get('.product:nth-child(2) button').click();
      // $45.00 is a magic number. I dont like it, but at this moment I do not gave a GraphQL EP Mocked.
      cy.get('.panel .subtotal').should('contain', '$45.00');
    });
  });

  describe('Qty behavior', () => {
    beforeEach(() => {
      cy.get('.product:first-child button').click();
    });
    it('should increase 1 item whe click + button in qty controller', function () {
      cy.get('.cart-product:first-child').within(() => {
        cy.get('.qty').should('contain', 1);
        cy.get('.add-item').click();
        cy.get('.qty').should('contain', 2);
      });
    });
    it.only('should decrease 1 item whe click - button in qty controller', function () {
      cy.get('.cart-product:first-child').within(() => {
        cy.get('.qty').should('contain', 1);
        cy.get('.add-item').click();
        cy.get('.qty').should('contain', 2);
        cy.get('.reduce-item').click();
        cy.get('.qty').should('contain', 1);
      });
    });
  });
});
