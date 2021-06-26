const client = require("./client");

async function createOrder(userId) {
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
    throw error;
  }
}

async function removeOrder(orderId) {
  try {
    const {
      rows: [removedCart],
    } = await client.query(
      /*sql*/ `
      UPDATE orders
      SET "isActive"=false
      WHERE id=$1;
    `,
      [orderId]
    );

    //delete line_item using line_item id
    //where can I grab line_item id?

    return removedCart;
  } catch (error) {
    console.log("Error in removeOrder");
    throw error;
  }
}

//empty a cart by userId
//delete and create new order
async function destroyOrder(userId) {
  try {
    await client.query(
      /*sql*/ `
      DELETE FROM orders
      WHERE "userId"=$1;
    `,
      [userId]
    );

    //delete line_item using line_item id
    //where can I grab line_item id?

    return await createOrder(userId);
  } catch (error) {
    console.log("Error in deleteOrder");
    throw error;
  }
}

/*
GET /orders/cart
- send back signed in users cart
- if active order, send that order
- if no active order, create a new order
*/
async function getCartByUserId(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      /*sql*/ `
      SELECT * FROM orders
      WHERE "userId"=$1 AND "isActive"=true;
    `,
      [userId]
    );

    if (!cart) {
      return await createOrder(userId);
    }

    return cart;
  } catch (error) {
    console.log("Error in getOrderByUserId");
    throw error;
  }
}

//GET orders/history - get all inactive orders for user
async function getHistory(userId) {
  try {
    const { rows: history } = await client.query(
      /*sql*/ `
      SELECT * FROM orders 
      WHERE "userId"=$1 AND "isActive"=false;
    `,
      [userId]
    );

    return await attachProductsToOrder(history);
  } catch (error) {
    console.log("Error in getHistory");
    throw error;
  }
}

/*
  GET /orders/:orderId - get any order active or inactive
                        - join with line-items
                        - join with product
*/
async function getAllOrders(orderId) {
  try {
    const { rows: allOrders } = await client.query(
      /*sql*/ `
      SELECT * FROM orders WHERE id=$1;
    `,
      [orderId]
    );

    return await attachProductsToOrder(allOrders);
  } catch (error) {
    console.log("Error in getAllOrders");
    throw error;
  }
}

async function attachProductsToOrder(orders) {
  try {
    const orderIds = orders.map((o) => o.id).join(", ");

    const { rows: products } = await client.query(/*sql*/ `
      SELECT p.id AS "productId", p.name, p.description, p."imageName", li.quantity, li.price, li."orderId"
      FROM line_items AS li
      JOIN products AS p ON p.id=li."productId"
      WHERE "orderId" IN (${orderIds});
    `);

    orders.forEach((order) => {
      order.products = products.filter(
        (product) => product.orderId === order.id
      );
    });

    return orders;
  } catch (error) {
    console.log("Error in attachProductsToOrders");
    throw error;
  }
}

async function addProductToCart({ productId, orderId, price, quantity }) {
  try {
    //check if the product is already in the cart.
    //if I use getCartByUserId() I will not get productId
    const {
      rows: [lineItem],
    } = await client.query(
      /*sql*/ `
      SELECT * FROM line_items WHERE "productId"=$1;  
    `,
      [productId]
    );

    if (lineItem) {
      return await updateQuantity(lineItem.id, lineItem.productId, quantity);
    }

    const {
      rows: [newLineItem],
    } = await client.query(
      /*sql*/ `
      INSERT INTO line_items("productId", "orderId", price, quantity)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,
      [productId, orderId, price, quantity]
    );

    return newLineItem;
  } catch (error) {
    console.log("Error in addProductToCart");
    throw error;
  }
}

async function updateQuantity(id, productId, quantity) {
  try {
    const { rows: updatedQuantity } = await client.query(
      /*sql*/ `
      UPDATE line_items
      SET quantity=$1
      WHERE id=$2 AND "productId"=$3
      RETURNING *;
    `,
      [quantity, id, productId]
    );

    if (updatedQuantity.quantity === 0) {
      return await deleteLineItems(updatedQuantity.id);
    }

    return updatedQuantity;
  } catch (error) {
    console.log("Error in updateQuantity");
    throw error;
  }
}

//delete line_items - remove/destory cart and when quantity = 0
async function deleteLineItems(id) {
  try {
    const {
      rows: [deletedLineItem],
    } = await client.query(
      /*sql*/ `
      DELETE FROM line_items
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );

    return deletedLineItem;
  } catch (error) {
    console.log("Error in deleteLineItems");
    throw error;
  }
}

module.exports = {
  createOrder,
  getHistory,
  removeOrder,
  destroyOrder,
  getCartByUserId,
  getAllOrders,
  addProductToCart,
  updateQuantity,
  deleteLineItems,
};
