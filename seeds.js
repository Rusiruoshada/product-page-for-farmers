const Product = require("./models/product");
const mongoose = require("mongoose");
const { json } = require("express");
mongoose.set("strictQuery", true);

const url =
  "mongodb+srv://sample1:sample123@cluster0.5er8j14.mongodb.net/?retryWrites=true&w=majority";

function connectDB() {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((error) => {
      console.log(error);
      console.log("oops error");
    });
  return connectDB;
}

connectDB();

const p = [
  {
    name: "Ruby Green1",
    price: 1.99,
    category: "fruit",
  },
  {
    name: "Ruby Green2",
    price: 2.99,
    category: "fruit",
  },
  {
    name: "Ruby Green3",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Ruby Green4",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Ruby Green5",
    price: 5.99,
    category: "fruit",
  },
  {
    name: "Ruby Green6",
    price: 6.99,
    category: "fruit",
  }
];


Product.insertMany(p)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
