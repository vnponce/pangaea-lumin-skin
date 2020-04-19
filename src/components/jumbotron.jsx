import React from 'react';

const JumboTron = () => (
  <section className="p-24 flex justify-between items-end">
    <div>
      <h1 className="text-4xl font-serif">All Products</h1>
      <span className="block mt-6 text-lg">A 360 look at Lumin</span>
    </div>
    <select className="form-select w-1/5 h-16 block mt-1 bg-white border-2">
      <option>Option 1</option>
      <option>Option 2</option>
    </select>

  </section>
);

export default JumboTron;