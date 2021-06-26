const { Router } = require("express");
const ordersRouter = Router();
const { requireUser } = require("./utils");

const { getHistory, getAllOrders, getCartByUserId, updateQuantity } = require("../db/orders");

ordersRouter.get("/:userId/history", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const history = await getHistory(userId);

    res.send(history);
  } catch (error) {
    console.log("Error in GET orders/:userId/history");
    next(error);
  }
});

ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const allOrders = await getAllOrders(orderId);

    res.send(allOrders);
  } catch (error) {
    console.log("Error in GET orders/:orderId");
    next(error);
  }
});

ordersRouter.get("/:userId/cart", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await getCartByUserId(userId);

    res.send(cart);
  } catch (error) {
    console.log("Error in GET orders/:userId/cart");
    next(error);
  }
});

ordersRouter.patch("/:productId/quantity", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { id, quantity } = req.body;
    const updated = await updateQuantity(id, productId, quantity);

    res.send(updated);
  } catch (error) {
    console.log("Error in PATCH orders/:productId/quantity");
    next(error);
  }
});

module.exports = ordersRouter;
