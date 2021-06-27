const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


apiRouter.use(attachUser);

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is working",
  });
});

async function attachUser(req, res, next) {
  try {
    const auth = req.header("Authorization");
    const prefix = "Bearer ";
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.replace(prefix, "");
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken.id;
      const user = await getUserById(id);
      if (!user) {
        next(new Error("could not find user"));
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    console.error(error);
  }
}



// ROUTES

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

const reviewsRouter = require("./reviews");
apiRouter.use("/reviews", reviewsRouter);


const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);


module.exports = apiRouter;
