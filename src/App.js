import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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

/**
 * @return {string}
 */
function App() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if(loading) return 'Loading...';
  if(error) return 'Error...';
  console.log('data =>', data);
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
      <main className="bg-teal-100 p-10 flex flex-wrap">
        {data.products.map(product => {
          return (
            <div id={product.id} key={product.id} className="flex flex-col w-1/2 md:w-1/3 items-center mb-20">
              <img src={product.image_url} alt={product.name} className="h-32 w-32 mb-12"/>
              <span>{product.title}</span>
              <span className="text-lg">From ${product.price}</span>
              <button className="py-4 px-12 bg-green-700 text-white hover:bg-green-900">Add to cart</button>
            </div>
          )
        })}
      </main>
    </>
  );
}

export default App;
