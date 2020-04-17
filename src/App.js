import React from 'react';
import logo from './logo.svg';
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
  console.log('data =>', data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
