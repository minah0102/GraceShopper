// code to build and initialize DB goes here
const {
  client,
  // other db methods 
} = require('./init_db');

async function dropTables() {
  console.log("Dropping All Tables...");
  try {
    await client.query(/*sql*/`
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
            
          );
      `);

    await client.query(/*sql*/`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          
        );
      `);

    await client.query(/*sql*/`
        CREATE TABLE categories(
          id SERIAL PRIMARY KEY,
          
        );
      `);

    await client.query(/*sql*/`
        CREATE TABLE cart(
          id SERIAL PRIMARY KEY,
          
        );
      `);
    await client.query(/*sql*/`
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          
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

