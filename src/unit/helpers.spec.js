import {alterOneItem, addOrCreateItem, reduceItem, removeItem, getSubtotal, syncCollectionsProperty} from '../helpers';

it('return collection with one item added from selected product', () => {
  const collection = [
    {
      id: 1,
      qty: 1,
    },
    {
      id: 2,
      qty: 3,
    },
  ];
  const item = { id: 2 };
  const expected = [
    {
      id: 1,
      qty: 1,
    },
    {
      id: 2,
      qty: 4,
    },
  ];
  expect(alterOneItem({ collection, item, property: 'qty', value: 4 })).toEqual(expected);
});

it('should return a new item when no exist on current collection', function () {
  const collection = [];
  const item = { id: 2, name: 'product', };
  const expected = [{
    ...item,
    qty: 1,
  }];
  expect(addOrCreateItem({ collection, item })).toEqual(expected);
});

it('should add one item if product already exist on collection', function () {
  const collection = [{ id: 2, name: 'product', qty: 2 }];
  const item = { id: 2, name: 'product' };
  const expected = [{
    ...item,
    qty: 3,
  }];
  expect(addOrCreateItem({ collection, item })).toEqual(expected);
});

it('should reduce an item when has more than one item (qty > 1)', function () {
  const collection = [{ id: 2, name: 'product', qty: 2 }];
  const item = { id: 2, name: 'product', qty: 2 };
  const expected = [{
    ...item,
    qty: 1,
  }];
  expect(reduceItem({ collection, item })).toEqual(expected);
});

it('should remove all product when reduce one item and only have 1 quantity', function () {
  const collection = [{ id: 2, name: 'product', qty: 1 }];
  const item = { id: 2, name: 'product', qty: 1 };
  const expected = [];
  expect(reduceItem({ collection, item })).toEqual(expected);
});

it('should remove complete product', function () {
  const collection = [{ id: 2, name: 'product', qty: 4 }];
  const item = { id: 2, name: 'product', qty: 4 };
  const expected = [];
  expect(removeItem({ collection, id: item.id })).toEqual(expected);
});

it('should return subtotal', function () {
  const item1 = { id: 2, name: 'product', qty: 2, price: 10 };
  const item2 = { id: 3, name: 'product', qty: 1, price: 20 };
  const cart = [item1, item2];
  const expected = 40;
  expect(getSubtotal({ cart })).toEqual(expected);
});

it('should sync cart with updated data', function () {
  const updatedCollection = [{ id: 2, price: 10 }];
  const oldCollection = [{ id: 2, price: 20, qty: 3 }];
  const expected = [{ id: 2, price: 10, qty: 3 }];
  expect(syncCollectionsProperty({ updatedCollection, oldCollection, property: 'price' })).toEqual(expected);
});


