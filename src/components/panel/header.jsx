import React from 'react';
import PropTypes from "prop-types";


const proptypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
  setShowPanel: PropTypes.func.isRequired,
  triggerGetProducts: PropTypes.func.isRequired,
};

const defaultProps = {
  currencies: []
};

const Header = ({ currencies, setShowPanel, triggerGetProducts })  => (
  <header className= "">
    <button className="close-icon" onClick={() => setShowPanel(false)}>X</button>
    <span className="uppercase">your cart</span>
    <select className="currency form-select w-1/5 h-8 block mt-1 bg-white border-2 mb-6" onChange={e => triggerGetProducts(e.target.value)}>
      {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
    </select>
  </header>
);

Header.prototype = proptypes;
Header.defaultProps = defaultProps;
export default Header;