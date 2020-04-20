import {
  addOrCreateItem,
  getSubtotal,
  reduceItem,
  removeItem,
  syncCollectionsProperty
} from "../helpers";
import {
  REQUEST_LOAD_PRODUCTS,
  REMOVE_TO_CART,
  SUCCESS_LOAD_PRODUCTS,
  REQUEST_LOAD_CURRENCIES,
  SUCCESS_LOAD_CURRENCIES,
  SHOW_PANEL,
  HIDE_PANEL,
  ADD_TO_CART,
  REDUCE_TO_CART,
} from "../types/reducers";

export const reducer = (state, action) => {
  let cart = [];
  switch (action.type) {
    case REQUEST_LOAD_PRODUCTS:
      return {
        ...state,
        productsCollection: {
          ...state.productsCollection,
          products: [],
          isLoading: true,
        },
      };
    case SUCCESS_LOAD_PRODUCTS:
      cart = syncCollectionsProperty({ updatedCollection: action.payload, oldCollection: state.cart, property: 'price' });
      return {
        ...state,
        productsCollection: {
          ...state.productsCollection,
          products: action.payload,
          isLoading: false,
        },
        cart,
        subtotal: getSubtotal({ cart }),
      };
    case REQUEST_LOAD_CURRENCIES:
      return {
        ...state,
        currenciesCollection: {
          ...state.currenciesCollection,
          currencies: [],
          isLoading: true,
        },
      };
    case SUCCESS_LOAD_CURRENCIES:
      return {
        ...state,
        currenciesCollection: {
          ...state.currenciesCollection,
          currencies: action.payload,
          isLoading: false,
        },
      };
    case SHOW_PANEL:
      return {
        ...state,
        showPanel: true,
      };
    case HIDE_PANEL:
      return {
        ...state,
        showPanel: false,
      };
    case ADD_TO_CART:
      cart = addOrCreateItem({collection: state.cart, item: action.payload });
      return {
        ...state,
        cart,
        showPanel: true,
        subtotal: getSubtotal({ cart }),
      };
    case REDUCE_TO_CART:
      cart = reduceItem({collection: state.cart, item: action.payload });
      return {
        ...state,
        cart,
        subtotal: getSubtotal({ cart }),
      };
    case REMOVE_TO_CART:
      cart = removeItem({collection: state.cart, id: action.payload });
      return {
        ...state,
        cart,
        subtotal: getSubtotal({ cart }),
      };
    default:
      return state;
  }
};

