import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProductList from './components/product-list';

const GET_PRODUCTS = gql`
  {
    products {
      id,
      title,
      image_url,
      price(currency: USD)
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
  const { loading = true, error, data } = useQuery(GET_PRODUCTS);
  const { currencyLoading, currencyError, data: currencyData } = useQuery(GET_CURRENCIES);
  console.log('data =>', data);
  console.log('currency =>', currencyData);
  return (
    <>
      {/* Header */}
      <header className="w-full border-b-2">
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
              <a href="#responsive-header"
                 className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
                Shop
              </a>
              <a href="#responsive-header"
                 className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
                Learn
              </a>
            </div>
            {/* Right col */}
            <div className="flex">
              <a href="#responsive-header"
                 className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
                Account
              </a>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path className="heroicon-ui"
                      d="M17 16a3 3 0 1 1-2.83 2H9.83a3 3 0 1 1-5.62-.1A3 3 0 0 1 5 12V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v1h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H5a1 1 0 0 0 0 2h12zM7 12h9.38l3-6H7v6zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
              <span className="font-light text-xs mx-2">4</span>
            </div>
          </div>
        </nav>
      </header>
      {/* All products */}
      <section className="p-24 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif">All Products</h1>
          <span className="block mt-6 text-lg">A 360 look at Lumin</span>
        </div>
        <select className="form-select w-1/5 h-16 block mt-1 bg-white border-2">
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </section>
      {/* Products list */}
      <main className="products bg-gray-400 p-10 flex flex-wrap">
        <ProductList products={data && data.products} isLoading={loading} error={error}/>
      </main>
      {/* panel */}
      <button className="btn btn--primary" aria-controls="drawer1">Show Drawer Panel</button>

      <div className="cd-panel cd-panel--from-right js-cd-panel-main cd-panel--is-visible">
        <div className="cd-panel__container bg-gray-200 w-full md:w-1/2 p-6">
          <div className="cd-panel__content flex flex-col h-full">
            {/*  your side panel content here */}
            <header className= "">
              <button className="">X</button>
              <span className="uppercase">your cart</span>
              <select className="form-select w-1/5 h-8 block mt-1 bg-white border-2 mb-6">
                {currencyData && currencyData.currency.map(currency => <option key={currency} value={currency}>{currency}</option>)}
              </select>
            </header>
            <section className="overflow-hidden overflow-y-scroll flex-1">
              {data && data.products.slice(0, 5).map(product => {
                return (
                  <div id={product.id} key={product.id} className="flex w-full bg-white p-6 mb-6 relative">
                    <div className="flex flex-col w-2/3">
                      <div className="mb-12">
                        <span>{product.title}</span>
                        <span className="absolute float-right right-0 top-0 text-xs p-2 cursor-pointer">X</span>
                      </div>
                      <div className="flex flex-1">
                        <span className="border border-2 px-3 py-2">
                          <span className="pr-5 cursor-pointer">-</span>
                          1
                          <span className="pl-5 cursor-pointer">+</span>
                        </span>
                        <span className="text-base flex-1 flex items-center justify-center">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex w-1/3 items-center justify-center">
                      <img src={product.image_url} alt={product.name} className="h-8 w-8"/>
                    </div>
                  </div>
                )
              })}
            </section>
            <div className="">
              <hr className="border-1 my-4"/>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$61.00</span>
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
      </div>
    </>
  );
}

export default App;
