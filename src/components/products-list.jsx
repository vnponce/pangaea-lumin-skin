import React from 'react';
import { MyContext } from "../App";

const propTypes = {};

const defaultProps = {};

const ProductsList = () => {
  const { productsCollection: { products , isLoading }, dispatch } = React.useContext(MyContext);
  if(isLoading) return 'loading';

  const addItem = product => dispatch({ type: 'ADD_TO_CART', payload: product });

  return (
    products.map(product => (
          <div id={product.id} key={product.id} className="product flex flex-col w-1/2 md:w-1/3 items-center mb-20">
            <img src={product.image_url} alt={product.title} className="object-contain h-32 w-32 mb-12"/>
            <span className="title">{product.title}</span>
            <span className="price text-lg cursor-pointer">From ${product.price.toFixed(2)}</span>
            <button className="py-4 px-12 bg-green-700 text-white hover:bg-green-900" onClick={() => addItem(product)}>Add to cart</button>
          </div>
        ))
  )
};

ProductsList.prototype = propTypes;
ProductsList.defaultProps = defaultProps;
export default ProductsList;