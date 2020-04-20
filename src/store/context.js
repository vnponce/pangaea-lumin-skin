import React, { useReducer } from "react";
import { reducer } from "./reducers";
import { currencyType, productType } from "../types";
import { any, bool, shape, number, arrayOf } from "prop-types";

export const MyContext = React.createContext();

MyContext.Provider.propTypes = {
  productsCollection: shape({
    products: productType,
    isLoading: bool.isRequired,
    error: any,
  }),
  currenciesCollection: shape({
    currencies: currencyType,
    isLoading: bool.isRequired,
    error: any,
  }),
  showPanel: bool,
  cart: arrayOf(
    productType,
  ),
  subtotal: number,
};

export const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    productsCollection: {
      products: [],
      isLoading: true,
      error: false,
    },
    currenciesCollection: {
      currencies: [],
      isLoading: true,
      error: false,
    },
    showPanel: false,
    cart: [],
    subtotal: 0,
  });

  return <MyContext.Provider value={{...state, dispatch}}>{children}</MyContext.Provider>
};
