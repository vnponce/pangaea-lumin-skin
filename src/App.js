import React, { useState, useEffect, useContext, useReducer } from 'react';
import './App.css';
import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProductsList from './components/products-list';
import Cart from "./components/cart";
import Nav from "./components/nav";
import JumboTron from "./components/jumbotron";
import {addOrCreateItem, reduceItem, removeItem} from "./helpers";

const GET_PRODUCTS = gql`  
  query Products($currency: Currency!){
    products {
      id,
      title,
      image_url,
      price(currency: $currency)
    } 
  } 
`;
const GET_CURRENCIES = gql`
  {
    currency
  }
`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_LOAD_PRODUCTS':
      return {
        ...state,
        productsCollection: {
          ...state.productsCollection,
          products: [],
          isLoading: true,
        },
      };
    case 'SUCCESS_LOAD_PRODUCTS':
      return {
        ...state,
        productsCollection: {
          ...state.productsCollection,
          products: action.payload,
          isLoading: false,
        },
      };
    case 'REQUEST_LOAD_CURRENCIES':
      return {
        ...state,
        currenciesCollection: {
          ...state.currenciesCollection,
          currencies: [],
          isLoading: true,
        },
      };
    case 'SUCCESS_LOAD_CURRENCIES':
      return {
        ...state,
        currenciesCollection: {
          ...state.currenciesCollection,
          currencies: action.payload,
          isLoading: false,
        },
      };
    case 'SHOW_PANEL':
      return {
        ...state,
        showPanel: true,
      };
    case 'HIDE_PANEL':
      return {
        ...state,
        showPanel: false,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: addOrCreateItem({collection: state.cart, item: action.payload }),
        showPanel: true,
      };
    case 'REDUCE_TO_CART':
      return {
        ...state,
        cart: reduceItem({collection: state.cart, item: action.payload }),
      };
    case 'REMOVE_TO_CART':
      return {
        ...state,
        cart: removeItem({collection: state.cart, id: action.payload }),
      };
    default:
      return state;
  }
};

export const MyContext = React.createContext();

const MyProvider = ({ children }) => {
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
  });

  return <MyContext.Provider value={{...state, dispatch}}>{children}</MyContext.Provider>
};

/**
 * @return {string}
 */
function App() {
  const [getProducts,
    { loading: productsLoading = true, error: productsError, data: { products } = [] }
    ] = useLazyQuery(GET_PRODUCTS);
  const [getCurrencies,
    { loading: currenciesLoading = true, error: currenciesError, data: { currency } = [] }
    ] = useLazyQuery(GET_CURRENCIES);
  const [cart, setCart] = useState([]);
  const { dispatch } = useContext(MyContext);

  const triggerGetProducts = (currency = 'USD') => {
    getProducts({
      variables: { currency }
    })
  };

  useEffect(() => {
    if(productsLoading) {
      dispatch({ type: 'REQUEST_LOAD_PRODUCTS' });
    }
    if (!productsLoading && products && products.length > 0) {
      dispatch({type: 'SUCCESS_LOAD_PRODUCTS', payload: products});
    }
  }, [products, productsLoading]);

  useEffect(() => {
    if(currenciesLoading) {
      dispatch({ type: 'REQUEST_LOAD_CURRENCIES' });
    }
    if (!currenciesLoading && currency && currency.length > 0) {
      dispatch({type: 'SUCCESS_LOAD_CURRENCIES', payload: currency});
    }
  }, [currency, currenciesLoading]);

  useEffect(() => {
    triggerGetProducts();
    getCurrencies();
  }, []);

  if(productsError || currenciesError) return 'Error...';
  return (
    <>
      {/* Header */}
      <header className="w-full border-b-2">
        <Nav cart={cart}/>
      </header>
      {/* All products */}
      <main>
        <JumboTron />
        {/* Products list */}
        <section className="products bg-gray-400 p-10 flex flex-wrap">
          <ProductsList />
        </section>
      </main>
      {/* panel */}
      <Cart cart={cart} setCart={setCart} triggerGetProducts={triggerGetProducts} />
    </>
  );
}

export default () => {
  return (
    <MyProvider >
      <App />
    </MyProvider>
  )
};
