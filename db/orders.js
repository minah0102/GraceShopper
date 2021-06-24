const client = require("./client");

async function createOrder({ userId }) {
    try {
      const {
        rows: [order],
      } = await client.query(
        /*sql*/ `
        INSERT INTO orders ("userId")
        VALUES($1)
        RETURNING *;
      `,
        [userId]
      );
  
      return order;
    } catch (error) {
      console.log("Error in createOrder");
      console.error(error);
    }
  }

module.exports = {
  createOrder
};


