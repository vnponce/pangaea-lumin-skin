import React from 'react';
import { func, bool, any } from 'prop-types';
import styled, { css } from 'styled-components';
import Header from "./panel/header";
import Items from "./panel/items";
import Footer from "./panel/footer";
import { productType, currencyType } from "../types";
import { MyContext } from "../App";

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

const Cart = ({ _cart, setCart, triggerGetProducts }) => {
  const { showPanel } = React.useContext(MyContext);

  return (
    <PanelWrapper show={showPanel}>
      <div className="panel fixed h-full top-0 right-0 bg-gray-200 w-full md:w-1/2 p-6">
        <div className="flex flex-col h-full">
          <Header triggerGetProducts={triggerGetProducts} />
          <Items />
          <Footer />
        </div>
      </div>
    </PanelWrapper>
  )
};

Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;

export default Cart;