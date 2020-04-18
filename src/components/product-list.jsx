import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.any,
};

const defaultProps = {
  products: [],
};

const ProductList = ({ products, isLoading, error, setShowPanel, cart, setCart }) => {
  if(isLoading) return 'loading';
  if(error) return error;
  const addToCart = id => {
    console.log('product id =>', id);
    console.table(products[id]);
    setCart([
      ...cart,
      products[id],
  ]);
    setShowPanel(true);
  };
  return (
    products.map((product, index) => (
          <div id={product.id} key={product.id} className="product flex flex-col w-1/2 md:w-1/3 items-center mb-20">
            <img src={product.image_url} alt={product.title} className="object-contain h-32 w-32 mb-12"/>
            <span className="title">{product.title}</span>
            <span className="price text-lg cursor-pointer">From ${product.price.toFixed(2)}</span>
            <button className="py-4 px-12 bg-green-700 text-white hover:bg-green-900" onClick={() => addToCart(index)}>Add to cart</button>
          </div>
        ))
  )
};

ProductList.prototype = propTypes;
ProductList.defaultProps = defaultProps;
export default ProductList;