import PropTypes from 'prop-types';

const { shape, number, string, arrayOf } = PropTypes;

export const productType = arrayOf(shape({
  id: number.isRequired,
  title: string.isRequired,
  image_url: string.isRequired,
  price: number.isRequired,
}));

export const currencyType = arrayOf(
  string.isRequired,
);
