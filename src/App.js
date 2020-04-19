import React, { useState, useEffect, useContext, useReducer } from 'react';
import './App.css';
import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProductsList from './components/products-list';
import Cart from "./components/cart";
import Nav from "./components/nav";
import JumboTron from "./components/jumbotron";

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
      console.log('setProductsReducer action.payload =>', action.payload);
      return {
        ...state,
        productsCollection: {
          ...state.productsCollection,
          products: [],
          isLoading: true,
        },
      };
    case 'SUCCESS_LOAD_PRODUCTS':
      console.log('setProductsReducer action.payload =>', action.payload);
      return {
        ...state,
        productsCollection: {
          ...state.productsCollection,
          products: action.payload,
          isLoading: false,
        },
      };
    case 'ERROR_LOAD_PRODUCTS':
      return {
    ...state,
        productsCollection: {
          ...state.productsCollection,
          error: action.payload,
      },
    };
    case 'LOAD_CURRENCIES':
      console.log('setProductsReducer action.payload currency =>', action.payload);
      return {
        ...state,
        currency: action.payload,
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
    products: [],
    loading: false,
    error: false,
    currency: [],
    showPanel: false,
    cart: [],
  });

//  const { products, cart, showPanel, currency, loading, productsCollection } = state;

  return <MyContext.Provider value={{
    ...state, dispatch
  }}>{children}</MyContext.Provider>
};

/**
 * @return {string}
 */
function App() {
  const [getProducts, { loading = true, error, data: { products } = [] }] = useLazyQuery(GET_PRODUCTS);
  const [getCurrencies, { data: { currency } = [] }] = useLazyQuery(GET_CURRENCIES);
  const [showPanel, setShowPanel] = useState(false);
  const [cart, setCart] = useState([]);
  const { dispatch } = useContext(MyContext);

  const triggerGetProducts = (currency = 'USD') => {
    getProducts({
      variables: { currency }
    })
  };

  useEffect(() => {
    if(loading) {
      dispatch({ type: 'REQUEST_LOAD_PRODUCTS' });
    }
    if (products && products.length > 0) {
      dispatch({type: 'SUCCESS_LOAD_PRODUCTS', payload: products});
    }
  }, [products, loading]);

  useEffect(() => {
    if (currency && currency.length > 0) {
      dispatch({type: 'LOAD_CURRENCIES', payload: currency});
    }
  }, [currency]);

  useEffect(() => {
    triggerGetProducts();
    getCurrencies();
  }, []);

  if(error) return 'Error ' + error;
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
          <ProductsList isLoading={loading} error={error} cart={cart} setCart={setCart} />
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
