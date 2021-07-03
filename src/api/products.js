import axios from 'axios';

const fetchAllProducts = async () => {
  try {
    const {data: products} = await axios.get('/api/products');
    console.log("PRODUCTS", products);
  } catch (error) {
    console.error(error);
  }
}