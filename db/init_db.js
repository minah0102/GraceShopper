// code to build and initialize DB goes here
const client = require("./client");
const {
  createProduct
} = require("./init_db");

async function dropTables() {
  console.log("Dropping All Tables...");
  try {
    await client.query(/*sql*/ `
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
    await client.query(/*sql*/ `
          CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
          );
    `);

    await client.query(/*sql*/ `
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT UNIQUE NOT NULL,
          price NUMERIC(5, 2),
          quantity INTEGER,
          "imageName" VARCHAR(255) UNIQUE NOT NULL
        );
    `);

    await client.query(/*sql*/ `
        CREATE TABLE categories(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL
        );
    `);

    await client.query(/*sql*/ `
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "isActive" BOOLEAN DEFAULT true,
          "purchasedDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          "userId" INTEGER REFERENCES users(id)
        );
    `);

    await client.query(/*sql*/ `
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          review TEXT,
          rating INTEGER,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
        );
    `);

    await client.query(/*sql*/ `
      CREATE TABLE category_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE("productId", "categoryId")
      );
    `);

    await client.query(/*sql*/ `
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

const createInitialProducts = async () => {
  try {
    console.log("Starting to create products");
    const productsToCreate = [
      {
        name: "Red Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 20,
        imageName: "cat.jpeg",
      },
      {
        name: "Yellow Collar",
        description:
          "Lorem ipsum dolor sit amet incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 24,
        imageName: "cat.jpeg",
      },
      {
        name: "Orange Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 30,
        imageName: "cat.jpeg",
      },
      {
        name: "Green Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10,
        quantity: 30,
        imageName: "cat.jpeg",
      },
      {
        name: "Blue Collar",
        description:
          "Lorem ipsum dol eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10,
        quantity: 36,
        imageName: "cat.jpeg",
      },
      {
        name: "Purple Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur.",
        quantity: 30,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 12,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #3",
        description:
          "Lorem ipsum dolor sit amet, consect, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 20,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #5",
        description:
          "Lorem  do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 10,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Food",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Organic Kitten Food",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Adult Cat Food",
        description:
          "boread ipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 17,
        imageName: "cat.jpeg",
      },
      {
        name: "Organic Adult Cat Food",
        description:
          "eadipiscing labore et dolore magna elit et dolore magmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 30,
        quantity: 15,
        imageName: "cat.jpeg",
      },
      {
        name: "Grain Free Kitten Food",
        description:
          "ed do dolore magna elited do eiusmodr incididunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Cat Tower",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit.",
        price: 120,
        quantity: 5,
        imageName: "cat.jpeg",
      },
      {
        name: "Cat Bed",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 10,
        imageName: "cat.jpeg",
      },
      {
        name: "Small Litter Box",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 54,
        imageName: "cat.jpeg",
      },
      {
        name: "Large Litter Box",
        description:
          "Lorem ipsum dolor boread iscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 25,
        quantity: 25,
        imageName: "cat.jpeg",
      },
      {
        name: "Catnip",
        description:
          "labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Catnip Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 22,
        imageName: "cat.jpeg",
      },
      {
        name: "Salmon Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 35,
        imageName: "cat.jpeg",
      },
      {
        name: "Chicken Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 26,
        imageName: "cat.jpeg",
      },
      {
        name: "Salmon Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 35,
        imageName: "cat.jpeg",
      }
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("Products created");
    console.log(products);
  } catch (error) {
    console.log("Error creating products");
    console.error(error);
  }
};

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
