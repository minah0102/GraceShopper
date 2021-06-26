const client = require("./client");

const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(`SELECT * FROM products;`);
    return products;
  } catch (error) {
    console.log("Error getting products");
    console.error(error);
  }
};

// inlcudes array of reviews
const getProductById = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(/*sql*/ `SELECT * FROM products WHERE id=$1;`, [id]);
    const reviews = await getProductReviews(id);
    if (!product) return;
    if (reviews) {
      product.reviews = []
      reviews.map(review => product.reviews.push(review))
    }
    return product;
  } catch (error) {
    console.log("Error getting products");
    console.error(error);
  }
};

const createProduct = async ({
  name,
  description,
  price,
  quantity,
  imageName,
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      /*sql*/
      `
    INSERT INTO products(name, description, price, quantity, "imageName") VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [name, description, price, quantity, imageName]
    );
    return product;
  } catch (error) {
    console.log("Error creating product");
    console.error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      /*sql*/ `
      DELETE FROM products WHERE id=$1 RETURNING *
    `,
      [id]
    );
    return product;
  } catch (error) {
    console.log("Error deleting product");
    console.error(error);
  }
};

//this will return all reviews for a product with review, rating, and username.
const getProductReviews = async (productId) => {
  try {
    const { rows: reviews } = await client.query(
      /*sql*/
      `SELECT r.comment, r.rating, users.username
     FROM products AS p
     JOIN reviews as r 
     ON p.id = r."productId"
     JOIN users
     ON r."userId" = users.id
     WHERE p.id=$1;
     `,
      [productId]
    );
    return reviews;
  } catch (error) {
    console.log("Error getting product reviews");
    console.error(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  getProductReviews,
};
