context('Currency selector behavior', () => {
  beforeEach(() => {
    cy.wait(1000);
    cy.visit('/');
  });

  const firstItemData = {
    title: 'Premium-Grade Moisturizing Balm',
    image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png',
    priceMXN: 570,
    priceUSD: 29,
  };

  describe('Currency selector', () => {
    it('should have USD as a default value', () => {
      cy.get('.product:first-child button').click();
      cy.get('.panel .currency').should('have.value', 'USD');
    });
    it('should have update prices when it changes', () => {
      cy.get('.product:first-child button').click();
      cy.get('.panel .cart-product:first-child .price').should('contain', `$${firstItemData.priceUSD}.00`);
      cy.get('.panel .currency')
        .select('MXN')
        .should('have.value', 'MXN');
      cy.get('.panel .cart-product:first-child .price').should('contain', `$${firstItemData.priceMXN}.00`);
      });
  });
});