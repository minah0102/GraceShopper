const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is working",
  });
});

// ROUTES
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

module.exports = apiRouter;