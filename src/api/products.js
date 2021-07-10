import axios from "axios";
import { getToken } from "./token";
const token = getToken();
console.log(token);
//need to use config

export const fetchAllProducts = async () => {
  try {
    const { data: products } = await axios.get("/api/products");
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data: product } = await axios.get(`/api/products/${id}`);
    return product;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategories = async () => {
  try {
    const { data: categories } = await axios.get("/api/categories");
    return categories;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoryProducts = async (categoryName) => {
  try {
    const { data: products } = await axios.get(
      `/api/products/category/${categoryName}`
    );
    console.log("API", products);
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (product) => {
  const {name, description, price, quantity} = product;
  try {
    const { data: updatedProduct } = await axios.patch(
      `/api/products/...`,
      { name, description, price, quantity },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("updatedProduct API", updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
};


export const deleteProduct = async (id) => {
  try {
    const { data: product } = await axios.delete(
      `/api/products/${id}`
    );
    console.log("DELETED", product);
    return product;
  } catch (error) {
    console.error(error);
  }
}