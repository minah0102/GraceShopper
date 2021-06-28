const { Router } = require("express");
const ordersRouter = Router();
const { requireUser } = require("./utils");

const {
  getHistory,
  getAllOrders,
  getOrderByUserId,
  updateQuantity,
  createOrder,
} = require("../db/orders");

ordersRouter.get("/history", requireUser, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const history = await getHistory(userId);

    res.send(history);
  } catch (error) {
    console.log("Error in GET orders/history");
    next(error);
  }
});

ordersRouter.get("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const allOrders = await getAllOrders(orderId);

    res.send(allOrders);
  } catch (error) {
    console.log("Error in GET orders/:orderId");
    next(error);
  }
});

ordersRouter.get("/cart", requireUser, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const cart = await getOrderByUserId(userId);

    res.send(cart);
  } catch (error) {
    console.log("Error in GET orders/cart");
    next(error);
  }
});

ordersRouter.patch(
  "/:productId/quantity",
  requireUser,
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { orderId, quantity } = req.body;
      const updated = await updateQuantity(orderId, productId, quantity);

      res.send(updated);
    } catch (error) {
      console.log("Error in PATCH orders/:productId/quantity");
      next(error);
    }
  }
);

ordersRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const cart = await createOrder(userId);

    res.send(cart);
  } catch (error) {
    console.log("Error in POST orders");
    next(error);
  }
});

ordersRouter.post();

ordersRouter.delete();

ordersRouter.delete();

module.exports = ordersRouter;
