import axios from "axios";
import { getTokenConfig } from "./token";

const URL = `http://localhost:3000/api`;

export async function getOrderByUser() {
  const { config } = getTokenConfig();

  try {
    const { data } = await axios.get(`${URL}/orders/cart`, config);

    return data;
  } catch (error) {
    console.log("Error in api/getOrderByUser");
    throw error;
  }
}

export async function getOrderHistory() {
  const { config } = getTokenConfig();

  try {
    const { data } = await axios.get(`${URL}/orders/history`, config);

    return data;
  } catch (error) {
    console.log("Error in api/getOrderHistory");
    throw error;
  }
}

export async function patchQuantity(lineItemId, quantity) {
  const { token } = getTokenConfig();

  // try {
  //   const { data } = await axios.patch(
  //     `${URL}/orders/${lineItemId}/quantity`,
  //     {
  //       quantity,
  //     },
  //     config
  //   );

  //   return data;
  try {
    const response = await fetch(`${URL}/orders/${lineItemId}/quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        quantity,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error in api/updateQuantity");
    throw error;
  }
}

export async function deleteProductFromCart(lineItemId) {
  const { token } = getTokenConfig();

  // try {
  //   const { data } = await axios.delete(`${URL}/orders/${lineItemId}`, config);

  //   return data;
  try {
    const response = await fetch(`${URL}/orders/${lineItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error in api/deleteProductFromCart");
    throw error;
  }
}

export async function addProductToCart(orderId, productId, price, quantity) {
  const { token } = getTokenConfig();

  // try {
  //   const { data } = await axios.post(
  //     `${URL}/orders/${orderId}`,
  //     { productId, price, quantity },
  //     config
  //   );

  //   return data;
  try {
    const response = await fetch(`${URL}/orders/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: { productId, price, quantity },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error in api/postProductToCart");
    throw error;
  }
}

export async function patchInactive(orderId) {
  const { token } = getTokenConfig();

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
