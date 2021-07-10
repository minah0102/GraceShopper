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
    return product;
  } catch (error) {
    console.error(error);
  }
}

export const fetchCategories = async () => {
  try {
    const {data: categories} = await axios.get('/api/categories');
    return categories;
  } catch (error) {
    console.error(error);
  }
}

export const fetchCategoryProducts = async (categoryName) => {
  try {
    console.log("NAME", categoryName);
    const {data: products} = await axios.get(`/api/products/category/${categoryName}`);
    console.log("API", products);
    return products;
  } catch (error) {
    console.error(error);
  }
}