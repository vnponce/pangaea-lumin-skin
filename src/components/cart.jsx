import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Header from "./panel/header";
import Items from "./panel/items";
import Footer from "./panel/footer";

const propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
  setCart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  showPanel: PropTypes.bool.isRequired,
  setShowPanel: PropTypes.func.isRequired,
  triggerGetProducts: PropTypes.func.isRequired,
};

const defaultProps = {
  currencies: [],
  cart: [],
  products: [],
  isLoading: false,
  error: false,
};

const PanelWrapper = styled.aside`
  .panel {
    /*...*/
    // position: fixed;
    /* width: 90%; */
    height: 100%;
    // top: 0;
    transition: transform 0.3s 0.3s;
    // right: 0;
    transform: translate3d(100%, 0, 0);
  }

  ${props => props.show && css`
    visibility: visible;
    transition: visibility 0s 0s;
    .panel {
      transform: translate3d(0, 0, 0);
      transition-delay: 0s;
    }
    .panel {
      transition: transform 0.3s 0.3s;
      transform: translateY(0px);
    }
  `};
`;

const Cart = ({ currencies, isLoading, error, cart, setCart, showPanel, setShowPanel, triggerGetProducts, products }) => {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(0);
    if(cart && cart.length > 0) {
      const subtotal = cart.reduce((current, { price, qty }) => current + (price * qty), 0);
      setSubtotal(subtotal);
    }
  }, [cart]);

  useEffect(() => {
    if (products && products.length > 0){
      const carUpdated = cart.map(product => {
        const productUpdated = products.filter(current => current.id === product.id)[0];
        return {
          ...product,
          price: productUpdated.price
        }
      });
      setCart(carUpdated);
    }
  }, [products]);

  if(isLoading) return 'loading';
  if(error) return error;
  // Css to show -> cd-panel--is-visible;

  const addItem = id => {
    const product = cart.filter(currentProduct => currentProduct.id === id)[0];
    const newCart = cart.filter(currentProduct => currentProduct.id !== id);
    setCart([
      ...newCart,
      {
        ...product,
        qty: product.qty + 1,
      },
    ]);
  };

  const reduceItem = id => {
    const product = cart.filter(currentProduct => currentProduct.id === id)[0];
    let newCart = cart.filter(currentProduct => currentProduct.id !== id);
    if (product.qty <= 1) {
      removeItem(id);
      return false;
    }
    setCart([
      ...newCart,
      {
        ...product,
        qty: product.qty - 1,
      },
    ]);
  };

  const removeItem = id => {
    const newCart = cart.filter(currentProduct => currentProduct.id !== id);
    setCart(newCart)
  };
  return (
    <PanelWrapper show={showPanel}>
      <div className="panel fixed top-0 right-0 bg-gray-200 w-full md:w-1/2 p-6">
        <div className="flex flex-col h-full">
          <Header currencies={currencies} setShowPanel={setShowPanel} triggerGetProducts={triggerGetProducts} />
          <Items cart={cart} addItem={addItem} reduceItem={reduceItem} removeItem={removeItem} />
          <Footer subtotal={subtotal}/>
        </div>
        {/* cd-panel__content */}
      </div>
      {/* cd-panel__container */}
    </PanelWrapper>
  )
};

Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;

export default Cart;