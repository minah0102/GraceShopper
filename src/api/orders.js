import axios from "axios";
import { getToken } from "./token";

const URL = `http://localhost:3000/api`;
const token = getToken();
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export async function getOrderByUser() {
  try {
    const { data } = await axios.get(`${URL}/orders/cart`, config);

    return data;
  } catch (error) {
    console.log("Error in api/getOrderByUser");
    throw error;
  }
}

export async function patchQuantity(lineItemId, quantity) {
  try {
    const { data } = await axios.patch(
      `${URL}/orders/${lineItemId}/quantity`,
      {
        quantity,
      },
      config
    );

    return data;
  } catch (error) {
    console.log("Error in api/updateQuantity");
    throw error;
  }
}

export async function deleteProductFromCart(lineItemId) {
  try {
    const { data } = await axios.delete(`${URL}/orders/${lineItemId}`, config);

    return data;
  } catch (error) {
    console.log("Error in api/deleteProductFromCart");
    throw error;
  }
}

export async function addProductToCart(orderId, productId, price, quantity) {
  try {
    const { data } = await axios.post(
      `${URL}/orders/${orderId}`,
      { productId, price, quantity },
      config
    );

    return data;
  } catch (error) {
    console.log("Error in api/postProductToCart");
    throw error;
  }
}

export async function patchInactive(orderId) {
  try {
    const response = await fetch(`${URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error in api/patchInactive");
    throw error;
  }
}
