<<<<<<< HEAD
const { createOrder } = require("./index");

const createInitialOrders = async () => {
  try {
    console.log("Creating orders");

    const ordersToCreate = [
      { userId: 1 },
      { userId: 2 },
      { userId: 3 },
      { userId: 4 },
      { userId: 5 },
      { userId: 6 },
      { userId: 7 },
      { userId: 8 },
      { userId: 9 },
      { userId: 10 },
    ];

    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log("Finished creating orders");
    console.log(orders);
  } catch (error) {
    console.log("Trouble creating new orders");
    console.dir(error);
  }
};

module.exports = createInitialOrders;
=======
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
>>>>>>> 8e18920c89cbf5f81354b845ab0484380f78ab25
