import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const {data: products} = await axios.get('/api/products');
    return products;
  } catch (error) {
    console.error(error);
  }
}

export const fetchProductById = async (id) => {
  try {
    const {data: product} = await axios.get(`/api/products/${id}`);
    console.log("PRODUCT BY ID", product);
    return product;
  } catch (error) {
    console.error(error);
  }
}