import React, { useState, useEffect } from 'react';
import { func, bool, any } from 'prop-types';
import styled, { css } from 'styled-components';
import Header from "./panel/header";
import Items from "./panel/items";
import Footer from "./panel/footer";
import { alterOneItem, syncCollectionsProperty } from "../helpers";
import { productType, currencyType } from "../types";
import {MyContext} from "../App";

const propTypes = {
  currencies: currencyType,
  cart: productType,
  products: productType,
  setCart: func.isRequired,
  isLoading: bool,
  error: any,
  showPanel: bool.isRequired,
  setShowPanel: func.isRequired,
  triggerGetProducts: func.isRequired,
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
    transition: transform 0.3s 0.3s;
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

const Cart = ({ cart, setCart, triggerGetProducts }) => {
  const [subtotal, setSubtotal] = useState(0);
  const {cart: myCart, products, showPanel } = React.useContext(MyContext);

  useEffect(() => {
    setSubtotal(0);
    if(cart && cart.length > 0) {
      const subtotal = cart.reduce((current, { price, qty }) => current + (price * qty), 0);
      setSubtotal(subtotal);
    }
  }, [cart]);

  useEffect(() => {
    if (products && products.length > 0){
      const carUpdated = syncCollectionsProperty({ updatedCollection: products, oldCollection: cart, property: 'price' });
      setCart(carUpdated);
    }
  }, [products]);

  const addItem = product => {
    const cartUpdated = alterOneItem({ collection: cart, item: product, property: 'qty',  value: product.qty + 1 });
    setCart(cartUpdated);
  };

  const reduceItem = product => {
    if (product.qty <= 1) {
      removeItem(product.id);
      return false;
    }
    const cartUpdated = alterOneItem({ collection: cart, item: product, property: 'qty',  value: product.qty - 1 });
    setCart(cartUpdated);
  };

  const removeItem = id => {
    const newCart = cart.filter(currentProduct => currentProduct.id !== id);
    setCart(newCart)
  };

  return (
    <PanelWrapper show={showPanel}>
      <div className="panel fixed h-full top-0 right-0 bg-gray-200 w-full md:w-1/2 p-6">
        <div className="flex flex-col h-full">
          <Header triggerGetProducts={triggerGetProducts} />
          <Items cart={cart} addItem={addItem} reduceItem={reduceItem} removeItem={removeItem} />
          <Footer subtotal={subtotal}/>
        </div>
      </div>
    </PanelWrapper>
  )
};

Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;

export default Cart;