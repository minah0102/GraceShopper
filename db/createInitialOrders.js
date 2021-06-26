const { createOrder } = require("./index");

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

module.exports = createInitialOrders;
