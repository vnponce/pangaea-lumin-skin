import React, { useContext } from 'react';
import { MyContext } from "../store/context";
import {SHOW_PANEL} from "../types/reducers";

const propTypes = {};

const defaultProps = {};

const getQtyItems = cart => {
  return cart.reduce((current, product) => current + product.qty, 0);
};

const Nav = () => {
  const { cart, dispatch } = useContext(MyContext);
  const showPanel = () => dispatch({ type: SHOW_PANEL });
  return (
    <nav className="flex items-center justify-between flex-wrap py-3 px-12 text-gray-800">
      {/* Name */}
      <div className="flex items-center flex-shrink-0 mr-12">
        <span className="font-light text-xl tracking-tight uppercase">lumin</span>
      </div>
      {/* Nav mobile icon Burger */}
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-gray-500 hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      {/* Menu */}
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="#/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
            Shop
          </a>
          <a href="#/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
            Learn
          </a>
        </div>
        {/* Right col */}
        <div className="flex">
          <a href="#/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
            Account
          </a>
          <div className="flex cart-icon cursor-pointer" onClick={showPanel}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path className="heroicon-ui"
                    d="M17 16a3 3 0 1 1-2.83 2H9.83a3 3 0 1 1-5.62-.1A3 3 0 0 1 5 12V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v1h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H5a1 1 0 0 0 0 2h12zM7 12h9.38l3-6H7v6zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <span className="cart-icon-qty font-light text-xs mx-2">{getQtyItems(cart) || ''}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

Nav.prototype = propTypes;
Nav.defaultProps = defaultProps;
export default Nav;