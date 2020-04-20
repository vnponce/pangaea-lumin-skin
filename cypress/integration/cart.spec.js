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

    it('should remove item when click X button', () => {
      cy.get('.product:first-child button').click();
      cy.get('.product:first-child button').click();
      cy.get('.cart-product:first-child .remove-item').click();
      cy.get('.cart-product').should('have.length', 0);
    });

    it('should add one item when click Add button from existed product in the cart', () => {
      cy.get('.product:first-child button').click();
      cy.get('.product:first-child button').click();
      cy.get('.cart-product').should('have.length', 1);
    });

    it('should show "There are no item in your cart" message when cart is empty', () => {
      cy.get('.product:first-child button').click();
      cy.get('.cart-product:first-child .remove-item').click();
      cy.get('.panel').should('contain', 'There are no item in your cart');
    });
  });

  describe('Qty control behavior', () => {
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
    it('should decrease 1 item whe click - button in qty controller', function () {
      cy.get('.cart-product:first-child').within(() => {
        cy.get('.qty').should('contain', 1);
        cy.get('.add-item').click();
        cy.get('.qty').should('contain', 2);
        cy.get('.reduce-item').click();
        cy.get('.qty').should('contain', 1);
      });
    });
    it('should remove item whe click - button in qty controller and qty becomes 0', function () {
      cy.get('.cart-product:first-child').within(() => {
        cy.get('.qty').should('contain', 1);
        cy.get('.reduce-item').click();
      });
      cy.get('.cart-product').should('have.length', 0);
    });
  });

  describe('Subtotal behavior', () => {
    it('should sum price for each product', () => {
      cy.get('.product:first-child button').click();
      cy.get('.panel .close-icon').click();
      cy.get('.product:nth-child(2) button').click();
      // $45.00 is a magic number. I dont like it, but at this moment I do not gave a GraphQL EP Mocked.
      cy.get('.panel .subtotal').should('contain', '$45.00');
    });

    it('should sum price for each product detecting qty', () => {
      // first product price 29
      // Second product price 16
      // total = 2*29 + 16; = $74.00
      cy.get('.product:first-child button').click(); // 29
      cy.get('.cart-product .add-item').click(); // 29
      cy.get('.panel .close-icon').click();
      cy.get('.product:nth-child(2) button').click(); // 16
      // $45.00 is a magic number. I dont like it, but at this moment I do not gave a GraphQL EP Mocked.
      cy.get('.panel .subtotal').should('contain', '$74.00');
    });

    it('should return 0 when remove all products from cart', () => {
      cy.get('.product:first-child button').click(); // 29
      cy.get('.cart-product .remove-item').click(); // 29
      cy.get('.panel .subtotal').should('contain', '$0.00');
    });
  });
  describe('Nav icon', () => {
    it('should not show number when start page', () => {
      cy.get('.cart-icon-qty').should('contain', '');
    });

    it('should one item when select one product in the cart', () => {
      cy.get('.product:first-child button').click();
      cy.get('.cart-icon-qty').should('contain', 1);
    });

    it('should not show number when remove all items', () => {
      cy.get('.product:first-child button').click();
      cy.get('.cart-product:first-child .remove-item').click();
      cy.get('.cart-icon-qty').should('contain', '');
    });
  });
});
