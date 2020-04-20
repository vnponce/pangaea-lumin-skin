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
};

export const reduceItem = ({ collection, item})  => {
  if (item.qty <= 1) {
    return removeItem({ collection, id: item.id });
  }
  return alterOneItem({ collection, item, property: 'qty',  value: item.qty - 1 });
};

export const removeItem = ({ collection, id }) => {
  return collection.filter(currentProduct => currentProduct.id !== id);
};

export const syncCollectionsProperty = ({ updatedCollection, oldCollection, property }) => {
  return oldCollection.map(product => {
    const productUpdated = updatedCollection.filter(current => current.id === product.id)[0];
    return {
      ...product,
      [property]: productUpdated[property]
    }
  });
};