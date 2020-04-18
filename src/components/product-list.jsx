import React from 'react';

const ProductList = ({ products = [], isLoading, error }) => {
  if(isLoading) return 'loading';
  if(error) return error;
  return (
    products.map(product => (
          <div id={product.id} key={product.id} className="product flex flex-col w-1/2 md:w-1/3 items-center mb-20">
            <img src={product.image_url} alt={product.title} className="h-32 w-32 mb-12"/>
            <span className="title">{product.title}</span>
            <span className="price text-lg cursor-pointer">From ${product.price.toFixed(2)}</span>
            <button className="py-4 px-12 bg-green-700 text-white hover:bg-green-900">Add to cart</button>
          </div>
        ))
  )
};

export default ProductList;