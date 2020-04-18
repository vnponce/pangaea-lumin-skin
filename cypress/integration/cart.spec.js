/// <reference types="cypress" />

context('Cart panel behavior', () => {
  beforeEach(() => {
    cy.wait(1000);
    cy.visit('/');
  });

  describe('Cart panel', () => {
    it.only('should be hidden when load page', () => {
      cy.get('.panel').should('be.not.visible');
    });

    it('should count 19 products', () => {
      // 19 is a magic number but we can mock later the *GraphQL EP* to be sure always return this number
      const itemsLength = 19;
      cy.get('.product').should('have.length', itemsLength);
    });

    it('should show correct product data', () => {
      // This data is from GraphQl EP, a better and controlled solution is creating a mock.
      const firstItemData = {
        title: 'Premium-Grade Moisturizing Balm',
        image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png',
        price: 29,
      };
      const secondItemData = {
        title: 'Hydrating Mist Spray',
        image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/face-mist.png',
        price: 12,
      };

      cy.get('.product:first-child').within(() => {
        cy.get('img').should('have.attr', 'src', firstItemData.image_url);
        cy.get('img').should('have.attr', 'alt', firstItemData.title);
        cy.get('.title').should('contain', firstItemData.title);
        cy.get('.price').should('contain', `$${firstItemData.price}.00`);
      });
      cy.get('.product:last-child').within(() => {
        cy.get('img').should('have.attr', 'src', secondItemData.image_url);
        cy.get('img').should('have.attr', 'alt', secondItemData.title);
        cy.get('.title').should('contain', secondItemData.title);
        cy.get('.price').should('contain', `$${secondItemData.price}.00`);
      })
    });
  })
})
