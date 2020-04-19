export const alterOneItem = ({ collection, item, property, value }) => {
  return collection.map(current => {
    if(current.id !== item.id) {
      return current;
    }
    return {
      ...current,
      [property]: value,
    }
  });
};

export const addOrCreateItem = ({ collection, item }) => {
  const alreadyExist = collection.filter(current => current.id === item.id);
  if(alreadyExist.length > 0) {
    // add item qty + 1  to cart
    return alterOneItem({collection, item, property: 'qty', value: alreadyExist[0].qty + 1});
  }
  return [
    ...collection,
    {
      ...item,
      qty: 1,
    }
  ];
}