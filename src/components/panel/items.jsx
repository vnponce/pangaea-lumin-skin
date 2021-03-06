import React, { useContext } from 'react';
import { MyContext } from "../../store/context";
import {
  ADD_TO_CART,
  REDUCE_TO_CART,
  REMOVE_TO_CART
} from "../../types/reducers";

const propTypes = {};
const defaultProps = {
  cart: [],
};

const Items = () => {
  const { cart, dispatch } = useContext(MyContext);
  const addItem = product => dispatch({ type: ADD_TO_CART, payload: product });
  const reduceItem = product => dispatch({ type: REDUCE_TO_CART, payload: product });
  const removeItem = product => dispatch({ type: REMOVE_TO_CART, payload: product });
  return (
    <section className="cart overflow-hidden overflow-y-scroll flex-1">
      {cart.length === 0 && <span className="block w-full text-center">There are no item in your cart</span>}
      {cart.map(product => {
        return (
          <div id={product.id} key={product.id} className="cart-product flex w-full bg-white p-6 mb-6 relative">
            <div className="flex flex-col w-2/3">
              <div className="mb-12">
                <span className="title">{product.title}</span>
                <span className="remove-item absolute float-right right-0 top-0 text-xs p-2 cursor-pointer" onClick={() => removeItem(product.id)}>X</span>
              </div>
              <div className="flex flex-1">
              <span className="border border-2 px-3 py-2">
                <span className="reduce-item pr-5 cursor-pointer" onClick={() => reduceItem(product)}>-</span>
                <span className="qty">{product.qty}</span>
                <span className="add-item pl-5 cursor-pointer" onClick={() => addItem(product)}>+</span>
              </span>
                <span className="price text-base flex-1 flex items-center justify-center">${product.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex w-1/3 items-center justify-center">
              <img src={product.image_url} alt={product.title} className="h-8 w-8 object-contain"/>
            </div>
          </div>
        )
      })}
    </section>
  );
}

Items.propTypes = propTypes;
Items.defaultProps = defaultProps;

export default Items;