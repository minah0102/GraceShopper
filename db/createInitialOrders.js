const { createOrder } = require("./index");

const createInitialOrders = async () => {
  try {
    console.log("Creating orders");

    const orderssToCreate = [
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

    const orders = await Promise.all(orderssToCreate.map(createOrder));

    console.log("Finished creating orders");
    console.log(orders);
  } catch (error) {
    console.log("Trouble creating new orders");
    console.dir(error);
  }
};

module.exports = createInitialOrders;
