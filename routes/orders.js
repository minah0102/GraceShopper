const { Router } = require("express");
const ordersRouter = Router();
const { requireUser } = require("./utils");

const {
  getHistory,
  getOrderById,
  getOrderByUserId,
  updateQuantity,
  // createOrder,
  destroyOrder,
  removeProductFromCart,
  addProductToCart,
  removeOrder,
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
//needs to add requireUser
ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);

    res.send(order[0]);
  } catch (error) {
    console.log("Error in GET orders/:orderId");
    next(error);
  }
});

ordersRouter.patch("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const inactive = await removeOrder(orderId);

    res.send(inactive);
  } catch (error) {
    console.log("Error in PATCH orders/:orderId");
    next(error);
  }
});
//needs to add requireUser
ordersRouter.patch("/:lineItemId", async (req, res, next) => {
  try {
    const { lineItemId } = req.params;
    const { quantity } = req.body;
    const updated = await updateQuantity(lineItemId, { quantity });

    res.send(updated);
  } catch (error) {
    console.log("Error in PATCH orders/:productId/quantity");
    next(error);
  }
});

// ordersRouter.post("/", requireUser, async (req, res, next) => {
//   try {
//     const { id: userId } = req.user;
//     const cart = await createOrder(userId);

//     res.send(cart);
//   } catch (error) {
//     console.log("Error in POST orders");
//     next(error);
//   }
// });

ordersRouter.post("/:productId", requireUser, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { orderId, price, quantity } = req.body;
    const added = await addProductToCart({
      productId,
      orderId,
      price,
      quantity,
    });

    res.send(added);
  } catch (error) {
    console.log("Error in POST orders/:productId");
    next(error);
  }
});

ordersRouter.delete("/", requireUser, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const deletedOrder = await destroyOrder(userId);

    res.send(deletedOrder);
  } catch (error) {
    console.log("Error in DELETE orders");
    next(error);
  }
});

ordersRouter.delete("/:lineItemId", requireUser, async (req, res, next) => {
  try {
    const { lineItemId } = req.params;
    const deletedProduct = await removeProductFromCart(lineItemId);

    res.send(deletedProduct);
  } catch (error) {
    console.log("Error in DELETE orders/:productId");
    next(error);
  }
});

module.exports = ordersRouter;
