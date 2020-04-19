const alterOneItem = ({ collection, item, property, value }) => {
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

export default alterOneItem;