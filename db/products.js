const client = require("./client");

// getAllProducts
// getProductById (needs join)
// updateProduct
// createProduct
// deleteProduct

// may need a join with reviews if we want to show the rating on the product card
const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(`SELECT * FROM products;`);
    return products;
  } catch (error) {
    console.log("Error getting products");
    console.error(error);
  }
};

const getProductById = async (id) => {
  try {
    const {
      rows: products,
    } = await client.query(`SELECT * FROM products WHERE id=$1;`, [id]);
    return products;
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};
