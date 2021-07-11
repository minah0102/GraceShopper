import axios from "axios";
import { getTokenConfig } from "./token";

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
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (product) => {
  const { id } = product;
  const { token } = getTokenConfig();
  try {
    const { data: updatedProduct } = await axios.patch(
      `/api/products/${id}`,
      product,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return updatedProduct[0];
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data: product } = await axios.delete(`/api/products/${id}`);
    return product;
  } catch (error) {
    console.error(error);
  }
};
