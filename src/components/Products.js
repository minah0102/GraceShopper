import React from 'react';
import {fetchAllProducts} from '../api/products';
fetchAllProducts();

const Products = () => {
  return (
    <div>
      Hello from Products
    </div>
  );
};

export default Products;