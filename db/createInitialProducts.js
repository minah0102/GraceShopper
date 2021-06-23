const {
  createProduct
} = require("./products");

const createInitialProducts = async () => {
  try {
    console.log("Starting to create products");
    const productsToCreate = [
      {
        name: "Red Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusod tempor incididunt ut labore et dolore magna aliqua.",
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
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore mana elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 30,
        imageName: "cat.jpeg",
      },
      {
        name: "Green Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolormagna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10,
        quantity: 30,
        imageName: "cat.jpeg",
      },
      {
        name: "Blue Collar",
        description:
          "Lorem ipsum dol eiusmod tempor incididunt ut labore et doloe magna aliqua.",
        price: 10,
        quantity: 36,
        imageName: "cat.jpeg",
      },
      {
        name: "Purple Collar",
        description:
          "Lorem ipsum dolor sit amet, consctetur.",
        quantity: 30,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #1",
        description:
          "Lorem ipsum dolor sit amet, consectur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #2",
        description:
          "Lorem ipsum dolor sit amet, coectetur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 12,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #3",
        description:
          "Lorem ipsum dolor sit amet, consect, sed do esmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 20,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labe et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Toy #5",
        description:
          "Lorem  do eiusmod tempor incididunt ut labore et dolre magna aliqua.",
        price: 5,
        quantity: 10,
        imageName: "cat.jpeg",
      },
      {
        name: "Kitten Food",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dre magna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Organic Kitten Food",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolo magna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Adult Cat Food",
        description:
          "boread ipiscing labore et dolore magna elit et dlore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 17,
        imageName: "cat.jpeg",
      },
      {
        name: "Organic Adult Cat Food",
        description:
          "eadipiscing labore et dolore magna elit et dolore mamod tempor incididunt ut labore et dolore magna aliqua.",
        price: 30,
        quantity: 15,
        imageName: "cat.jpeg",
      },
      {
        name: "Grain Free Kitten Food",
        description:
          "ed do dolore magna elited do eiusmodr incidiunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 42,
        imageName: "cat.jpeg",
      },
      {
        name: "Cat Tower",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing laore et dolore magna elit.",
        price: 120,
        quantity: 5,
        imageName: "cat.jpeg",
      },
      {
        name: "Cat Bed",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing laboe et dolore magna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 10,
        imageName: "cat.jpeg",
      },
      {
        name: "Small Litter Box",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing laboreadipicing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 54,
        imageName: "cat.jpeg",
      },
      {
        name: "Large Litter Box",
        description:
          "Lorem ipsum dolor boread iscing labore et dolore magna elit et doloe magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 25,
        quantity: 25,
        imageName: "cat.jpeg",
      },
      {
        name: "Catnip",
        description:
          "labore et dolore magna elit et dolore mgna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
          "eiusmod tempor incididunt ut labore et dolore gna aliqua.",
        price: 5,
        quantity: 35,
        imageName: "cat.jpeg",
      },
      {
        name: "Chicken Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore magna aiqua.",
        price: 5,
        quantity: 26,
        imageName: "cat.jpeg",
      },
      {
        name: "Treats",
        description:
          "eiusmod tempor incididunt ulabore et dolore magna aliqua.",
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

module.exports = createInitialProducts;