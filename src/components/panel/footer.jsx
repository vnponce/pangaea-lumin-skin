import React from 'react';
import { MyContext } from "../../store/context";

const propTypes = {};

const defaultProps = {};

const Footer = () => {
  const { subtotal } = React.useContext(MyContext);

  return (
    <>
      <hr className="border-1 my-4"/>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span className="subtotal">${subtotal.toFixed(2)}</span>
      </div>
      <button className="uppercase w-full py-4 border border-1 bg-white my-4 text-sm tracking-wider">
        make this a subscription (save 20%)
      </button>
      <button className="uppercase w-full py-4 bg-green-900 text-white text-sm tracking-wider">
        proceed to checkout
      </button>

    </>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;