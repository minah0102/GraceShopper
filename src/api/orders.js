import axios from "axios";

const URL = `http://localhost:3000/api`;

export async function getOrder(orderId) {
  try {
    const { data } = await axios.get(`${URL}/orders/${orderId}`);

    return data;
  } catch (error) {
    console.log("Error in api/getOrder");
    throw error;
  }
}

export async function patchQuantity(lineItemId, quantity) {
  try {
    const { data } = await axios.patch(`${URL}/orders/${lineItemId}/quantity`, {
      quantity,
    });

    return data;
  } catch (error) {
    console.log("Error in api/updateQuantity");
    throw error;
  }
}

export async function deleteProductFromCart(lineItemId) {
  try {
    const { data } = await axios.delete(`${URL}/orders/${lineItemId}`);

    return data;
  } catch (error) {
    console.log("Error in api/deleteProductFromCart");
    throw error;
  }
}
