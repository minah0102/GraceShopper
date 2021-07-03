import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const {data: products} = await axios.get('/api/products');
    console.log("PRODUCTS", products);
  } catch (error) {
    console.error(error);
  }
}