import React, { useEffect, useContext } from 'react';
import './App.css';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProductsList from './components/products-list';
import Cart from "./components/cart";
import Nav from "./components/nav";
import JumboTron from "./components/jumbotron";
import { MyContext, MyProvider} from "./store/context";
import {
  REQUEST_LOAD_CURRENCIES,
  REQUEST_LOAD_PRODUCTS,
  SUCCESS_LOAD_CURRENCIES,
  SUCCESS_LOAD_PRODUCTS
} from "./types/reducers";

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

  const { dispatch } = useContext(MyContext);

  const triggerGetProducts = (currency = 'USD') => {
    getProducts({
      variables: { currency }
    })
  };

  useEffect(() => {
    triggerGetProducts();
    getCurrencies();
  }, []);

  useEffect(() => {
    if(productsLoading) {
      dispatch({ type: REQUEST_LOAD_PRODUCTS });
    }
    if (!productsLoading && products && products.length > 0) {
      dispatch({type: SUCCESS_LOAD_PRODUCTS, payload: products});
    }
  }, [products, productsLoading]);

  useEffect(() => {
    if(currenciesLoading) {
      dispatch({ type: REQUEST_LOAD_CURRENCIES });
    }
    if (!currenciesLoading && currency && currency.length > 0) {
      dispatch({type: SUCCESS_LOAD_CURRENCIES, payload: currency});
    }
  }, [currency, currenciesLoading]);

  if(productsError || currenciesError) return 'Error...';
  return (
    <>
      {/* Header */}
      <header className="w-full border-b-2">
        <Nav />
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
      <Cart triggerGetProducts={triggerGetProducts} />
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
