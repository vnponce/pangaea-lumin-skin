import React from 'react';
import { bool, any, func } from 'prop-types';
import { addOrCreateItem } from "../helpers";
import { productType } from "../types";
import {MyContext} from "../App";

const propTypes = {
  products: productType,
  isLoading: bool.isRequired,
  error: any,
  cart: productType,
  setCart: func.isRequired,
  setShowPanel: bool.isRequired,
};

const defaultProps = {
  products: [],
  cart: [],
};

const ProductsList = ({ cart, setCart }) => {
  const {cart: myCart, productsCollection: { products , isLoading, error }, dispatch } = React.useContext(MyContext);
  if(isLoading) return 'Loading...';
  if(error) return error;

  console.log('myCart =>', myCart);
  console.log('myProducts =>', products);

  const addToCart = product => {
    const cartUpdated = addOrCreateItem({collection: cart, item: product });
    setCart(cartUpdated);
    dispatch({ type: 'SHOW_PANEL' });
  };

  return (
    products.map(product => (
          <div id={product.id} key={product.id} className="product flex flex-col w-1/2 md:w-1/3 items-center mb-20">
            <img src={product.image_url} alt={product.title} className="object-contain h-32 w-32 mb-12"/>
            <span className="title">{product.title}</span>
            <span className="price text-lg cursor-pointer">From ${product.price.toFixed(2)}</span>
            <button className="py-4 px-12 bg-green-700 text-white hover:bg-green-900" onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))
  )
};

ProductsList.prototype = propTypes;
ProductsList.defaultProps = defaultProps;
export default ProductsList;