// code to build and initialize DB goes here
const client = require("./client");
const {
  // other db methods 
} = require('./init_db');

async function dropTables() {
  console.log("Dropping All Tables...");
  try {
    await client.query(/*sql*/`
      DROP TABLE IF EXISTS line_items;
      DROP TABLE IF EXISTS category_products;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables!");
    throw error;
  }
}

async function createTables() {
  console.log("Building/Creating Tables...");
  try {
    await client.query(/*sql*/`
          CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
          );
    `);

    await client.query(/*sql*/`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT UNIQUE NOT NULL,
          price NUMERIC(5, 2),
          quantity INTEGER,
          imageName VARCHAR(255) UNIQUE NOT NULL
        );
    `);

    await client.query(/*sql*/`
        CREATE TABLE categories(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL
        );
    `);

    await client.query(/*sql*/`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "isActive" BOOLEAN DEFAULT true,
          "purchasedDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          "userId" INTEGER REFERENCES users(id)
        );
    `);

    await client.query(/*sql*/`
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          review TEXT,
          rating INTEGER,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
        );
    `);

    await client.query(/*sql*/`
      CREATE TABLE category_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE("productId", "categoryId")
      );
    `);

    await client.query(/*sql*/`
      CREATE TABLE line_items(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price NUMERIC(5, 2),
        quantity INTEGER
      );
    `);
  
  } catch (error) {
    console.error("Error while building/creating tables!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data

  } catch (error) {
    throw error;
  }
}


buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

