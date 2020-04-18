import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

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
  setCart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  showPanel: PropTypes.bool.isRequired,
  setShowPanel: PropTypes.func.isRequired,
};

const defaultProps = {
  currencies: [],
  cart: [],
  isLoading: false,
  error: false,
};

const PanelWrapper = styled.div`
  ${props => props.show && css`
    visibility: visible;
    transition: visibility 0s 0s;
    .cd-panel__container {
      transform: translate3d(0, 0, 0);
      transition-delay: 0s;
    }
    .cd-panel__header {
      transition: transform 0.3s 0.3s;
      transform: translateY(0px);
    }
  `};
`;

const Cart = ({ currencies, isLoading, error, cart, setCart, showPanel, setShowPanel }) => {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    if(cart && cart.length > 0) {
      const subtotal = cart.reduce((current, product) => current + product.price, 0);
      setSubtotal(subtotal);
    }
  }, [cart]);

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
    let newCart = [
      ...cart.filter(currentProduct => currentProduct.id !== id)
    ];
    if(product.qty > 1) {
      newCart = [
        ...newCart,
        ...product,
      ]
    }
    setCart([
      ...newCart,
    ]);
  };

  return (
    <PanelWrapper show={showPanel} className="cd-panel cd-panel--from-right js-cd-panel-main">
      <div className="panel cd-panel__container bg-gray-200 w-full md:w-1/2 p-6">
        <div className="cd-panel__content flex flex-col h-full">
          {/*  your side panel content here */}
          <header className= "">
            <button className="close-icon" onClick={() => setShowPanel(false)}>X</button>
            <span className="uppercase">your cart</span>
            <select className="form-select w-1/5 h-8 block mt-1 bg-white border-2 mb-6">
              {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
            </select>
          </header>
          <section className="cart overflow-hidden overflow-y-scroll flex-1">
            {cart.slice(0, 5).map(product => {
              return (
                <div id={product.id} key={product.id} className="cart-product flex w-full bg-white p-6 mb-6 relative">
                  <div className="flex flex-col w-2/3">
                    <div className="mb-12">
                      <span className="title">{product.title}</span>
                      <span className="absolute float-right right-0 top-0 text-xs p-2 cursor-pointer">X</span>
                    </div>
                    <div className="flex flex-1">
                        <span className="border border-2 px-3 py-2">
                          <span className="reduce-item pr-5 cursor-pointer" onClick={() => reduceItem(product.id)}>-</span>
                          <span className="qty">{product.qty}</span>
                          <span className="add-item pl-5 cursor-pointer" onClick={() => addItem(product.id)}>+</span>
                        </span>
                      <span className="price text-base flex-1 flex items-center justify-center">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex w-1/3 items-center justify-center">
                    <img src={product.image_url} alt={product.title} className="h-8 w-8 object-contain"/>
                  </div>
                </div>
              )
            })}
          </section>
          <div className="">
            <hr className="border-1 my-4"/>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="subtotal">${subtotal.toFixed(2)}</span>
            </div>
            <button className="uppercase w-full py-4 border border-1 bg-white mb-4 text-sm tracking-wider">
              make this a subscription (save 20%)
            </button>
            <button className="uppercase w-full py-4 bg-green-900 text-white text-sm tracking-wider">
              proced to checkout
            </button>

          </div>
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