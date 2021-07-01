const client = require("./client");

const getAllCategories = async () => {
  try {
    const { rows: categories } = await client.query(`SELECT * FROM categories;`);
    return categories;
  } catch (error) {
    console.log("Error getting categories");
    console.error(error);
  }
};

const createCategory = async ({ name }) => {
  name = name.toLowerCase();
  try {
    const {
      rows: [category],
    } = await client.query(
      /*sql*/
      `
    INSERT INTO categories(name) VALUES ($1)
      RETURNING *;
    `,
      [name]
    );
    return category;
  } catch (error) {
    console.log("Error creating category");
    console.error(error);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const {
      rows: category
    } = await client.query(/*sql*/`
      DELETE FROM categories WHERE id=$1 RETURNING *;
    `, [categoryId])
    return category;
  } catch (error) {
    console.log("Error deleting category");
    console.error(error);
  }
}

const createCategoryProduct = async ({ productId, categoryId }) => {
  try {
    const {
      rows: [category],
    } = await client.query(
      /*sql*/
      `
    INSERT INTO category_products("productId", "categoryId") VALUES ($1, $2)
      RETURNING *;
    `,
      [productId, categoryId]
    );
    return category;
  } catch (error) {
    console.log("Error creating category_product");
    console.error(error);
  }
};

const deleteCategoryProduct = async ({productId, categoryId}) => {
  try {
    const {
      rows: categoryProduct
    } = await client.query(/*sql*/`
      DELETE FROM category_products WHERE "productId"=$1 AND "categoryId"=$2 RETURNING *;
    `, [productId, categoryId])
    return categoryProduct;
  } catch (error) {
    console.log("Error deleting categoryProduct");
    console.error(error);
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  createCategoryProduct,
  deleteCategoryProduct
};
