import React, { useState, useEffect } from 'react';
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

/**
 * @return {string}
 */
function App() {
  const [getProducts, { loading = true, error, data }] = useLazyQuery(GET_PRODUCTS);
  const { currencyLoading, currencyError, data: currencyData } = useQuery(GET_CURRENCIES);
  const [shoPanel, setShowPanel] = useState(false);
  const [cart, setCart] = useState([]);

  const triggerGetProducts = (currency = 'USD') => {
    getProducts({
      variables: { currency }
    })
  };

  useEffect(() => {
    triggerGetProducts();
  }, []);

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
          <ProductsList products={data && data.products} isLoading={loading} error={error} setShowPanel={setShowPanel} cart={cart} setCart={setCart} />
        </section>
      </main>
      {/* panel */}
      <Cart currencies={currencyData && currencyData.currency} isLoading={currencyLoading} error={currencyError} cart={cart} setCart={setCart} showPanel={shoPanel} setShowPanel={setShowPanel} triggerGetProducts={triggerGetProducts} products={data && data.products}/>
    </>
  );
}

export default App;
