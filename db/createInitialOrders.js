const { createOrder, addProductToCart } = require("./index");

const createInitialOrders = async () => {
  try {
    console.log("Creating orders");

    const ordersToCreate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log("Finished creating orders");
    console.log(orders);
  } catch (error) {
    console.log("Trouble creating new orders");
    console.dir(error);
  }
};
//addProductToCart({ productId, orderId, price, quantity })
const createInitialLineItems = async () => {
  try {
    console.log("Creating line items");

    const lineItemsToCreate = [{}];

    const lineItems = await Promise.all(
      lineItemsToCreate.map(addProductToCart)
    );

    console.log("Finished creating line items");
    console.log(lineItems);
  } catch (error) {
    console.log("Trouble creating new line items");
    console.dir(error);
  }
};

module.exports = { createInitialOrders, createInitialLineItems };
