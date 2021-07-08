import axios from "axios";
import { getToken } from "./token";

const URL = `http://localhost:3000/api`;
// const token = getToken();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJqb29oYSIsImVtYWlsIjoiam9vaGE1NjdAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYyNTcwMDMyNH0.Mqnp49iZ93_XDeS8KRkockDSEuM6VMdWO3jvugPWaTg";
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export async function getOrder(orderId) {
  try {
    const { data } = await axios.get(`${URL}/orders/${orderId}`, config);

    return data;
  } catch (error) {
    console.log("Error in api/getOrder");
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
