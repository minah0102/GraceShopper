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
          "Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 20,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Yellow Collar",
        description:
          "Lorem ipsum dolor sit amet incididunt ut labore et doloe magna aliqua.",
        price: 15,
        quantity: 24,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Orange Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore edolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 30,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Green Collar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et olore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10,
        quantity: 30,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Blue Collar",
        description:
          "Lorem ipsum dol eiusmod tempor incididunt ut labore et dolore maa aliqua.",
        price: 10,
        quantity: 36,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Purple Collar",
        description:
          "Lorem ipsum dolor sit amet, consctetur.",
        quantity: 30,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Kitten Toy #1",
        description:
          "Lorem ipsum dolor sit amet, constetur adipiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
        categoryId: 2,
      },
      {
        name: "Kitten Toy #2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 12,
        imageName: "cat.jpeg",
        categoryId: 2,
      },
      {
        name: "Kitten Toy #3",
        description:
          "Lorem ipsum dolor sit amet, consect, sed do eiuod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 20,
        imageName: "cat.jpeg",
        categoryId: 2,
      },
      {
        name: "Kitten Toy #4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adiscing labore et dolore magna elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
        categoryId: 2,
      },
      {
        name: "Kitten Toy #5",
        description:
          "Lorem  do eiusmod tempor incididunt ut laboe et dolore magna aliqua.",
        price: 5,
        quantity: 10,
        imageName: "cat.jpeg",
        categoryId: 2,
      },
      {
        name: "Kitten Food",
        description:
          "Lorem ipsum dolor sit amet, consectetur adiscing labore et dolore magna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10,
        quantity: 42,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Organic Kitten Food",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore mgna elit, sadipiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 42,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Adult Cat Food",
        description:
          "boread ipiscing labore et dolore magna elit et dolore magna elited do dolore magna elid do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 17,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Organic Adult Cat Food",
        description:
          "eadipiscing labore et dolore magna elit et dolore magmod tempor incididunt ut labore et dore magna aliqua.",
        price: 30,
        quantity: 15,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Grain Free Kitten Food",
        description:
          "ed do dolore magna elited do eiusmodr incididunt ut labore et dolore agna aliqua.",
        price: 20,
        quantity: 42,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Cat Tower",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna it.",
        price: 120,
        quantity: 5,
        imageName: "cat.jpeg",
        categoryId: 2,
      },
      {
        name: "Cat Bed",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing labore et dolore magna elit, sadiscing laboreadipiscing labore et dolore magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20,
        quantity: 10,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Small Litter Box",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing laboreaipiscing labore et dolre magna elit et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 15,
        quantity: 54,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Large Litter Box",
        description:
          "Lorem ipsum dolor boread iscing labore et dolore magna elt et dolore magna elited do dolore magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 25,
        quantity: 25,
        imageName: "cat.jpeg",
        categoryId: 4,
      },
      {
        name: "Catnip",
        description:
          "labore et dolore magna elit et dolore magna elited do dole magna elited do eiusmod tempor eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 5,
        quantity: 42,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Catnip Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore mana aliqua.",
        price: 5,
        quantity: 22,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Salmon Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore magna aiqua.",
        price: 5,
        quantity: 35,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Chicken Treats",
        description:
          "eiusmod tempor incididunt ut labore et dolore magna ala.",
        price: 5,
        quantity: 26,
        imageName: "cat.jpeg",
        categoryId: 1,
      },
      {
        name: "Tuna Treats",
        description:
          "eiusmod tempor incididunt ut labor et dolore magna aua.",
        price: 5,
        quantity: 35,
        imageName: "cat.jpeg",
        categoryId: 1,
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