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
  })
})
